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
      :events="colorPickerEvents"
      @update:onChange="(fn) => modelValue.$attrs.onChange = fn"
      @update:onOpenChange="(fn) => modelValue.$attrs.onOpenChange = fn"
    />

    <a-form-item label="默认值">
      <a-input v-model:value="modelValue.value" placeholder="#000000" />
    </a-form-item>
    <a-form-item label="格式">
      <a-select v-model:value="modelValue.$attrs.format">
        <a-select-option value="hex">HEX</a-select-option>
        <a-select-option value="rgb">RGB</a-select-option>
        <a-select-option value="hsl">HSL</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="预设颜色">
      <a-input v-model:value="modelValue.$attrs.presets" placeholder="如: ['#f00', '#0f0', '#00f']" />
    </a-form-item>
    <a-form-item label="显示文本">
      <a-switch v-model:checked="modelValue.$attrs.showText" />
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

// 定义ColorPicker组件支持的事件
const colorPickerEvents = [
  { key: 'onChange', label: 'change 事件' },
  { key: 'onOpenChange', label: 'openChange 事件' }
];
</script> 