import pageTools from "@/components/pageTools"
import UploadExcel from "@/components/UploadExcel"

const components = [pageTools, UploadExcel]
export default {
    install(Vue) {
        components.forEach((component) => {
            Vue.component(component.name, component)
        })

    }
}