<template>
  <px-switch
    v-model="value1"
    class="mb-20"
    active-text="Pay by month"
    inactive-text="Pay by year"
  />
  <br />
  <br />
  <px-switch
    v-model="value2"
    class="mb-20"
    style="
      --px-switch-on-color: #13ce66;
      --px-switch-on-border-color: #13ce66;
      --px-switch-off-color: #ff4949;
      --px-switch-off-border-color: #ff4949;
      --px-switch-off-action-color: #ffffff;
    "
    active-text="Pay by month"
    inactive-text="Pay by year"
  />
  <br />
  <br />
  <px-switch
    v-model="value3"
    inline-prompt
    active-text="是"
    inactive-text="否"
  />
  <px-switch
    v-model="value4"
    class="ml-20"
    inline-prompt
    style="
      --px-switch-on-color: #13ce66;
      --px-switch-on-border-color: #13ce66;
      --px-switch-off-color: #ff4949;
      --px-switch-off-border-color: #ff4949;
      --px-switch-off-action-color: #ffffff;
    "
    active-text="Y"
    inactive-text="N"
  />
  <px-switch
    v-model="value6"
    class="ml-20"
    width="60"
    inline-prompt
    active-text="超出省略"
    inactive-text="超出省略"
  />
  <px-switch
    v-model="value5"
    class="ml-20"
    inline-prompt
    style="
      --px-switch-on-color: #13ce66;
      --px-switch-on-border-color: #13ce66;
      --px-switch-off-color: #ff4949;
      --px-switch-off-border-color: #ff4949;
      --px-switch-off-action-color: #ffffff;
    "
    active-text="完整展示多个内容"
    inactive-text="多个内容"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(true)
const value2 = ref(true)
const value3 = ref(true)
const value4 = ref(true)
const value5 = ref(true)
const value6 = ref(true)
</script>
