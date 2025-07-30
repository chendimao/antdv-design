<template>
  <div>
    <!-- 使用通用配置组件 -->
    <CommonConfig
      v-model:disabled="modelValue.$attrs.disabled"
      v-model:disabledType="modelValue.disabledType"
      v-model:show="modelValue.show"
      v-model:showType="modelValue.showType"
      v-model:size="modelValue.$attrs.size"
      :events="stepsEvents"
      @update:onChange="(fn) => modelValue.$attrs.onChange = fn"
    />

    <a-form-item label="默认值">
      <a-input-number v-model:value="modelValue.value" :min="0" style="width: 100%;" />
    </a-form-item>
    <a-form-item label="当前步骤">
      <a-input-number v-model:value="modelValue.$attrs.current" :min="0" />
    </a-form-item>
    <a-form-item label="方向">
      <a-select v-model:value="modelValue.$attrs.direction">
        <a-select-option value="horizontal">水平</a-select-option>
        <a-select-option value="vertical">垂直</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="标签位置">
      <a-select v-model:value="modelValue.$attrs.labelPlacement">
        <a-select-option value="horizontal">水平</a-select-option>
        <a-select-option value="vertical">垂直</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="进度点">
      <a-switch v-model:checked="modelValue.$attrs.progressDot" />
    </a-form-item>
    <a-form-item label="响应式">
      <a-switch v-model:checked="modelValue.$attrs.responsive" />
    </a-form-item>
    <a-form-item label="步骤条">
      <a-textarea v-model:value="modelValue.$attrs.items" placeholder="步骤配置" />
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

// 定义Steps组件支持的事件
const stepsEvents = [
  { key: 'onChange', label: 'change 事件' }
];
</script> 