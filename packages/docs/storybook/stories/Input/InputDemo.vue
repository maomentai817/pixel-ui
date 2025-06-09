<script setup lang="ts">
import { ref } from 'vue'
import { PxInput, PxButton } from '@pixel-ui/components'

const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
const select = ref('')
</script>

<template>
  <div>
    <px-input
      v-model="input1"
      style="max-width: 600px"
      placeholder="Please input"
    >
      <template #prepend>Http://</template>
    </px-input>
  </div>
  <div style="margin-top: 8px">
    <px-input
      v-model="input2"
      style="max-width: 600px"
      placeholder="Please input"
    >
      <template #append>.com</template>
    </px-input>
  </div>
  <div style="margin-top: 8px">
    <px-input
      v-model="input3"
      style="max-width: 600px"
      placeholder="Please input"
      class="input-with-select1"
    >
      <template #prepend>
        <px-select v-model="select" placeholder="Select" style="width: 115px">
          <px-option label="Restaurant" value="1" />
          <px-option label="Order No." value="2" />
          <px-option label="Tel" value="3" />
        </px-select>
      </template>
      <template #append>
        <px-button icon="search" />
      </template>
    </px-input>
  </div>
  <div style="margin-top: 8px">
    <px-input
      v-model="input3"
      style="max-width: 600px"
      placeholder="Please input"
      class="input-with-select2"
    >
      <template #prepend>
        <px-button icon="search" />
      </template>
      <template #append>
        <px-select v-model="select" placeholder="Select" style="width: 115px">
          <px-option label="Restaurant" value="1" />
          <px-option label="Order No." value="2" />
          <px-option label="Tel" value="3" />
        </px-select>
      </template>
    </px-input>
  </div>
</template>

<style>
.input-with-select1 .px-input__append {
  padding: 0;
  margin: 0;
}
.input-with-select2 .px-input__prepend {
  padding: 0;
  margin: 0;
}
</style>
