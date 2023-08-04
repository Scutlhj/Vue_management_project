<script lang="ts" setup>
defineOptions({
    name: 'RankItem',
})
defineProps(['item'])
</script>

<template>
    <div class="container">
        <div class="number_bar">
            <el-tag :color="item.color" effect="dark" round style="height: 50%; width: 80%; font-size: 16px;">NO.{{
                item.rank }}</el-tag>
        </div>
        <span class="name">
            {{ item.name }}
        </span>
        <div class="percent_bar">
            <el-progress type="line" :percentage="item.hot / 1000" striped :stroke-width="22" :color="item.color"
                :text-inside="true" style="width: 80%;"></el-progress>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    height: 100%;
    display: flex;

    .number_bar {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .name {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(255, 255, 255, .9);
        font-size: 16px;
    }

    .percent_bar {
        flex: 2.5;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>