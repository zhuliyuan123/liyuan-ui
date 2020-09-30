import liListItem from './src/liFormItem.vue'

liListItem.install = function(Vue){
    Vue.component(liListItem.name,liListItem)
}
export default liListItem