<template>
  <div class="content">
    <img src="/404.png" alt="维护图片">
    <h2 class="title">网站开发中</h2>
    <p class="des">
      <span class="spec">为了让您更好的使用系统，</span><span class="spec">此处页面正在开发，</span><span class="spec">暂时无法访问。</span></p>
    <p class="sorry">给您带来的不便，敬请谅解!</p>
    <button class="goback" @click="goBack">返回首页</button>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
const goBack = () =>{
  router.push({path:'/'})
}
</script>

<style lang="scss" scoped>
.content{
  background-color: #ABDCFF;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, .7);
}
.content img{
  width: 500px;
  margin-bottom: 100px;
}
.content h2{
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 50px;
}
.des,
.sorry{
  font-size: 20px;
  text-align: center;
}
.sorry{
  margin: 40px 0;
}
.goback{
  width: 100px;
  height: 50px;
  font-size: 16px;
  border: none;
  outline: none;
  text-align: center;
  cursor: pointer;
  border-radius: 10px;
  background-color: #f0f0f0;
  color: black;
  transition: all .2s;
}
.goback:hover{
  background-color: #e0e0e0;
}
</style>
