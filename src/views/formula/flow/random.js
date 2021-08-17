export default function random(nodeNum, lineNum) {
    let data = {
        nodeList:[],
        lineList:[]
    }
    for(let i =0; i<nodeNum; i++){
        data.nodeList.push({
            id: i+'',
            name:i+'',
        })
    }
    for(let i =0; i<lineNum; i++){
        // 生成线  且不能自己连接自己
        let targetId = Math.floor(Math.random() * (nodeNum ));
        let x = Math.random();
        let sourceId
        if(x <0.5) {
            sourceId = Math.floor(Math.random() * ( targetId ));
        }else{
            sourceId = Math.floor(Math.random() * (nodeNum - targetId - 1 )  ) + targetId ;
        }
        // 不能自己连接自己
        // 不能是已存在的线条或相反线条
        // const isExist = () => data.lineList.some(line => {
        //     return (line.targetId === targetId && line.sourceId === sourceId)
        //         || (line.targetId === sourceId && line.targetId === sourceId)
        // })
        while(targetId === sourceId ) {
            targetId = Math.floor(Math.random() * (nodeNum ));
        }
        data.lineList.push({
            targetId: targetId+'',
            sourceId: sourceId+'',
        })
    }
    return data;
}