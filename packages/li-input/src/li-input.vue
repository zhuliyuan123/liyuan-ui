<template>
<div class="li-input">
    <input type="text"
        :value="currentValue"
        @input="handleInput"
        @blur="handleBlur"
        class="li-input__inner"
    >
</div>
</template>

<script>
import Emitter from '../../../uilts/emitter'
export default {
    name:'liInput',
    mixins:[ Emitter ],
    props:{
        value:{
            type: String,
            default: ''
        }
    },
    data(){
        return{
            currentValue:this.value
        }
    },
    watch:{
        value(val){
            this.currentValue = val;
        }
    },
    methods:{
        handleInput(event){
            const value = event.target.value;
            this.currentValue = value;
            this.$emit('input', value);
            this.dispatch('liFormItem', 'on-form-change', value);
        },
        handleBlur(){
            this.dispatch('liFormItem', 'on-form-blur', this.currentValue);
        }
    }
}
</script>
<style lang="scss" scoped>
.li-input{
    width: 180px;
    font-size: 14px;
    display: inline-block;
    .li-input__inner{
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: none;
        padding: 0 15px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 100%;
    }
}

</style>