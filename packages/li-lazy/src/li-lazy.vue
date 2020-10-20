<template>
<div :style="{width: '300px', height: '300px'}">
    <img class="lazy-img" :data-src="src" v-lazyLoad="src" :style="{width: '300px', height: '300px'}" />
</div>
</template>

<script>
export default {
    name:'li-lazy',
    props:{
        src:String
    },
    directives:{
        lazyLoad:{
            bind: function(el){
                // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
                el.onerror = () => {
                    el.src = 'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/532f0ad2675942efb12ab7f4efa7885a~tplv-k3u1fbpfcp-zoom-1.image'
                }
                if(!window.observer){
                    window.observer = new IntersectionObserver(entries =>{
                        entries.forEach(entry =>{
                            let imgLazy = entry.target;
                            if(entry.isIntersecting){
                                const src = imgLazy.getAttribute('data-src')
                                imgLazy.src = src;
                                imgLazy.style.opacity = 1
                                imgLazy.style.display = 'block'
                                window.observer.unobserve(imgLazy)
                            }
                        })
                    })
                }
            },
            inserted: function(el){
                window.observer.observe(el)
            },
            componentUpdated: function(el,binding){
                if (binding.value === binding.oldValue) {
                    return false
                }
                window.observer.observe(el)
            },
            unbind: function(el){
                window.observer.unobserve(el)
            }
        }
    }

}
</script>
