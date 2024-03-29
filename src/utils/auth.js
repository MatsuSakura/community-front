import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
//设置用户id的key
const userIdKey = 'userId';
//保存用户id
export function setUserId(value){
  return Cookies.set(userIdKey,value);
}
//获取用户id
export function getUserId(){
  return Cookies.get(userIdKey)
}
//清空用户id
export function removeUserId(){
  return Cookies.remove(userIdKey);
}
//清空sessionStorage
export function clearSession(){
  return sessionStorage.clear();
}