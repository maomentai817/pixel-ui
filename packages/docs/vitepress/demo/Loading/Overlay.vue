<template>
  <div class="container">
    <px-collapse v-model="activeNames">
      <px-collapse-item
        title="Consistency"
        name="1"
        v-loading.grid="isLoading"
        px-loading-text="Loading..."
        px-loading-spinner="spinner-third-solid"
      >
        <div>
          Consistent with real life: in line with the process and logic of real
          life, and comply with languages and habits that the users are used to;
        </div>
        <div>
          Consistent within interface: all elements should be consistent, such
          as: design style, icons and texts, position of elements, etc.
        </div>
      </px-collapse-item>
      <px-collapse-item
        title="Feedback"
        name="2"
        v-loading.matte.preset1="isLoading"
      >
        <div>
          Operation feedback: enable the users to clearly perceive their
          operations by style updates and interactive effects;
        </div>
        <div>
          Visual feedback: reflect current state by updating or rearranging
          elements of the page.
        </div>
      </px-collapse-item>
    </px-collapse>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const isLoading = ref(true)
const activeNames = ref(['1', '2'])
</script>
<style scoped>
:deep(.px-collapse-item) {
  padding: 20px;
}
</style>
