<script lang="ts" setup>
import rankItem from './rankItem/index.vue'
import { ref } from 'vue';
const data = ref<any>([
  {
    name:'峨眉山',
    hot:80000,
    rank:1,
    color:'red'
  },
  {
    name:'稻城亚丁',
    hot:60000,
    rank:2,
    color:'blue'
  },
  {
    name:'九寨沟',
    hot:50000,
    rank:3,
    color:'green'
  },
  {
    name:'万里长城',
    hot:40000,
    rank:4,
    color:'orange'
  },
  {
    name:'北京故宫',
    hot:30000,
    rank:5,
    color:'purple'
  },
])
defineOptions({
  name: 'Rank',
})
</script>

<template>
  <div class="rank_container">
    <div class="rank_title">
      <div class="left_title">
        <span>热门景区排行</span>
      </div>
      <img src="../../../images/dataScreen-title.png" style="height: 7px; width: 68px; display: block; margin-top: 10px;">
    </div>
    <div class="rank_main">
      <div class="main_title">
        <span class="rank_number">
          排名
        </span>
        <span class="rank_scenic">
          景区
        </span>
        <span class="rank_bar">
          预约数量
        </span>
      </div>
      <div class="main_charts">
        <rankItem v-for="(item,index) in data" :key="index" :item="item" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rank_container {
  background: url('../../../images/dataScreen-main-rt.png') no-repeat;
  background-size: 100% 100%;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .rank_title{
    font-size: 18px;
    color: rgba(255,255,255,.9);
  }
  .rank_main{
    height: 312px;
    padding: 15px;
    .main_title{
      width: 100%;
      height: 36px;
      background: url('../../../images/rankingChart-bg.png') no-repeat;
      background-size: 100% 100%;
      font-size: 16px;
      font-weight: bold;
      color: orange;
      line-height: 36px;
      display: flex;
      text-align: center;
      .rank_number{
        flex:1;
      }
      .rank_scenic{
        flex:1;
      }
      .rank_bar{
        flex:2.5;
      }
    }
    .main_charts{
      padding: 10px 0;
      height: 246px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }
}
</style>