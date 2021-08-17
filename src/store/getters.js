export default {
    jsPlumbInstance: state => state.flow.jsPlumbInstance,
    flowNodeLine: state => state.flow.flowNodeLine,
    activeElement: state => state.flow.activeElement,
    isNeedSaveFlow: state => JSON.stringify(state.flow.formulaFlowNodeLineOld) !== JSON.stringify(state.flow.formulaFlowNodeLine),  // 是否需要保存流程图
    flowSize: state => state.flow.flowSize,
    efContainer: state => state.flow.efContainer,
    efContainerStartLeft: state => (2 * state.flow.flowSize.canvasWidth  - (state.flow.efContainer.clientWidth || 0)) / 2,
    efContainerStartTop: state => (2 * state.flow.flowSize.canvasHeight - (state.flow.efContainer.clientHeight || 0)) / 2,
}