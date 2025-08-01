<template>
  <div>
    <a-form-item label="默认值">
      <a-select v-model:value="modelValue.value" :options="modelValue.$attrs.options" mode="multiple" style="width: 100%;" />
    </a-form-item>
    
    <!-- 使用通用配置组件 -->
    <CommonConfig
      v-model:disabled="modelValue.$attrs.disabled"
      v-model:disabledType="modelValue.disabledType"
      v-model:show="modelValue.show"
      v-model:showType="modelValue.showType"
      :events="checkboxEvents"  :formConfig="formConfig"
      @update:onChange="(fn) => modelValue.$attrs.onChange = fn"
      @update:onFocus="(fn) => modelValue.$attrs.onFocus = fn"
      @update:onBlur="(fn) => modelValue.$attrs.onBlur = fn"
    />
    
    <!-- 选项配置 -->
    <a-form-item label="选项配置">
      <div class="options-config">
        <div style="margin-bottom: 8px;">
          <a-select v-model:value="modelValue.$attrs.optionsValueType" style="width: 120px; margin-right: 8px;">
            <a-select-option value="string">字符串</a-select-option>
            <a-select-option value="number">数字</a-select-option>
          </a-select>
          <span>选项值类型</span>
        </div>
        <div v-for="(option, index) in modelValue.$attrs.options" :key="index" class="option-item">
          <a-input v-model:value="option.label" placeholder="选项名称" style="width: 120px; margin-right: 8px;" />
          <a-input 
            v-if="modelValue.$attrs.optionsValueType === 'string'"
            v-model:value="option.value" 
            placeholder="选项值" 
            style="width: 120px; margin-right: 8px;" 
          />
          <a-input-number 
            v-else
            v-model:value="option.value" 
            placeholder="选项值" 
            style="width: 120px; margin-right: 8px;" 
          />
          <a-button type="link" danger @click="removeOption(index)">
            <delete-outlined />
          </a-button>
        </div>
        <a-button type="dashed" @click="addOption" style="width: 100%; margin-top: 8px;">
          <plus-outlined />添加选项
        </a-button>
      </div>
    </a-form-item>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue';
import CommonConfig from './CommonConfig.vue';

const props = defineProps({
  modelValue: { type: Object, required: true },
  formConfig: { type: Object, required: true }
});

const emit = defineEmits(['update:modelValue']);

if (!props.modelValue.$attrs) {
  props.modelValue.$attrs = {};
}

// 定义Checkbox组件支持的事件
const checkboxEvents = [
  { key: 'onChange', label: 'change 事件' },
  { key: 'onFocus', label: 'focus 事件' },
  { key: 'onBlur', label: 'blur 事件' }
];

// 初始化 options
if (!Array.isArray(props.modelValue.$attrs.options)) {
  props.modelValue.$attrs.options = [
    { label: '选项1', value: '1' },
    { label: '选项2', value: '2' }
  ];
}
if (!props.modelValue.$attrs.optionsValueType) {
  props.modelValue.$attrs.optionsValueType = 'string';
}
const addOption = () => {
  props.modelValue.$attrs.options.push({
    label: `选项${props.modelValue.$attrs.options.length + 1}`,
    value: ''
  });
};
const removeOption = (index) => {
  props.modelValue.$attrs.options.splice(index, 1);
};
watch(() => props.modelValue.$attrs.optionsValueType, (val) => {
  props.modelValue.$attrs.options.forEach(option => {
    if (val === 'number') {
      option.value = option.value ? Number(option.value) : 0;
    } else {
      option.value = option.value ? String(option.value) : '';
    }
  });
});
</script>

<style scoped lang="less">
.options-config {
  .option-item {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }
}
</style> 