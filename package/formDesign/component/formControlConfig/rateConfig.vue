<template>
  <div>
    <!-- 使用通用配置组件 -->
    <CommonConfig
      v-model:disabled="modelValue.$attrs.disabled"
      v-model:disabledType="modelValue.disabledType"
      v-model:show="modelValue.show"
      v-model:showType="modelValue.showType"
      :events="rateEvents"  :formConfig="formConfig"
      @update:onChange="(fn) => modelValue.$attrs.onChange = fn"
      @update:onHoverChange="(fn) => modelValue.$attrs.onHoverChange = fn"
    />

    <a-form-item label="默认值">
      <a-input-number v-model:value="modelValue.value" :min="0" :max="5" style="width: 100%;" />
    </a-form-item>
    <a-form-item label="字符数">
      <a-input-number v-model:value="modelValue.$attrs.count" :min="1" :max="10" />
    </a-form-item>
    <a-form-item label="允许半选">
      <a-switch v-model:checked="modelValue.$attrs.allowHalf" />
    </a-form-item>
    <a-form-item label="允许清除">
      <a-switch v-model:checked="modelValue.$attrs.allowClear" />
    </a-form-item>
    <a-form-item label="字符">
      <a-input v-model:value="modelValue.$attrs.character" placeholder="如: ★" />
    </a-form-item>
    <a-form-item label="工具提示">
      <a-switch v-model:checked="modelValue.$attrs.tooltips" />
    </a-form-item>
  </div>
</template>

<script setup>
import CommonConfig from './CommonConfig.vue';

const props = defineProps({
  modelValue: { type: Object, required: true },
  formConfig: { type: Object, required: true }
});

const emit = defineEmits(['update:modelValue']);

if (!props.modelValue.$attrs) {
  props.modelValue.$attrs = {};
}

// 定义Rate组件支持的事件
const rateEvents = [
  { key: 'onChange', label: 'change 事件' },
  { key: 'onHoverChange', label: 'hoverChange 事件' }
];
</script> 