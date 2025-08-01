<template>
  <div>
    <!-- 使用通用配置组件 -->
    <CommonConfig
      v-model:disabled="modelValue.$attrs.disabled"
      v-model:disabledType="modelValue.disabledType"
      v-model:show="modelValue.show"
      v-model:showType="modelValue.showType"
      v-model:placeholder="modelValue.$attrs.placeholder"
      v-model:size="modelValue.$attrs.size"
      v-model:status="modelValue.$attrs.status"
      v-model:autoFocus="modelValue.$attrs.autofocus"
      v-model:dynamicValue="modelValue.value"
      v-model:dynamicValueType="modelValue.dynamicValueType"
      :events="numberEvents"
      :formConfig="formConfig"
      @update:onChange="(fn) => modelValue.$attrs.onChange = fn"
      @update:onFocus="(fn) => modelValue.$attrs.onFocus = fn"
      @update:onBlur="(fn) => modelValue.$attrs.onBlur = fn"
      @update:onPressEnter="(fn) => modelValue.$attrs.onPressEnter = fn"
      @update:onKeydown="(fn) => modelValue.$attrs.onKeydown = fn"
    />

    <a-form-item label="最小值">
      <a-input-number v-model:value="modelValue.$attrs.min" />
    </a-form-item>
    <a-form-item label="最大值">
      <a-input-number v-model:value="modelValue.$attrs.max" />
    </a-form-item>
    <a-form-item label="步长">
      <a-input-number v-model:value="modelValue.$attrs.step" :min="0.01" :step="0.01" />
    </a-form-item>
    <a-form-item label="精度">
      <a-input-number v-model:value="modelValue.$attrs.precision" :min="0" />
    </a-form-item>
    <a-form-item label="字符串模式">
      <a-switch v-model:checked="modelValue.$attrs.stringMode" />
    </a-form-item>
    <a-form-item label="默认值">
      <a-input-number v-model:value="modelValue.value" />
    </a-form-item>
  </div>
</template>

<script setup>
import CommonConfig from './CommonConfig.vue';
import { computed } from 'vue';

const props = defineProps({
  modelValue: { type: Object, required: true },
  formConfig: { type: Object, required: true }
});

// 确保 modelValue 和 $attrs 存在
if (!props.modelValue) {
  console.warn('numberConfig: modelValue is undefined');
}

if (props.modelValue && !props.modelValue.$attrs) {
  props.modelValue.$attrs = {};
}

// 定义Number组件支持的事件
const numberEvents = [
  { key: 'onChange', label: 'change 事件' },
  { key: 'onFocus', label: 'focus 事件' },
  { key: 'onBlur', label: 'blur 事件' },
  { key: 'onPressEnter', label: 'pressEnter 事件' },
  { key: 'onKeydown', label: 'keydown 事件' }
];
</script> 