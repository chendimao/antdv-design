<template>
  <div>
    <a-form-item label="默认值">
      <a-input v-model:value="modelValue.value" />
    </a-form-item>
    
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
      :events="textareaEvents"
      @update:onChange="(fn) => modelValue.$attrs.onChange = fn"
      @update:onInput="(fn) => modelValue.$attrs.onInput = fn"
      @update:onFocus="(fn) => modelValue.$attrs.onFocus = fn"
      @update:onBlur="(fn) => modelValue.$attrs.onBlur = fn"
      @update:onPressEnter="(fn) => modelValue.$attrs.onPressEnter = fn"
      @update:onKeydown="(fn) => modelValue.$attrs.onKeydown = fn"
      @update:onResize="(fn) => modelValue.$attrs.onResize = fn"
    />

    <a-form-item label="最大长度(maxLength)">
      <a-input-number v-model:value="modelValue.$attrs.maxLength" :min="1" />
    </a-form-item>
    <a-form-item label="行数(rows)">
      <a-input-number v-model:value="modelValue.$attrs.rows" :min="1" />
    </a-form-item>
    <a-form-item label="自动调整高度(autoSize)">
      <a-switch v-model:checked="modelValue.$attrs.autoSize" />
    </a-form-item>
    <a-form-item label="显示字数(showCount)">
      <a-switch v-model:checked="modelValue.$attrs.showCount" />
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

// 定义Textarea组件支持的事件
const textareaEvents = [
  { key: 'onChange', label: 'change 事件' },
  { key: 'onInput', label: 'input 事件' },
  { key: 'onFocus', label: 'focus 事件' },
  { key: 'onBlur', label: 'blur 事件' },
  { key: 'onPressEnter', label: 'pressEnter 事件' },
  { key: 'onKeydown', label: 'keydown 事件' },
  { key: 'onResize', label: 'resize 事件' }
];
</script>

<style scoped lang="less">
:deep(.full-modal) {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .ant-modal-body {
    flex: 1;
  }
}

.editor-footer {
  padding: 10px;
  text-align: right;
  border-top: 1px solid #f0f0f0;
}
</style> 