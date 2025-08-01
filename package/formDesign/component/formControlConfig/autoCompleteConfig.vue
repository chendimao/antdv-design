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
      :events="autoCompleteEvents" :formConfig="formConfig"
      @update:onChange="(fn) => modelValue.$attrs.onChange = fn"
      @update:onSelect="(fn) => modelValue.$attrs.onSelect = fn"
      @update:onSearch="(fn) => modelValue.$attrs.onSearch = fn"
      @update:onFocus="(fn) => modelValue.$attrs.onFocus = fn"
      @update:onBlur="(fn) => modelValue.$attrs.onBlur = fn"
      @update:onDropdownVisibleChange="(fn) => modelValue.$attrs.onDropdownVisibleChange = fn"
    />

    <a-form-item label="默认值">
      <a-input v-model:value="modelValue.value" />
    </a-form-item>
    <a-form-item label="选项">
      <a-textarea v-model:value="modelValue.$attrs.options" placeholder="选项配置" />
    </a-form-item>
    <a-form-item label="默认激活第一个选项">
      <a-switch v-model:checked="modelValue.$attrs.defaultActiveFirstOption" />
    </a-form-item>
    <a-form-item label="下拉菜单类名">
      <a-input v-model:value="modelValue.$attrs.popupClassName" />
    </a-form-item>
    <a-form-item label="下拉菜单样式">
      <a-input v-model:value="modelValue.$attrs.popupStyle" />
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

// 定义AutoComplete组件支持的事件
const autoCompleteEvents = [
  { key: 'onChange', label: 'change 事件' },
  { key: 'onSelect', label: 'select 事件' },
  { key: 'onSearch', label: 'search 事件' },
  { key: 'onFocus', label: 'focus 事件' },
  { key: 'onBlur', label: 'blur 事件' },
  { key: 'onDropdownVisibleChange', label: 'dropdownVisibleChange 事件' }
];
</script> 