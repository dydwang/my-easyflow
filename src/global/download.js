/**
 * @param fileName{String} 文件名
 * @param path{String} 下载路径
 * */
export default (fileName, path) => {
    const link = document.createElement('a')
    // 对下载的文件命名
    link.href = path
    link.download = `${fileName || path}`
    link.style = 'display:none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}
