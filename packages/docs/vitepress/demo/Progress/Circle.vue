<template>
  <div class="demo-progress-circle">
    <div class="item">
      <px-progress :percentage="0" type="circle" status="primary" />
      <px-progress :percentage="25" type="circle" status="success" />
      <px-progress
        :percentage="50"
        type="circle"
        status="warning"
        :stroke-width="10"
      />
      <px-progress
        :percentage="75"
        type="circle"
        status="danger"
        :stroke-width="20"
      >
        <template #default="{ percentage }">
          {{ percentage + '°C' }}
        </template>
      </px-progress>
      <px-progress
        :percentage="100"
        type="circle"
        status="sakura"
        :stroke-width="30"
      />
    </div>
    <div class="item">
      <px-progress
        type="circle"
        color="purple"
        :percentage="percentage"
        :width="width"
        :stroke-width="strokeWidth"
      />
      <div class="item-control">
        <div>
          width {{ width }}
          <px-button @click="width += 10">+</px-button>
          <px-button @click="width -= 10">-</px-button>
        </div>
        <div>
          strokeWidth {{ strokeWidth }}
          <px-button @click="strokeWidth += 2">+</px-button>
          <px-button @click="strokeWidth -= 2">-</px-button>
        </div>
        <div>
          percentage {{ percentage }}
          <px-button @click="percentage += 10">+</px-button>
          <px-button @click="percentage -= 10">-</px-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const percentage = ref(0)
const width = ref(100)
const strokeWidth = ref(10)
</script>

<style scoped>
.item {
  margin: 10px;
  display: flex;
  flex: 1;
  justify-content: space-between;
}

.item-control {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  align-items: end;
  justify-content: start;
}
</style>
