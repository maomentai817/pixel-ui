<template>
  <div class="max-w-600">
    <px-progress class="mb-15" :percentage="50" :stroke-width="24" striped />
    <px-progress
      class="mb-15"
      :percentage="50"
      :stroke-width="24"
      striped
      color="#626aef"
    />
    <px-progress
      class="mb-15"
      :percentage="75"
      :stroke-width="24"
      striped
      striped-flow
      :duration="1"
      status="success"
    />
    <px-progress
      class="mb-15"
      :percentage="100"
      :stroke-width="24"
      striped
      striped-flow
      status="warning"
    />
    <px-progress
      class="mb-15"
      :percentage="30"
      :stroke-width="24"
      striped
      striped-flow
      :duration="6"
      status="danger"
    />
    <px-progress
      class="mb-15"
      :percentage="60"
      :stroke-width="24"
      striped
      striped-flow
      :duration="5"
      status="sakura"
    />
  </div>
</template>
