<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
defineOptions({
  name: 'Age',
})
let charts = ref()
onMounted(() => {
  const myChart = echarts.init(charts.value)
  myChart.setOption({
    tooltip: {
      trigger: 'item',
    },
    // 图例组件
    legend: {
      top: '5%',
      right: 0,
      height: '100%',
      // 竖直放置
      orient: 'vertical',
      textStyle: {
        color: 'while',
        fontSize: '16',
      },
      itemGap: 10,
    },
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    series: [
      {
        name: '年龄比例',
        type: 'pie',
        radius: ['50%', '90%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          position: 'inside',
          color: 'white',
          formatter: (res: any) => {
            if (res.value) {
              return res.value * 100 + '%'
            } else {
              return 0
            }
          },
        },
        center: ['30%', '50%'],
        labelLine: {
          show: false,
        },
        data: [
          { value: 8, name: '10岁以下' },
          { value: 20, name: '10-18岁' },
          { value: 24, name: '18-30岁' },
          { value: 20, name: '30-40岁' },
          { value: 16, name: '40-60岁' },
          { value: 12, name: '60岁以上' },
        ].map(function (item) {
          return {
            value: item.value / 100, // 将百分比转换成小数
            name: item.name,
          }
        }),
      },
    ],
  })
})
</script>

<template>
  <div class="age_container">
    <div class="age_title">
      <div class="left_title">
        <span>用户年龄比例</span>
      </div>
      <img
        src="../../../images/dataScreen-title.png"
        style="height: 7px; width: 68px; display: block; margin-top: 10px"
      />
    </div>
    <div class="age_main">
      <div class="age_charts" ref="charts"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.age_container {
  background: url('../../../images/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;
  margin: 20px 0;
  font-size: 18px;
  color: rgba(#fff, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .age_main {
    width: 100%;
    height: 230px;
    padding: 20px;

    .age_charts {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
