<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'
defineOptions({
  name: 'Tourist',
})
let touristNumber = ref<string>('216908人')
let charts = ref()
onMounted(() => {
  let mycharts = echarts.init(charts.value, null, { renderer: 'svg' })
  mycharts.setOption({
    // 标题组件
    // title:{
    //   text:'水球图'
    // },
    // x|y轴组件
    xAxis: {},
    yAxis: {},
    // 图表类型选择
    series: {
      type: 'liquidFill',
      name: '百分比',
      waveAnimation: true,
      animationEasing: 'linear',
      animationDuration: 2500,
      data: [0.433, 0.434, 0.432],
      // 大小
      radius: '80%',
      // 图表位置
      center: ['50%', '50%'],
      // 数据颜色
      color: ['#43b244', '#5bae23', '#41ae3c'],
      itemStyle: {
        opacity: 0.8,
        shadowBlur: 30,
        shadowColor: 'rgba(71,81,100,0.8)',
      },
      emphasis: {
        itemStyle: {
          opacity: 1,
        },
      },
      outline: {
        show: true,
        borderDistance: 6,
        itemStyle: {
          color: 'none',
          borderColor: '#41ae3c',
          borderWidth: 6,
          shadowBlur: 20,
          shadowColor: 'rgba(65, 174, 60, 1)',
        },
      },
      // 中间的数据
      label: {
        show: true,
        color: '#1a94bc',
        insideColor: '#fffef8',
        fontSize: 50,
        fontWeight: 'bold',
        align: 'center',
        baseline: 'middle',
        position: 'inside',
      },
    },
    tooltip: {
      show: true,
    },
    // 布局组件
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  })
})
</script>

<template>
  <div class="tourist_container">
    <div class="tourist_title clearfix">
      <div class="left_title">
        <span>实时在线统计</span>
      </div>
      <img
        src="../../../images/dataScreen-title.png"
        style="height: 7px; width: 68px; display: block; margin-top: 10px"
      />
      <div class="right_title">
        <span>
          最多同时在线
          <span class="number">500000</span>
          人
        </span>
      </div>
    </div>
    <div class="tourist_main">
      <div class="tourist_number">
        <span v-for="(item, index) in touristNumber" :key="index">
          {{ item }}
        </span>
      </div>
      <div class="tourist_charts" ref="charts"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tourist_container {
  background: url('../../../images/dataScreen-main-lt.png') no-repeat;
  background-size: 100% 100%;
  margin: 20px 0;

  .tourist_title {
    // height: 50px;
    font-size: 18px;
    color: rgba(#fff, 0.9);

    .right_title {
      float: right;
      margin-right: 10px;

      .number {
        color: orange;
        font-size: 16px;
        margin: 0 3px;
      }
    }
  }

  .tourist_main {
    .tourist_number {
      display: flex;
      justify-content: center;
      margin: 10px 0;
      color: #29fcff;

      span {
        height: 46px;
        width: 46px;
        line-height: 46px;
        text-align: center;
        margin: 0 2px;
        font-size: 23px;
        background: url('../../../images/total.png') no-repeat;
        background-size: cover;
      }
    }

    .tourist_charts {
      height: 240px;
    }
  }
}

.clearfix:after {
  content: '';
  display: table;
  clear: both;
}
</style>
