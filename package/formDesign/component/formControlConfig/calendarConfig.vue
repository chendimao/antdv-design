<template>
  <div>
    <!-- 使用通用配置组件 -->
    <CommonConfig
      v-model:disabled="modelValue.$attrs.disabled"
      v-model:disabledType="modelValue.disabledType"
      v-model:show="modelValue.show"
      v-model:showType="modelValue.showType"
      :events="calendarEvents"  :formConfig="formConfig"
      @update:onChange="(fn) => modelValue.$attrs.onChange = fn"
      @update:onPanelChange="(fn) => modelValue.$attrs.onPanelChange = fn"
      @update:onSelect="(fn) => modelValue.$attrs.onSelect = fn"
    />

    <a-form-item label="默认值">
      <a-date-picker v-model:value="modelValue.value" style="width: 100%;" />
    </a-form-item>
    <a-form-item label="全屏显示">
      <a-switch v-model:checked="modelValue.$attrs.fullscreen" />
    </a-form-item>
    <a-form-item label="头部类型">
      <a-select v-model:value="modelValue.$attrs.headerRender">
        <a-select-option value="">默认</a-select-option>
        <a-select-option value="custom">自定义</a-select-option>
      </a-select>
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

// 定义Calendar组件支持的事件
const calendarEvents = [
  { key: 'onChange', label: 'change 事件' },
  { key: 'onPanelChange', label: 'panelChange 事件' },
  { key: 'onSelect', label: 'select 事件' }
];
</script> 