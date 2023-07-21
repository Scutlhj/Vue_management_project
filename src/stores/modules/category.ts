import { defineStore } from 'pinia'
import { reqGetCategory1, reqGetCategory2, reqGetCategory3 } from '@/api/product/attr'
import type { CategoryResponseData } from '@/api/product/attr/type'
import type { CategoryState } from './types/type'
let useCategoryStore = defineStore('CategoryStore', {
    state: ():CategoryState => {
        return {
            c1Arr: [],
            c1SelectedId: '',
            c2Arr:[],
            c2SelectedId:'',
            c3Arr:[],
            c3SelectedId:''
        }
    },
    actions: {
        async getCategory1(){
            let result:CategoryResponseData = await reqGetCategory1()
            if(result.code == 200){
                this.c1Arr = result.data
                return Promise.resolve('获取一级分类成功')
            }else{
                return Promise.reject('获取一级分类失败')
            }
        },
        async getCategory2(){
            let result:CategoryResponseData = await reqGetCategory2(this.c1SelectedId as number)
            if(result.code == 200){
                this.c2Arr = result.data
                return Promise.resolve('获取二级分类成功')
            }else{
                return Promise.reject('获取二级分类失败')
            }
        },
        async getCategory3(){
            let result:CategoryResponseData = await reqGetCategory3(this.c2SelectedId as number)
            if(result.code == 200){
                this.c3Arr = result.data
                return Promise.resolve('获取三级分类成功')
            }else{
                return Promise.reject('获取三级分类失败')
            }
        }
    },
    getters: {

    }
})
export default useCategoryStore