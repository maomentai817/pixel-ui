<template>
  <div class="max-w-600">
    <px-progress :percentage="50" :stroke-width="24" class="mb-15">
      <px-button size="small">Content</px-button>
    </px-progress>
    <px-progress
      :text-inside="true"
      :stroke-width="24"
      :percentage="50"
      status="success"
      class="mb-15"
    >
      <span>Content</span>
    </px-progress>
    <px-progress
      :text-inside="true"
      :stroke-width="24"
      :percentage="50"
      status="danger"
      class="mb-15"
    >
      <template #default="{ percentage }">
        {{ percentage + '°' }}
      </template>
    </px-progress>
  </div>
</template>
