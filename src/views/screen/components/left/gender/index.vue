<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
defineOptions({
  name: 'Gender',
})
let charts = ref()
onMounted(() => {
  const myChart = echarts.init(charts.value)
  myChart.setOption({
    xAxis: {
      type: 'value',
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      type: 'category',
      show: false,
    },
    series: [
      {
        type: 'bar',
        data: [60],
        barWidth: 25,
        z: 100,
        itemStyle: {
          color: '#2b73af',
          borderRadius: 25,
        },
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 25,
        // 调整柱条宽度
        barGap: '-100%',
        itemStyle: {
          color: '#f03752',
          borderRadius: 25,
        },
      },
    ],
    grid: {
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,
    },
  })
})
</script>

<template>
  <div class="gender_container">
    <div class="gender_title">
      <div class="left_title">
        <span>男女比例</span>
      </div>
      <img
        src="../../../images/dataScreen-title.png"
        style="height: 7px; width: 68px; display: block; margin-top: 10px"
      />
    </div>
    <div class="gender_main">
      <div class="gender_img">
        <div class="male">
          <span class="title">男士</span>
          <img src="../../../images/man.png" />
        </div>
        <div class="female">
          <span class="title">女士</span>
          <img src="../../../images/woman.png" />
        </div>
      </div>
      <div class="desc">
        <span>男士60%</span>
        <span>女士40%</span>
      </div>
      <div class="gender_charts" ref="charts"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gender_container {
  background: url('../../../images/dataScreen-main-lc.png') no-repeat;
  background-size: 100% 100%;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .gender_title {
    .left_title {
      color: rgba(#fff, 0.9);
      font-size: 18px;
    }
  }

  .gender_main {
    width: 100%;
    height: 230px;
    padding: 20px 50px;
    color: rgba(#fff, 0.9);
    font-size: 18px;

    .gender_img {
      display: flex;
      justify-content: space-between;

      .male,
      .female {
        width: 100px;
        height: 120px;
        background: url(../../../images/man-bg.png) no-repeat;
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          width: 65px;
        }

        .title {
          margin: 2px 0 15px;
        }
      }

      .female {
        background: url(../../../images/woman-bg.png) no-repeat;
        background-size: 100% 100%;
      }
    }

    .desc {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
    }

    .gender_charts {
      width: 100%;
      height: 30px;
    }
  }
}
</style>
