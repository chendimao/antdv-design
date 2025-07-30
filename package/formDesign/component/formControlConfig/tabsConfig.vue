<template>
  <div>
    <!-- 使用通用配置组件 -->
    <CommonConfig
      v-model:disabled="modelValue.$attrs.disabled"
      v-model:disabledType="modelValue.disabledType"
      v-model:show="modelValue.show"
      v-model:showType="modelValue.showType"
      v-model:size="modelValue.$attrs.size"
      :events="tabsEvents"
      @update:onChange="(fn) => modelValue.$attrs.onChange = fn"
      @update:onEdit="(fn) => modelValue.$attrs.onEdit = fn"
      @update:onTabClick="(fn) => modelValue.$attrs.onTabClick = fn"
      @update:onTabScroll="(fn) => modelValue.$attrs.onTabScroll = fn"
    />

    <a-form-item label="默认值">
      <a-input v-model:value="modelValue.value" placeholder="默认激活的标签页" />
    </a-form-item>
    <a-form-item label="类型">
      <a-select v-model:value="modelValue.$attrs.type">
        <a-select-option value="line">线形</a-select-option>
        <a-select-option value="card">卡片</a-select-option>
        <a-select-option value="editable-card">可编辑卡片</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="标签位置">
      <a-select v-model:value="modelValue.$attrs.tabPosition">
        <a-select-option value="top">顶部</a-select-option>
        <a-select-option value="right">右侧</a-select-option>
        <a-select-option value="bottom">底部</a-select-option>
        <a-select-option value="left">左侧</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="标签栏样式">
      <a-input v-model:value="modelValue.$attrs.tabBarStyle" placeholder="标签栏样式" />
    </a-form-item>
    <a-form-item label="标签栏类名">
      <a-input v-model:value="modelValue.$attrs.tabBarClassName" placeholder="标签栏类名" />
    </a-form-item>
    <a-form-item label="标签栏额外内容">
      <a-input v-model:value="modelValue.$attrs.tabBarExtraContent" placeholder="标签栏额外内容" />
    </a-form-item>
    <a-form-item label="标签栏Gutter">
      <a-input-number v-model:value="modelValue.$attrs.tabBarGutter" :min="0" />
    </a-form-item>
    <a-form-item label="标签栏左边距">
      <a-input-number v-model:value="modelValue.$attrs.tabBarLeft" :min="0" />
    </a-form-item>
    <a-form-item label="标签栏右边距">
      <a-input-number v-model:value="modelValue.$attrs.tabBarRight" :min="0" />
    </a-form-item>
    <a-form-item label="标签栏顶部边距">
      <a-input-number v-model:value="modelValue.$attrs.tabBarTop" :min="0" />
    </a-form-item>
    <a-form-item label="标签栏底部边距">
      <a-input-number v-model:value="modelValue.$attrs.tabBarBottom" :min="0" />
    </a-form-item>
    <a-form-item label="标签栏内边距">
      <a-input v-model:value="modelValue.$attrs.tabBarPadding" placeholder="如: 16px" />
    </a-form-item>
    <a-form-item label="标签栏外边距">
      <a-input v-model:value="modelValue.$attrs.tabBarMargin" placeholder="如: 16px" />
    </a-form-item>
    <a-form-item label="标签栏边框">
      <a-input v-model:value="modelValue.$attrs.tabBarBorder" placeholder="如: 1px solid #f0f0f0" />
    </a-form-item>
    <a-form-item label="标签栏背景">
      <a-input v-model:value="modelValue.$attrs.tabBarBackground" placeholder="如: #ffffff" />
    </a-form-item>
    <a-form-item label="标签栏圆角">
      <a-input v-model:value="modelValue.$attrs.tabBarBorderRadius" placeholder="如: 6px" />
    </a-form-item>
    <a-form-item label="标签页内容">
      <a-textarea v-model:value="modelValue.$attrs.items" placeholder="标签页配置" />
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

// 定义Tabs组件支持的事件
const tabsEvents = [
  { key: 'onChange', label: 'change 事件' },
  { key: 'onEdit', label: 'edit 事件' },
  { key: 'onTabClick', label: 'tabClick 事件' },
  { key: 'onTabScroll', label: 'tabScroll 事件' }
];
</script> 