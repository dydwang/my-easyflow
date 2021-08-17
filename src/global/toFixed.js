/** 精确小数 */
/**
 * @param num{Number} 需要转换的数字
 * @param digit{Number} 精确到小数点第几位
 * @param char{String} 转换后加上的符号
 * */
export default function (num, digit, char) {
    num = Number(num)
    if(typeof num !== 'number') return false;
    else if(num === 0) return 0;
    else return num.toFixed(digit) + (char || 0);
}