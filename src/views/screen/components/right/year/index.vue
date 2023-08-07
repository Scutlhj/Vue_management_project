<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
let xLabel = [
  '1月',
  '2月',
  '3月',
  '4月',
  '5月',
  '6月',
  '7月',
  '8月',
  '9月',
  '10月',
  '11月',
  '12月',
]
let dataValue = [
  15.3, 20.4, 22.3, 25.7, 21.5, 18.4, 30.2, 32.4, 17.4, 28.1, 16.4, 18.2,
]
let dataValue1 = [
  18.2, 25.4, 21.1, 23.2, 29.5, 25.7, 33.1, 37.3, 20.3, 30.1, 18.4, 22.2,
]
let dataValue2 = [
  20.5, 14.1, 17.2, 27.5, 32.5, 33.4, 35.4, 27.5, 24.1, 35.8, 28.8, 31.5,
]
let charts = ref()
defineOptions({
  name: 'Year',
})
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
      show: true,
      top: '0%',
      right: '5%',
      itemWidth: 20, // 图例标记的图形宽度。
      itemHeight: 10, //  图例标记的图形高度。
      textStyle: {
        color: '#fff',
        fontSize: 14,
      },
    },
    grid: {
      top: '15%',
      left: '10%',
      right: '5%',
      bottom: '15%',
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
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
          fontSize: 14,
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
        name: '单位:(百万人)',
        nameTextStyle: {
          color: '#fff',
          fontSize: 12,
        },
        nameGap: 15,
        minInterval: 10,
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
        name: '2020',
        type: 'line',
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        symbolSize: 6, //设定实心点的大小
        smooth: false,
        lineStyle: {
          width: 3,
          color: '#63bbd0', // 线条颜色
        },
        itemStyle: {
          color: '#00f0ff', //拐点颜色
          // borderColor: '#fff600',//拐点边框颜色
          // borderWidth: 13//拐点边框大小
          // 设置label.show为true也不显示
        },
        areaStyle: {
          //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: '#00ffa230',
              },
              {
                offset: 0.6,
                color: '#00ffa220',
              },
              {
                offset: 1,
                color: '#00ffa210',
              },
            ],
            false,
          ),
        },
        data: dataValue,
      },
      {
        name: '2021',
        type: 'line',
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        smooth: false,
        lineStyle: {
          width: 3,
          color: '#ffba00', // 线条颜色
        },
        itemStyle: {
          color: '#fff600', //拐点颜色
          // borderColor: '#fff600',//拐点边框颜色
          // borderWidth: 13//拐点边框大小
        },
        symbolSize: 6, //设定实心点的大小
        areaStyle: {
          //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: '#ffba0030',
              },
              {
                offset: 0.6,
                color: '#ffba0020',
              },
              {
                offset: 1,
                color: '#ffba0010',
              },
            ],
            false,
          ),
        },
        data: dataValue1,
      },
      {
        name: '2022',
        type: 'line',
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        symbolSize: 6, //设定实心点的大小
        smooth: false,
        lineStyle: {
          width: 3,
          color: '#ec4e8a', // 线条颜色
        },
        itemStyle: {
          color: '#f03752', //拐点颜色
        },
        areaStyle: {
          //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: '#eea2a430',
              },
              {
                offset: 0.6,
                color: '#eea2a420',
              },
              {
                offset: 1,
                color: '#eea2a420',
              },
            ],
            false,
          ),
        },
        data: dataValue2,
      },
    ],
  })
})
</script>

<template>
  <div class="year_container">
    <div class="year_title">
      <div class="left_title">
        <span>年度游客量对比</span>
      </div>
      <img
        src="../../../images/dataScreen-title.png"
        style="height: 7px; width: 68px; display: block; margin-top: 10px"
      />
    </div>
    <div class="year_main">
      <div class="year_charts" ref="charts"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.year_container {
  margin: 20px 0;
  background: url('../../../images/dataScreen-main-rc.png') no-repeat;
  background-size: 100% 100%;
  font-size: 18px;
  color: rgba(#fff, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .year_main {
    height: 230px;

    .year_charts {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
