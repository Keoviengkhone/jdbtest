<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-white text-primary" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="./assets/jdb-ico.png" alt="">
          </q-avatar>
          JDB
        </q-toolbar-title>
        <!-- <q-tabs >
          <q-route-tab to="/" label="home" />
          <q-route-tab to="/about" label="About" />
          <q-route-tab to="/page3" label="Page Three" />
        </q-tabs> -->
        <q-btn round icon="g_translate" unelevated />
        <q-btn round unelevated>
          <q-avatar size="40px">
            <img src="./assets/profile.jpg" alt="">
          </q-avatar>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered :width="230">
      <q-btn unelevated
        style="background-color: #3771FF;color: white;width: 209px; margin-top: 6px; border-radius: 8px;height: 50px;font-size: 16px;"
        icon="mail" label="ໜ້າຫຼັກ" to="/" />
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>
<style>
.q-drawer__content {
  padding: 10px;
}
</style>