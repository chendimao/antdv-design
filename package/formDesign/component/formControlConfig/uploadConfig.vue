<template>
  <div>
    <!-- 使用通用配置组件 -->
    <CommonConfig
      v-model:disabled="modelValue.$attrs.disabled"
      v-model:disabledType="modelValue.disabledType"
      v-model:show="modelValue.show"
      v-model:showType="modelValue.showType"
      :events="uploadEvents"  :formConfig="formConfig"
      @update:onChange="(fn) => modelValue.$attrs.onChange = fn"
      @update:onRemove="(fn) => modelValue.$attrs.onRemove = fn"
      @update:onPreview="(fn) => modelValue.$attrs.onPreview = fn"
      @update:beforeUpload="(fn) => modelValue.$attrs.beforeUpload = fn"
      @update:customRequest="(fn) => modelValue.$attrs.customRequest = fn"
    />

    <a-form-item label="接受的文件类型">
      <a-input v-model:value="modelValue.$attrs.accept" placeholder="如: .jpg,.png,.pdf" />
    </a-form-item>
    <a-form-item label="文件列表">
      <a-textarea v-model:value="modelValue.$attrs.fileList" placeholder="文件列表配置" />
    </a-form-item>
    <a-form-item label="最大文件数">
      <a-input-number v-model:value="modelValue.$attrs.maxCount" :min="1" />
    </a-form-item>
    <a-form-item label="文件大小限制(MB)">
      <a-input-number v-model:value="modelValue.$attrs.maxSize" :min="0" />
    </a-form-item>
    <a-form-item label="多选">
      <a-switch v-model:checked="modelValue.$attrs.multiple" />
    </a-form-item>
    <a-form-item label="目录上传">
      <a-switch v-model:checked="modelValue.$attrs.directory" />
    </a-form-item>
    <a-form-item label="拖拽上传">
      <a-switch v-model:checked="modelValue.$attrs.drag" />
    </a-form-item>
    <a-form-item label="显示上传列表">
      <a-switch v-model:checked="modelValue.$attrs.showUploadList" />
    </a-form-item>
    <a-form-item label="上传按钮文字">
      <a-input v-model:value="modelValue.$attrs.buttonText" />
    </a-form-item>
    <a-form-item label="上传按钮图标">
      <a-input v-model:value="modelValue.$attrs.buttonIcon" />
    </a-form-item>
    <a-form-item label="列表类型">
      <a-select v-model:value="modelValue.$attrs.listType">
        <a-select-option value="text">文本</a-select-option>
        <a-select-option value="picture">图片</a-select-option>
        <a-select-option value="picture-card">卡片</a-select-option>
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

// 定义Upload组件支持的事件
const uploadEvents = [
  { key: 'onChange', label: 'change 事件' },
  { key: 'onRemove', label: 'remove 事件' },
  { key: 'onPreview', label: 'preview 事件' },
  { key: 'beforeUpload', label: 'beforeUpload 事件' },
  { key: 'customRequest', label: 'customRequest 事件' }
];
</script> 