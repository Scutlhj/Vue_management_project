// SKU相应请求方法
import request from "@/utils/request";
import { SkuInfoResponseData, SkuPagerResponseData } from "./type";
enum API {
    // 获取当前页码与数量的SKU数据
    GETSKU_URL = '/admin/product/list/',
    // 上架SKU
    ONSALESKU_URL = '/admin/product/onSale/',
    // 下架SKU
    OFFSALESKU_URL = '/admin/product/cancelSale/',
    // 获得具体某个SKU的信息
    GETSKUINFO_URL = '/admin/product/getSkuInfo/',
    // 删除某一个SKU
    DELETESKU_URL = '/admin/product/deleteSku/'
}
export const reqGetPagerSku = (page: number, limit: number) => request.get<any, SkuPagerResponseData>(API.GETSKU_URL + `${page}/${limit}`)

export const reqOnSaleSku = (skuId: number) => request.get<any, any>(API.ONSALESKU_URL + skuId)

export const reqOffSaleSku = (skuId: number) => request.get<any, any>(API.OFFSALESKU_URL + skuId)

export const reqGetSkuInfo = (skuId: number) => request.get<any, SkuInfoResponseData>(API.GETSKUINFO_URL + skuId) 

export const reqDeleteSku = (skuId: number) => request.delete<any, any>(API.DELETESKU_URL + skuId) 
