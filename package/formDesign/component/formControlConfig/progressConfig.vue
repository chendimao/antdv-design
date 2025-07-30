<template>
  <div>
    <!-- 使用通用配置组件 -->
    <CommonConfig
      v-model:disabled="modelValue.$attrs.disabled"
      v-model:disabledType="modelValue.disabledType"
      v-model:show="modelValue.show"
      v-model:showType="modelValue.showType"
      :events="progressEvents"
    />

    <a-form-item label="默认值">
      <a-input-number v-model:value="modelValue.value" :min="0" :max="100" style="width: 100%;" />
    </a-form-item>
    <a-form-item label="类型">
      <a-select v-model:value="modelValue.$attrs.type">
        <a-select-option value="line">线形</a-select-option>
        <a-select-option value="circle">圆形</a-select-option>
        <a-select-option value="dashboard">仪表盘</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="状态">
      <a-select v-model:value="modelValue.$attrs.status">
        <a-select-option value="">正常</a-select-option>
        <a-select-option value="success">成功</a-select-option>
        <a-select-option value="exception">异常</a-select-option>
        <a-select-option value="active">进行中</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="显示信息">
      <a-switch v-model:checked="modelValue.$attrs.showInfo" />
    </a-form-item>
    <a-form-item label="进度条宽度">
      <a-input-number v-model:value="modelValue.$attrs.strokeWidth" :min="1" />
    </a-form-item>
    <a-form-item label="进度条颜色">
      <a-input v-model:value="modelValue.$attrs.strokeColor" placeholder="如: #1890ff" />
    </a-form-item>
    <a-form-item label="轨道颜色">
      <a-input v-model:value="modelValue.$attrs.trailColor" placeholder="如: #f5f5f5" />
    </a-form-item>
    <a-form-item label="步骤">
      <a-input-number v-model:value="modelValue.$attrs.steps" :min="0" />
    </a-form-item>
    <a-form-item label="缺口角度">
      <a-input-number v-model:value="modelValue.$attrs.gapDegree" :min="0" :max="295" />
    </a-form-item>
    <a-form-item label="缺口位置">
      <a-select v-model:value="modelValue.$attrs.gapPosition">
        <a-select-option value="top">顶部</a-select-option>
        <a-select-option value="bottom">底部</a-select-option>
        <a-select-option value="left">左侧</a-select-option>
        <a-select-option value="right">右侧</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="大小">
      <a-select v-model:value="modelValue.$attrs.size">
        <a-select-option value="default">默认</a-select-option>
        <a-select-option value="small">小</a-select-option>
      </a-select>
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

// 定义Progress组件支持的事件
const progressEvents = [];
</script> 