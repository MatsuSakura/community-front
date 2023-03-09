import http from '@/utils/http'
//获取角色列表
export async function getRoleListApi(parm){
    return await http.get("/api/role/list",parm)
}
//新增角色
export async function addRoleApi(parm){
    return await http.post("/api/role",parm)
}
//编辑角色
export async function editRoleApi(parm){
    return await http.put("/api/role",parm)
}
//删除角色
export async function deleteRoleApi(parm){
    return await http.delete("/api/role",parm)
}