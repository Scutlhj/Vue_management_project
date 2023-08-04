<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts'
defineOptions({
  name: 'Platform',
})
let charts = ref()
const platformData = [
  {
    name: '智慧文旅',
    value: 400000
  },
  {
    name: '携程',
    value: 100000
  },
  {
    name: '飞猪',
    value: 200000
  },
  {
    name: '其他平台',
    value: 300000
  },
]

let totalNumber = platformData.reduce((accumulator, currentValue) => {
  return accumulator + currentValue.value
}, 0)
onMounted(() => {
  let myChart = echarts.init(charts.value);
  myChart.setOption({
    backgroundColor: 'rgb(18,20,75)',
    legend: {
      orient: 'vertical',
      top: 'center',
      right: '5%',
      itemGap: 30,
      itemWidth: 16,
      itemHeight: 16,
      textStyle: {
        color: '#fff',
        fontSize: 16,
      },
      data: platformData.map(item => item.name),
    },
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        color: ['#ee3f4d', '#15559a', '#fecc11', '#1ba784'],
        name: '预约人数',
        type: 'pie',
        radius: ['55%', '80%'],
        center: ['32%', '50%'],
        label: {
          show: true,
          position: 'inside',
          color: 'white',
          formatter: (res: any) => {
            return res.value / totalNumber * 100 + '%'
          },
        },
        data: platformData,
      },
      {
        name: '',
        type: 'pie',
        radius: ['48%', '50%'],
        center: ['32%', '50%'],
        color: '#295da6',
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        data: [1],
        silent: true,
      },
      {
        name: '',
        type: 'pie',
        radius: ['83%', '85%'],
        center: ['32%', '50%'],
        color: '#4072db',
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        data: [1],
        silent: true,
        itemStyle: {
          shadowColor: 'rgba(255,255,255,0.7)',
          shadowBlur: 10,
        },
      },
      {
        name: '',
        type: 'pie',
        radius: ['89%', '90%'],
        center: ['32%', '50%'],
        color: '#142e59',
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        data: [1],
        silent: true,
      },
    ]
  })
})
</script>

<template>
  <div class="platform_container">
    <div class="platform_title">
      <div class="left_title">
        <span>预约渠道数据统计</span>
      </div>
      <img src="../../../images/dataScreen-title.png" style="height: 7px; width: 68px; display: block; margin-top: 10px;">
    </div>
    <div class="platform_main">
      <div class="platform_charts" ref="charts"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.platform_container {
  margin: 20px 0;
  background: url('../../../images/dataScreen-main-rb.png') no-repeat;
  background-size: 100% 100%;
  font-size: 18px;
  color: rgba(#fff, .9);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .platform_main {
    height: 230px;

    .platform_charts {
      height: 100%;
      width: 100%;
    }
  }
}
</style>