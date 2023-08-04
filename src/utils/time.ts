export const getTime = () => {
  let message = ''
  let hours = new Date().getHours()
  if (hours <= 9) {
    message = '早上'
  } else if (hours <= 12) {
    message = '上午'
  } else if (hours <= 14) {
    message = '中午'
  } else if (hours <= 18) {
    message = '下午'
  } else {
    message = '晚上'
  }
  return message
}
export const getCurrentTime = () => {
  // 获取当前北京时间
  const currentTime = new Date(
    new Date().getTime() +
      (new Date().getTimezoneOffset() / 60 + 8) * 3600 * 1000,
  )
  const year = currentTime.getFullYear()
  const month = String(currentTime.getMonth() + 1).padStart(2, '0')
  const day = String(currentTime.getDate()).padStart(2, '0')
  const hours = String(currentTime.getHours()).padStart(2, '0')
  const minutes = String(currentTime.getMinutes()).padStart(2, '0')
  const seconds = String(currentTime.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
