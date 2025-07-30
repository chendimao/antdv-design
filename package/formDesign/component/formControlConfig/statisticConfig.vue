<template>
  <div>
    <!-- 使用通用配置组件 -->
    <CommonConfig
      v-model:disabled="modelValue.$attrs.disabled"
      v-model:disabledType="modelValue.disabledType"
      v-model:show="modelValue.show"
      v-model:showType="modelValue.showType"
      :events="statisticEvents"
    />

    <a-form-item label="默认值">
      <a-input-number v-model:value="modelValue.value" style="width: 100%;" />
    </a-form-item>
    <a-form-item label="数值精度">
      <a-input-number v-model:value="modelValue.$attrs.precision" :min="0" :max="20" />
    </a-form-item>
    <a-form-item label="千分位分隔符">
      <a-switch v-model:checked="modelValue.$attrs.groupSeparator" />
    </a-form-item>
    <a-form-item label="前缀">
      <a-input v-model:value="modelValue.$attrs.prefix" placeholder="数值前缀" />
    </a-form-item>
    <a-form-item label="后缀">
      <a-input v-model:value="modelValue.$attrs.suffix" placeholder="数值后缀" />
    </a-form-item>
    <a-form-item label="标题">
      <a-input v-model:value="modelValue.$attrs.title" placeholder="统计数值的标题" />
    </a-form-item>
    <a-form-item label="数值样式">
      <a-input v-model:value="modelValue.$attrs.valueStyle" placeholder="数值样式" />
    </a-form-item>
    <a-form-item label="标题样式">
      <a-input v-model:value="modelValue.$attrs.titleStyle" placeholder="标题样式" />
    </a-form-item>
    <a-form-item label="前缀图标">
      <a-input v-model:value="modelValue.$attrs.prefixIcon" placeholder="前缀图标" />
    </a-form-item>
    <a-form-item label="后缀图标">
      <a-input v-model:value="modelValue.$attrs.suffixIcon" placeholder="后缀图标" />
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

// 定义Statistic组件支持的事件
const statisticEvents = [];
</script> 