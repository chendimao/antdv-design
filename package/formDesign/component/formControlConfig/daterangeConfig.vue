<template>
  <div>
    <a-form-item label="占位符">
      <a-input v-model:value="modelValue.$attrs.placeholder" />
    </a-form-item>
    <a-form-item label="禁用">
      <a-switch v-model:checked="modelValue.$attrs.disabled" />
    </a-form-item>
    <a-form-item label="格式">
      <a-input v-model:value="modelValue.$attrs.format" placeholder="如: YYYY-MM-DD" />
    </a-form-item>
    <a-form-item label="显示时间">
      <a-switch v-model:checked="modelValue.$attrs.showTime" />
    </a-form-item>
    <a-form-item label="默认值">
      <a-range-picker v-model:value="modelValue.value" style="width: 100%;" />
    </a-form-item>
  </div>
</template>
<script setup>
const props = defineProps({
  modelValue: { type: Object, required: true }
});
if (!props.modelValue.$attrs) {
  props.modelValue.$attrs = {};
}
</script> 