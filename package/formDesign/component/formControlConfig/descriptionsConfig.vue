<template>
  <div>
    <!-- 使用通用配置组件 -->
    <CommonConfig
      v-model:disabled="modelValue.$attrs.disabled"
      v-model:disabledType="modelValue.disabledType"
      v-model:show="modelValue.show"
      v-model:showType="modelValue.showType"
      v-model:size="modelValue.$attrs.size"
      :events="descriptionsEvents"  :formConfig="formConfig"
    />

    <a-form-item label="默认值">
      <a-textarea v-model:value="modelValue.value" placeholder="描述列表数据" />
    </a-form-item>
    <a-form-item label="标题">
      <a-input v-model:value="modelValue.$attrs.title" placeholder="描述列表的标题" />
    </a-form-item>
    <a-form-item label="列数">
      <a-input-number v-model:value="modelValue.$attrs.column" :min="1" :max="4" />
    </a-form-item>
    <a-form-item label="布局">
      <a-select v-model:value="modelValue.$attrs.layout">
        <a-select-option value="horizontal">水平</a-select-option>
        <a-select-option value="vertical">垂直</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="边框">
      <a-switch v-model:checked="modelValue.$attrs.bordered" />
    </a-form-item>
    <a-form-item label="冒号">
      <a-switch v-model:checked="modelValue.$attrs.colon" />
    </a-form-item>
    <a-form-item label="标签样式">
      <a-select v-model:value="modelValue.$attrs.labelStyle">
        <a-select-option value="">默认</a-select-option>
        <a-select-option value="required">必填</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="内容样式">
      <a-input v-model:value="modelValue.$attrs.contentStyle" placeholder="内容样式" />
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

// 定义Descriptions组件支持的事件
const descriptionsEvents = [];
</script> 