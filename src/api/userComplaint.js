import http from '@/utils/http'
//获取列表
export async function getListApi(parm){
    return await http.get("/api/userComplaint/list",parm)
}
export async function getChartListApi(parm){
    return await http.get("/api/userComplaint/Chartlist",parm)
}
//新增
export async function addApi(parm){
    return await http.post("/api/userComplaint/add",parm)
}
//新增人文关怀
export async function addHelpApi(parm){
    return await http.post("/api/userComplaint/addHelp",parm)
}
//编辑
export async function editComApi(parm){
    return await http.put("/api/userComplaint",parm)
}
//删除
export async function deleteApi(parm){
    return await http.delete("/api/userComplaint",parm)
}
//获取我的投诉列表
export async function getMyListApi(parm){
    return await http.get("/api/userComplaint/myList",parm)
}