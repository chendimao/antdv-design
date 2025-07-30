<template>
  <div>
    <!-- 使用通用配置组件 -->
    <CommonConfig
      v-model:disabled="modelValue.$attrs.disabled"
      v-model:disabledType="modelValue.disabledType"
      v-model:show="modelValue.show"
      v-model:showType="modelValue.showType"
      :events="badgeEvents"
    />

    <a-form-item label="默认值">
      <a-input v-model:value="modelValue.value" placeholder="徽标内容" />
    </a-form-item>
    <a-form-item label="数量">
      <a-input-number v-model:value="modelValue.$attrs.count" :min="0" />
    </a-form-item>
    <a-form-item label="显示为点">
      <a-switch v-model:checked="modelValue.$attrs.dot" />
    </a-form-item>
    <a-form-item label="溢出计数">
      <a-input-number v-model:value="modelValue.$attrs.overflowCount" :min="0" />
    </a-form-item>
    <a-form-item label="状态">
      <a-select v-model:value="modelValue.$attrs.status">
        <a-select-option value="">无</a-select-option>
        <a-select-option value="success">成功</a-select-option>
        <a-select-option value="processing">处理中</a-select-option>
        <a-select-option value="default">默认</a-select-option>
        <a-select-option value="error">错误</a-select-option>
        <a-select-option value="warning">警告</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="文本">
      <a-input v-model:value="modelValue.$attrs.text" placeholder="状态文本" />
    </a-form-item>
    <a-form-item label="颜色">
      <a-input v-model:value="modelValue.$attrs.color" placeholder="徽标颜色" />
    </a-form-item>
    <a-form-item label="偏移量">
      <a-input v-model:value="modelValue.$attrs.offset" placeholder="如: [10, 10]" />
    </a-form-item>
    <a-form-item label="标题">
      <a-input v-model:value="modelValue.$attrs.title" placeholder="鼠标悬停时显示的内容" />
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

// 定义Badge组件支持的事件
const badgeEvents = [];
</script> 