<template>
  <div>
    <q-breadcrumbs active-color="white" style="font-size: 16px; margin: 12px">
      <q-breadcrumbs-el
        v-for="item in matched"
        :key="item.path"
        :label="(item.meta.title as string)"
        :icon="(item.meta.icon as string)"
      />
    </q-breadcrumbs>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { RouteLocationNormalizedLoaded, RouteRecord, useRoute } from 'vue-router'
const matched = ref<Array<RouteRecord>>([])
const route = useRoute()
watch(
  route,
  (v: RouteLocationNormalizedLoaded) => {
    matched.value = v.matched
  },
  {
    immediate: true
  }
)
</script>
<style lang=""></style>
