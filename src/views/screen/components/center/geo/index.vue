<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import chinaJson from './china.json'
defineOptions({
  name: 'Geo',
})
const planePath =
  'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'
const points = [
  { value: [116.405285, 39.904989], itemStyle: { color: '#FFFA00' } },
  { value: [113.54909, 22.198951], itemStyle: { color: '#00EEFF' } },
  { value: [91.132212, 29.660361], itemStyle: { color: '#00EEFF' } },
  { value: [126.642464, 45.756967], itemStyle: { color: '#00EEFF' } },
  { value: [87.617733, 43.792818], itemStyle: { color: '#00EEFF' } },
]
echarts.registerMap('china', chinaJson as any)
let charts = ref()
onMounted(() => {
  const myChart = echarts.init(charts.value)
  myChart.setOption({
    geo: {
      map: 'china',
      roam: false, // 是否开启放大缩小/拖拽功能
      layoutCenter: ['50%', '65%'], // 地图中心点位置
      zoom: 1.2,
      layoutSize: '100%',
      label: {
        show: true,
        color: '#fff',
        position: 'inside',
        fontSize: 12,
      },
      itemStyle: {
        areaColor: '#12235c',
        borderColor: '#2ab8ff',
        borderWidth: 0.5,
        //  阴影
        shadowColor: 'rgba(0,54,255, 0.4)',
        shadowBlur: 100,
      },
      emphasis: {
        //区域激活时的样式
        itemStyle: {
          areaColor: '#02102b',
        },
        label: {
          color: '#fff',
        },
      },
    },
    series: [
      // 添加迁移线数据
      {
        type: 'lines',
        data: [
          // 配置多个点的数据
          {
            // 配置航线
            coords: [
              [116.405285, 39.904989],
              [113.54909, 22.198951],
            ],
          },
          {
            coords: [
              [116.405285, 39.904989],
              [91.132212, 29.660361],
            ],
          },
          {
            coords: [
              [116.405285, 39.904989],
              [126.642464, 45.756967],
            ],
          },
          {
            coords: [
              [116.405285, 39.904989],
              [87.617733, 43.792818],
            ],
          },
        ],
        effect: {
          show: true,
          period: 8, //箭头指向速度，值越小速度越快
          trailLength: 0, //特效尾迹长度[0,1]值越大，尾迹越长重
          symbol: planePath, //箭头图标
          symbolSize: 15, //图标大小
        },
        lineStyle: {
          color: '#00eaff',
          width: 2, //尾迹线条宽度
          opacity: 0.7, //尾迹线条透明度
          curveness: 0.2, //尾迹线条曲直度
        },
      },
      {
        // 带有涟漪特效动画的散点（气泡）图
        type: 'effectScatter',
        coordinateSystem: 'geo',
        showEffectOn: 'render',
        zlevel: 1,
        rippleEffect: {
          color: 'orange',
          number: 3, // 波纹的数量。
          period: 5, // 动画的周期，秒数。
          scale: 17, // 动画中波纹的最大缩放比例。
          brushType: 'fill', // 波纹的绘制方式，可选 'stroke' 和 'fill'。
        },
        // 标记大小
        symbolSize: 2,
        data: points,
      },
    ],
  })
})
</script>

<template>
  <div class="geo_container">
    <div class="geo_title">
      <span class="title_desc">平台高峰预警信息(2条)</span>
    </div>
    <div class="geo_main">
      <div class="geo_desc">景区实时客流量</div>
      <div class="geo_charts" ref="charts"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.geo_container {
  color: rgba(255, 255, 255, 0.9);

  .geo_title {
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: url('../../../images/dataScreen-header-warn-bg.png') no-repeat
      center;
    background-size: 808px 57px;
    height: 57px;
    font-size: 18px;
  }

  .geo_main {
    height: 650px;
    width: 100%;
    padding: 0 40px;

    .geo_desc {
      float: left;
      width: 300px;
      height: 35px;
      background: url('../../../images/map-title-bg.png') no-repeat;
      background-size: 100% 100%;
      text-indent: 35px;
      line-height: 40px;
      font-size: 18px;
      letter-spacing: 5px;
    }

    .geo_charts {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
