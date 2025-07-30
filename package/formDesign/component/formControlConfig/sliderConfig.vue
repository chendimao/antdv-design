<template>
  <div>
    <!-- 使用通用配置组件 -->
    <CommonConfig
      v-model:disabled="modelValue.$attrs.disabled"
      v-model:disabledType="modelValue.disabledType"
      v-model:show="modelValue.show"
      v-model:showType="modelValue.showType"
      :events="sliderEvents"
      @update:onChange="(fn) => modelValue.$attrs.onChange = fn"
      @update:onAfterChange="(fn) => modelValue.$attrs.onAfterChange = fn"
    />

    <a-form-item label="默认值">
      <a-input-number v-model:value="modelValue.value" style="width: 100%;" />
    </a-form-item>
    <a-form-item label="最小值">
      <a-input-number v-model:value="modelValue.$attrs.min" />
    </a-form-item>
    <a-form-item label="最大值">
      <a-input-number v-model:value="modelValue.$attrs.max" />
    </a-form-item>
    <a-form-item label="步长">
      <a-input-number v-model:value="modelValue.$attrs.step" :min="0" />
    </a-form-item>
    <a-form-item label="范围选择">
      <a-switch v-model:checked="modelValue.$attrs.range" />
    </a-form-item>
    <a-form-item label="垂直方向">
      <a-switch v-model:checked="modelValue.$attrs.vertical" />
    </a-form-item>
    <a-form-item label="反向">
      <a-switch v-model:checked="modelValue.$attrs.reverse" />
    </a-form-item>
    <a-form-item label="显示标记">
      <a-switch v-model:checked="modelValue.$attrs.marks" />
    </a-form-item>
    <a-form-item label="显示工具提示">
      <a-switch v-model:checked="modelValue.$attrs.tooltipVisible" />
    </a-form-item>
    <a-form-item label="显示输入框">
      <a-switch v-model:checked="modelValue.$attrs.inputNumber" />
    </a-form-item>
  </div>
</template>

<script setup>
import CommonConfig from './CommonConfig.vue';

const props = defineProps({
  modelValue: { type: Object, required: true }
});

const emit = defineEmits(['update:modelValue']);

if (!props.modelValue.$attrs) {
  props.modelValue.$attrs = {};
}

// 定义Slider组件支持的事件
const sliderEvents = [
  { key: 'onChange', label: 'change 事件' },
  { key: 'onAfterChange', label: 'afterChange 事件' }
];
</script> 