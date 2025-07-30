# CommonConfig 通用配置组件

## 概述

`CommonConfig.vue` 是一个通用的表单组件配置组件，用于统一管理所有表单组件的公共配置项，包括禁用、显示、通用属性和事件处理等功能。

## 功能特性

### 1. 禁用配置 (Disabled)
- 支持布尔值开关
- 支持函数动态判断
- 提供函数编辑器

### 2. 显示配置 (Show)
- 支持布尔值开关
- 支持函数动态判断
- 提供函数编辑器

### 3. 通用属性配置
- **占位符** (placeholder)
- **允许清除** (allowClear)
- **边框** (bordered)
- **尺寸** (size) - 默认/小/大
- **状态** (status) - 无/错误/警告
- **自动获取焦点** (autoFocus)

### 4. 事件处理配置
- 支持组件特定的事件列表
- 提供全屏代码编辑器
- 支持多标签页编辑
- 自动函数转换和验证

## 使用方法

### 基本用法

```vue
<template>
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
    v-model:autoFocus="modelValue.$attrs.autofocus"
    :events="componentEvents"
    @update:onChange="(fn) => modelValue.$attrs.onChange = fn"
    @update:onFocus="(fn) => modelValue.$attrs.onFocus = fn"
    @update:onBlur="(fn) => modelValue.$attrs.onBlur = fn"
  />
</template>

<script setup>
import CommonConfig from './CommonConfig.vue';

// 定义组件支持的事件
const componentEvents = [
  { key: 'onChange', label: 'change 事件' },
  { key: 'onFocus', label: 'focus 事件' },
  { key: 'onBlur', label: 'blur 事件' }
];
</script>
```

### 属性说明

#### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| disabled | Boolean/Function | - | 禁用状态 |
| disabledType | String | 'boolean' | 禁用类型：'boolean' 或 'function' |
| show | Boolean/Function | - | 显示状态 |
| showType | String | 'boolean' | 显示类型：'boolean' 或 'function' |
| placeholder | String | - | 占位符 |
| allowClear | Boolean | - | 允许清除 |
| bordered | Boolean | - | 边框 |
| size | String | - | 尺寸：'default'/'small'/'large' |
| status | String | - | 状态：''/'error'/'warning' |
| autoFocus | Boolean | - | 自动获取焦点 |
| showPlaceholder | Boolean | true | 是否显示占位符配置 |
| showAllowClear | Boolean | true | 是否显示允许清除配置 |
| showBordered | Boolean | true | 是否显示边框配置 |
| showSize | Boolean | true | 是否显示尺寸配置 |
| showStatus | Boolean | true | 是否显示状态配置 |
| showAutoFocus | Boolean | true | 是否显示自动获取焦点配置 |
| showEvents | Boolean | true | 是否显示事件处理配置 |
| events | Array | [] | 事件列表配置 |

#### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:disabled | (value) | 禁用状态更新 |
| update:disabledType | (value) | 禁用类型更新 |
| update:show | (value) | 显示状态更新 |
| update:showType | (value) | 显示类型更新 |
| update:placeholder | (value) | 占位符更新 |
| update:allowClear | (value) | 允许清除更新 |
| update:bordered | (value) | 边框更新 |
| update:size | (value) | 尺寸更新 |
| update:status | (value) | 状态更新 |
| update:autoFocus | (value) | 自动获取焦点更新 |
| update:onChange | (fn) | onChange事件更新 |
| update:onFocus | (fn) | onFocus事件更新 |
| update:onBlur | (fn) | onBlur事件更新 |
| ... | ... | 其他事件更新 |

## 已集成的组件

以下组件已经集成了 `CommonConfig`：

### 基础组件
- ✅ `inputConfig.vue` - 输入框配置
- ✅ `selectConfig.vue` - 选择器配置
- ✅ `textareaConfig.vue` - 文本域配置
- ✅ `numberConfig.vue` - 数字输入框配置
- ✅ `radioConfig.vue` - 单选框配置
- ✅ `checkboxConfig.vue` - 复选框配置
- ✅ `switchConfig.vue` - 开关配置

### 日期时间组件
- ✅ `dateConfig.vue` - 日期选择器配置
- ✅ `timeConfig.vue` - 时间选择器配置
- ✅ `datetimeConfig.vue` - 日期时间选择器配置
- ✅ `yearConfig.vue` - 年份选择器配置
- ✅ `monthConfig.vue` - 月份选择器配置
- ✅ `daterangeConfig.vue` - 日期范围选择器配置

### 高级组件
- ✅ `uploadConfig.vue` - 上传组件配置
- ✅ `sliderConfig.vue` - 滑块配置
- ✅ `rateConfig.vue` - 评分配置
- ✅ `colorPickerConfig.vue` - 颜色选择器配置
- ✅ `autoCompleteConfig.vue` - 自动完成配置
- ✅ `cascaderConfig.vue` - 级联选择器配置
- ✅ `treeSelectConfig.vue` - 树形选择器配置

### 展示组件
- ✅ `avatarConfig.vue` - 头像配置
- ✅ `badgeConfig.vue` - 徽标配置
- ✅ `descriptionsConfig.vue` - 描述列表配置
- ✅ `progressConfig.vue` - 进度条配置
- ✅ `statisticConfig.vue` - 统计数值配置
- ✅ `stepsConfig.vue` - 步骤条配置
- ✅ `tagConfig.vue` - 标签配置
- ✅ `tabsConfig.vue` - 标签页配置

## 事件配置示例

### Input 组件事件
```javascript
const inputEvents = [
  { key: 'onChange', label: 'change 事件' },
  { key: 'onInput', label: 'input 事件' },
  { key: 'onFocus', label: 'focus 事件' },
  { key: 'onBlur', label: 'blur 事件' },
  { key: 'onPressEnter', label: 'pressEnter 事件' },
  { key: 'onKeydown', label: 'keydown 事件' }
];
```

### Select 组件事件
```javascript
const selectEvents = [
  { key: 'onChange', label: 'change 事件' },
  { key: 'onSelect', label: 'select 事件' },
  { key: 'onDeselect', label: 'deselect 事件' },
  { key: 'onFocus', label: 'focus 事件' },
  { key: 'onBlur', label: 'blur 事件' },
  { key: 'onSearch', label: 'search 事件' },
  { key: 'onDropdownVisibleChange', label: 'dropdownVisibleChange 事件' }
];
```

### DatePicker 组件事件
```javascript
const dateEvents = [
  { key: 'onChange', label: 'change 事件' },
  { key: 'onOpenChange', label: 'openChange 事件' },
  { key: 'onPanelChange', label: 'panelChange 事件' },
  { key: 'onOk', label: 'ok 事件' },
  { key: 'onFocus', label: 'focus 事件' },
  { key: 'onBlur', label: 'blur 事件' }
];
```

## 优势

1. **代码复用**：避免在每个组件中重复编写相同的配置项
2. **统一管理**：所有组件的公共配置项集中管理
3. **易于维护**：修改公共配置只需要在一个地方进行
4. **功能完整**：支持禁用、显示、通用属性和事件处理等完整功能
5. **灵活配置**：可以通过props控制显示哪些配置项
6. **事件支持**：支持组件特定的事件列表配置

## 注意事项

1. 使用前需要确保 `modelValue.$attrs` 对象存在
2. 事件列表需要根据具体组件的API文档来定义
3. 函数类型的配置项会自动处理函数转换和验证
4. 所有配置项都支持双向绑定 