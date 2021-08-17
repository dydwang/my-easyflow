import Element from 'element-ui';
import {getCell} from "element-ui/packages/table/src/util";

export default function(Vue) {
    Vue.use(Element);
    // console.log(Element);
    // 表格文字溢出时省略号再提示
    // Element.TableColumn.props['showOverflowTooltip'].default = true;
    // 表格文字文字标题居中
    Element.TableColumn.props['align'].default = 'center';
    Element.TableColumn.props['headerAlign'].default = 'center';
}

// TODO 表格里 鼠标离开 cell 表格提示文字会强行关闭
// const TableBody = Element.Table.components.TableBody;
//
// let timeoutCloseTip = null;
// function closeTip(tooltip) {
//     tooltip.setExpectedState(false);
//     tooltip.handleClosePopper();
//     clearTimeout(timeoutCloseTip);
//     console.log('closeTip 关闭信息提示弹框');
// }

// console.log(Element.Popover);
// const TableBodyHandleCellMouseEnter = TableBody.methods.handleCellMouseEnter;
// TableBody.methods.handleCellMouseEnter = function (...args){
//     const event = args[0];
//     console.log(event);
//     const tooltip = this.$refs.tooltip;
//     if (tooltip) {
//         console.log(tooltip);
//         // tooltip.popperOptions.boundariesElement = event.target.childNodes[0];
//         closeTip(tooltip);
//     }
//     console.log('enter 进入单元格');
//
//     TableBodyHandleCellMouseEnter.call(this, ...args);
// }
//
// TableBody.methods.handleCellMouseLeave = function (event) {
//     console.log('enter 离开单元格');
//     const tooltip = this.$refs.tooltip;
//     if (tooltip) {
//         const popper = tooltip.$refs.popper;
//         popper.onmouseleave = () =>{
//             console.log('onmouseleave');
//             closeTip(tooltip);
//             popper.onmouseleave = null;
//             popper.onmouseenter = null;
//         }
//         popper.onmouseenter = () =>{
//             console.log('onmouseenter');
//             clearTimeout(timeoutCloseTip);
//         }
//         timeoutCloseTip = setTimeout(()=>closeTip(tooltip), 1000);
//     }
//     const cell = getCell(event);
//     if (!cell) return;
//
//     const oldHoverState = this.table.hoverState || {};
//     this.table.$emit('cell-mouse-leave', oldHoverState.row, oldHoverState.column, oldHoverState.cell, event);
// }