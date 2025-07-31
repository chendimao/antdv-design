# CommonConfig.vue 组件文档

## 概述

`CommonConfig.vue` 是一个通用的表单组件配置组件，用于统一管理各种表单组件的公共配置项，包括禁用状态、显示控制、通用属性、事件处理和校验规则。

## 功能特性

### 1. 禁用配置 (disabled)
- 支持布尔值开关
- 支持动态函数配置
- 可切换配置类型

### 2. 显示配置 (show)
- 支持布尔值开关
- 支持动态函数配置
- 可切换配置类型

### 3. 校验规则配置 (rules)
- 支持必填规则配置
- 支持自定义校验函数
- 可视化规则管理界面
- 自动限制只能有一个必填规则
- 支持多种触发方式（blur、change、submit）

### 4. 通用属性配置
- 占位符 (placeholder)
- 允许清除 (allowClear)
- 边框样式 (bordered)
- 尺寸大小 (size)
- 状态样式 (status)
- 自动聚焦 (autoFocus)

### 5. 事件处理配置
- 动态事件列表支持
- 代码编辑器集成
- 函数转换和保存

## Props

```javascript
const props = defineProps({
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
  
  // 显示控制
  showPlaceholder: { type: Boolean, default: true },
  showAllowClear: { type: Boolean, default: true },
  showBordered: { type: Boolean, default: true },
  showSize: { type: Boolean, default: true },
  showStatus: { type: Boolean, default: true },
  showAutoFocus: { type: Boolean, default: true },
  showEvents: { type: Boolean, default: true },
  
  // 事件列表
  events: { type: Array, default: () => [] }
});
```

## Events

```javascript
const emit = defineEmits([
  'update:disabled', 'update:disabledType', 
  'update:show', 'update:showType',
  'update:rules',
  'update:placeholder', 'update:allowClear', 'update:bordered', 
  'update:size', 'update:status', 'update:autoFocus'
  // 动态事件 emits 如 'update:onChange', 'update:onFocus' 等
]);
```

## 使用示例

### 基础用法

```vue
<template>
  <CommonConfig
    v-model:disabled="modelValue.disabled"
    v-model:disabledType="modelValue.disabledType"
    v-model:show="modelValue.show"
    v-model:showType="modelValue.showType"
    v-model:placeholder="modelValue.$attrs.placeholder"
    v-model:size="modelValue.$attrs.size"
    v-model:rules="modelValue.rules"
    :events="componentEvents"
    @update:onChange="(fn) => modelValue.$attrs.onChange = fn"
    @update:onFocus="(fn) => modelValue.$attrs.onFocus = fn"
  />
</template>

<script setup>
import CommonConfig from './CommonConfig.vue';

const componentEvents = [
  { key: 'onChange', label: 'change 事件' },
  { key: 'onFocus', label: 'focus 事件' },
  { key: 'onBlur', label: 'blur 事件' }
];
</script>
```

### 校验规则配置示例

```javascript
// 生成的校验规则格式
const rules = [
  { 
    required: true, 
    message: '请输入单位名称'
  },
  { 
    validator: (rule, value, callback) => {
      if (value && value.length < 3) {
        callback('长度不能少于3个字符');
      } else {
        callback();
      }
    }, 
    trigger: 'blur'
  }
];
```

## 已集成的组件

以下组件已成功集成 `CommonConfig.vue`：

1. `inputConfig.vue` - 输入框配置
2. `selectConfig.vue` - 选择器配置
3. `textareaConfig.vue` - 文本域配置
4. `radioConfig.vue` - 单选框配置
5. `checkboxConfig.vue` - 复选框配置
6. `switchConfig.vue` - 开关配置
7. `dateConfig.vue` - 日期选择器配置
8. `timeConfig.vue` - 时间选择器配置
9. `datetimeConfig.vue` - 日期时间选择器配置
10. `yearConfig.vue` - 年份选择器配置
11. `monthConfig.vue` - 月份选择器配置
12. `uploadConfig.vue` - 上传组件配置
13. `sliderConfig.vue` - 滑块配置
14. `rateConfig.vue` - 评分配置
15. `colorPickerConfig.vue` - 颜色选择器配置
16. `autoCompleteConfig.vue` - 自动完成配置
17. `cascaderConfig.vue` - 级联选择器配置
18. `treeSelectConfig.vue` - 树选择器配置
19. `avatarConfig.vue` - 头像配置
20. `badgeConfig.vue` - 徽标配置
21. `descriptionsConfig.vue` - 描述列表配置
22. `progressConfig.vue` - 进度条配置
23. `statisticConfig.vue` - 统计数值配置
24. `stepsConfig.vue` - 步骤条配置
25. `tagConfig.vue` - 标签配置
26. `tabsConfig.vue` - 标签页配置
27. `calendarConfig.vue` - 日历配置
28. `numberConfig.vue` - 数字输入框配置

## 校验规则配置详解

### 规则类型

1. **必填规则 (required)**
   - 只能存在一个必填规则
   - 可自定义提示信息
   - 自动转换为 `{ required: true, message: '提示信息' }`

2. **自定义函数规则 (custom)**
   - 支持多种触发方式：blur、change、submit
   - 使用代码编辑器编写校验函数
   - 自动转换为 `{ validator: function, trigger: 'blur' }`

### 校验函数格式

```javascript
// Promise 格式（推荐）
(data) => {
  const {cardForm, refs} = data;
  return new Promise((resolve, reject) => {
    if (cardForm.value.formState.describe !== 'test') {
      resolve();
    } else {
      reject('不能输入test');
    }
  });
}

// 传统 callback 格式（兼容）
function(rule, value, callback) {
  if (!value) {
    callback('请输入内容');
  } else if (value.length < 3) {
    callback('长度不能少于3个字符');
  } else {
    callback();
  }
}
```

### 触发方式说明

- **blur**: 失去焦点时触发校验
- **change**: 值改变时触发校验
- **submit**: 表单提交时触发校验

### 校验函数参数说明

#### Promise 格式
- **data**: 包含表单数据和引用的对象
  - `cardForm`: 表单数据对象
  - `refs`: 组件引用对象
- **resolve()**: 调用表示校验通过
- **reject('错误信息')**: 调用表示校验失败

#### 传统格式
- **rule**: 校验规则对象
- **value**: 当前字段值
- **callback(error)**: 回调函数，传入错误信息表示校验失败，不传参数表示校验通过

## 注意事项

1. 校验规则中的必填规则只能存在一个，添加新的必填规则会自动将原有的必填规则转换为自定义规则
2. 自定义校验函数必须调用 `callback()` 来结束校验
3. 事件处理函数支持动态添加，通过 `events` 数组配置
4. 所有配置项都支持双向绑定，使用 `v-model:` 语法
5. 函数类型的配置项会自动转换为字符串进行编辑，保存时再转换回函数对象 