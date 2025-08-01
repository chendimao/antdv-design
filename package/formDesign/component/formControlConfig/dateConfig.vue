<template>
  <div>
    <a-form-item label="默认值">
      <a-date-picker v-model:value="modelValue.value" style="width: 100%;" />
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
      v-model:autoFocus="modelValue.$attrs.autoFocus"
      :events="dateEvents"  :formConfig="formConfig"
      @update:onChange="(fn) => modelValue.$attrs.onChange = fn"
      @update:onOpenChange="(fn) => modelValue.$attrs.onOpenChange = fn"
      @update:onPanelChange="(fn) => modelValue.$attrs.onPanelChange = fn"
      @update:onOk="(fn) => modelValue.$attrs.onOk = fn"
      @update:onFocus="(fn) => modelValue.$attrs.onFocus = fn"
      @update:onBlur="(fn) => modelValue.$attrs.onBlur = fn"
    />

    <a-form-item label="显示时间">
      <a-switch v-model:checked="modelValue.$attrs.showTime" />
    </a-form-item>
    <a-form-item label="格式">
      <a-input v-model:value="modelValue.$attrs.format" placeholder="如: YYYY-MM-DD" />
    </a-form-item>
    <a-form-item label="选择器类型">
      <a-select v-model:value="modelValue.$attrs.picker">
        <a-select-option value="date">日期</a-select-option>
        <a-select-option value="week">周</a-select-option>
        <a-select-option value="month">月</a-select-option>
        <a-select-option value="quarter">季度</a-select-option>
        <a-select-option value="year">年</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="只读">
      <a-switch v-model:checked="modelValue.$attrs.inputReadOnly" />
    </a-form-item>
    <a-form-item label="显示今天">
      <a-switch v-model:checked="modelValue.$attrs.showToday" />
    </a-form-item>
    <a-form-item label="显示此刻">
      <a-switch v-model:checked="modelValue.$attrs.showNow" />
    </a-form-item>
    <a-form-item label="弹窗类名">
      <a-input v-model:value="modelValue.$attrs.popupClassName" />
    </a-form-item>
    <a-form-item label="弹窗样式">
      <a-input v-model:value="modelValue.$attrs.popupStyle" />
    </a-form-item>
    <a-form-item label="自定义类名">
      <a-input v-model:value="modelValue.$attrs.class" />
    </a-form-item>
    <a-form-item label="自定义样式">
      <a-input v-model:value="modelValue.$attrs.style" />
    </a-form-item>
    <a-form-item label="后缀图标">
      <a-input v-model:value="modelValue.$attrs.suffixIcon" />
    </a-form-item>
    <a-form-item label="面板模式">
      <a-select v-model:value="modelValue.$attrs.mode">
        <a-select-option value="date">日期</a-select-option>
        <a-select-option value="month">月份</a-select-option>
        <a-select-option value="year">年份</a-select-option>
        <a-select-option value="decade">十年</a-select-option>
        <a-select-option value="time">时间</a-select-option>
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

// 定义DatePicker组件支持的事件
const dateEvents = [
  { key: 'onChange', label: 'change 事件' },
  { key: 'onOpenChange', label: 'openChange 事件' },
  { key: 'onPanelChange', label: 'panelChange 事件' },
  { key: 'onOk', label: 'ok 事件' },
  { key: 'onFocus', label: 'focus 事件' },
  { key: 'onBlur', label: 'blur 事件' }
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