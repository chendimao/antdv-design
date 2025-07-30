<template>
  <div>
    <!-- 使用通用配置组件 -->
    <CommonConfig
      v-model:disabled="modelValue.$attrs.disabled"
      v-model:disabledType="modelValue.disabledType"
      v-model:show="modelValue.show"
      v-model:showType="modelValue.showType"
      v-model:size="modelValue.$attrs.size"
      :events="avatarEvents"
      @update:onClick="(fn) => modelValue.$attrs.onClick = fn"
    />

    <a-form-item label="默认值">
      <a-input v-model:value="modelValue.value" placeholder="头像内容" />
    </a-form-item>
    <a-form-item label="形状">
      <a-select v-model:value="modelValue.$attrs.shape">
        <a-select-option value="circle">圆形</a-select-option>
        <a-select-option value="square">方形</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="图片地址">
      <a-input v-model:value="modelValue.$attrs.src" placeholder="图片URL" />
    </a-form-item>
    <a-form-item label="图片集合">
      <a-input v-model:value="modelValue.$attrs.srcSet" placeholder="图片集合" />
    </a-form-item>
    <a-form-item label="替代文本">
      <a-input v-model:value="modelValue.$attrs.alt" placeholder="替代文本" />
    </a-form-item>
    <a-form-item label="图标">
      <a-input v-model:value="modelValue.$attrs.icon" placeholder="图标" />
    </a-form-item>
    <a-form-item label="加载失败时显示">
      <a-input v-model:value="modelValue.$attrs.fallback" placeholder="加载失败时显示的内容" />
    </a-form-item>
    <a-form-item label="图片加载失败时触发">
      <a-switch v-model:checked="modelValue.$attrs.onError" />
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

// 定义Avatar组件支持的事件
const avatarEvents = [
  { key: 'onClick', label: 'click 事件' }
];
</script> 