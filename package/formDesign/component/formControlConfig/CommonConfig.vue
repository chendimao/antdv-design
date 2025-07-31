<template>
  <div>
    <!-- 禁用配置 -->
    <a-form-item label="禁用">
      <a-radio-group v-model:value="localDisabledType" style="margin-bottom:8px;">
        <a-radio value="boolean">开关</a-radio>
        <a-radio value="function">函数</a-radio>
      </a-radio-group>
      <template v-if="localDisabledType === 'boolean'">
        <a-switch v-model:checked="localDisabled" />
      </template>
      <template v-else>
        <a-button @click="showDisabledEditor = true" type="primary" size="small">编辑函数</a-button>
        <FunctionEditorModal
          v-model:visible="showDisabledEditor"
          v-model="disabledFuncCode"
          title="编辑禁用函数"
          placeholder="如：return data.value === 'xxx' || form.status === 'readonly'"
          @save="onDisabledFuncSave"
        />
      </template>
    </a-form-item>

    <!-- 显示配置 -->
    <a-form-item label="显示">
      <a-radio-group v-model:value="localShowType" style="margin-bottom:8px;">
        <a-radio value="boolean">开关</a-radio>
        <a-radio value="function">函数</a-radio>
      </a-radio-group>
      <template v-if="localShowType === 'boolean'">
        <a-switch v-model:checked="localShow" />
      </template>
      <template v-else>
        <a-button @click="showShowEditor = true" type="primary" size="small">编辑函数</a-button>
        <FunctionEditorModal
          v-model:visible="showShowEditor"
          v-model="showFuncCode"
          title="编辑显示函数"
          placeholder="如：return data.value !== '' && form.status !== 'hidden'"
          @save="onShowFuncSave"
        />
      </template>
    </a-form-item>

    <!-- 校验规则配置 -->
    <a-form-item label="校验规则">
      <a-button @click="showRulesEditor = true" type="primary" size="small">配置校验规则</a-button>
    </a-form-item>

    <!-- 校验规则配置弹窗 -->
    <a-modal
      v-model:visible="showRulesEditor"
      title="校验规则配置"
      width="800px"
      :footer="null"
      :destroyOnClose="true"
    >
      <div class="rules-editor">
        <div class="rules-header">
          <a-button type="primary" @click="addRule" size="small">
            <template #icon><PlusOutlined /></template>
            添加规则
          </a-button>
        </div>
        
        <div class="rules-list">
          <div v-for="(rule, index) in localRules" :key="index" class="rule-item">
            <div class="rule-header">
              <span class="rule-title">规则 {{ index + 1 }}</span>
              <a-button type="text" danger @click="removeRule(index)" size="small">
                <template #icon><DeleteOutlined /></template>
              </a-button>
            </div>
            
            <div class="rule-content">
              <!-- 规则类型选择 -->
              <a-form-item label="规则类型">
                <a-radio-group v-model:value="rule.type" @change="onRuleTypeChange(index)">
                  <a-radio value="required">必填</a-radio>
                  <a-radio value="custom">自定义函数</a-radio>
                </a-radio-group>
              </a-form-item>
              
              <!-- 必填规则配置 -->
              <template v-if="rule.type === 'required'">
                <a-form-item label="提示信息">
                  <a-input v-model:value="rule.message" placeholder="请输入必填提示信息" />
                </a-form-item>
              </template>
              
              <!-- 自定义函数规则配置 -->
              <template v-if="rule.type === 'custom'">
                <a-form-item label="触发方式">
                  <a-select v-model:value="rule.trigger" placeholder="选择触发方式">
                    <a-select-option value="blur">失去焦点</a-select-option>
                    <a-select-option value="change">值改变</a-select-option>
                    <a-select-option value="submit">提交时</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="校验函数">
                  <a-button @click="editCustomRule(index)" type="primary" size="small">编辑函数</a-button>
                </a-form-item>
              </template>
            </div>
          </div>
          
          <div v-if="localRules.length === 0" class="empty-rules">
            <a-empty description="暂无校验规则，点击上方按钮添加" />
          </div>
        </div>
        
        <div class="rules-footer">
          <a-button @click="showRulesEditor = false">取消</a-button>
          <a-button type="primary" @click="saveRules" style="margin-left: 8px;">保存</a-button>
        </div>
      </div>
    </a-modal>

    <!-- 自定义校验函数编辑器 -->
    <a-modal
      v-model:visible="showCustomRuleEditor"
      title="编辑自定义校验函数"
      width="800px"
      :footer="null"
      :destroyOnClose="true"
    >
      <div class="validator-editor">
        <div class="editor-header">
          <p class="editor-tip">
            校验函数格式：<code>(data) => { return new Promise((resolve, reject) => { ... }) }</code><br>
            使用 <code>resolve()</code> 表示校验通过，使用 <code>reject('错误信息')</code> 返回错误
          </p>
        </div>
        
        <div class="editor-content">
          <code-mirror
            v-model:value="customRuleCode"
            :language="'javascript'"
            :height="'300px'"
            :width="'100%'"
            :showFooter="false"
            :showCheckSyntax="true"
            placeholder="(data) => {
  const {cardForm, refs} = data;
  return new Promise((resolve, reject) => {
    
  });
}"
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
          />
        </div>
        
        <div class="editor-footer">
          <a-button @click="cancelCustomRuleEdit">取消</a-button>
          <a-button type="primary" @click="saveCustomRule" style="margin-left: 8px;">保存</a-button>
        </div>
      </div>
    </a-modal>

    <!-- 通用属性配置 -->
    <a-form-item label="占位符" v-if="showPlaceholder">
      <a-input v-model:value="localPlaceholder" />
    </a-form-item>

    <a-form-item label="允许清除" v-if="showAllowClear">
      <a-switch v-model:checked="localAllowClear" />
    </a-form-item>

    <a-form-item label="边框" v-if="showBordered">
      <a-switch v-model:checked="localBordered" />
    </a-form-item>

    <a-form-item label="尺寸" v-if="showSize">
      <a-select v-model:value="localSize">
        <a-select-option value="default">默认</a-select-option>
        <a-select-option value="small">小</a-select-option>
        <a-select-option value="large">大</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item label="状态" v-if="showStatus">
      <a-select v-model:value="localStatus">
        <a-select-option value="">无</a-select-option>
        <a-select-option value="error">错误</a-select-option>
        <a-select-option value="warning">警告</a-select-option>
      </a-select>
    </a-form-item>
 
    <!-- 事件处理 -->
    <a-form-item label="事件处理" v-if="showEvents">
      <a-button @click="showEventCodeEditor" type="primary" style="margin-top:5px;">编辑事件处理</a-button>
    </a-form-item>

    <!-- 事件处理代码编辑器模态框 -->
    <a-modal
      v-model:visible="eventEditorVisible"
      title="事件处理代码编辑"
      width="100%"
      :footer="null"
      wrap-class-name="full-modal"
      :bodyStyle="{ padding: '0' }"
      :style="{ top: 0 }"
      :destroyOnClose="true"
    >
      <div style="height: calc(100vh - 130px);">
        <a-tabs v-model:activeKey="activeEventTab">
          <a-tab-pane v-for="event in eventList" :key="event.key" :tab="event.label">
            <code-mirror
              v-model:value="eventCodeMap[event.key]"
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
              :showCheckSyntax="false"
              :showSave="false"
              :showCancel="false"
              :showFooter="false"
              :language="'javascript'"
              :height="'calc(100vh - 180px)'"
              :width="'100%'"
              @update:value="(value) => handleCodeChange(event.key, value)"
            />
          </a-tab-pane>
        </a-tabs>
        <div class="editor-footer">
          <a-button @click="cancelEdit">取消</a-button>
          <a-button type="primary" @click="saveEventHandlers" style="margin-left: 8px;">保存</a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, watch, watchEffect, computed } from 'vue';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import FunctionEditorModal from '../../component/FunctionEditorModal.vue';
import codeMirror from '../../component/codeMirror.vue';
import { message } from 'ant-design-vue';

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

const emit = defineEmits([
  'update:disabled', 'update:disabledType', 
  'update:show', 'update:showType',
  'update:rules',
  'update:placeholder', 'update:allowClear', 'update:bordered', 
  'update:size', 'update:status', 'update:autoFocus'
]);

// 禁用相关
const localDisabled = ref(props.disabled);
const localDisabledType = ref(props.disabledType);
const showDisabledEditor = ref(false);
const disabledFuncCode = ref('return false;');

// 显示相关
const localShow = ref(props.show);
const localShowType = ref(props.showType);
const showShowEditor = ref(false);
const showFuncCode = ref('return true;');

// 校验规则相关
const localRules = ref([]);
const showRulesEditor = ref(false);
const showCustomRuleEditor = ref(false);
const customRuleCode = ref('');
const editingRuleIndex = ref(-1);

// 通用属性
const localPlaceholder = ref(props.placeholder);
const localAllowClear = ref(props.allowClear);
const localBordered = ref(props.bordered);
const localSize = ref(props.size);
const localStatus = ref(props.status);
const localAutoFocus = ref(props.autoFocus);

// 事件编辑器相关
const eventEditorVisible = ref(false);
const activeEventTab = ref('onChange');
const eventCodeMap = ref({});
const originalEventCodeMap = ref({});

// 计算事件列表
const eventList = computed(() => {
  return props.events.length > 0 ? props.events : [
    { key: 'onChange', label: 'change 事件' },
    { key: 'onFocus', label: 'focus 事件' },
    { key: 'onBlur', label: 'blur 事件' }
  ];
});

// 初始化事件代码映射
watchEffect(() => {
  const events = {};
  eventList.value.forEach(event => {
    events[event.key] = '';
  });
  eventCodeMap.value = events;
  originalEventCodeMap.value = { ...events };
});

// 初始化校验规则
watchEffect(() => {
  localRules.value = props.rules.map(rule => {
    if (rule.required) {
      return {
        type: 'required',
        message: rule.message || '此项为必填项'
      };
    } else if (rule.validator) {
      return {
        type: 'custom',
        trigger: rule.trigger || 'blur',
        validator: rule.validator
      };
    }
    return rule;
  });
});

// 监听props变化
watch(() => props.disabled, v => { localDisabled.value = v; });
watch(() => props.disabledType, v => { localDisabledType.value = v; });
watch(() => props.show, v => { localShow.value = v; });
watch(() => props.showType, v => { localShowType.value = v; });
watch(() => props.rules, v => { 
  localRules.value = v.map(rule => {
    if (rule.required) {
      return {
        type: 'required',
        message: rule.message || '此项为必填项'
      };
    } else if (rule.validator) {
      return {
        type: 'custom',
        trigger: rule.trigger || 'blur',
        validator: rule.validator
      };
    }
    return rule;
  });
});
watch(() => props.placeholder, v => { localPlaceholder.value = v; });
watch(() => props.allowClear, v => { localAllowClear.value = v; });
watch(() => props.bordered, v => { localBordered.value = v; });
watch(() => props.size, v => { localSize.value = v; });
watch(() => props.status, v => { localStatus.value = v; });
watch(() => props.autoFocus, v => { localAutoFocus.value = v; });

// 监听本地变化并触发更新
watch(localDisabled, v => { emit('update:disabled', v); });
watch(localDisabledType, v => { emit('update:disabledType', v); });
watch(localShow, v => { emit('update:show', v); });
watch(localShowType, v => { emit('update:showType', v); });
watch(localPlaceholder, v => { emit('update:placeholder', v); });
watch(localAllowClear, v => { emit('update:allowClear', v); });
watch(localSize, v => { emit('update:size', v); });
watch(localStatus, v => { emit('update:status', v); });
watch(localAutoFocus, v => { emit('update:autoFocus', v); });

// 禁用函数相关
watchEffect(() => {
  if (typeof localDisabled.value === 'function') {
    const fnStr = localDisabled.value.toString();
    const body = fnStr.replace(/^function\s*\(data,\s*form,\s*type\)\s*{([\s\S]*)}$/,'$1').trim();
    disabledFuncCode.value = body;
  }
});

watch(localDisabledType, (newType) => {
  if (newType === 'boolean') {
    localDisabled.value = false;
  } else if (newType === 'function') {
    localDisabled.value = (data, form, type) => { return false; };
  }
});

function onDisabledFuncSave(fn) {
  localDisabled.value = fn;
}

// 显示函数相关
watchEffect(() => {
  if (typeof localShow.value === 'function') {
    const fnStr = localShow.value.toString();
    const body = fnStr.replace(/^function\s*\(data,\s*form,\s*type\)\s*{([\s\S]*)}$/,'$1').trim();
    showFuncCode.value = body;
  }
});

watch(localShowType, (newType) => {
  if (newType === 'boolean') {
    localShow.value = true;
  } else if (newType === 'function') {
    localShow.value = (data, form, type) => { return true; };
  }
});

function onShowFuncSave(fn) {
  localShow.value = fn;
}

// 校验规则相关
const addRule = () => {
  // 检查是否已存在必填规则
  const hasRequired = localRules.value.some(rule => rule.type === 'required');
  
  localRules.value.push({
    type: hasRequired ? 'custom' : 'required',
    message: hasRequired ? '' : '此项为必填项',
    trigger: 'blur',
    validator: null
  });
};

const removeRule = (index) => {
  localRules.value.splice(index, 1);
};

const onRuleTypeChange = (index) => {
  const rule = localRules.value[index];
  
  if (rule.type === 'required') {
    // 检查是否已存在必填规则
    const existingRequiredIndex = localRules.value.findIndex((r, i) => i !== index && r.type === 'required');
    if (existingRequiredIndex !== -1) {
      // 将已存在的必填规则改为自定义规则
      localRules.value[existingRequiredIndex] = {
        type: 'custom',
        trigger: 'blur',
        validator: null
      };
    }
    rule.message = '此项为必填项';
  } else if (rule.type === 'custom') {
    rule.trigger = 'blur';
    rule.validator = null;
  }
};

const editCustomRule = (index) => {
  editingRuleIndex.value = index;
  const rule = localRules.value[index];
  
  if (rule.validator && typeof rule.validator === 'function') {
    const fnStr = rule.validator.toString();
    // 提取函数体，适配 Promise 格式的校验函数
    const body = fnStr.replace(/^\([^)]*\)\s*=>\s*{([\s\S]*)}$/, '$1').trim();
    customRuleCode.value = body;
  } else {
    customRuleCode.value = `(data) => {
  const {cardForm, refs} = data;
  return new Promise((resolve, reject) => {
    
  });
}`;
  }
  
  showCustomRuleEditor.value = true;
};

const saveRules = () => {
  try {
    // 转换为标准的 rules 格式
    const standardRules = localRules.value.map(rule => {
      if (rule.type === 'required') {
        return {
          required: true,
          message: rule.message
        };
      } else if (rule.type === 'custom' && rule.validator) {
        return {
          validator: rule.validator,
          trigger: rule.trigger
        };
      }
      return null;
    }).filter(rule => rule !== null);
    
    emit('update:rules', standardRules);
    showRulesEditor.value = false;
    message.success('校验规则保存成功');
  } catch (e) {
    console.error('校验规则保存错误:', e);
    message.error('校验规则保存失败');
  }
};

// 事件处理相关
const showEventCodeEditor = () => {
  // 将函数转换为字符串
  eventList.value.forEach(event => {
    const eventHandler = props[event.key];
    eventCodeMap.value[event.key] = typeof eventHandler === 'function' 
      ? eventHandler.toString().replace(/^function\s*\(/, 'function(') 
      : (eventHandler || '');
  });
  
  // 保存原始值
  originalEventCodeMap.value = JSON.parse(JSON.stringify(eventCodeMap.value));
  
  eventEditorVisible.value = true;
};

const handleCodeChange = (eventName, value) => {
  eventCodeMap.value[eventName] = value || '';
};

const saveEventHandlers = () => {
  try {
    const convertToFunction = (code) => {
      if (!code.trim()) return null;
      try {
        const funcStr = code.trim();
        return new Function('return ' + funcStr)();
      } catch (e) {
        throw new Error(`函数转换失败: ${e.message}`);
      }
    };

    // 转换并保存事件处理函数
    eventList.value.forEach(event => {
      const fn = convertToFunction(eventCodeMap.value[event.key]);
      emit(`update:${event.key}`, fn);
    });
    
    eventEditorVisible.value = false;
    message.success('事件处理函数保存成功');
  } catch (e) {
    console.error('事件处理函数解析错误:', e);
    message.error(e.message || '事件处理函数语法错误，请检查代码');
  }
};

const cancelEdit = () => {
  eventCodeMap.value = JSON.parse(JSON.stringify(originalEventCodeMap.value));
  eventEditorVisible.value = false;
};

const cancelCustomRuleEdit = () => {
  showCustomRuleEditor.value = false;
  customRuleCode.value = '';
};

const saveCustomRule = () => {
  if (editingRuleIndex.value >= 0) {
    try {
      // 创建 Promise 格式的校验函数
      const validatorFn = (data) => {
        try {
          // 将代码包装成完整的函数
          const fullCode = `(${customRuleCode.value})`;
          const func = eval(fullCode);
          return func(data);
        } catch (error) {
          return Promise.reject(error.message || '校验失败');
        }
      };
      
      localRules.value[editingRuleIndex.value].validator = validatorFn;
      editingRuleIndex.value = -1;
      showCustomRuleEditor.value = false;
      message.success('自定义校验函数保存成功');
    } catch (error) {
      message.error(`函数语法错误: ${error.message}`);
    }
  }
};
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

.rules-editor {
  .rules-header {
    margin-bottom: 16px;
    text-align: right;
  }
  
  .rules-list {
    max-height: 400px;
    overflow-y: auto;
    
    .rule-item {
      border: 1px solid #d9d9d9;
      border-radius: 6px;
      margin-bottom: 12px;
      padding: 12px;
      
      .rule-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        
        .rule-title {
          font-weight: 500;
          color: #1890ff;
        }
      }
      
      .rule-content {
        .ant-form-item {
          margin-bottom: 8px;
        }
      }
    }
    
    .empty-rules {
      text-align: center;
      padding: 40px 0;
    }
  }
  
  .rules-footer {
    margin-top: 16px;
    text-align: right;
    border-top: 1px solid #f0f0f0;
    padding-top: 16px;
  }
}

.validator-editor {
  .editor-header {
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #f0f0f0;

    .editor-tip {
      font-size: 14px;
      color: #555;
      margin-bottom: 8px;

      code {
        background-color: #f0f0f0;
        padding: 2px 4px;
        border-radius: 3px;
        font-size: 13px;
      }
    }
  }

  .editor-content {
    height: 300px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    overflow: hidden;
  }

  .editor-footer {
    margin-top: 16px;
    text-align: right;
    border-top: 1px solid #f0f0f0;
    padding-top: 16px;
  }
}
</style> 