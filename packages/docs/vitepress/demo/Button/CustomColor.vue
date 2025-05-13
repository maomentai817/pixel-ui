<template>
  <px-text size="12">使用color属性自动计算颜色,可能出现计算错误</px-text>
  <div class="m-y-20">
    <px-button color="#626aef" size="small">Button</px-button>
    <px-button color="#626aef" disabled size="small">Button</px-button>
    <px-button color="#626aef" plain size="small">Button</px-button>
    <px-button-group color="#626aef" circle size="small">
      <px-button>Button1</px-button>
      <px-button>Button2</px-button>
    </px-button-group>
  </div>
  <div class="m-y-20">
    <px-button color="#dfee56" size="small">Button</px-button>
    <px-button color="#dfee56" disabled size="small">Button</px-button>
    <px-button color="#dfee56" plain size="small">Button</px-button>
    <px-button-group color="#dfee56" round size="small">
      <px-button>Button1</px-button>
      <px-button>Button2</px-button>
    </px-button-group>
  </div>
  <div class="m-y-20">
    <px-button color="#fadbe0" size="small">Button</px-button>
    <px-button color="#fadbe0" disabled size="small">Button</px-button>
    <px-button color="#fadbe0" plain size="small">Button</px-button>
    <px-button-group color="#fadbe0" size="small">
      <px-button>Button1</px-button>
      <px-button>Button2</px-button>
    </px-button-group>
  </div>
  <px-text size="12">直接修改paintWorklet变量</px-text>
  <div class="m-y-20 paint">
    <px-button size="small">Button</px-button>
    <px-button-group size="small">
      <px-button>Button1</px-button>
      <px-button>Button2</px-button>
    </px-button-group>
  </div>
</template>
<style scoped>
.paint .px-button {
  --px-button-text-color: #554562;
  --px-border-color: #554562;
  --px-bg-color: #fadbe0;
  --px-bg-shadow-color: #eaadbd;
}
</style>
