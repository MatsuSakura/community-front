import request from '@/utils/request'
import http from '@/utils/http'
import { getUserId } from '@/utils/auth'
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
  console.log(parm);
  return await http.post("/api/user/login",parm)
}

export async function getInfo() {
  let parm={
    userId:getUserId()
  }
  return await http.get("/api/user/getInfo",parm)
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
