<template>
  <div>
    <a-form-item label="默认值">
      <a-switch v-model:checked="modelValue.value" />
    </a-form-item>
    
    <!-- 使用通用配置组件 -->
    <CommonConfig
      v-model:disabled="modelValue.$attrs.disabled"
      v-model:disabledType="modelValue.disabledType"
      v-model:show="modelValue.show"
      v-model:showType="modelValue.showType"
      v-model:autoFocus="modelValue.$attrs.autofocus"
      v-model:bordered="modelValue.$attrs.bordered"
      :events="switchEvents"
      @update:onChange="(fn) => modelValue.$attrs.onChange = fn"
      @update:onClick="(fn) => modelValue.$attrs.onClick = fn"
    />

    <a-form-item label="加载中">
      <a-switch v-model:checked="modelValue.$attrs.loading" />
    </a-form-item>
    <a-form-item label="尺寸">
      <a-select v-model:value="modelValue.$attrs.size">
        <a-select-option value="default">默认</a-select-option>
        <a-select-option value="small">小</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="checkedValue">
      <a-input v-model:value="modelValue.$attrs.checkedValue" placeholder="默认: true" />
    </a-form-item>
    <a-form-item label="unCheckedValue">
      <a-input v-model:value="modelValue.$attrs.unCheckedValue" placeholder="默认: false" />
    </a-form-item>
    <a-form-item label="checkedChildren">
      <a-input v-model:value="modelValue.$attrs.checkedChildren" placeholder="开关打开时的内容" />
    </a-form-item>
    <a-form-item label="unCheckedChildren">
      <a-input v-model:value="modelValue.$attrs.unCheckedChildren" placeholder="开关关闭时的内容" />
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

// 定义Switch组件支持的事件
const switchEvents = [
  { key: 'onChange', label: 'change 事件' },
  { key: 'onClick', label: 'click 事件' }
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
