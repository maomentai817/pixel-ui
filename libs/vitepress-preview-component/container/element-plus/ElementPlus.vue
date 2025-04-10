<script lang="ts" setup>
import { ref, onMounted, watch, computed } from "vue";
import CodeOpen from "../../icons/code-open.vue";
import CodeClose from "../../icons/code-close.vue";
import CodeCopy from "../../icons/code-copy.vue";
import { useNameSpace } from "../../hooks/use-namespaces";
import { useCodeFold } from "../../hooks/use-codefold";
import { useCodeCopy } from "../../hooks/use-codecopy";
import { MessageNoticeService } from "../../messages/index";

interface DemoBlockProps {
  code: string;
  showCode: string;
  title: string;
  description: string;
}

const props = withDefaults(defineProps<DemoBlockProps>(), {
  title: "默认标题",
  description: "描述内容",
});

const ns = useNameSpace();
const { isCodeFold, setCodeFold } = useCodeFold();
const { clickCopy } = useCodeCopy();

const sourceCode = ref(decodeURIComponent(props.code));
const showSourceCode = ref(decodeURIComponent(props.showCode));
const sourceCodeArea = ref<any>(null);

const clickCodeCopy = () => {
  clickCopy(sourceCode.value);
  MessageNoticeService.open();
};

const sourceCodeContainerHeight = computed(() => {
  if (sourceCodeArea.value) return sourceCodeArea.value?.clientHeight;
  return 0;
});
const setContainerHeight = (value: number) => {
  if (isCodeFold.value) sourceCodeArea.value.style.height = "0px";
  else sourceCodeArea.value.style.height = `${value}px`;
};
onMounted(() => {
  // 组件挂载时，先获取代码块容器为折叠前的容器高度
  const currentContainerHeight = sourceCodeContainerHeight.value;
  setContainerHeight(currentContainerHeight);
});
watch(isCodeFold, () => {
  const container = sourceCodeContainerHeight.value;
  setContainerHeight(container);
});
</script>

<template>
  <div :class="[ns.e('element-plus__container')]">
    <section :class="[ns.bem('preview')]">
      <ClientOnly>
        <slot></slot>
      </ClientOnly>
    </section>
    <section :class="[ns.bem('description')]">
      <div :class="[ns.bem('description', 'split-line')]"></div>
      <div :class="[ns.bem('description', 'handle-btn')]">
        <CodeClose v-if="!isCodeFold" @click="setCodeFold(true)" />
        <CodeOpen v-else @click="setCodeFold(false)" />
        <CodeCopy @click="clickCodeCopy" />
      </div>
    </section>
    <section :class="[ns.bem('source')]" ref="sourceCodeArea">
      <div v-html="showSourceCode" class="language-vue"></div>
    </section>
  </div>
</template>

<style src="./element-plus.scss"></style>
