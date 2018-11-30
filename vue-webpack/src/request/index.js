// import axios from 'axios';
// import env from '../../build/env';
// const ajaxUrl = ''

// let api = axios.create({
//     baseURL: ajaxUrl,
//     timeout: 30000
// });

// api.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
// api.interceptors.request.use(config => {
//     config.headers["uid"] = "123";
//     return config
// }, error => {
//     console.log(error)
//     Promise.reject(error)
// })
// //返回结果处理
// api.interceptors.response.use(
//     response => {
//         const res = response.data;
//         return res;
//     },
//     error => {
//         console.log('err' + error, error.message);
//         return Promise.reject(error)
//     })
// export default api;
import Axios from 'axios';
import { Message } from 'iview';
import { API_HOST } from '@config';
class httpRequest {
    constructor () {
        this.options = {
            method: '',
            url: ''
        };
        // 存储请求队列
        this.queue = {};
    }

    // 请求拦截
    interceptors (instance, url) {

        // 添加请求拦截器
        instance.interceptors.request.use(config => {
            //token验证等
            return config;
        }, error => {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use((res) => {
            if(res.data.data.err===0){
                return Promise.resolve(res.data.data);
            }else{
                Message.error(res.data.data.msg);
                return Promise.reject(res.data);
            }
        }, (error) => {
            Message.error('response错误 ',error);
            return Promise.reject(error);
        });
    }

    // 创建实例
    create () {
        let conf = {
            baseURL: API_HOST,
            timeout: 2000,
            headers: {
                'token': 'felix-test',
                'Content-Type': 'application/json; charset=utf-8',
                'X-URL-PATH': location.pathname
            }
        };
        return Axios.create(conf);
    }

    // 请求实例
    request (options) {
        let instance = this.create();
        this.interceptors(instance, options.url);
        options = Object.assign({}, options);
        this.queue[options.url] = instance;
        return instance(options);
    }
}
export default new httpRequest();
