interface ResponseData {
  code: number
  message: string
  ok: boolean
}
interface SkuAttrValue {
  attrId: number
  attrName: string
  id: number
  skuId: number
  valueId: number
  valueName: string
}
interface SkuSaleAttrValue {
  id: number
  saleAttrId: number
  saleAttrName: string
  saleAttrValueId: number
  saleAttrValueName: string
  skuId: number
  spuId: number
}
interface skuImageData {
  id: number
  imgName: string
  imgUrl: string
  skuId: number
  spuImgId: number
}
export interface SkuData {
  // 三级分类id
  category3Id: number
  // 对应spu的id
  spuId: number
  // 对应品牌id
  tmId: number
  // sku名称
  skuName: string
  // sku介绍
  skuDesc: string
  // 价格
  price: number | string
  // 重量
  weight: number | string
  // sku的图片集合
  skuImageList: skuImageData[]
  // 使用的图片
  skuDefaultImg: string
  // sku的id
  id?: number
  // 是否在售1在售,0不在售
  isSale?: number
  // sku的平台属性
  skuAttrValueList: SkuAttrValue[]
  // sku销售属性
  skuSaleAttrValueList: SkuSaleAttrValue[]
}
export interface SkuPagerResponseData extends ResponseData {
  data: {
    records: SkuData[]
    total: number
    size: number
    pages: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
  }
}

export interface SkuInfoResponseData extends ResponseData {
  data: SkuData
}
