<script setup lang="ts">
import { ref } from 'vue'
import { UPLOAD } from 'src/constant'
import BaseGuider from '@renderer/components/BaseGuider.vue'
import { EXIFRootObject } from 'src/types'
const files = ref<Array<EXIFRootObject>>([])

const upload = async () => {
  const res = await window.electron.ipcRenderer.sendSync(UPLOAD)
  files.value = res
  console.log(res)
}
const deleteFile = (idx) => {
  files.value?.splice(idx, 1)
}
</script>

<template>
  <div v-show="files?.length == 0" class="guiderArea">
    <BaseGuider></BaseGuider>
    <q-btn class="full-width" style="margin-top: 10px" icon="cloud_upload" @click="upload"></q-btn>
  </div>
  <div class="list">
    <div v-for="(file, idx) in files" :key="idx" class="imageItem">
      <q-item-label class="ellipsis filename">
        {{ file.fileName }}
      </q-item-label>
      <q-img style="width: 95%; height: 80%" fit="contain" :src="file.originSrc" alt="" />
      <q-btn-group push>
        <q-btn push label="预览" icon="visibility" />
        <q-btn push label="参数设置" icon="settings" />
        <q-btn push label="删除" icon="delete" @click="deleteFile(idx)" />
      </q-btn-group>
    </div>
  </div>
</template>

<style scoped lang="less">
.q-pa-md {
  padding: 0;
}
.guiderArea {
  width: 90%;
  margin: 30px auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .imageItem {
    width: 358px;
    height: 368px;
    margin: 10px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: relative;
    .filename {
      // display: inline-block;
      // position: absolute;
      // top: 10px;
      // left: 50%;
      // transform: translateX(-50%);
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
