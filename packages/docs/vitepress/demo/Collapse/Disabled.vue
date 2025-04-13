<template>
  <px-collapse v-model="activeNames" @change="handleChange">
    <px-collapse-item name="1" title="标题1">
      <div>
        大家好，初次见面! Monaka是一只普通的家猫, 危险等级为: C.A.T
        直接称呼Monaka, mnk都可以喵! 不知道为什么大家都觉得我的尾巴是撬棍,
        明明是柔软的尾巴喵! 🍗生日是8月17日,
        体重是6个苹果!喜欢吃的东西是肉和猫条喵, 讨厌的东西是黄爪,
        黄爪又吓人又难吃喵!
        平时喜欢画画和玩游戏喵!还喜欢美食鉴赏!唱歌是弱项不过会努力学习的喵!
        体能比较差, 害怕玩恐怖游戏, 但是又有点猎奇心态, 所以喜欢看别人玩嘻嘻喵!
        🍗喜欢大家在弹幕里发鸡腿喵!讨厌的话是mnk...mnk...寂しい... !! 🍗
      </div>
    </px-collapse-item>
    <px-collapse-item name="2" title="标题2" disabled> 内容2 </px-collapse-item>
    <px-collapse-item name="3" title="标题3"> 内容3 </px-collapse-item>
  </px-collapse>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { type CollapseItemName } from '@mmt817/pixel-ui'

const activeNames = ref(['1'])

const handleChange = (val: CollapseItemName[]) => {
  console.log(val)
}
</script>
