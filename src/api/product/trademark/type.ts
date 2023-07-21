interface ResponseData {
  code: number
  message: string
  ok: boolean
}
// 已有品牌ts类型
export interface TrademarkData {
  id?: number
  tmName: string
  logoUrl: string
}
// interface可以定义一个类的实例的结构，而type不能。
// interface可以支持多继承，而type不行。
// type可以定义更复杂的类型，包括联合类型、交叉类型和元组类型，而interface不能
// 包含全部品牌的数据类型
export type Records = TrademarkData[]

export interface TrademarkResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}
