<template>
<div>
    <div ref="liVirtualList" class="infinite-list-container" @scroll="scrollEvent($event)">
        <!-- infinite-list-container 为可视区域的容器 -->
        <div class="infinite-list-phantom" :style="{ height: listHeight + 'px' }"></div>
        <!-- infinite-list-phantom 为容器内的占位，高度为总列表高度，用于形成滚动条 -->
        <div class="infinite-list" :style="{ transform: getTransform }">
            <div ref="li-virtual-list-item"
                class="infinite-list-item"
                v-for="item in visibleData"
                :key="item.id"
                :style="{ height: itemSize + 'px',lineHeight: itemSize + 'px'}"
            >
                {{item}}
            </div>
        </div>
        <!-- infinite-list 为列表项的渲染区域 -->
    </div>
</div>
</template>

<script>
export default {
    name:'li-virtual-list',
    props:{
        listData:{
            type:Array,
            default:()=>[]
        },
        itemSize:{
            type:Number,
            default:200
        }
    },
    computed:{
        // 列表总高度
        listHeight(){
            return this.listData.length * this.itemSize
        },
        // 可显示的列表项数
        visibleCount(){
            return Math.ceil(this.screenHeight/this.itemSize)
        },
        // 真实现实列表数据
        visibleData(){
            return this.listData.slice(this.start, Math.min(this.end,this.listData.length))
        },
        getTransform(){
            return `translate3d(0,${this.startOffset}px,0)`;
        },
        
    },
    data(){
        return{
            // 可显示区域高度
            screenHeight:0,
            // 偏移量
            startOffset:0,
            // 开始索引
            start:0,
            // 结束索引
            end:null,
        }
    },
    mounted(){
        this.screenHeight = this.$el.clientHeight;
        this.start = 0;
        this.end = this.visibleCount + this.start;
    },
    methods:{
        scrollEvent(){
            let scrollTop = this.$refs.liVirtualList.scrollTop;
            console.log(scrollTop)
            this.start = Math.floor(scrollTop / this.itemSize);
            this.end = this.start + this.visibleCount;
            // 此时的偏移量
            this.startOffset = scrollTop - (scrollTop % this.itemSize);
        }
    }

}   
</script>
<style lang="scss" scoped>
.infinite-list-container{
    height: inherit;
    overflow:auto;
    position: relative;
}
.infinite-list-phantom{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
}
.infinite-list-item{
    border: 1px solid black;
    font-size: 20px;
}
</style>