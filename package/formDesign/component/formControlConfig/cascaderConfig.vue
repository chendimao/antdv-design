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
      :events="cascaderEvents"
      @update:onChange="(fn) => modelValue.$attrs.onChange = fn"
      @update:onSelect="(fn) => modelValue.$attrs.onSelect = fn"
      @update:onFocus="(fn) => modelValue.$attrs.onFocus = fn"
      @update:onBlur="(fn) => modelValue.$attrs.onBlur = fn"
      @update:onDropdownVisibleChange="(fn) => modelValue.$attrs.onDropdownVisibleChange = fn"
    />

    <a-form-item label="默认值">
      <a-input v-model:value="modelValue.value" placeholder="如: ['zhejiang', 'hangzhou', 'xihu']" />
    </a-form-item>
    <a-form-item label="选项">
      <a-textarea v-model:value="modelValue.$attrs.options" placeholder="级联选项配置" />
    </a-form-item>
    <a-form-item label="可搜索">
      <a-switch v-model:checked="modelValue.$attrs.showSearch" />
    </a-form-item>
    <a-form-item label="多选">
      <a-switch v-model:checked="modelValue.$attrs.multiple" />
    </a-form-item>
    <a-form-item label="标签值模式">
      <a-switch v-model:checked="modelValue.$attrs.labelInValue" />
    </a-form-item>
    <a-form-item label="展开图标">
      <a-input v-model:value="modelValue.$attrs.expandIcon" />
    </a-form-item>
    <a-form-item label="字段名">
      <a-input v-model:value="modelValue.$attrs.fieldNames" placeholder="如: { label: 'name', value: 'id', children: 'children' }" />
    </a-form-item>
    <a-form-item label="最大标签数">
      <a-input-number v-model:value="modelValue.$attrs.maxTagCount" :min="0" />
    </a-form-item>
    <a-form-item label="最大标签文本长度">
      <a-input-number v-model:value="modelValue.$attrs.maxTagTextLength" :min="0" />
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

// 定义Cascader组件支持的事件
const cascaderEvents = [
  { key: 'onChange', label: 'change 事件' },
  { key: 'onSelect', label: 'select 事件' },
  { key: 'onFocus', label: 'focus 事件' },
  { key: 'onBlur', label: 'blur 事件' },
  { key: 'onDropdownVisibleChange', label: 'dropdownVisibleChange 事件' }
];
</script> 