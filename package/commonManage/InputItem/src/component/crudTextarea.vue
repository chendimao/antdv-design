<template>
  <a-textarea
    style="width: 100%;"
    :disabled="isDisabled"
    :allowClear="item.allowClear??$crudGlobalInputConfig?.allowClear"
    v-model:value="inputValue"
    v-bind="{
      ...item.$attrs,
      ...eventHandlers
    }"
  >
    <template #addonAfter v-if="item.afterText">
      {{item.afterText}}
    </template>
    <template v-for="(slot, name) in item?.$slots??[]" v-slot:[name]="data">
      <div v-render="() => slot(item, formState, formData,  data)"></div>
    </template>
  </a-textarea>
</template>

<script lang="ts" setup>
import {computed, onMounted} from 'vue';
import type { ComponentCustomProperties } from 'vue';

// 定义全局配置接口
interface CrudGlobalConfig {
  allowClear?: boolean;
  showSearch?: boolean;
  isTrim?: boolean;
}

// 扩展全局属性
declare module 'vue' {
  interface ComponentCustomProperties {
    $crudGlobalInputConfig: CrudGlobalConfig;
  }
}

// 定义事件处理函数接口
interface EventHandlers {
  onFocus?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onBlur?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onInput?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onChange?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onSubmit?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onReset?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onKeydown?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onKeypress?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onKeyup?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onClick?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onDblclick?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onMousedown?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onMouseup?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onMousemove?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onMouseover?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onMouseout?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onCopy?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onCut?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onPaste?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onDrag?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onDragstart?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onDragend?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onDragenter?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onDragover?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onDragleave?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onDrop?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onResize?: (size: { width: number; height: number }) => void;
}

interface InputFormItem {
  name?: string;
  $attrs?: EventHandlers;
  allowClear?: boolean;
  afterText?: string;
}

const props = defineProps<{
  modelValue?: any;
  validateFun?: (name: string, options: { trigger: string }) => Promise<void>;
  item: InputFormItem;
  formState?: Record<string, any>;
  formData?: Record<string, any>;
  isDisabled?: boolean;
  id?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
  (e: 'change', item, value: any, ...args: any[]): void;
}>();

const inputValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val);
    eventHandlers.onInput(val);
  }
});
onMounted(() => {
  if (props.item?.$attrs?.onMounted) {
    props.item?.$attrs?.onMounted(props.item, props.formState, props.formData);
  }
});

// 事件处理函数
const eventHandlers = {
  onFocus: (e: Event) => {
    setTimeout(() => {
      if (props.item.$attrs?.onFocus) {
        props.item.$attrs.onFocus(props.item, props.formState, props.formData, e);
      }
    }, 0);
  },
  onBlur: (e: Event) => {
    setTimeout(() => {
      if (props.validateFun && props.item?.name) {
        props.validateFun(props.item.name, { trigger: 'blur' }).catch(() => {
          // 处理错误
        });
      }
      if (props.item.$attrs?.onBlur) {
        props.item.$attrs.onBlur(props.item, props.formState, props.formData, e);
      }
    }, 0);
  },
  onInput: (val: string) => {
    setTimeout(() => {
      if (props.item.$attrs?.onInput) {
        props.item.$attrs.onInput(props.item, props.formState, props.formData, val);
      }
    }, 0);
  },
  onChange: (value: string) => {
    setTimeout(() => {
      if (props.item.$attrs?.onChange) {
        props.item.$attrs.onChange(props.item, props.formState, props.formData, value);
      }
      emit('change', props.item, value);
    }, 0);
  },
  onResize: (e: ResizeEvent) => {
    setTimeout(() => {
      if (props.item.$attrs?.onResize) {
        props.item.$attrs.onResize(props.item, props.formState, props.formData, e);
      }
    }, 0);
  }
};
</script> 