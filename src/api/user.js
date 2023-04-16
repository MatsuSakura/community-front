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

//退出登录
export async function loginOutApi(){
  return await http.post("/api/user/loginOut",null)
}

//根据用户id查询角色id
export async function getRoleByUserIdApi(parm){
  return await http.get("/api/user/getRoleByUserId",parm);
}
//分配角色保存
export async function assignSaveApi(parm){
  return await http.post("/api/user/saveRole",parm)
}
export async function getMenuList(){
  return await http.get("/api/user/getMenuList")
}