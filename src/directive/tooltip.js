// 文字提示
/**
 * 使用方式
 * 1. v-tooltip // 默认提示自身
 * 2. v-tooltip="'一段文字提示'" // 传递字符串 提示
 * 3. v-tooltip="{ content: '一段文字提示', disabled: false }" // 类似prop传递
 * 4. v-tooltip="{ contentSlot: vNode }" // 提示框内为插槽
 * */

/**
 * v-tooltip="Props" // 类似prop传递
 * @props.contentSlot 提示文字插槽
 * */
import Vue from "vue";
export default {
    directiveKey: 'tooltip',
    directiveData: {
        bind(el, binding, vNode, oldVNode) {
            // console.log('bind');
            // 传递的参数 参照el-tooltip
            const value = getValue(binding);
            // 首次绑定 未挂载tooltip
            if(!vNode.tooltipVNode) {
                // 指令绑定到当前标签时当前标签还未渲染
                // 采用异步等待当前标签渲染完成
                setTimeout(()=>{
                    // console.log('initTooltip');
                   // 挂载tooltip
                   initTooltip(el, binding, vNode, value);
                });
            }
            if(oldVNode && oldVNode.tooltipVNode) {
                // 主动销毁之前
                oldVNode.tooltipVNode.$destroy()
            }
        },
        // 数据更新
        update: function (el, binding, vNode, oldVNode) {
            // console.log('update');
            // 传递的参数 参照el-tooltip
            const value = getValue(binding);
            if(oldVNode.tooltipVNode) {
                // 等待bind 挂载tooltip
                setTimeout(()=>{
                    // 更新后会重新渲染vNode
                    // 把tooltipVNode挂载在新的vNode上
                    vNode.tooltipVNode = oldVNode.tooltipVNode;
                    vNode.tooltipVNode.value = value;
                    // 主动触发文字是否过长
                    vNode.tooltipVNode.getDisabledTooltip(el);
                    // 如果信息提示是插槽主动触发更新插槽
                    if(vNode.tooltipVNode.contentSlot) {
                        getTooltipContentSlot(vNode, vNode.tooltipVNode);
                    }
                })
            }else{
                // 采用异步等待当前标签渲染完成
                setTimeout(()=>{
                    // console.log('initTooltip');
                    // 挂载tooltip
                    initTooltip(el, binding, vNode, value);
                });
            }
        },
        // 只调用一次，指令与元素解绑时调用。
        unbind: function (el, binding, vNode) {
            vNode.tooltipVNode && vNode.tooltipVNode.$destroy();
        },
    }
}

// vue实例替换到原标签
function initTooltip(el, binding, vNode, value) {
    // v-tooltip 指令的index
    const directiveTooltipIndex = vNode.data.directives.findIndex(directive=>{
        return directive.name = 'tooltip'
    })
    // 删除标签的v-tooltip指令避免无限递归
    vNode.data.directives.splice(directiveTooltipIndex, 1);
    vNode.tooltipVNode = new Vue({
        // 覆盖原标签
        el: el,
        data: {
            value: value,
            // 为true时不显示文字提示弹框
            isDisabledTooltip: false,
            // 弹框插槽 #contetnt
            contentSlot: null,
        },
        methods:{
            // 获取是否需要文字提示
            getDisabledTooltip(element) {
                // 如果有ellipsis修饰符 需文字过长才显示弹框
                if(binding.modifiers && binding.modifiers.ellipsis){
                    this.isDisabledTooltip =  !isLongText(element);
                }else{
                    this.isDisabledTooltip = false;
                }
            },
        },
        // watch: {
        //     'value'(news) {
        //
        //     }
        // },
        mounted() {
            this.getDisabledTooltip(el);
        },
        created() {
            getTooltipContentSlot(vNode, this);
        },
        render(h) {
            // console.log('render');
            // 把原标签包裹在el-tooltip里
            return h('el-tooltip', {
                props: {
                    ...this.value,
                    placement: this.value.placement || 'top',
                    content: this.value.content || el.innerText,
                    disabled: this.value.disabled || this.isDisabledTooltip,
                },
            }, [
                // 文字提示框的插槽
                this.contentSlot,
                // 去除 v-tooltip指令后的原标签
                vNode,
            ]);
        }
    });
}

// 获取调用指令传递的参数
function getValue(binding) {
    let { value = {} } = binding;
    // 如果传递的是字符串
    if(typeof value === 'string') {
        value = {
            content: value
        }
    }
    return value
}

// 文字是否过长
function isLongText(el) {
    // 复制元素并且使标签内不换行计算文字是否超出标签长度
    const cloneEl = el.cloneNode(true);
    cloneEl.style['white-space'] = 'nowrap';
    cloneEl.style.visibility = 'hidden';
    cloneEl.style.position = 'fixed';
    cloneEl.style.top = '-1000px';
    document.body.append(cloneEl);
    const { scrollWidth, width, clientWidth } = cloneEl;
    document.body.removeChild(cloneEl);
    // 实际宽度 > 标签宽度
    // console.log(scrollWidth, clientWidth, width);
    return scrollWidth > clientWidth;
}

// 获取tooltip-content插槽 或 contentSlot vNode
function getTooltipContentSlot(vNode, that) {
    const h = that.$createElement;
    // 找到插槽list
    const children = vNode.children || vNode.componentOptions.children;
    let slot = null;
    // 以 slot="tooltip-content"的形式
    if(children && Array.isArray(children)) {
        // 找到 tooltip-content 插槽的index
        const slotIndex = children.findIndex(item=>{
            return item.data && item.data.slot === 'tooltip-content';
        })
        if(slotIndex > -1) {
            slot = children[slotIndex].children;
        }
    }
    // 以 v-tooltip="{ contentSlot: vNode }"的形式传递vNode插槽
    // slot="tooltip-content" 优先级  > v-tooltip="{ contentSlot: vNode }"
    // console.log(that.value);
    slot = slot || that.value.contentSlot;
    if(slot) {
        that.contentSlot = h('template',{
            slot: 'content'
        },[
            slot
        ]);
    }
}