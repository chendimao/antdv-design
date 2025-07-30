<template>
  <div>
    <a-form-item label="默认值">
      <div class="default-value-config">
        <a-select v-model:value="modelValue.$attrs.defaultValueType" style="width: 88px; margin-right: 8px;">
          <a-select-option value="string">字符串</a-select-option>
          <a-select-option value="number">数字</a-select-option>
        </a-select>
        <a-input 
          v-if="modelValue.$attrs.defaultValueType === 'string'"
          v-model:value="modelValue.value" 
          placeholder="请输入默认值" 
          style="width: calc(100% - 88px);" 
        />
        <a-input-number 
          v-else
          v-model:value="modelValue.value" 
          placeholder="请输入默认值" 
          style="width: calc(100% - 88px);" 
        />
      </div>
    </a-form-item>

    <!-- 使用通用配置组件 -->
    <CommonConfig
      v-model:disabled="modelValue.$attrs.disabled"
      v-model:disabledType="modelValue.disabledType"
      v-model:show="modelValue.show"
      v-model:showType="modelValue.showType"
      v-model:size="modelValue.$attrs.size"
      :events="radioEvents"
      @update:onChange="(fn) => modelValue.$attrs.onChange = fn"
      @update:onFocus="(fn) => modelValue.$attrs.onFocus = fn"
      @update:onBlur="(fn) => modelValue.$attrs.onBlur = fn"
    />

    <!-- RadioGroup 配置 -->
    <a-form-item label="按钮样式">
      <a-select v-model:value="modelValue.$attrs.buttonStyle">
        <a-select-option value="outline">描边</a-select-option>
        <a-select-option value="solid">实心</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="选项类型">
      <a-select v-model:value="modelValue.$attrs.optionType">
        <a-select-option value="default">默认</a-select-option>
        <a-select-option value="button">按钮</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="名称">
      <a-input v-model:value="modelValue.$attrs.name" />
    </a-form-item>

    <!-- Radio 配置 -->
    <a-form-item label="自动获取焦点">
      <a-switch v-model:checked="modelValue.$attrs.autofocus" />
    </a-form-item>
    <a-form-item label="选中状态">
      <a-switch v-model:checked="modelValue.$attrs.checked" />
    </a-form-item>

    <!-- 选项配置 -->
    <a-form-item label="选项配置">
      <div class="options-config">
        <div style="margin-bottom: 8px;">
          <a-select v-model:value="modelValue.$attrs.optionsValueType" style="width: 88px; margin-right: 8px;">
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

    <!-- CSS 配置 -->
    <a-form-item label="CSS样式">
      <a-button @click="cssEditorVisible = true" type="primary" size="small">编辑CSS</a-button>
    </a-form-item>

    <!-- CSS编辑器模态框 -->
    <a-modal
      v-model:visible="cssEditorVisible"
      title="CSS样式编辑"
      width="100%"
      :footer="null"
      wrap-class-name="full-modal"
      :bodyStyle="{ padding: '0' }"
      :style="{ top: 0 }"
      :destroyOnClose="true"
    >
      <div style="height: calc(100vh - 130px);">
        <code-mirror
          v-model:value="modelValue.css"
          :options="{ 
            theme: 'monokai',
            lineNumbers: true,
            lineWrapping: true,
            tabSize: 2,
            indentUnit: 2,
            matchBrackets: true,
            autoCloseBrackets: true,
            styleActiveLine: true
          }"
          :showSave="false"
          :language="'css'"
          :height="'calc(100vh - 180px)'"
          :width="'100%'"
        />
        <div class="editor-footer">
          <a-button @click="cssEditorVisible = false">关闭</a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, watch, ref } from 'vue';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue';
import CodeMirror from '../codeMirror.vue';
import CommonConfig from './CommonConfig.vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

// 定义Radio组件支持的事件
const radioEvents = [
  { key: 'onChange', label: 'change 事件' },
  { key: 'onFocus', label: 'focus 事件' },
  { key: 'onBlur', label: 'blur 事件' }
];

// 初始化配置
const initConfig = () => {
  // 确保 $attrs 存在
  if (!props.modelValue.$attrs) {
    props.modelValue.$attrs = {};
  }

  // 处理 options 优先级
  const options = props.modelValue.$attrs.options || props.modelValue.options || [
    { label: '选项1', value: '1' },
    { label: '选项2', value: '2' }
  ];

  // 确保每个选项都有 valueType
  options.forEach(option => {
    if (!option.valueType) {
      option.valueType = typeof option.value === 'number' ? 'number' : 'string';
    }
  });

  // 初始化所有配置项
  const defaultConfig = {
    // RadioGroup 配置
    buttonStyle: props.modelValue.$attrs.buttonStyle || 'outline',
    disabled: props.modelValue.$attrs.disabled || false,
    name: props.modelValue.$attrs.name || '',
    options: options,
    optionType: props.modelValue.$attrs.optionType || 'default',
    size: props.modelValue.$attrs.size || 'default', 
    defaultValueType: props.modelValue.$attrs.defaultValueType || (typeof props.modelValue.value === 'number' ? 'number' : 'string'),

    // Radio 配置
    autofocus: props.modelValue.$attrs.autofocus || false,
    checked: props.modelValue.$attrs.checked || false,

    // 事件处理
    onChange: props.modelValue.$attrs.onChange || ((...data) => {})
  };

  // 更新配置
  Object.assign(props.modelValue.$attrs, defaultConfig);
  
  // 确保 options 同步到 modelValue
  props.modelValue.options = options;

  // 初始化 css 属性
  if (!props.modelValue.css) {
    props.modelValue.css = '';
  }
};

// 监听 modelValue 变化，初始化配置
watch(() => props.modelValue, () => {
  initConfig();
}, { immediate: true, deep: true });

// 处理选项值类型变化
const handleValueTypeChange = (index) => {
  const option = props.modelValue.$attrs.options[index];
  if (option.valueType === 'number') {
    option.value = option.value ? Number(option.value) : 0;
  } else {
    option.value = option.value ? String(option.value) : '';
  }
};

// 添加选项
const addOption = () => {
  props.modelValue.$attrs.options.push({
    label: `选项${props.modelValue.$attrs.options.length + 1}`,
    value: ''
  });
};

// 删除选项
const removeOption = (index) => {
  props.modelValue.$attrs.options.splice(index, 1);
};

// CSS编辑器相关
const cssEditorVisible = ref(false);
</script>

<style scoped lang="less">
.radio-config {
  .options-config {
    .option-item {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
    }
  }
  .default-value-config {
    display: flex;
    align-items: center;
  }
}

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