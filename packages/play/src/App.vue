<script setup lang="ts">
</script>

<template>
  <px-button size="small">Normal</px-button>
  <px-button type="primary" size="small">Primary</px-button>
  <px-button type="success" size="small">Success</px-button>
  <px-button type="warning" size="small">Warning</px-button>
  <px-button type="danger" size="small">Danger</px-button>
  <px-button disabled size="small">Disabled</px-button>
  <br />
  <br />
  <px-button>Normal</px-button>
  <px-button type="primary">Primary</px-button>
  <px-button type="success">Success</px-button>
  <px-button type="warning">Warning</px-button>
  <px-button type="danger">Danger</px-button>
  <px-button disabled>Disabled</px-button>
  <br />
  <br />
  <px-button size="large">Normal</px-button>
  <px-button type="primary" size="large">Primary</px-button>
  <px-button type="success" size="large">Success</px-button>
  <px-button type="warning" size="large">Warning</px-button>
  <px-button type="danger" size="large">Danger</px-button>
  <px-button disabled size="large">Disabled</px-button>
  <br />
  <br />
  <px-button round>Normal</px-button>
  <px-button type="primary" round>Primary</px-button>
  <px-button type="success" round>Success</px-button>
  <px-button type="warning" round>Warning</px-button>
  <px-button type="danger" round>Danger</px-button>
  <px-button disabled round>Disabled</px-button>
  <br />
  <br />
  <px-button circle>Normal</px-button>
  <px-button type="primary" circle>Primary</px-button>
  <px-button type="success" circle>Success</px-button>
  <px-button type="warning" circle>Warning</px-button>
  <px-button type="danger" circle>Danger</px-button>
  <px-button disabled circle>Disabled</px-button>
  <px-button disabled circle>1</px-button>
  <br />
  <br />
  <px-icon icon="face-thinking-solid"></px-icon>
  <px-icon icon="face-thinking-solid" size="30"></px-icon>
  <px-icon icon="face-thinking-solid" color="red"></px-icon>
  <px-icon icon="face-thinking-solid" type="primary"></px-icon>
  <px-icon icon="face-thinking-solid" type="success"></px-icon>
  <px-icon icon="face-thinking-solid" type="warning"></px-icon>
  <px-icon icon="face-thinking-solid" type="danger"></px-icon>
  <px-icon icon="face-thinking-solid" flip="horizontal"></px-icon>
  <px-icon icon="face-thinking-solid" flip="vertical"></px-icon>
  <px-icon icon="face-thinking-solid" flip="both"></px-icon>
  <px-icon icon="face-thinking-solid" rotation="180"></px-icon>
  <px-icon icon="face-thinking-solid" spin></px-icon>
  <px-icon icon="face-thinking-solid" bounce></px-icon>
  <px-icon icon="face-thinking-solid" shake></px-icon>
  <px-icon icon="face-thinking-solid" beat></px-icon>
  <br />
  <br />
  <px-button-group type="primary" round>
    <px-button>Button1</px-button>
    <px-button>Button2</px-button>
    <px-button>Button3</px-button>
  </px-button-group>
  <px-button-group type="success" circle>
    <px-button>Button1</px-button>
    <px-button>Button3</px-button>
  </px-button-group>
  <px-button-group type="warning">
    <px-button>Button1</px-button>
    <px-button>Button2</px-button>
    <px-button>Button3</px-button>
    <px-button>Button4</px-button>
  </px-button-group>
  <br />
  <br />
  <px-button color="#626aef">Button</px-button>
  <px-button color="#626aef" disabled>Button</px-button>
  <px-button color="#626aef" plain>Button</px-button>
  <px-button color="#dfee56">Button</px-button>
  <px-button color="#dfee56" disabled>Button</px-button>
  <px-button color="#dfee56" plain>Button</px-button>
  <br />
  <br />
  <px-card style="width: 240px;" hoverable round>
    <template #prepend>
      <px-icon icon="face-thinking-solid" size="30"></px-icon>
    </template>
    <template #header>1212</template>
    xxxx
    <template #footer>3434</template>
    <template #append>
      <px-button>Button1</px-button>
    </template>
  </px-card>
  <br />
  <br />
  <px-text>Base</px-text>
  <px-text type="primary">Primary</px-text>
  <px-text type="success">Success</px-text>
  <px-text type="warning">Warning</px-text>
  <px-text type="danger">Danger</px-text>
  <px-text size="26" color="#626aef" align="left" bold>Text</px-text>
</template>

<style scoped>

</style>
