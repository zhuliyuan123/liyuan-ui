<template>
  <div id="app"> 
    <!-- <li-form ref="form" :model="form" :rules="ruleValidate">
      <li-form-item prop="name" label="姓名">
        <li-input v-model="form.name"></li-input>
      </li-form-item>
      <div @click="handleSubmit">555555</div>
    </li-form> -->
    <!-- <li-virtual-list
     :listData="list"
     class="list">
    </li-virtual-list> -->
    <li-lazy :src="item.src" v-for="(item, index) in imageList" :key="index"></li-lazy>
  </div>
</template>
<script>
export default {
	data () {
    return{
      list:[],
      form:{
        name:''
      },
      ruleValidate:{
        name:[
          {required: true, message:'用户名不能为空',trigger:'blur'}
        ]
      },
      imageList:[
        {
          src:
            'https://mnweb.mini1.cn/icon/logo-32x32.png'
        },
        {
          src:
            'https://mnweb.mini1.cn/icon/logo-32x32.png'
        },
        {
          src:
            'https://mnweb.mini1.cn/icon/logo-32x32.png'
        },
        {
          src:
            'https://mnweb.mini1.cn/icon/logo-32x32.png'
        },
        {
          src:
            'https://mnweb.mini1.cn/icon/logo-32x32.png'
        },
      ]
    }
  },
  methods:{
    handleSubmit(){
      // this.$refs.form.validate((valid)=>{
      //   console.log(valid)
      // })
    }
  },
  created(){
    for(let i = 0 ;i<100 ;i++){
      this.list[i] =i
    }
  }
}
</script>
<style>
html{
  height: 100%;
}
body{
  height: 100%;
  margin:0;
}
#app{
  height:100%;
}
.list{
  height: 800px;
  border: 1px solid black;
}
</style>
