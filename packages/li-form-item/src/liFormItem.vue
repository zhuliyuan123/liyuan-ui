<template>
<div class="li-form-item">
    <label v-if="label" :class="{ 'i-form-item-label-required': isRequired }">{{label}}</label>
    <div>
        <slot></slot>
        <div v-if="validateState === 'error'" class="i-form-item-message">{{ validateMessage }}</div>
    </div>
</div>
</template>

<script>
import Emitter from '../../../uilts/emitter'
import AsyncValidator from 'async-validator';

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
            isRequired:false //  是否为必须
        }
    },
    computed:{
        fieldValue(){
            // 保持model中prop属性始终保持最新的
            return this.form.model[this.prop]
        }
    },
    mounted(){  
        if(this.prop){
            this.dispatch('liForm','on-form-item-add',this)
            this.setRules();
        }
    },
    beforeDestroy () {
        this.dispatch('iForm', 'on-form-item-remove', this);
    },
    methods:{
        getRules(){
            // prop属性的rules
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
            let rules = this.getRules();
            if (rules.length) {
                rules.every((rule) => {
                    // 如果当前校验规则中有必填项，则标记出来
                    this.isRequired = rule.required;
                });
            }
        },
        validate(trigger,callback = function() {}){
            let rules = this.getFilteredRule(trigger);

            if(!rules || rules.length === 0){
                // 没有校验规则直接返回true
                return true;
            }

            this.validateState = 'validating';


            // async-validator 库的调用方法

            let descriptor = {};
            descriptor[this.prop] = rules;
            const validator = new AsyncValidator(descriptor);
            let model = {};
            model[this.prop] = this.fieldValue;

            validator.validate(model,{firstFields:true}, errors => {
                // 1.设置了当前检验的状态validateState 和 不通过的信息 validateMessage
                // 2.将 validateMessage 通过回调 callback 传递给调用者
                this.validateState = !errors ? 'success' : 'error';
                this.validateMessage = errors ? errors[0].message : '';
                callback(this.validateMessage); 
            })
        },
        onFieldBlur(){
            this.validate('blur')
        },
        onFieldChange(){
            this.validate('change')
        }
    }
}
</script>

<style>
  .i-form-item-label-required:before {
    content: '*';
    color: red;
  }
  .i-form-item-message {
    color: red;
  }
</style>>