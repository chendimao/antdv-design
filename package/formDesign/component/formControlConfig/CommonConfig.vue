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

    <!-- 动态值设置 -->
    <a-form-item label="动态值设置" v-if="showDynamicValue">
      <a-radio-group v-model:value="localDynamicValueType" style="margin-bottom:8px;">
        <a-radio value="expression">表达式</a-radio>
        <a-radio value="function">自定义函数</a-radio>
      </a-radio-group>
      <template v-if="localDynamicValueType === 'expression'">
        <a-button @click="showExpressionEditor = true" type="primary" size="small">编辑表达式</a-button>
      </template>
      <template v-else>
        <a-button @click="showDynamicValueEditor = true" type="primary" size="small">编辑函数</a-button>
      </template>
    </a-form-item>

    <!-- 表达式编辑器 -->
    <a-modal
      v-model:visible="showExpressionEditor"
      title="表达式配置"
      width="800px"
      :footer="null"
      :destroyOnClose="true"
    >
      <div class="expression-editor">
        <div class="expression-header">
          <div class="expression-label">
            表达式 = <a-tooltip title="支持数学运算、逻辑运算等">
              <a-icon type="question-circle" style="color: #ff4d4f;" />
            </a-tooltip>
          </div>
          <div class="expression-input">
            <a-input
              v-model:value="expressionCode"
              placeholder="请输入表达式，如：(formState.field1 + formState.field2) * 2"
              :rows="4"
              type="textarea"
            />
          </div>
        </div>
        
        <div class="expression-tabs">
          <a-tabs v-model:activeKey="activeExpressionTab">
            <a-tab-pane key="fields" tab="字段值">
              <div class="fields-list">
                <div v-for="field in availableFields" :key="field.id" class="field-item">
                  <span class="field-name">{{ field.text }}</span>
                  <span class="field-id">{{ field.id }}</span>
                  <a-button 
                    size="small" 
                    @click="insertField(field.id)"
                    type="link"
                  >
                    {{ field.text }}
                  </a-button>
                </div>
              </div>
            </a-tab-pane>
            <a-tab-pane key="identifiers" tab="字段标识">
              <div class="identifiers-list">
                <div v-for="field in availableFields" :key="field.id" class="field-item">
                  <span class="field-name">{{ field.text }}</span>
                  <span class="field-id">{{ field.id }}</span>
                  <a-button 
                    size="small" 
                    @click="insertField(field.id)"
                    type="link"
                  >
                    { {{ field.id }} }
                  </a-button>
                </div>
              </div>
            </a-tab-pane>
            <a-tab-pane key="variables" tab="变量">
              <div class="variables-list">
                <div class="variable-item">
                  <span class="variable-name">formState</span>
                  <span class="variable-desc">表单数据对象</span>
                  <a-button size="small" @click="insertVariable('formState')" type="link">
                    formState
                  </a-button>
                </div>
                <div class="variable-item">
                  <span class="variable-name">formData</span>
                  <span class="variable-desc">表单配置数据</span>
                  <a-button size="small" @click="insertVariable('formData')" type="link">
                    formData
                  </a-button>
                </div>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
        
        <div class="expression-footer">
          <a-button @click="showExpressionEditor = false">取消</a-button>
          <a-button type="primary" @click="saveExpression" style="margin-left: 8px;">确定</a-button>
        </div>
      </div>
    </a-modal>

    <!-- 动态值函数编辑器 -->
    <a-modal
      v-model:visible="showDynamicValueEditor"
      title="编辑动态值函数"
      width="800px"
      :footer="null"
      :destroyOnClose="true"
    >
      <div class="dynamic-value-editor">
        <div class="editor-header">
          <p class="editor-tip">
            函数格式：<code>(formState, formData) => { return ... }</code><br>
            参数说明：formState 为表单数据，formData 为表单配置
          </p>
        </div>
        
        <div class="editor-content">
          <code-mirror
            v-model:value="dynamicValueFuncCode"
            :language="'javascript'"
            :height="'300px'"
            :width="'100%'"
            :showFooter="false"
            :showCheckSyntax="true"
            placeholder="(formState, formData) => {
  return (formState.field1 + formState.field2) * 2 - 2;
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
          <a-button @click="showDynamicValueEditor = false">取消</a-button>
          <a-button type="primary" @click="saveDynamicValueFunction" style="margin-left: 8px;">保存</a-button>
        </div>
      </div>
    </a-modal>

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
  showDynamicValue: { type: Boolean, default: true },
  
  // 事件列表
  events: { type: Array, default: () => [] },
  
  // 动态值相关
  dynamicValue: [String, Function],
  dynamicValueType: { type: String, default: 'expression' },
  
  // 可用字段列表
  availableFields: { type: Array, default: () => [] },
  
  // 表单配置（用于获取字段列表）
  formConfig: { type: Object, default: () => ({}) }
});

const emit = defineEmits([
  'update:disabled', 'update:disabledType', 
  'update:show', 'update:showType',
  'update:rules',
  'update:placeholder', 'update:allowClear', 'update:bordered', 
  'update:size', 'update:status', 'update:autoFocus',
  'update:dynamicValue', 'update:dynamicValueType'
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

// 动态值设置相关
const localDynamicValueType = ref(props.dynamicValueType);
const showExpressionEditor = ref(false);
const expressionCode = ref('');
const showDynamicValueEditor = ref(false);
const dynamicValueFuncCode = ref('');

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

// 计算可用字段列表
const availableFields = computed(() => {
  // 优先使用传入的 availableFields
  if (props.availableFields.length > 0) {
    return props.availableFields;
  }
  
  // 从 formConfig.value.formData 中获取字段列表
  if (props.formConfig && props.formConfig.value && props.formConfig.value.formData) {
    const formData = props.formConfig.value.formData;
    return formData.map(item => ({
      id: item.name || item.id || `field_${Math.random().toString(36).substr(2, 9)}`,
      text: item.label || item.text || item.name || '未命名字段'
    })).filter(field => field.id && field.text);
  }
  
  // 默认返回示例数据
  return [
    { id: 'field1', text: '字段1' },
    { id: 'field2', text: '字段2' },
    { id: 'field3', text: '字段3' },
    { id: 'field4', text: '字段4' },
    { id: 'field5', text: '字段5' },
  ];
});

const activeExpressionTab = ref('fields');

// 初始化动态值
watchEffect(() => {
  if (props.dynamicValue) {
    if (typeof props.dynamicValue === 'function') {
      // 如果是函数，提取函数体
      const fnStr = props.dynamicValue.toString();
      const body = fnStr.replace(/^\([^)]*\)\s*=>\s*{([\s\S]*)}$/, '$1').trim();
      dynamicValueFuncCode.value = body;
      localDynamicValueType.value = 'function';
    } else {
      // 如果是字符串，作为表达式
      expressionCode.value = props.dynamicValue;
      localDynamicValueType.value = 'expression';
    }
  }
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
watch(() => props.dynamicValue, v => { emit('update:dynamicValue', v); });
watch(() => props.dynamicValueType, v => { localDynamicValueType.value = v; });

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
watch(localDynamicValueType, v => { emit('update:dynamicValueType', v); });

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

// 动态值设置相关
const insertField = (fieldId) => {
  const field = availableFields.value.find(f => f.id === fieldId);
  if (field) {
    const insertText = `formState.${fieldId}`;
    const currentCode = expressionCode.value;
    const cursorPosition = expressionCode.value.length;
    const newCode = currentCode.substring(0, cursorPosition) + insertText + currentCode.substring(cursorPosition);
    expressionCode.value = newCode;
  }
};

const insertVariable = (variableName) => {
  const currentCode = expressionCode.value;
  const cursorPosition = expressionCode.value.length;
  const newCode = currentCode.substring(0, cursorPosition) + variableName + currentCode.substring(cursorPosition);
  expressionCode.value = newCode;
};

const saveExpression = () => {
  try {
    // 验证表达式语法
    const testFunc = new Function('formState, formData', `return ${expressionCode.value}`);
    // 测试执行（使用模拟数据）
    const testFormState = {};
    const testFormData = {};
    testFunc(testFormState, testFormData);
    
    // 保存表达式
    emit('update:dynamicValue', expressionCode.value);
    emit('update:dynamicValueType', 'expression');
    showExpressionEditor.value = false;
    message.success('表达式保存成功');
  } catch (error) {
    message.error(`表达式语法错误: ${error.message}`);
  }
};

const saveDynamicValueFunction = () => {
  try {
    // 构建完整的函数
    const fullFunction = `(formState, formData) => { return ${dynamicValueFuncCode.value}; }`;
    
    // 验证函数语法
    const testFunc = new Function('formState, formData', `return ${dynamicValueFuncCode.value}`);
    // 测试执行（使用模拟数据）
    const testFormState = {};
    const testFormData = {};
    testFunc(testFormState, testFormData);
    
    // 保存函数
    const finalFunction = new Function('formState, formData', `return ${dynamicValueFuncCode.value}`);
    emit('update:dynamicValue', finalFunction);
    emit('update:dynamicValueType', 'function');
    showDynamicValueEditor.value = false;
    message.success('动态值函数保存成功');
  } catch (error) {
    message.error(`函数语法错误: ${error.message}`);
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

.expression-editor {
  .expression-header {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #f0f0f0;

    .expression-label {
      font-size: 14px;
      color: #555;
      margin-right: 8px;
      display: flex;
      align-items: center;

      .anticon {
        margin-left: 4px;
      }
    }

    .expression-input {
      flex: 1;
    }
  }

  .expression-tabs {
    margin-bottom: 16px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    overflow: hidden;

    .ant-tabs-nav {
      margin-bottom: 0;
    }

    .ant-tabs-content {
      padding: 12px;
    }

    .fields-list, .identifiers-list, .variables-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 8px 0;
    }

    .field-item {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      background-color: #e6f7ff;
      border-radius: 4px;
      border: 1px solid #91d5ff;
      color: #1890ff;
      font-size: 13px;
    }

    .variable-item {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      background-color: #fffbe6;
      border-radius: 4px;
      border: 1px solid #ffe58f;
      color: #faad14;
      font-size: 13px;
    }
  }

  .expression-footer {
    margin-top: 16px;
    text-align: right;
    border-top: 1px solid #f0f0f0;
    padding-top: 16px;
  }
}

.dynamic-value-editor {
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