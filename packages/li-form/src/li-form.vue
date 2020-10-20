<template>
  <div class="li-form">
    <form>
      <slot></slot>
    </form>
  </div>
</template>

<script>
export default {
  name: "liForm",
  props: {
    model: {
      type: Object,
    },
    rules: {
      type: Object,
    },
  },
  provide() {
    return {
      form: this,
    };
  },
  data() {
    return {
      fields: [] // 就是用来缓存所有 FormItem 实例
    };
  },
  methods:{
    // 全部检验数据
    validate(callback){
      return new Promise(resolve => {
        let valid = true;
        let count = 0;
        this.fields.forEach(field => {
          field.validate('',errors =>{
            if(errors){
              valid = false;
            }
            if(++count === this.fields.length){
              // 全部完成
              resolve(valid)
              if(typeof callback === 'function'){
                callback(valid)
              }
            }
          })
        });
      })
    }
  },
  created() {
    this.$on("on-form-item-add", (field) => {
      if (field) this.fields.push(field);
    });
    this.$on("on-form-item-remove", (field) => {
      if (field.prop) this.fields.splice(this.fields.indexOf(field), 1);
    });
  },
};
</script>
