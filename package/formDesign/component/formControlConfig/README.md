# CommonConfig 通用配置组件

## 功能概述

`CommonConfig.vue` 是一个通用的表单组件配置组件，提供了以下功能：

1. **禁用配置** - 支持布尔值和函数两种模式
2. **显示配置** - 支持布尔值和函数两种模式  
3. **校验规则配置** - 支持必填和自定义函数验证
4. **通用属性配置** - placeholder、allowClear、bordered、size、status、autoFocus
5. **事件处理配置** - 支持各种事件的自定义处理函数
6. **动态值配置** - 支持表达式和自定义函数两种模式

## Props

### 基础配置
```javascript
// 禁用相关
disabled: [Boolean, Function],
disabledType: { type: String, default: 'boolean' },

// 显示相关  
show: [Boolean, Function],
showType: { type: String, default: 'boolean' },

// 校验规则
rules: { type: Array, default: () => [] },

// 通用属性
placeholder: String,
allowClear: Boolean,
bordered: Boolean,
size: String,
status: String,
autoFocus: Boolean,
```

### 显示控制
```javascript
showPlaceholder: { type: Boolean, default: true },
showAllowClear: { type: Boolean, default: true },
showBordered: { type: Boolean, default: true },
showSize: { type: Boolean, default: true },
showStatus: { type: Boolean, default: true },
showAutoFocus: { type: Boolean, default: true },
showEvents: { type: Boolean, default: true },
showDynamicValue: { type: Boolean, default: true },
```

### 事件和动态值
```javascript
// 事件列表
events: { type: Array, default: () => [] },

// 动态值相关
dynamicValue: [String, Function],
dynamicValueType: { type: String, default: 'expression' },

// 可用字段列表
availableFields: { type: Array, default: () => [] },

// 表单配置（用于获取字段列表）
formConfig: { type: Object, default: () => ({}) }
```

## Events

```javascript
const emit = defineEmits([
  'update:disabled', 'update:disabledType', 
  'update:show', 'update:showType',
  'update:rules',
  'update:placeholder', 'update:allowClear', 'update:bordered', 
  'update:size', 'update:status', 'update:autoFocus',
  'update:dynamicValue', 'update:dynamicValueType'
]);
```

## 动态值配置

### 表达式模式
支持可视化配置表达式，可以点击字段插入到表达式中：

```javascript
// 生成的函数格式
(formState, formData) => { 
  return (formState.field1 + formState.field2) * 2 - 2; 
}
```

### 自定义函数模式
支持完整的函数编写：

```javascript
(formState, formData) => {
  const { cardForm, refs } = formState;
  return (formState.szsrk2 + formState.szsrk3) * 2 - 2;
}
```

### 字段列表获取
组件会自动从 `formConfig.value.formData` 中获取可用字段列表：

```javascript
// 字段列表格式
[
  { id: 'field1', text: '字段1' },
  { id: 'field2', text: '字段2' },
  // ...
]
```

## 使用示例

### 基础使用
```vue
<template>
  <CommonConfig
    v-model:disabled="modelValue.disabled"
    v-model:show="modelValue.show"
    v-model:placeholder="modelValue.placeholder"
    :formConfig="formConfig"
  />
</template>
```

### 完整配置
```vue
<template>
  <CommonConfig
    v-model:disabled="modelValue.disabled"
    v-model:disabledType="modelValue.disabledType"
    v-model:show="modelValue.show"
    v-model:showType="modelValue.showType"
    v-model:rules="modelValue.rules"
    v-model:placeholder="modelValue.placeholder"
    v-model:size="modelValue.size"
    v-model:status="modelValue.status"
    v-model:dynamicValue="modelValue.value"
    v-model:dynamicValueType="modelValue.dynamicValueType"
    :events="componentEvents"
    :formConfig="formConfig"
    @update:onChange="handleChange"
  />
</template>

<script setup>
const componentEvents = [
  { key: 'onChange', label: 'change 事件' },
  { key: 'onFocus', label: 'focus 事件' },
  { key: 'onBlur', label: 'blur 事件' }
];

const formConfig = {
  value: {
    formData: [
      { name: 'input_1', label: '输入框1' },
      { name: 'number_1', label: '数字框1' },
      { name: 'select_1', label: '下拉选择1' }
    ]
  }
};
</script>
```

## 校验规则配置

支持两种类型的校验规则：

### 必填规则
```javascript
{
  required: true,
  message: '此项为必填项'
}
```

### 自定义函数规则
```javascript
{
  validator: (data) => {
    const { cardForm, refs } = data;
    return new Promise((resolve, reject) => {
      if (cardForm.value.formState.describe !== 'test') {
        resolve();
      } else {
        reject('不能输入test');
      }
    });
  },
  trigger: 'blur'
}
```

## 注意事项

1. **动态值函数格式**：必须返回一个值，支持异步操作
2. **字段列表**：优先使用传入的 `availableFields`，其次从 `formConfig.value.formData` 获取
3. **语法验证**：保存前会自动验证表达式和函数的语法正确性
4. **错误处理**：提供友好的错误提示信息 