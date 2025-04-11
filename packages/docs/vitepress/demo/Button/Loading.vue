<template>
  <div>
    <px-button type="primary" loading>Loading</px-button>
    <px-button type="primary" loading-icon="circle-notch" loading>
      Loading
    </px-button>
    <px-button type="primary" loading>
      <template #loading>
        <px-icon
          style="margin-right: 6px"
          icon="star-crescent-solid"
          spin
          color="#fff"
        />
      </template>
      Loading
    </px-button>
  </div>
</template>
