import liLazy from  './src/li-lazy.vue'

liLazy.install = function(Vue){
    Vue.componet(liLazy.name,liLazy)
}

export default liLazy;