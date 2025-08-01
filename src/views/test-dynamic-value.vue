<template>
  <div class="test-dynamic-value">
    <h2>动态值配置测试</h2>
    
    <div class="form-container">
      <h3>表单设计器</h3>
      <FormDesign />
    </div>
    
    <div class="result-container">
      <h3>生成的动态值函数</h3>
      <pre>{{ dynamicValueResult }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import FormDesign from '../../package/formDesign/index.vue';

// 模拟表单数据
const formState = ref({
  input_1: 10,
  number_1: 20,
  select_1: 30,
  date_1: 40
});

const formData = ref([
  { name: 'input_1', label: '输入框1' },
  { name: 'number_1', label: '数字框1' },
  { name: 'select_1', label: '下拉选择1' },
  { name: 'date_1', label: '日期选择1' }
]);

// 示例动态值函数
const dynamicValueResult = computed(() => {
  return {
    expression: '(formState, formData) => { return (formState.input_1 + formState.number_1) * 2 - 2; }',
    function: `(formState, formData) => {
  return (formState.input_1 + formState.number_1) * 2 - 2;
}`,
    result: (() => {
      try {
        const func = new Function('formState, formData', 'return (formState.input_1 + formState.number_1) * 2 - 2;');
        return func(formState.value, formData.value);
      } catch (error) {
        return `计算错误: ${error.message}`;
      }
    })()
  };
});
</script>

<style scoped>
.test-dynamic-value {
  padding: 20px;
  display: flex;
  gap: 20px;
}

.form-container {
  flex: 1;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding: 16px;
}

.result-container {
  flex: 1;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding: 16px;
}

pre {
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 12px;
  line-height: 1.4;
}

h2, h3 {
  margin-top: 0;
  color: #1890ff;
}
</style> 