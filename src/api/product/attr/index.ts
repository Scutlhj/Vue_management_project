import request from "@/utils/request";
import type { CategoryResponseData, AttrResponseData, Attr } from "./type";
enum API {
    CATEGORY1_URL = '/admin/product/getCategory1',
    CATEGORY2_URL = '/admin/product/getCategory2/',
    CATEGORY3_URL = '/admin/product/getCategory3/',
    ATTR_URL = '/admin/product/attrInfoList/',
    ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
    DELETEATTR_URL = '/admin/product/deleteAttr/'
}

export const reqGetCategory1 = () => request.get<any, CategoryResponseData>(API.CATEGORY1_URL)

export const reqGetCategory2 = (id: number) => request.get<any, CategoryResponseData>(API.CATEGORY2_URL + id)

export const reqGetCategory3 = (id: number) => request.get<any, CategoryResponseData>(API.CATEGORY3_URL + id)

// 获取对应分类下的属性与属性值
export const reqGetAttr = (c1id: number, c2id: number, c3id: number) => request.get<any, AttrResponseData>(API.ATTR_URL + `${c1id}/${c2id}/${c3id}`)

// 添加或修改某个Attr
export const reqAddOrUpdateAttr = (data: Attr) => request.post<any, any>(API.ADDORUPDATEATTR_URL, data)

// 删除某个Attr
export const reqDeleteAttr = (attrid: number) => request.delete<any, any>(API.DELETEATTR_URL + attrid)