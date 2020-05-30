import request from '@/utils/request'
// 登录

export function login(data) {
    return request({
        url: '/api/user/login',
        method: 'post',
        data: data,
        transformRequest: [
            (data) => {
                let ret = ''
                for (let it in data) {
                ret +=
                    encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }
        ],
    })
}
