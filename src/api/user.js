import request from '@/utils/request'
import http from '@/utils/http'
//获取员工列表
export async function getUserListApi(param){
  return await http.get("/api/user/list",param)
}

//新增员工
export async function addUserApi(parm){
  return await http.post("/api/user",parm)
}

//编辑员工
export async function editUserApi(parm){
  return await http.put("/api/user",parm)
}
//删除员工
export async function deleteUserApi(parm){
  return await http.delete(parm)
}

//员工登录
export async function login(parm){
  return await http.post("/api/user/login",parm)
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
