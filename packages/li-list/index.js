import liList from './src/li-list.vue'

liList.install = function(Vue){
    Vue.component(liList.name,liList)
}

export default liList