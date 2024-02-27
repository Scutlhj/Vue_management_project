const validatorCode = (rule: any, value: string, callback: any) => {
  if (/^[a-zA-Z0-9.]+$/.test(value) && value.length > 2) {
    callback()
  } else {
    callback(new Error('权限值只能含有数字、字母与句点,且长度大于2'))
  }
}
const validatorRoleName = (rule: any, value: string, callback: any) => {
  if (value.trim().length < 2) {
    callback(new Error('职位名称长度需要大于2位'))
  } else {
    callback()
  }
}
const validatorUserName = (rule: any, value: string, callback: any) => {
  if (/^[a-zA-Z][a-zA-Z0-9]{4,9}$/.test(value)) {
    callback()
  } else {
    callback(new Error('用户名必须以字母开头，长度在五到十位且只含有字母数字'))
  }
}
const validatorName = (rule: any, value: string, callback: any) => {
  if (value.trim().length < 2) {
    callback(new Error('用户名称长度必须大于1'))
  } else {
    callback()
  }
}
const validatorSkuName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('SKU名称需要大于1位'))
  }
}
const validatorPriceAndWeight = (rule: any, value: any, callback: any) => {
  const checkExp = /^[1-9]\d*$/
  if (checkExp.test(value)) {
    callback()
  } else {
    callback(new Error('输入的值必须为正整数'))
  }
}
const validatorSpuName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('SPU名称需要大于1位'))
  }
}
const validatorTmName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('品牌名称需要大于1位'))
  }
}
const validatorLogoUrl = (rule: any, value: any, callback: any) => {
  if (value) {
    callback()
  } else {
    callback(new Error('需要上传图片'))
  }
}
export {
  validatorCode,
  validatorRoleName,
  validatorUserName,
  validatorName,
  validatorSkuName,
  validatorPriceAndWeight,
  validatorSpuName,
  validatorTmName,
  validatorLogoUrl,
}
