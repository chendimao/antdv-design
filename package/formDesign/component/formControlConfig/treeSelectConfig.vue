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
      :events="treeSelectEvents"  :formConfig="formConfig"
      @update:onChange="(fn) => modelValue.$attrs.onChange = fn"
      @update:onSelect="(fn) => modelValue.$attrs.onSelect = fn"
      @update:onSearch="(fn) => modelValue.$attrs.onSearch = fn"
      @update:onFocus="(fn) => modelValue.$attrs.onFocus = fn"
      @update:onBlur="(fn) => modelValue.$attrs.onBlur = fn"
      @update:onDropdownVisibleChange="(fn) => modelValue.$attrs.onDropdownVisibleChange = fn"
    />

    <a-form-item label="默认值">
      <a-input v-model:value="modelValue.value" placeholder="如: 'parent 1-0'" />
    </a-form-item>
    <a-form-item label="树数据">
      <a-textarea v-model:value="modelValue.$attrs.treeData" placeholder="树形数据配置" />
    </a-form-item>
    <a-form-item label="多选">
      <a-switch v-model:checked="modelValue.$attrs.multiple" />
    </a-form-item>
    <a-form-item label="可搜索">
      <a-switch v-model:checked="modelValue.$attrs.showSearch" />
    </a-form-item>
    <a-form-item label="标签值模式">
      <a-switch v-model:checked="modelValue.$attrs.labelInValue" />
    </a-form-item>
    <a-form-item label="树默认展开所有">
      <a-switch v-model:checked="modelValue.$attrs.treeDefaultExpandAll" />
    </a-form-item>
    <a-form-item label="树默认展开的键">
      <a-input v-model:value="modelValue.$attrs.treeDefaultExpandedKeys" placeholder="如: ['0-0', '0-0-0']" />
    </a-form-item>
    <a-form-item label="树展开图标">
      <a-input v-model:value="modelValue.$attrs.treeExpandIcon" />
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
  modelValue: { type: Object, required: true },
  formConfig: { type: Object, required: true }
});

const emit = defineEmits(['update:modelValue']);

if (!props.modelValue.$attrs) {
  props.modelValue.$attrs = {};
}

// 定义TreeSelect组件支持的事件
const treeSelectEvents = [
  { key: 'onChange', label: 'change 事件' },
  { key: 'onSelect', label: 'select 事件' },
  { key: 'onSearch', label: 'search 事件' },
  { key: 'onFocus', label: 'focus 事件' },
  { key: 'onBlur', label: 'blur 事件' },
  { key: 'onDropdownVisibleChange', label: 'dropdownVisibleChange 事件' }
];
</script> 