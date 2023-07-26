interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

// 这个只是初步展示,详细的展示还会有下面两个,需要另外请求,冗余太多了这个接口,纯恶心人
export interface SpuData {
    // 可以没有ID，没有即为添加
    id?: number | string,
    // SPU名称(必须有)
    spuName: string,
    // SPU描述(必须有)
    description: string,
    // 3级分类ID(必须有)
    category3Id: number | string,
    // 品牌id(必须有)
    tmId: number | string,
    // spu销售属性列表
    spuSaleAttrList: null | SpuSaleAttr[],
    // spu图片信息(可以为空)
    spuImageList: null | SpuImage[]
}
export type SpuRecords = SpuData[]

export interface SpuResponseData extends ResponseData {
    data: {
        records: SpuRecords,
        total: number,
        size: number,
        current: number,
        searchCount: boolean,
        pages: number
    }
}
// 品牌ts类型
export interface Trademark {
    id: number,
    tmName: string,
    logoUrl: string
}
// 请求所有品牌返回的ts类型
export interface TrademarkResponseData extends ResponseData {
    data: Trademark[]
}
// 请求spu图片的ts类型
export interface SpuImage {
    id?: number,
    spuId?: number,
    imgName?: string,
    imgUrl?: string,
    name?: string,
    url?: string
}
export interface SpuImageResponseData extends ResponseData {
    data: SpuImage[]
}

// 请求某一个spu下的销售属性值类型
export interface SpuSaleAttrValue {
    id?: number,
    spuId?: number,
    // 这个指明其是哪个属性的属性值
    baseSaleAttrId: number,
    // 属性值
    saleAttrValueName: string,
    saleAttrName?: string,
    isChecked?: null
}
export type SpuSaleAttrValueList = SpuSaleAttrValue[]
// 某个销售属性的类型
export interface SpuSaleAttr {
    id?: number,
    // spu对应id
    spuId?: number,
    // 其在项目全局定义的ID
    baseSaleAttrId: number,
    saleAttrName: string,
    // 用来控制输入框的显示与否,true展示输入框,false展示添加按钮
    flag?: boolean,
    // 暂存这个属性的属性值的地方,给输入框做v-model的,可以存id或者name
    spuSaleAttrValue?: string,
    spuSaleAttrValueList: SpuSaleAttrValueList
}
// 请求spu的所有销售属性
export interface SpuSaleAttrsResponseData extends ResponseData {
    data: SpuSaleAttr[]
}

// 全部的SPU可拥有的销售属性
export interface SaleAttrObj {
    id: number,
    name: string
}
export interface SaleAttrResponseData extends ResponseData {
    data: SaleAttrObj[]
}

interface SkuAttrValue {
    attrId: number,
    valueId: number|string,
}
interface SkuSaleAttrValue {
    saleAttrId: number,
    saleAttrValueId: number|string,
}
// 添加sku需要收集的数据
export interface SkuData {
    // 三级分类id
    category3Id: number,
    // 对应spu的id
    spuId: number,
    // 对应品牌id
    tmId: number,
    // sku名称
    skuName: string,
    // sku介绍
    skuDesc: string,
    // 价格
    price: number|string,
    // 重量
    weight: number|string,
    // 使用的图片
    skuDefaultImg: string,
    // sku的平台属性
    skuAttrValueList: SkuAttrValue[],
    // sku销售属性
    skuSaleAttrValueList: SkuSaleAttrValue[]
}
// 查询sku的response类型
export interface SkuResponseData extends ResponseData{
    data:SkuData[]
}