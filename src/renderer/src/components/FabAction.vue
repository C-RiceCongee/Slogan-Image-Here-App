<template>
  <q-page-sticky position="bottom-right" :offset="fabPos">
    <q-fab
      v-touch-pan.prevent.mouse="moveFab"
      icon="add"
      direction="up"
      color="accent"
      :disable="draggingFab"
    >
      <slot name="ref" :fab="{ draggingFab }"> {{ draggingFab }}</slot>
    </q-fab>
  </q-page-sticky>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const fabPos = ref([18, 18])
const draggingFab = ref(false)
function moveFab(ev) {
  draggingFab.value = ev.isFirst !== true && ev.isFinal !== true
  fabPos.value = [fabPos.value[0] - ev.delta.x, fabPos.value[1] - ev.delta.y]
}
</script>
<style lang=""></style>
