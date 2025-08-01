<template>
  <div>
    <!-- 使用通用配置组件 -->
    <CommonConfig
      v-model:disabled="modelValue.$attrs.disabled"
      v-model:disabledType="modelValue.disabledType"
      v-model:show="modelValue.show"
      v-model:showType="modelValue.showType"
      v-model:size="modelValue.$attrs.size"
      :events="tagEvents"  :formConfig="formConfig"
      @update:onClick="(fn) => modelValue.$attrs.onClick = fn"
      @update:onClose="(fn) => modelValue.$attrs.onClose = fn"
    />

    <a-form-item label="默认值">
      <a-input v-model:value="modelValue.value" placeholder="标签内容" />
    </a-form-item>
    <a-form-item label="颜色">
      <a-select v-model:value="modelValue.$attrs.color">
        <a-select-option value="">默认</a-select-option>
        <a-select-option value="success">成功</a-select-option>
        <a-select-option value="processing">处理中</a-select-option>
        <a-select-option value="error">错误</a-select-option>
        <a-select-option value="default">默认</a-select-option>
        <a-select-option value="warning">警告</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="图标">
      <a-input v-model:value="modelValue.$attrs.icon" placeholder="图标" />
    </a-form-item>
    <a-form-item label="可关闭">
      <a-switch v-model:checked="modelValue.$attrs.closable" />
    </a-form-item>
    <a-form-item label="边框">
      <a-switch v-model:checked="modelValue.$attrs.bordered" />
    </a-form-item>
    <a-form-item label="检查">
      <a-switch v-model:checked="modelValue.$attrs.checkable" />
    </a-form-item>
    <a-form-item label="选中状态">
      <a-switch v-model:checked="modelValue.$attrs.checked" />
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

// 定义Tag组件支持的事件
const tagEvents = [
  { key: 'onClick', label: 'click 事件' },
  { key: 'onClose', label: 'close 事件' }
];
</script> 