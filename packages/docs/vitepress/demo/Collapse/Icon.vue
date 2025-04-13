<template>
  <px-collapse v-model="activeNames" @change="handleChange">
    <px-collapse-item title="Title a" name="a" icon="cog">
      <div>折叠面板内容1</div>
    </px-collapse-item>
    <px-collapse-item title="Title b" name="b" icon="plane">
      <div>折叠面板内容2</div>
    </px-collapse-item>
    <px-collapse-item
      title="Title c disabled"
      name="c"
      disabled
      icon="times-solid"
    >
      <div>折叠面板内容3</div>
    </px-collapse-item>
    <px-collapse-item title="Title d" name="d" icon="star-crescent-solid">
      <div>折叠面板内容4</div>
    </px-collapse-item> </px-collapse
  >`
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { type CollapseItemName } from '@mmt817/pixel-ui'

const activeNames = ref(['a'])

const handleChange = (val: CollapseItemName[]) => {
  console.log(val)
}
</script>
