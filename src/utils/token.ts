// 封装本地存储的方法
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}
export const DELETE_TOKEN = () =>{
  localStorage.removeItem('TOKEN')
}
