import http from '@/utils/http'
//新增菜单
export async function addMenuApi(parm){
    return await http.post("/api/menu",parm);
}

//获取菜单列表
export async function getMenuListApi(){
    return await http.get("/api/menu/list",null);
}

//获取上级部门
export async function getParentApi(){
    return await http.get("/api/menu/parent")
}