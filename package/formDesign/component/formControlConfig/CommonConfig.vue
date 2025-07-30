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

// 监听props变化
watch(() => props.disabled, v => { localDisabled.value = v; });
watch(() => props.disabledType, v => { localDisabledType.value = v; });
watch(() => props.show, v => { localShow.value = v; });
watch(() => props.showType, v => { localShowType.value = v; });
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
watch(localBordered, v => { emit('update:bordered', v); });
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
</style> 