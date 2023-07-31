import request from '@/utils/request'
import type {
  SpuData,
  SpuResponseData,
  TrademarkResponseData,
  SpuImageResponseData,
  SpuSaleAttrsResponseData,
  SaleAttrResponseData,
  SkuData,
  SkuResponseData,
} from './type'
enum API {
  // 获取SPU数据
  GETSPU_URL = '/admin/product/',
  // 获取全部品牌数据
  GETALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  // 获取图片
  GETIMAGE_URL = '/admin/product/spuImageList/',
  // 获取SPU全部已有的销售属性接口
  GETSALEATTR_URL = '/admin/product/spuSaleAttrList/',
  // 获取整个项目全部可拥有的销售属性
  GETALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
  // 新增SPU的接口
  POSTADDSPU_URL = '/admin/product/saveSpuInfo',
  // 修改SPU的接口
  POSTUPDATESPU_URL = '/admin/product/updateSpuInfo',
  // 新增sku的接口
  POSTADDSKU_URL = '/admin/product/saveSkuInfo',
  // 查询spu下的sku的接口
  GETSKU_URL = '/admin/product/findBySpuId/',
  // 删除SPU的接口
  DELETESPU_URL = '/admin/product/deleteSpu/',
}
// 获取SPU大概信息
export const reqGetSpu = (
  page: number,
  limit: number,
  category3Id: string | number,
) =>
  request.get<any, SpuResponseData>(
    API.GETSPU_URL + `${page}/${limit}?category3Id=${category3Id}`,
  )
// 获取SPU品牌
export const reqGetTrademarks = () =>
  request.get<any, TrademarkResponseData>(API.GETALLTRADEMARK_URL)
// 获取SPU图片
export const reqGetSpuImage = (spuId: number) =>
  request.get<any, SpuImageResponseData>(API.GETIMAGE_URL + spuId)
// 获取SPU的已经拥有的销售属性
export const reqGetSaleAttr = (spuId: number) =>
  request.get<any, SpuSaleAttrsResponseData>(API.GETSALEATTR_URL + spuId)
// 获取能使用的所有销售属性
export const reqGetAllSaleAttr = () =>
  request.get<any, SaleAttrResponseData>(API.GETALLSALEATTR_URL)
// 修改或新增SPU
export const reqPostAddOrUpdateSpu = (data: SpuData) => {
  if (data.id) {
    return request.post<any, any>(API.POSTUPDATESPU_URL, data)
  } else {
    return request.post<any, any>(API.POSTADDSPU_URL, data)
  }
}
// 新增SKU
export const reqPostAddSku = (data: SkuData) =>
  request.post<any, any>(API.POSTADDSKU_URL, data)
// 查询SKU
export const reqGetSku = (spuId: number) =>
  request.get<any, SkuResponseData>(API.GETSKU_URL + spuId)
// 删除SPU
export const reqDeleteSpu = (spuId: number) =>
  request.get<any, any>(API.DELETESPU_URL + spuId)
