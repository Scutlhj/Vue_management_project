<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Top from './components/top/index.vue'
import Tourist from './components/left/tourist/index.vue'
import Gender from './components/left/gender/index.vue'
import Age from './components/left/age/index.vue'
import Geo from './components/center/geo/index.vue'
import Trend from './components/center/trend/index.vue'
import Rank from './components/right/rank/index.vue'
import Year from './components/right/year/index.vue'
import Platform from './components/right/platform/index.vue'

let screen = ref()
// 计算缩放比例
const getScale = (w = 1920, h = 1080) => {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return Math.min(ww, wh)
}
onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}
</script>

<template>
  <div class="container">
    <div class="screen" ref="screen">
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist" />
          <Gender class="gender" />
          <Age class="age" />
        </div>
        <div class="center">
          <Geo class="geo" />
          <Trend class="trend" />
        </div>
        <div class="right">
          <Rank class="rank" />
          <Year class="year" />
          <Platform class="platform" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat;
  background-size: cover;

  .screen {
    transform-origin: top left;
    position: fixed;
    width: 1920px;
    height: 1080px;
    // background-color: aqua;
    top: 50%;
    left: 50%;

    .top {
      height: 40px;
      width: 100%;
    }

    .bottom {
      height: 1040px;
      display: flex;

      .left {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 50px;

        .tourist {
          flex: 1.3;
        }

        .gender {
          flex: 1;
        }

        .age {
          flex: 1;
        }
      }

      .center {
        flex: 3;
        display: flex;
        flex-direction: column;

        .geo {
          flex: 2.5;
        }

        .trend {
          flex: 1;
        }
      }

      .right {
        flex: 1;
        margin-right: 50px;
        display: flex;
        flex-direction: column;

        .rank {
          flex: 1.3;
        }

        .year {
          flex: 1;
        }

        .platform {
          flex: 1;
        }
      }
    }
  }
}
</style>
