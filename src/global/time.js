export default class Time {
    constructor(time) {
        this.date = new Date(parseInt(time)) // time为整型或string
        this.Y = this.date.getFullYear() // 年
        this.M = this.date.getMonth() + 1 // 月
        this.D = this.date.getDate() // 日
        this.h = this.date.getHours() // 小时
        this.m = this.date.getMinutes() // 分钟
        this.s = this.date.getSeconds() // 秒
        this.w = this.date.getDay() // 星期几
        this.timeType = {
            'Y': this.Y,
            'M': this.M < 10 ? '0' + this.M : this.M,
            'D': this.D < 10 ? '0' + this.D : this.D,
            'h': this.h < 10 ? '0' + this.h : this.h,
            'm': this.m < 10 ? '0' + this.m : this.m,
            's': this.s < 10 ? '0' + this.s : this.s,
            'w': this.w
        }
    }
    getTime(type = 'Y-M-D h:m:s') {
        const array = type.split('')
        let time = ''
        array.forEach((val, index, arr) => {
            time += this.timeType[val] === undefined ? val : this.timeType[val]
        })
        return time
    }

    getDay() { /** 获取某天 初末 时间戳 */
        // 那天时间戳
    const D = this.getTime('Y-M-D')

        // 今天00：00
        const start = Number(Date.parse(new Date(D))) - (8 * 60 * 60 * 1000)

        // 明天00：00
        const end = start + (24 * 60 * 60 * 1000)

        return { start, end }
    }

    getWeek() { /** 获取某个星期 初末 时间戳 */
        // 给的时间是星期几
    const nowWeek = Number(this.getTime('w'))

        // 时间戳那天时间戳
        const D = this.getTime('Y-M-D')

        // 当前星期一时间戳
        const start = Number(Date.parse(new Date(D))) - ((nowWeek - 1) * 24 * 60 * 60 * 1000) - (8 * 60 * 60 * 1000)

        // 下个星期一时间戳
        const end = Number(Date.parse(new Date(D))) + ((7 - nowWeek + 1) * 24 * 60 * 60 * 1000) - (8 * 60 * 60 * 1000)

        return { start, end }
    }

    getMonth() { /** 获取某个月 初末 时间戳 */
    let Y = this.getTime('Y')
        let M = this.getTime('M')

        // 当前月时间戳
        const start = Number(Date.parse(new Date(this.getTime('Y-M')))) - (8 * 60 * 60 * 1000)

        // 下个月时间戳
        if (M == 12) { Y++; M = 1 } else { M++ }
        const end = Date.parse(new Date(Y + '-' + M))

        return { start, end }
    }

    getYear() { /** 获取某个年 初末 时间戳 */
    const Y = this.getTime('Y')
        const nextY = (Number(Y) + 1) + ''

        // 当前年时间戳
        const start = Number(Date.parse(new Date(this.getTime('Y')))) - (8 * 60 * 60 * 1000)

        // 下个年时间戳
        const end = Date.parse(new Date(nextY)) - (8 * 60 * 60 * 1000)

        return { start, end }
    }
}
