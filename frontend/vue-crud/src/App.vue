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
        <q-tabs >
        <q-route-tab to="/" label="home" />
        <q-route-tab to="/about" label="About" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs>
      </q-toolbar>

      
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>
