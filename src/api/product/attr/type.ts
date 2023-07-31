export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface CategoryObj {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}

export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[]
}

// 属性值的ts对象,当我们需要新增属性值时其没有id与对应的属性id
export interface AttrValue {
  id?: number
  valueName: string
  attrId?: number
  // 这个是用来控制显示输入框还是查看div的
  show?: boolean
}
//
export type AttrValueList = AttrValue[]

// categoryId一开始可能为空
export interface Attr {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValueList
  // sku里面用的下拉选中的属性值id存储位置
  attrValueId?: number
}
export interface AttrResponseData extends ResponseData {
  data: Attr[]
}
/*
{
  "code": 200,
  "message": "成功",
  "data": [
    {
      "id": 83,
      "attrName": "价格",
      "categoryId": 100,
      "categoryLevel": 3,
      "attrValueList": [
        {
          "id": 126,
          "valueName": "234",
          "attrId": 83
        },
        {
          "id": 123,
          "valueName": "123",
          "attrId": 83
        }
      ]
    },
    {
      "id": 84,
      "attrName": "价格",
      "categoryId": 100,
      "categoryLevel": 3,
      "attrValueList": [
        {
          "id": 125,
          "valueName": "123",
          "attrId": 84
        },
        {
          "id": 128,
          "valueName": "234",
          "attrId": 84
        }
      ]
    },
    {
      "id": 85,
      "attrName": "价格",
      "categoryId": 100,
      "categoryLevel": 3,
      "attrValueList": [
        {
          "id": 124,
          "valueName": "123",
          "attrId": 85
        }
      ]
    },
    {
      "id": 984,
      "attrName": "111",
      "categoryId": 100,
      "categoryLevel": 3,
      "attrValueList": [
        {
          "id": 2379,
          "valueName": "2222",
          "attrId": 984
        }
      ]
    },
    {
      "id": 986,
      "attrName": "嗡嗡嗡",
      "categoryId": 100,
      "categoryLevel": 3,
      "attrValueList": [
        {
          "id": 2381,
          "valueName": "问问",
          "attrId": 986
        }
      ]
    },
    {
      "id": 987,
      "attrName": "温热微软",
      "categoryId": 100,
      "categoryLevel": 3,
      "attrValueList": [
        {
          "id": 2382,
          "valueName": "温热",
          "attrId": 987
        }
      ]
    },
    {
      "id": 988,
      "attrName": "二二",
      "categoryId": 100,
      "categoryLevel": 3,
      "attrValueList": [
        {
          "id": 2383,
          "valueName": "1211111",
          "attrId": 988
        }
      ]
    },
    {
      "id": 1650,
      "attrName": "嗡嗡嗡",
      "categoryId": 100,
      "categoryLevel": 3,
      "attrValueList": [
        {
          "id": 3704,
          "valueName": "问问盼盼热舞人温热微软",
          "attrId": 1650
        }
      ]
    },
    {
      "id": 2673,
      "attrName": "燃气",
      "categoryId": 100,
      "categoryLevel": 3,
      "attrValueList": [
        {
          "id": 8326,
          "valueName": "烧的快",
          "attrId": 2673
        },
        {
          "id": 8328,
          "valueName": "9999999",
          "attrId": 2673
        },
        {
          "id": 8325,
          "valueName": "烧的猛",
          "attrId": 2673
        },
        {
          "id": 8327,
          "valueName": "能烧的很",
          "attrId": 2673
        }
      ]
    },
    {
      "id": 3285,
      "attrName": "",
      "categoryId": 100,
      "categoryLevel": 3,
      "attrValueList": [
        {
          "id": 7395,
          "valueName": "刘佳爱真的好帅",
          "attrId": 3285
        }
      ]
    }
  ],
  "ok": true
}
*/
