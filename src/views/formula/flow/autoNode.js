class AutoNode{
    /**
     * 节点的最长子孙数
     * @params {Object} config 初始参数
     * @params {Object} config.flowNodeLine 节点连线数据
     * @params {Object} config.startY 最顶部Y坐标值
     * @params {Object} config.nodeWidth 节点宽度
     * @params {Object} config.nodeHeight 节点高度
     * @params {Object} config.nodeDistanceX 节点左右间距
     * @params {Object} config.nodeDistanceY 节点上下间距
     *
     * */
    constructor(config) {
        const { flowNodeLine, startY, nodeWidth, nodeHeight, nodeDistanceX, nodeDistanceY  } = config;
        this.flowNodeLine = flowNodeLine;
        this.nodeList = flowNodeLine.nodeList;
        this.startY = startY;
        this.nodeWidth = nodeWidth;
        this.nodeHeight = nodeHeight;
        this.nodeDistanceX = nodeDistanceX;
        this.nodeDistanceY = nodeDistanceY;
    }
    /**
     * 入口函数
     * */
    init() {
        const { nodeList, lineList } = this.flowNodeLine;
        // 如果不存在连线随机分配节点位置
        if(!lineList.length) {
            this.random()
        }else{
            // 无连线节点
            const noLineNodeList = this.getNoLineNode();
            //console.log('noLineNodeList', JSON.parse(JSON.stringify(noLineNodeList)));
            // 有连线节点
            const isLineNodeList = this.reduceArray(nodeList, noLineNodeList);
            // 根节点 有连线且无被指向即无targetId
            const rootNode = this.getRootNode(isLineNodeList);
            // 如果无根节点随机分配一个节点为根节点
            if(rootNode && !rootNode.length) {
                rootNode.push(isLineNodeList[0]);
            }
            // 剩余子节点 === 有线节点 - 根节点
            let surplusNodeList = this.reduceArray(isLineNodeList, rootNode);
            // 将子节点按连线顺序分级
            let {
                leafNodeGrade,
                fatherChildNode,
                childFatherNode
            } = this.getLeafNodeGrade(surplusNodeList, noLineNodeList, rootNode);
            // 找到节点与最长子孙数的关系
            const grandchildrenNum = this.getGrandchildrenNum(fatherChildNode);
            // 节点正态分布
            leafNodeGrade = this.distributionNormal(grandchildrenNum, leafNodeGrade);

            // 给节点定位
            this.setPosition(leafNodeGrade, fatherChildNode, childFatherNode, grandchildrenNum);
            // console.log('flowNodeLine', this.flowNodeLine);
            // console.log('noLineNodeList', noLineNodeList);
            // console.log('rootNode', rootNode);
            // console.log('leafNodeGrade', leafNodeGrade);
            // console.log('fatherChildNode', fatherChildNode);
            // console.log('childFatherNode', childFatherNode);
            // console.log('grandchildrenNum', grandchildrenNum);
        }
        return this.flowNodeLine;
    }
    /**
     * 随机生成节点坐标
     * */
    random() {
        const { nodeList } = this.flowNodeLine;
        const rowMaxWidth = this.nodeWidth * nodeList.length + this.nodeDistanceX * ( nodeList.length - 1);
        const rowMaxHeight = this.nodeHeight * nodeList.length + this.nodeDistanceY * ( nodeList.length - 1);
        nodeList.forEach(node=>{
            node.left = (Math.random() < 0.5 ? -1 : 1) * Math.floor(Math.random() * rowMaxWidth / 4);
            node.top = (Math.random() < 0.5 ? -1 : 1) * Math.floor(Math.random() * rowMaxHeight / 4);
        })
    }
    /**
     * 无连线节点
     * */
    getNoLineNode() {
        const { nodeList, lineList } = this.flowNodeLine;
        // 线条列表无该节点
        return nodeList.filter(node => {
            return lineList.every(line => {
                return node.id !== line.sourceId && node.id !== line.targetId;
            })
        })
    }
    /**
     * 数组相减
     * @params {Array} big 大数组
     * @params {Array} small 小数组
     * @return {Array}
     * */
    reduceArray(big,small) {
        return big.filter((itemBig) => !(small.some((itemSmall) => itemBig.id === itemSmall.id )));
    }
    /**
     * 根节点 有连线且无被指向即无targetId
     * @params {Array} isLineNodeList 有连线节点
     * @return {Array} 根节点
     * */
    getRootNode(isLineNodeList) {
        const {  lineList } = this.flowNodeLine;
        return isLineNodeList.filter(node => {
            return lineList.every(line => {
                return node.id !== line.targetId;
            })
        })
    }

    /**
     * 获取分级后的叶子节点
     * @params {Array} surplusNodeList 有连线节点但不是根节点
     * @params {Array} noLineNodeList 无连线节点
     * @params {Array} rootNode 根节点
     * @return {Object} {leafNodeGrade: 节点分级, fatherChildNode： 父子对应关系, childFatherNode: 子父对应关系}
     * */
    getLeafNodeGrade = (surplusNodeList ,noLineNodeList, rootNode) => {
        const { lineList } = this.flowNodeLine;
        // 叶子节点
        const leafNodeGrade = {
            // 第一级为 无连线节点  第二级为根节点 其他为叶子节点
            0: noLineNodeList,
            1: rootNode
        };
        // 节点的父子关系id
        const fatherChildNode = {};
        // 节点的子父关系id
        const childFatherNode = {};
        let leafGrade = 2; // 第几级叶子节点
        while( leafNodeGrade[leafGrade - 1].length ) {
            // 第n级叶子节点
            leafNodeGrade[leafGrade] = [];
            const leafNodeGradeList = leafNodeGrade[leafGrade];
            // 对第n级的节点循环 找到其下子节点
            (leafGrade ===1 ? rootNode : leafNodeGrade[leafGrade - 1]).forEach(node=>{
                // 建立该节点与其他节点的父子关系
                fatherChildNode[node.id] = [];
                // 找到某个节点的子节点
                lineList.forEach(line=> {
                    if(line.sourceId === node.id) {
                        // 子节点
                        const child = surplusNodeList.filter( item => item.id === line.targetId)[0]
                        if(child && !child._isLeaf) {
                            child._isLeaf = true; // 只被作为一次叶子节点
                            leafNodeGradeList.push(child);
                            fatherChildNode[node.id].push(child.id);
                            childFatherNode[child.id] = node.id;
                        }
                    }
                })
            })
            leafGrade++;
        }
        // 删除最后空的一级
        delete leafNodeGrade[leafGrade-1];
        // 清空之前做的标记
        surplusNodeList.forEach(node=>{
            delete node._isLeaf
        });
        return{
            leafNodeGrade,
            fatherChildNode,
            childFatherNode
        }
    }
    /**
     * 节点的最长子孙数
     * @params {Object} fatherChildNode 父子节点的关系
     * @return {Object} 节点的叶子数对应关系
     * */
    getGrandchildrenNum(fatherChildNode) {
        // 节点与最长子孙数的关系
        const grandchildrenNum = {};
        function getChildNum(nodeId) {
            let childList = fatherChildNode[nodeId];
            let num = 0;
            childList.forEach(childId=>{
                if(grandchildrenNum[childId]){
                    num += grandchildrenNum[childId];
                }else if(!fatherChildNode[childId].length){
                    grandchildrenNum[childId] = 1;
                    num++;
                }else{
                    num += getChildNum(childId);
                }
            })
            return num;
        }
        Object.keys(fatherChildNode).forEach(nodeId=>{
            if(!grandchildrenNum[nodeId]){
                grandchildrenNum[nodeId] = getChildNum(nodeId) || 1;
            }
        });
        return grandchildrenNum;
    }
    /**
     * 数组成正态分布排列
     * 只需要对根节点进行
     * @params {Object} grandchildrenNum 节点的最长子孙数
     * @params {Object} leafNodeGrade 分级后的叶子节点
     * @return {Object} 正态分布 节点的叶子数对应关系
     * */

    distributionNormal(grandchildrenNum, leafNodeGrade) {
        // 存储正态分布后的节点层级
        const leafNormal = {};

        Object.keys(leafNodeGrade).forEach((gradeIndex, index)=>{
            // 存储正态分布数组
            let array = [];
            // 无连线节点无需正态分布
            if(index === 0) {
                leafNormal[0] = leafNodeGrade[0];
                // console.log(leafNormal[0],leafNodeGrade[0]);
            }else{
                // 对节点排序 小->大
                let sortRootArr = leafNodeGrade[gradeIndex].sort((a, b)=>{
                    return grandchildrenNum[a.id] - grandchildrenNum[b.id];
                });
                // 两个根节点以上才需正态分布
                if(leafNodeGrade[gradeIndex].length > 2){
                    sortRootArr.forEach((item, index)=>{
                        // 偶数index  前面加
                        if(index % 2 === 0){
                            array.splice((index/2) , 0, item);
                        }else{
                            // 奇数 后面加
                            array.splice(-(index/2), 0, item);
                        }
                    });
                }else{
                    array = sortRootArr;
                }
                leafNormal[gradeIndex] = array;
            }
        })
        return leafNormal
    }

    /**
     * 设置节点定位 根据leafNodeGrade从上往下开始遍历
     * @params {Object} leafNodeGrade 分级后的叶子节点
     * @params {Object} fatherChildNode 父子节点的关系
     * @params {Object} childFatherNode 子父节点的关系
     * @params {Object} grandchildrenNum 节点的最长子孙数
     *
     * */
    setPosition(leafNodeGrade, fatherChildNode, childFatherNode, grandchildrenNum) {
        // 最上面的一级开始渲染
        // 当前在第几级渲染
        let nowRowIndex = 0;
        // 每一个父节点的长度 与 位置
        let rootNodeWidthSinge = {
            // 'nodeId': {
            //     width,
            //     left
            // }
        };
        Object.values(leafNodeGrade).forEach((nodeList,gradeIndex)=>{
            // 行宽 起始x值
            let rowWidth = 0;
            let rowStartX = 0;
            // 无连线节点 y轴对称
            if(gradeIndex === 0) {
                // 不存在无连线节点
                if(!nodeList.length) {
                    this.startY = this.startY - this.nodeHeight - this.nodeDistanceY;
                }
                rowWidth = nodeList.length * this.nodeWidth + (nodeList.length - 1) * this.nodeDistanceX;
                rowStartX = ( -rowWidth  ) / 2;
                nodeList.forEach((node, index)=>{
                    node.left = rowStartX + index * (this.nodeWidth + this.nodeDistanceX);
                    node.top = this.startY;
                })
            }else if( gradeIndex === 1){
                // 根节点 按正态分布 根据最大子孙长度
                // 该层节点的Y坐标
                const nodeY = this.startY + this.nodeHeight + this.nodeDistanceY;
                rowWidth = (nodeList.length - 1) * this.nodeDistanceX;
                // 计算所有根节点总长
                nodeList.forEach((node)=>{
                    // 该节点的总长
                    const nodeWidthSinge = grandchildrenNum[node.id] * this.nodeWidth + (grandchildrenNum[node.id] - 1) * this.nodeDistanceX;
                    rootNodeWidthSinge[node.id] = {
                        left: 0,
                        width: nodeWidthSinge
                    }
                    // console.log(rowWidth, nodeWidthSinge);
                    rowWidth += nodeWidthSinge;
                });
                rowStartX = ( -rowWidth  ) / 2;
                // 根据长度计算x坐标
                nodeList.forEach((node)=>{
                    // 记录节点空间的x
                    rootNodeWidthSinge[node.id].left = rowStartX;
                    // 在节点空间内居中
                    node.left = rowStartX + (rootNodeWidthSinge[node.id].width - this.nodeWidth ) / 2 ;
                    node.top = nodeY;
                    // 动态改变起始位置
                    rowStartX = rowStartX + rootNodeWidthSinge[node.id].width + this.nodeDistanceX;
                });
            }else{
                // 其他叶子节点
                // 该层节点的Y坐标
                const nodeY = this.startY + (this.nodeHeight + this.nodeDistanceY) * gradeIndex;
                nodeList.forEach((node)=>{
                    // 父节点
                    const parentId = childFatherNode[node.id];
                    //console.log(rootNodeWidthSinge);
                    const parentLeft = rootNodeWidthSinge[parentId].left;
                    const nodeWidthSinge = grandchildrenNum[node.id] * this.nodeWidth + (grandchildrenNum[node.id] - 1) * this.nodeDistanceX;
                    rootNodeWidthSinge[node.id] = {};
                    const nodeSinge = rootNodeWidthSinge[node.id];
                    // 记录节点空间的x 与宽度
                    nodeSinge.left = parentLeft;
                    nodeSinge.width = nodeWidthSinge;
                    // 在节点空间内居中
                    node.left = parentLeft + (nodeWidthSinge - this.nodeWidth) / 2 ;
                    node.top = nodeY;
                    // 动态改变父节点起始位置
                    rootNodeWidthSinge[parentId].left = parentLeft + nodeWidthSinge + this.nodeDistanceX;
                });
            }
        })
    }
}
export default AutoNode;