<template>
  <px-card>
    <p v-for="i in 4" :key="i">{{ 'List item' + i }}</p>
  </px-card>
</template>
