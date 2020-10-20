import liVirtualList from './src/li-virtual-list.vue'

liVirtualList.install = function(Vue){
    Vue.component(liVirtualList.name,liVirtualList)
}

export default liVirtualList