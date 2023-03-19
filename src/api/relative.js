import http from '@/utils/http'
//新增
export async function addRelativeApi(parm){
    return await http.post("/api/relative",parm);
}

//获取
export async function getRelativeListApi(){
    return await http.get("/api/relative/list",null);
}

//获取上级
export async function getParentApi(){
    return await http.get("/api/relative/parent")
}
//编辑
export async function editRelativeApi(parm){
    return await http.put("/api/relative",parm)
}
//删除
export async function deleteRelativeApi(parm){
    return await http.delete("/api/relative",parm)
}