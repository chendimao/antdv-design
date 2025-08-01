<template>
  <div>
    <!-- 使用通用配置组件 -->
    <CommonConfig
      v-model:disabled="modelValue.$attrs.disabled"
      v-model:disabledType="modelValue.disabledType"
      v-model:show="modelValue.show"
      v-model:showType="modelValue.showType"
      v-model:placeholder="modelValue.$attrs.placeholder"
      v-model:allowClear="modelValue.$attrs.allowClear"
      v-model:bordered="modelValue.$attrs.bordered"
      v-model:size="modelValue.$attrs.size"
      v-model:status="modelValue.$attrs.status"
      v-model:autoFocus="modelValue.$attrs.autofocus"
      :events="monthEvents"  :formConfig="formConfig"
      @update:onChange="(fn) => modelValue.$attrs.onChange = fn"
      @update:onOpenChange="(fn) => modelValue.$attrs.onOpenChange = fn"
      @update:onPanelChange="(fn) => modelValue.$attrs.onPanelChange = fn"
      @update:onOk="(fn) => modelValue.$attrs.onOk = fn"
      @update:onFocus="(fn) => modelValue.$attrs.onFocus = fn"
      @update:onBlur="(fn) => modelValue.$attrs.onBlur = fn"
    />

    <a-form-item label="默认值">
      <a-date-picker v-model:value="modelValue.value" picker="month" style="width: 100%;" />
    </a-form-item>
    <a-form-item label="格式">
      <a-input v-model:value="modelValue.$attrs.format" placeholder="如: YYYY-MM" />
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

// 定义Month组件支持的事件
const monthEvents = [
  { key: 'onChange', label: 'change 事件' },
  { key: 'onOpenChange', label: 'openChange 事件' },
  { key: 'onPanelChange', label: 'panelChange 事件' },
  { key: 'onOk', label: 'ok 事件' },
  { key: 'onFocus', label: 'focus 事件' },
  { key: 'onBlur', label: 'blur 事件' }
];
</script> 