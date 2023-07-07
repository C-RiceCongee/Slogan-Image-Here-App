<script setup lang="ts">
import logo from '@renderer/assets/logo.png'
</script>
<template>
  <div class="about">
    <h2>Slogan Image Here</h2>
    <img :src="logo" alt="" />
    <p>一款可以读取相机拍摄参数元数据的软件</p>
    <p>支持自定义参数，用于手动镜头参数的填写</p>
    <p>支持生成漂亮的水印图</p>
    <p>支持一键生成幻灯片视频，方便后期视频！</p>
    <q-chip square>
      <q-avatar>
        <img src="https://blog.quancundexiwang.wang/upload/2023/02/WechatIMG685.jpeg" />
      </q-avatar>
      2023@村望老弟
    </q-chip>
  </div>
</template>

<style scoped lang="less">
.about {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
