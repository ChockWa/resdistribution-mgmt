import {get,post} from './request';
//登陆
export const  login= (login)=>post('/api/post/user/login',login)
//上传
export const  upload=(upload)=>get('/api/get/upload',upload)

const wechat = {
    list (params) {
      return get('/wechat/list', params)
    },
    distribute (params) {
      return get('/wechat/distribute', params)
    },
    receive (params) {
      return get('/wechat/receive', params)
    },
    getImportLogs (params) {
      return get('/wechat/importLogs', params)
    }
  }
  
  const user = {
    login (params) {
      return post('/user/login', params)
    },
    loginMgmt (params) {
      return post('/user/loginMgmt', params)
    },
    sendSmsCode (params) {
      return post('/user/sendSmsCode', params)
    },
    authcheck(){
      return get('/user/authcheck', params)
    }
  }

  export default {
    wechat,
    user
  }