<script setup lang="ts">
const onFailed = () => {}
</script>

<template>
  <q-uploader
    url="http://localhost:4444/upload"
    label="上传你的作品"
    :on-failed="onFailed"
    multiple
    batch
    accept="image/jpeg,image/jpg"
    style="width: 90%; margin: 20px auto; min-height: calc(100vh - 130px)"
  >
    <template #list="scope">
      <div v-show="scope.files.length > 0" class="list">
        <div v-for="file in scope.files" :key="file.__key" class="imageItem">
          <q-item-label class="ellipsis filename">
            {{ file.name }}
          </q-item-label>
          <img :src="file.__img.src" alt="" />
        </div>
      </div>
      <div v-show="scope.files.length === 0" class="waiting">
        <q-spinner-puff size="100" color="brown" />
        <p>等待上传JPEG/JPG</p>
        <p>
          <i>点击上面的<q-icon name="add" />或者拖拽进来 <q-icon name="waving_hand" /></i>
        </p>
        <p>
          <i>其他格式可能解析不到EXIF数据 <q-icon name="info"></q-icon></i>
        </p>
      </div>
    </template>
  </q-uploader>
</template>

<style scoped lang="less">
.list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .imageItem {
    width: 368px;
    height: 368px;
    margin: 10px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .filename {
      display: inline-block;
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
    }
    img {
      width: 90%;
      height: 80%;
      object-fit: contain;
    }
  }
}
.waiting {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
