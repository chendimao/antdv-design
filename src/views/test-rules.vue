<template>
  <div class="test-rules-page">
    <h1>校验规则功能测试</h1>
    
    <div class="test-section">
      <h2>1. 基础表单测试</h2>
      <a-form :model="formData" :rules="formRules" ref="formRef">
        <a-form-item label="用户名" name="username">
          <a-input v-model:value="formData.username" placeholder="请输入用户名" />
        </a-form-item>
        
        <a-form-item label="邮箱" name="email">
          <a-input v-model:value="formData.email" placeholder="请输入邮箱" />
        </a-form-item>
        
        <a-form-item label="手机号" name="phone">
          <a-input v-model:value="formData.phone" placeholder="请输入手机号" />
        </a-form-item>
        
        <a-form-item>
          <a-button type="primary" @click="handleSubmit">提交</a-button>
          <a-button @click="handleReset" style="margin-left: 8px;">重置</a-button>
          <a-button @click="testCustomValidator" style="margin-left: 8px;">测试自定义校验</a-button>
        </a-form-item>
      </a-form>
    </div>
    
    <div class="test-section">
      <h2>2. 当前校验规则</h2>
      <pre>{{ JSON.stringify(formRules, null, 2) }}</pre>
    </div>
    
    <div class="test-section">
      <h2>3. 表单数据</h2>
      <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
    
    <div class="test-section">
      <h2>4. 测试自定义校验函数</h2>
      <a-button @click="testValidatorFunction" type="primary">测试校验函数</a-button>
      <div style="margin-top: 10px;">
        <p>测试结果: {{ testResult }}</p>
      </div>
    </div>

    <div class="test-section">
      <h2>5. Promise 格式校验函数演示</h2>
      <a-form :model="promiseFormData" :rules="promiseFormRules" ref="promiseFormRef">
        <a-form-item label="描述" name="describe">
          <a-input v-model:value="promiseFormData.describe" placeholder="输入描述，不能输入'test'" />
        </a-form-item>
        
        <a-form-item label="数量" name="quantity">
          <a-input-number v-model:value="promiseFormData.quantity" placeholder="输入数量" />
        </a-form-item>
        
        <a-form-item>
          <a-button type="primary" @click="handlePromiseSubmit">提交</a-button>
          <a-button @click="handlePromiseReset" style="margin-left: 8px;">重置</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { message } from 'ant-design-vue';

const formRef = ref();
const promiseFormRef = ref();
const testResult = ref('');
const formData = reactive({
  username: '',
  email: '',
  phone: ''
});

// Promise 格式校验函数演示数据
const promiseFormData = reactive({
  describe: '',
  quantity: null
});

// Promise 格式校验规则
const promiseFormRules = reactive({
  describe: [
    { required: true, message: '请输入描述' },
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
  ],
  quantity: [
    {
      validator: (data) => {
        const { cardForm, refs } = data;
        return new Promise((resolve, reject) => {
          const quantity = cardForm.value.formState.quantity;
          if (!quantity) {
            resolve();
          } else if (quantity < 1) {
            reject('数量不能小于1');
          } else if (quantity > 100) {
            reject('数量不能大于100');
          } else {
            resolve();
          }
        });
      },
      trigger: 'blur'
    }
  ]
});

// 示例校验规则
const formRules = reactive({
  username: [
    { required: true, message: '请输入用户名' },
    { 
      validator: (rule, value, callback) => {
        if (value && value.length < 3) {
          callback('用户名长度不能少于3个字符');
        } else {
          callback();
        }
      }, 
      trigger: 'blur' 
    }
  ],
  email: [
    { required: true, message: '请输入邮箱地址' },
    { 
      validator: (rule, value, callback) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
          callback('请输入正确的邮箱格式');
        } else {
          callback();
        }
      }, 
      trigger: 'blur' 
    }
  ],
  phone: [
    { 
      validator: (rule, value, callback) => {
        if (value) {
          const phoneRegex = /^1[3-9]\d{9}$/;
          if (!phoneRegex.test(value)) {
            callback('请输入正确的手机号格式');
          } else {
            callback();
          }
        } else {
          callback();
        }
      }, 
      trigger: 'blur' 
    }
  ]
});

const handleSubmit = async () => {
  try {
    await formRef.value.validate();
    message.success('表单验证通过！');
    console.log('表单数据:', formData);
  } catch (error) {
    message.error('表单验证失败，请检查输入');
    console.log('验证错误:', error);
  }
};

const handleReset = () => {
  formRef.value.resetFields();
  message.info('表单已重置');
};

const handlePromiseSubmit = async () => {
  try {
    await promiseFormRef.value.validate();
    message.success('Promise 格式表单验证通过！');
    console.log('Promise 格式表单数据:', promiseFormData);
  } catch (error) {
    message.error('Promise 格式表单验证失败，请检查输入');
    console.log('Promise 格式验证错误:', error);
  }
};

const handlePromiseReset = () => {
  promiseFormRef.value.resetFields();
  message.info('Promise 格式表单已重置');
};

const testCustomValidator = () => {
  // 测试自定义校验函数
  const testValidator = (rule, value, callback) => {
    if (!value) {
      callback('请输入内容');
    } else if (value.length < 5) {
      callback('长度不能少于5个字符');
    } else {
      callback();
    }
  };
  
  // 测试不同的值
  const testValues = ['', 'abc', 'abcdef'];
  testValues.forEach(value => {
    testValidator(null, value, (error) => {
      console.log(`测试值 "${value}":`, error || '校验通过');
    });
  });
  
  message.info('自定义校验函数测试完成，请查看控制台');
};

const testValidatorFunction = () => {
  try {
    // 模拟从 CommonConfig 保存的校验函数
    const validatorCode = `(data) => {
  const {cardForm, refs} = data;
  return new Promise((resolve, reject) => {
    if (cardForm.value.formState.describe !== 'test') {
      resolve();
    } else {
      reject('不能输入test');
    }
  });
}`;
    
    const validatorFn = (data) => {
      try {
        const func = eval(`(${validatorCode})`);
        return func(data);
      } catch (error) {
        return Promise.reject(error.message || '校验失败');
      }
    };
    
    // 测试函数
    const testData = [
      { cardForm: { value: { formState: { describe: 'hello' } } }, refs: {} },
      { cardForm: { value: { formState: { describe: 'test' } } }, refs: {} },
      { cardForm: { value: { formState: { describe: 'world' } } }, refs: {} }
    ];
    
    let results = [];
    
    testData.forEach((data, index) => {
      validatorFn(data).then(() => {
        results.push(`测试数据 ${index + 1}: 校验通过`);
      }).catch(error => {
        results.push(`测试数据 ${index + 1}: ${error}`);
      });
    });
    
    // 等待所有 Promise 完成
    setTimeout(() => {
      testResult.value = results.join('\n');
      message.success('校验函数测试完成');
    }, 100);
    
  } catch (error) {
    testResult.value = `测试失败: ${error.message}`;
    message.error('校验函数测试失败');
  }
};
</script>

<style scoped>
.test-rules-page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.test-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}

.test-section h2 {
  margin-bottom: 16px;
  color: #1890ff;
}

pre {
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 12px;
  line-height: 1.4;
}
</style> 