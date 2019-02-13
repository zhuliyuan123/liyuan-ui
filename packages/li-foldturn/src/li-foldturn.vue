<template>
    <div class="li-foldturn" id="pic">
      <span class="prev" @click="prev"></span>
      <span class="next" @click="next"></span>
      <ul>
        <li class="pic1"><div><slot></slot></div></li>
        <li class="pic2"><div><slot></slot></div></li>
        <li class="pic3"><div><slot></slot></div></li>
        <li class="pic4"><div><slot></slot></div></li>
        <li class="pic5"><div><slot></slot></div></li>  
      </ul>
    </div>  
</template>
<script>
export default {
    name:'liFoldturn',
    data(){
        return{
            arr:[],
        }
    },
    mounted(){
        this.loadAnimation();
    },
    methods:{
        getStyle(obj,name){
            if(obj.currentStyle){
                return obj.currentStyle[name];
            }
            else{
                return getComputedStyle(obj,false)[name];
            }
        },
        startMove(obj,json,fnEnd){
            clearInterval(obj.timer);
            obj.timer=setInterval(()=>{
              var bStop=true;
              for(var attr in json){	
                      var cur=0;
                      if(attr=='opacity'){
                          cur=Math.round(parseFloat(this.getStyle(obj,attr))*100);
                      }
                      else{
                          cur=parseInt(this.getStyle(obj,attr));
                      }
                      var  speed=(json[attr]-cur)/6;
                      speed=speed>0?Math.ceil(speed):Math.floor(speed);
                  
                      if(cur!=json[attr]) bStop=false;
                  
                      if(attr=='opacity'){
                          obj.style.filter='alpha(opacity:'+(cur+speed)+')';
                          obj.style.opacity=(cur+speed)/100;
                      }
                      else{
                          obj.style[attr]=cur+speed+'px';
                      }
              }       
              if(bStop){
                  clearInterval(obj.timer);
                  if(fnEnd) fnEnd();
              }        
            },30)  
        },
        loadAnimation(){
            var oPic=document.getElementById('pic');
            var oPrev=this.getByClass(oPic,'prev')[0];
            var oNext=this.getByClass(oPic,'next')[0];    
            var aLi=oPic.getElementsByTagName('li');        
            this.arr=[];          
            for(var i=0;i<aLi.length;i++){
                var oImg=aLi[i].getElementsByTagName('div')[0];    
                this.arr.push([parseInt(this.getStyle(aLi[i],'left')),parseInt(this.getStyle(aLi[i],'top')),
                this.getStyle(aLi[i],'zIndex'),parseInt(this.getStyle(aLi[i],'width')),parseFloat(this.getStyle(aLi[i],'opacity')*100),parseInt(this.getStyle(aLi[i],'height'))]);   
            }
        },
        getByClass(oParent,sClass) {
            var aResult=[];  
            var aEle=oParent.getElementsByTagName('*');                
            for(var i=0;i<aEle.length;i++){
              if(aEle[i].className==sClass){
                aResult.push(aEle[i]);
              }
            }
            return aResult;
        },
        prev(){
           this.arr.push(this.arr[0]);
           var oPic=document.getElementById('pic');
           var aLi=oPic.getElementsByTagName('li');
		       this.arr.shift();
		       for(var i=0;i<aLi.length;i++){
                    var oImg=aLi[i].getElementsByTagName('div')[0];	       	
                    aLi[i].style.zIndex=this.arr[i][2];
				    this.startMove(aLi[i],{left:this.arr[i][0],top:this.arr[i][1],opacity:this.arr[i][4]});
				    this.startMove(oImg,{width:this.arr[i][3],height:this.arr[i][5]});
             }
        },
        next(){
           this.arr.unshift(this.arr[this.arr.length-1]);
           var oPic=document.getElementById('pic');
           var aLi=oPic.getElementsByTagName('li');
	     	   this.arr.pop();
		       for(var i=0;i<aLi.length;i++){
              var oImg=aLi[i].getElementsByTagName('div')[0];	       	
              aLi[i].style.zIndex=this.arr[i][2];
			this.startMove(aLi[i],{left:this.arr[i][0],top:this.arr[i][1],opacity:this.arr[i][4]});
			this.startMove(oImg,{width:this.arr[i][3],height:this.arr[i][5]});
           }
        }
    }

}
</script>
<style lang="scss" scoped>
.li-foldturn {position:relative;overflow:hidden;height:700px;width:750px;z-index:2;margin:0 auto 100px;}
.li-foldturn ul{width:100%;height:100%;position:absolute;top:0;left:-10px;}
.li-foldturn ul li{position:absolute;list-style-type:none;}
.li-foldturn ul .pic1{top:160px;left:69px;z-index:2;}
.li-foldturn ul .pic2{top:120px;left:129px;z-index:3;}
.li-foldturn ul .pic3{top:50px;left:200px;z-index:4;}
.li-foldturn ul .pic4{top:120px;left:340px;z-index:3;}
.li-foldturn ul .pic5{top:160px;left:450px;z-index:2;}
.li-foldturn ul li.pic1 div{height:385px;width: 250px;}
.li-foldturn ul li.pic2 div{height:466px;width:300px;}
.li-foldturn ul li.pic3 div{height:600px;width:354px;}
.li-foldturn ul li.pic4 div{height:466px;width:300px;}
.li-foldturn ul li.pic5 div{height:385px;width: 250px;}
.li-foldturn ul li.pic1 div img{height:inherit;width:inherit;}
.li-foldturn ul li.pic2 div img{height:inherit;width:inherit;}
.li-foldturn ul li.pic3 div img{height:inherit;width:inherit;}
.li-foldturn ul li.pic4 div img{height:inherit;width:inherit;}
.li-foldturn ul li.pic5 div img{height:inherit;width:inherit;}
.li-foldturn span{ border: none;outline: none;padding: 0;margin: 0;height: 36px;width: 36px;cursor: pointer;transition: .3s;border-radius: 50%;background-color: rgba(31, 45, 61, 0.11);color: #fff;position: absolute;top: 50%;z-index: 10;transform: translateY(-50%);text-align: center;font-size: 12px;}
.li-foldturn:hover span{opacity:1;filter:alpha(opacity=100);}
.li-foldturn span.prev{left:16px;}
.li-foldturn span.next{right:16px;}
</style>


