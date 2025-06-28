<template>
  <px-eye-dropper v-slot="{ open, sRGBHex }">
    <px-badge
      is-dot
      :color="sRGBHex || 'black'"
      :style="{ '--px-badge-size': '50px' }"
    >
      <px-button @click="open">
        <px-text :color="sRGBHex || 'black'">{{ sRGBHex || 'black' }}</px-text>
      </px-button>
    </px-badge>
  </px-eye-dropper>
</template>
