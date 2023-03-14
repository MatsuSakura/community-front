import http from '@/utils/http'
//获取列表
export async function getListApi(parm){
    return http.get("/api/houseUnit/list",parm)
}
