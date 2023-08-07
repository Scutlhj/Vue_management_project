<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
defineOptions({
  name: 'Trend',
})
let xLabel = [
  '5月18日',
  '5月25日',
  '5月29日',
  '6月2日',
  '6月7日',
  '6月12日',
  '6月17日',
]
let dataValue = [1492887, 1588793, 1213194, 1312932, 1625621, 1432134, 1523455]
let charts = ref()
onMounted(() => {
  const myChart = echarts.init(charts.value)
  myChart.setOption({
    backgroundColor: 'rgb(18,20,75)',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: 'rgb(126,199,255)',
        },
      },
    },
    legend: {
      left: 'center',
      top: 0,
      showLabel: true,
      itemWidth: 30, // 图例标记的图形宽度。
      itemHeight: 10, //  图例标记的图形高度。
      textStyle: {
        color: '#fff',
        fontSize: 18,
        padding: [0, 8, 0, 8],
      },
    },
    grid: {
      top: '10%',
      left: '10%',
      right: '5%',
      bottom: '15%',
    },
    xAxis: [
      {
        type: 'category',
        axisLine: {
          //坐标轴轴线相关设置。数学上的x轴
          show: true,
          lineStyle: {
            color: 'rgb(41,188,245)',
          },
        },
        axisLabel: {
          //坐标轴刻度标签的相关设置
          color: '#FFFFFF',
          fontSize: 12,
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#233653',
          },
        },
        axisTick: {
          show: false,
        },
        data: xLabel,
      },
    ],
    yAxis: [
      {
        // minInterval: 1,
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            color: '#1160a0',
            type: 'dashed',
          },
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#008de7',
          },
        },
        axisLabel: {
          show: true,
          color: '#fff',
          fontSize: 14,
        },
        axisTick: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: '人数',
        type: 'line',
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        smooth: true,
        lineStyle: {
          z: 1,
          width: 3,
          color: '#fb6663', // 线条颜色
        },
        itemStyle: {
          color: '#fd8180', //拐点颜色
        },
        symbolSize: 8, //设定实心点的大小
        areaStyle: {
          //线性渐变，前4个参数分别是x0,y0,x1,y1(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
          color: new echarts.graphic.LinearGradient(
            0,
            1,
            1,
            1,
            [
              {
                offset: 0,
                color: '#ee3f4d30',
              },
              {
                offset: 1,
                color: '#ee3f4d20',
              },
            ],
            false,
          ),
        },
        data: dataValue,
      },
    ],
  })
})
</script>

<template>
  <div class="trend_container">
    <div class="trend_title">
      <div class="left_title">
        <span>未来30天游客趋势图</span>
      </div>
      <img
        src="../../../images/dataScreen-title.png"
        style="height: 7px; width: 68px; display: block; margin-top: 10px"
      />
    </div>
    <div class="trend_main">
      <div class="trend_charts" ref="charts"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.trend_container {
  padding: 20px 40px;
  height: 100%;
  width: 100%;
  background: url('../../../images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  background-clip: content-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .trend_main {
    height: 218px;
    width: 100%;

    .trend_charts {
      height: 100%;
    }
  }
}
</style>
