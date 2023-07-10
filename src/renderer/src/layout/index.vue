<script setup lang="ts">
import { ref } from 'vue'
import EssentialLink from '@renderer/components/EssentialLink.vue'
import Breadcrumbs from '@renderer/components/Breadcrumbs.vue'
import FabAction from '@renderer/components/FabAction.vue'
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
const Links = [
  {
    title: '📷上传作品',
    caption: 'upload your images here',
    icon: 'upload',
    link: '/upload'
  },
  {
    title: '🧩拼图功能',
    caption: '敬请期待!',
    disable: true,
    icon: 'schedule',
    link: 'http://www.quasarchs.com/vue-directives/mutation'
  },
  {
    title: '🎬一键视频',
    caption: '敬请期待!',
    disable: true,
    icon: 'schedule',
    link: 'http://www.quasarchs.com/vue-directives/mutation'
  },
  {
    title: '🤔️关于此App',
    caption: 'About this app !',
    icon: 'info',
    link: '/about'
  }
]
const leftDrawerOpen = ref(false)
</script>

<template>
  <div class="layout">
    <q-layout view="lHh Lpr lFf">
      <q-header elevated style="padding-top: 16px">
        <q-toolbar>
          <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
          <q-toolbar-title>Slogan Image Here</q-toolbar-title>
          <!--          <div>Quasar v{{ $q.version }}</div>-->
        </q-toolbar>
        <a-toolbar inset>
          <Breadcrumbs />
        </a-toolbar>
      </q-header>
      <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
        <q-list>
          <q-item-label header></q-item-label>
          <EssentialLink v-for="link in Links" :key="link.title" v-bind="link" />
        </q-list>
      </q-drawer>
      <q-page-container>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.name"></component>
          </keep-alive>
          <component :is="Component" v-if="!$route.meta.keepAlive" :key="$route.name"></component>
        </router-view>
      </q-page-container>
      <FabAction></FabAction>
    </q-layout>
  </div>
</template>

<style scoped lang="less"></style>
