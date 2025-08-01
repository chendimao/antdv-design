<template>
  <div>
    <a-form-item label="默认值">
      <a-input v-model:value="modelValue.value"  />
    </a-form-item>
    
    <!-- 使用通用配置组件 -->
    <CommonConfig
      v-model:disabled="modelValue.disabled"
      v-model:disabledType="modelValue.disabledType"
      v-model:show="modelValue.show"
      v-model:showType="modelValue.showType"
      v-model:placeholder="modelValue.$attrs.placeholder"
      v-model:allowClear="modelValue.$attrs.allowClear"
      v-model:bordered="modelValue.$attrs.bordered"
      v-model:size="modelValue.$attrs.size"
      v-model:status="modelValue.$attrs.status"
      v-model:autoFocus="modelValue.$attrs.autofocus"
      v-model:rules="modelValue.rules"
      :events="inputEvents"  :formConfig="formConfig"
      @update:onChange="(fn) => modelValue.$attrs.onChange = fn"
      @update:onInput="(fn) => modelValue.$attrs.onInput = fn"
      @update:onFocus="(fn) => modelValue.$attrs.onFocus = fn"
      @update:onBlur="(fn) => modelValue.$attrs.onBlur = fn"
      @update:onPressEnter="(fn) => modelValue.$attrs.onPressEnter = fn"
      @update:onKeydown="(fn) => modelValue.$attrs.onKeydown = fn"
    />

    <a-form-item label="最大长度">
      <a-input-number v-model:value="modelValue.$attrs.maxLength" :min="1"  />
    </a-form-item>
    <a-form-item label="只读">
      <a-switch v-model:checked="modelValue.$attrs.readonly"   />
    </a-form-item>
    <a-form-item label="前缀">
      <a-input v-model:value="modelValue.$attrs.prefix" />
    </a-form-item>
    <a-form-item label="后缀">
      <a-input v-model:value="modelValue.$attrs.suffix" />
    </a-form-item>
    <a-form-item label="前置标签">
      <a-input v-model:value="modelValue.$attrs.addonBefore"   />
    </a-form-item>
    <a-form-item label="后置标签">
      <a-input v-model:value="modelValue.$attrs.addonAfter"   />
    </a-form-item>
    <a-form-item label="显示字数">
      <a-switch v-model:checked="modelValue.$attrs.showCount"   />
    </a-form-item>
    <a-form-item label="输入类型">
      <a-select v-model:value="modelValue.$attrs.type" >
        <a-select-option value="text">文本</a-select-option>
        <a-select-option value="password">密码</a-select-option>
        <a-select-option value="number">数字</a-select-option>
        <a-select-option value="email">邮箱</a-select-option>
        <a-select-option value="tel">电话</a-select-option>
        <a-select-option value="url">URL</a-select-option>
        <a-select-option value="search">搜索</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="自动完成">
      <a-input v-model:value="modelValue.$attrs.autocomplete"   placeholder="如: on/off/new-password" />
    </a-form-item>
    <a-form-item label="输入模式">
      <a-select v-model:value="modelValue.$attrs.inputmode"  >
        <a-select-option value="">默认</a-select-option>
        <a-select-option value="numeric">数字</a-select-option>
        <a-select-option value="decimal">小数</a-select-option>
        <a-select-option value="tel">电话</a-select-option>
        <a-select-option value="email">邮箱</a-select-option>
        <a-select-option value="search">搜索</a-select-option>
        <a-select-option value="url">URL</a-select-option>
      </a-select>
    </a-form-item>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { watch } from 'vue';
import CommonConfig from './CommonConfig.vue';
            
const props = defineProps({
  modelValue: { type: Object, required: true },
  formConfig: { type: Object, required: true }
});

const emit = defineEmits(['update:modelValue']);

if (!props.modelValue.$attrs) {
  props.modelValue.$attrs = {};
}

// 初始化校验规则
if (!props.modelValue.rules) {
  props.modelValue.rules = [];
}
            
// 定义Input组件支持的事件
const inputEvents = [
  { key: 'onChange', label: 'change 事件' },
  { key: 'onInput', label: 'input 事件' },
  { key: 'onFocus', label: 'focus 事件' },
  { key: 'onBlur', label: 'blur 事件' },
  { key: 'onPressEnter', label: 'pressEnter 事件' },
  { key: 'onKeydown', label: 'keydown 事件' }
];
            
// 自动设置disabledType和默认值
if (typeof props.modelValue.disabled === 'function') {
  props.modelValue.disabledType = 'function';
} else {
  props.modelValue.disabledType = 'boolean';
}
if (props.modelValue.disabledType === 'boolean' && typeof props.modelValue.disabled !== 'boolean') {
  props.modelValue.disabled = false;
}
if (props.modelValue.disabledType === 'function' && typeof props.modelValue.disabled !== 'function') {
  props.modelValue.disabled = function(data, form, type) { return false; };
}
            
// 自动设置showType和默认值
if (typeof props.modelValue.show === 'function') {
  props.modelValue.showType = 'function';
} else {
  props.modelValue.showType = 'boolean';
}
if (props.modelValue.showType === 'boolean' && typeof props.modelValue.show !== 'boolean') {
  props.modelValue.show = true;
}
if (props.modelValue.showType === 'function' && typeof props.modelValue.show !== 'function') {
  props.modelValue.show = function(data, form, type) { return true; };
}
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