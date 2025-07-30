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
      :events="timeEvents"
      @update:onChange="(fn) => modelValue.$attrs.onChange = fn"
      @update:onOpenChange="(fn) => modelValue.$attrs.onOpenChange = fn"
      @update:onFocus="(fn) => modelValue.$attrs.onFocus = fn"
      @update:onBlur="(fn) => modelValue.$attrs.onBlur = fn"
    />

    <a-form-item label="默认值">
      <a-time-picker v-model:value="modelValue.value" style="width: 100%;" />
    </a-form-item>
    <a-form-item label="格式">
      <a-input v-model:value="modelValue.$attrs.format" placeholder="如: HH:mm:ss" />
    </a-form-item>
    <a-form-item label="小时步长">
      <a-input-number v-model:value="modelValue.$attrs.hourStep" :min="1" :max="24" />
    </a-form-item>
    <a-form-item label="分钟步长">
      <a-input-number v-model:value="modelValue.$attrs.minuteStep" :min="1" :max="60" />
    </a-form-item>
    <a-form-item label="秒步长">
      <a-input-number v-model:value="modelValue.$attrs.secondStep" :min="1" :max="60" />
    </a-form-item>
    <a-form-item label="显示此刻">
      <a-switch v-model:checked="modelValue.$attrs.showNow" />
    </a-form-item>
    <a-form-item label="使用12小时制">
      <a-switch v-model:checked="modelValue.$attrs.use12Hours" />
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

// 定义TimePicker组件支持的事件
const timeEvents = [
  { key: 'onChange', label: 'change 事件' },
  { key: 'onOpenChange', label: 'openChange 事件' },
  { key: 'onFocus', label: 'focus 事件' },
  { key: 'onBlur', label: 'blur 事件' }
];
</script> 