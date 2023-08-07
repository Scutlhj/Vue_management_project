import useUserStore from "@/stores/modules/user"
import { DirectiveBinding } from 'vue';
import pinia from "@/stores";
let userStore = useUserStore(pinia)
export default (app: any) => {
    app.directive('has', {
        // 调用该自定义指令的组件挂载时执行的函数
        mounted(el: HTMLElement, binding: DirectiveBinding) {
            if (!userStore.buttons.includes(binding.value)) {
                el.parentNode?.removeChild(el)
            }
        }
    })
}