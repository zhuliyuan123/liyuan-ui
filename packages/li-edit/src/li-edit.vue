<template>
<div class="li-edit">
    <div class="editable" id="edit" contenteditable="true">
        <p>百度EUX团队</p>
    </div>
</div>
  
</template>

<script>
export default {
    name:'liEdit',
    methods:{

    },
    created(){
        let selection = window.getSelection();
        console.log(selection)
        let range = selection.getRangeAt();
        console.log(range)
    }
}
</script>

<style lang="scss" scoped>
.li-edit{
    width: 750px;
    height: 600px;
    border: 1px solid black;
}

</style>