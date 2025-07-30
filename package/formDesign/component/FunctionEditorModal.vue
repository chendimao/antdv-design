<template>
  <a-modal :visible="visible" :title="title" :footer="null"  @cancel="handleCancel" :destroyOnClose="true">
    <code-mirror
      v-model:value="code"
      :language="'javascript'"
      :height="'200px'"
      :width="'100%'"
      :showFooter="true"
      :showCheckSyntax="true"
      :placeholder="placeholder"
      @save="handleSave"
    />
  </a-modal>
</template>
<script setup>
import { ref, watch, toRefs, defineEmits } from 'vue';
import codeMirror from './codeMirror.vue';
const props = defineProps({
  visible: Boolean,
  modelValue: String,
  title: { type: String, default: '编辑函数' },
  placeholder: { type: String, default: '' }
});
const emit = defineEmits(['update:visible', 'update:modelValue', 'save']);
const code = ref(props.modelValue || 'return false;');
watch(() => props.modelValue, v => { if (v !== code.value) code.value = v; });

watch(code, v => {
  console.log(v, 27);
});

function handleSave() {
  try {
    let fn;
    const val = code.value.trim();
    console.log(val, 30);
    if (/^(function\s*\(|\(?\s*([a-zA-Z0-9_]+,?\s*){1,3}\)?\s*=>)/.test(val)) {
      // 箭头函数或function声明，直接eval
    
      // eslint-disable-next-line no-eval
      fn = eval('(' + val + ')');
    } else {
      // 只写了函数体
      // eslint-disable-next-line no-new-func
      fn = new Function('data', 'form', 'type', val);
    }
    console.log(fn, 33);
    emit('save', fn);
    emit('update:modelValue', code.value);
    emit('update:visible', false);
  } catch (e) {
    alert( e);
  }
}
function handleCancel() {
  emit('update:visible', false);
}
</script> 