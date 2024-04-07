<!--
 * @Author: kasuie
 * @Date: 2024-03-11 17:12:33
 * @LastEditors: kasuie
 * @LastEditTime: 2024-04-07 10:35:09
 * @Description: 
-->
<template>
  <div class="about">
    <h1>This is an about page {{ data }}</h1>
    <button @click="onClick">增加</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const data = ref(0)
const onClick = () => {
  ++data.value
}
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
