// 定义折叠数据的仓库，方便共享
import { defineStore } from 'pinia'
const useLayoutSettingStore = defineStore('LayoutSettingStore', {
  state: () => {
    return {
      fold: false,
      // 用来检测刷新
      refresh: false,
    }
  },
  actions: {
    changeFold() {
      this.fold = !this.fold
    },
    changeRefresh() {
      this.refresh = !this.refresh
    },
  },
})
export default useLayoutSettingStore
