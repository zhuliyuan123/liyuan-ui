<template>
<div class="li-form-item">
    <label v-if="label">{{label}}</label>
    <div>
        <slot></slot>
    </div>
</div>
</template>

<script>
import Emitter from '../../../uilts/emitter'

export default {
    name:'liFormItem',
    mixins:[ Emitter ],
    inject: ['form'],
    props:{
        label:{
            type:String,
            default:''
        },
        prop:{
            type:String
        }
    },
    data(){
        return{
            validateState:'',  // 校验状态
            validateMessage:'', // 检验不通过的提示信息
        }
    },
    computed:{
        fieldValue(){
            return this.form.model[this.prop]
        }
    },
    mounted(){
        if(this.prop){
            this.dispatch('liForm','on-form-item-add',this)
        }
    },
    beforeDestroy () {
        this.dispatch('iForm', 'on-form-item-remove', this);
    },
    methods:{
        getRules(){
            let formRules = this.form.rules;
            formRules = formRules ? formRules[this.prop] : []
            return formRules;
        },
        // 只支持 blur 和 change，所以过滤出符合要求的 rule 规则
        getFilteredRule(trigger){
            const rules = this.getRules();
            return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
        },
        setRules(){
            this.$on('on-form-blur', this.onFieldBlur);
            this.$on('on-form-change', this.onFieldChange);
        },
        validate(trigger,callback = function() {}){
            let rules = this.getFilteredRule(trigger);
            if(!rules || rules.length === 0){
                return true;
            }


        },
        onFieldBlur(val){
            this.validate('blur')
        }
    }
}
</script>

<style>

</style>