<template>

<div class="form-render-container">
  
    <draggable
      tag="div"
      class="  form-draggable"
      :class="{ 'is-layout': isChildren }"
      v-model="_formData"
      @change="onDragChange"
      @end="onDragEnd"
      @start="onDragStart" 
      :group="{ 
          name:  'form-draggable',
          pull: true,   
          put:  'form-draggable'  
        } "
         :ghostClass="'drag-ghost'"
         :chosenClass="'drag-chosen'"
         :draggable="'.dragging'"
         :animation="300"
         :handle="'.drag-handle'"
     
      item-key="id"
    >
  
 
      <template #item="{element,index}">
        <div class="dragging" :style="{
            width: `${(element.span / 24) * 100}%`,
          }"  :class="{ 'is-hidden': isElementHidden(element) }" style="position:relative;">
          <template v-if="isElementHidden(element)">
            <div class="hidden-label">已隐藏</div>
          </template>
          <div class="drag-handle" 
               style="position:absolute;left:0;top:0;z-index:2;cursor:move;"
               :class="{ 'show': _currentItem?.id == element.id }">
            <DragOutlined />
          </div>
          <!-- 保留原有表单项内容 -->
          <template v-if="element.type == 'grid' && element?.columns.length > 0">
            <div 
              @click.stop="emitSelectComponent(element)"
              :class="['grid-container', {'active-grid': _currentItem?.id == element.id }]"
            >
              <a-row :gutter="10" class="grid-row"  >
                <a-col 
                  v-for="item in element.columns" 
                  :span="item.span" 
                  :key="item.id"
                  class="grid-col"
                >
                  <form-render
                    v-model:formData="item.children"
                    :currentItem="_currentItem"
                    :isChildren="true"
                    @selectComponent="emitSelectComponent"
                    @onDragChange="onDragChange"
                    @selectAdded="(element, index) => emits('selectAdded', element, index)"
                  />
                </a-col>
              </a-row>
              <DeleteOutlined 
                  v-if="_currentItem?.id == element.id" 
                  class="delete-icon"
                  @click="handleDeleteComponent(index)"
                />
            </div>
          </template>
          <template v-else-if="element.type == 'tabs' && element?.columns?.length > 0">
            <div
              @click.stop="emitSelectComponent(element)"
              :class="['grid-container', {'active-grid': _currentItem?.id == element.id }]"
            >
              <a-tabs
                :activeKey="element.activeKey"
                :tabPosition="element.$attrs?.tabPosition || 'top'"
                :type="element.$attrs?.type || 'line'"
                :size="element.$attrs?.size || 'default'"
                :animated="element.$attrs?.animated !== false"
                :centered="element.$attrs?.centered"
                :destroyInactiveTabPane="element.$attrs?.destroyInactiveTabPane"
                :tabBarGutter="element.$attrs?.tabBarGutter"
                @change="key => { element.activeKey = key }"
              >
                <a-tab-pane
                  v-for="tab in element.columns"
                  :key="tab.key"
                  :tab="tab.title"
                >
                  <form-render
                    v-model:formData="tab.children"
                    :currentItem="_currentItem"
                    :isChildren="true"
                    @selectComponent="emitSelectComponent"
                    @onDragChange="onDragChange"
                    @selectAdded="(element, index) => emits('selectAdded', element, index)"
                  />
                </a-tab-pane>
              </a-tabs>
              <DeleteOutlined 
                  v-if="_currentItem?.id == element.id" 
                  class="delete-icon"
                  @click="handleDeleteComponent(index)"
                />
            </div>
          </template>
          <template v-else>
            <a-col class="form-field" :span="24" v-if="element.type">
              <div class="drag-mas" @click.stop="emitSelectComponent(element)"></div>
              <div :class="['field-container', {'active': _currentItem?.id == element.id}]">
                <a-form-item
                  :label="element.text"
                  :name="element.name"
                  :label-col="element.labelCol"
                  :wrapper-col="element.wrapperCol??{style: {width: '100%'}}"
                  :labelAlign="element.labelAlign"
                >
                
                  <aCrudFormItem :item="element" :validateFun="() => {}"/>
                  <span class="field-id">{{element.id}}</span>
                </a-form-item>
                <DeleteOutlined 
                    v-if="_currentItem?.id == element.id" 
                    class="delete-icon"
                    @click="handleDeleteComponent(index)"
                  />
              </div>
              <slot></slot>
            </a-col>
          </template>
        </div>
      </template>
    </draggable>
  </div> 
</template>


<script lang="ts" setup>
import {defineProps, watch, ref, computed} from 'vue';
import {deepCopy} from "../../utils";
import {DeleteOutlined, DragOutlined} from "@ant-design/icons-vue";
import draggable from 'vuedraggable';

const  placeholderTop = ref(0);
const  showPlaceholder = ref(false);
const _currentItem = ref(); // 当前选中的组件
const _currentIndex = ref(); // 当前选中的组件index
const _formData = ref(); // 表单数据
const _formConfig = ref(); // 表单数据
const props = defineProps({
  formData: {},
  isChildren: {default: false},
  currentItem: {},
  currentIndex: {},
});


const emits = defineEmits<{
  (event: 'update:formData', value: any[]): void;
  (event: 'update:currentItem', value: any): void;
  (event: 'update:currentIndex', value: number | undefined): void;
  (event: 'handleSelectComponent', element: any, index?: number): void;
  (event: 'handleDeleteComponent', index: number): void;
  (event: 'onDragChange', eventData: any): void;
  (event: 'selectAdded', element: any, index: number): void;
  (event: 'selectComponent', element: any): void;
}>();




watch(() => props.formData, (data) => {
  _formData.value = data;
  console.log(data);
}, {deep: true, immediate: true});



watch(() => props.currentItem, (data) => {
  _currentItem.value = data;
  console.log(data, _currentIndex.value);
}, {deep: true, immediate: true});
watch(() => props.currentIndex, (data) => {
  _currentIndex.value = data;
 // _formData.value[data] = _currentItem.value;
  console.log(data);
}, {deep: true});


watch(() => _formData.value, (data) => {
  console.log("formRender: _formData 变化", data);
  emits('update:formData', data);
}, {deep: true });



function handleDeleteComponent(index) {
_formData.value.splice(index, 1);
console.log(_formData, 169);
}

const onDragChange = (event) => {
  console.log('formRender: onDragChange', event);
   if (event.added) {
    _currentIndex.value = event.added.newIndex;
    _currentItem.value = event.added.element;
    emits('update:currentItem', event.added.element);
  //   console.log('formRender: Added element', event.added);
    
  //   // 获取新添加的元素引用
  //   const addedElement = _formData.value[event.added.newIndex];
  //   console.log('formRender: Added element',_formData.value, addedElement);
  //   // 为新添加的元素生成唯一的 ID 和 name
  //   // 这里复用 cloneItem 的逻辑，确保在添加到目标时 ID 唯一
  //   addedElement.name = addedElement.id = `${addedElement.type}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    
  //   console.log('formRender: New element with unique ID', addedElement);
    
  //   // 触发 selectAdded 事件，传递新添加的元素和它的索引
  //   emits('selectAdded', addedElement, event.added.newIndex);
   }
  // 如果需要在拖动结束后也触发父组件的 onDragChange 事件，可以取消注释下面这行
  emits('onDragChange',event)
};

function onDragStart(event) {
  // 你可以做一些自定义的操作，比如禁用某些拖动区域
  console.log("拖动开始", event);
 
}
function onDragEnd(event) {
  // 拖动结束后的一些处理逻辑
  console.log("拖动结束", event);
}

function emitSelectComponent(element) {
  console.log("formRender: 触发选中事件", element);
  emits('selectComponent', element);
}

function isElementHidden(element: any) {
  if (typeof element.show === 'function') {
    try {
      return element.show(element, _formData.value, element.type) === false;
    } catch (e) {
      return false;
    }
  }
  return element.show === false;
}

// 暴露函数给模板使用
defineExpose({
  emitSelectComponent,
  handleDeleteComponent,
  onDragChange,
  onDragStart,
  onDragEnd,
  isElementHidden
});

</script>


<script lang="ts">
export default {
  name: "formRender"
}
</script>

<style    lang="less">
.form-render-container {
  position: relative;
  width: 100%;
  display: block !important;
  
}

.form-draggable { 
  width: 100%;
  min-height: 90vh; /* 设置固定高度 */
  padding: 4px;
  display: flex !important;
  flex-wrap: wrap !important;
  align-items: flex-start !important;
  align-content: flex-start;
  /* 移除 justify-content，让元素紧密排列 */
}

.is-layout {
  min-height: 20vh;
}


// 拖拽动画
.form-draggable > .form-item-wrapper {
  transition: transform 0.3s cubic-bezier(.55,0,.1,1), box-shadow 0.3s;
  will-change: transform;
}
.form-draggable > .form-item-wrapper.ghost {
  opacity: 0.5;
  background: #e6f7ff;
  border: 1.5px dashed #1890ff;
}
.form-draggable > .form-item-wrapper.chosen {
  box-shadow: 0 6px 24px rgba(24,144,255,0.18);
  z-index: 10;
  background: #fff;
  border: 1.5px solid #1890ff;
}

.form-item-wrapper {
  position: relative;
  padding: 2px;
  transition: all 0.2s;
  
  &:hover .drag-handle {
    opacity: 1;
  }
}

.grid-container {
  width: 100%;
  border: 1px dashed #8c8c8c;  // 更深的边框颜色
  border-radius: 2px;
  position: relative;
  transition: all 0.2s;
  cursor: pointer;
  flex-shrink: 0;
  
  .grid-row {
    padding: 4px;
  }
  
  .grid-col {
    border: 1px dashed #a6a6a6;  // 加深列边框颜色
    position: relative;
    min-height: 100px;
    border-radius: 2px;
    padding: 2px; 
    
    &:hover {
      border-color: #8c8c8c;
      background: rgba(0, 0, 0, 0.02);
    }
  }
}

.form-field {
  position: relative;
  flex-shrink: 0;
  
  .field-container {
    border: 1px dashed #8c8c8c;  // 更深的边框颜色
    border-radius: 2px;
    padding: 4px;
    margin: 2px;
    position: relative;
    transition: all 0.2s;
    cursor: pointer;
    
    &:hover {
      border-color: #595959;  // 悬停时更深的颜色
      background: rgba(0, 0, 0, 0.02);
    }
  }
}

.active {
  border-color: #1890ff !important;
  background: rgba(24, 144, 255, 0.05);
  box-shadow: 0 0 0 1px rgba(24, 144, 255, 0.2);
}

.active-grid {
  border-color: #722ed1 !important;
  background: rgba(114, 46, 209, 0.05);
  box-shadow: 0 0 0 1px rgba(114, 46, 209, 0.2);
}

.form-field {
  position: relative;
  
  .field-container {
    border: 1px dashed #bfbfbf;  // 加深边框颜色
    border-radius: 2px;
    padding: 4px;
    margin: 2px;
    position: relative;
    transition: all 0.2s;
    cursor: pointer;
    
    &:hover {
      border-color: #8c8c8c;  // 悬停时进一步加深
      background: rgba(0, 0, 0, 0.01);  // 添加轻微背景色
    }
  }
}

 
.empty-placeholder {
  min-height: 80px;
  width: 100%;
  border: 2px dashed #b0bec5;
  border-radius: 4px;
  background-color: rgba(176, 190, 197, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px 0;
  transition: all 0.3s ease;
  
  .placeholder-content {
    color: #78909c;
    font-size: 15px;
    text-align: center;
    line-height: 1.5;
  }
  
  &:hover {
    border-color: #90a4ae;
    background: rgba(176, 190, 197, 0.15);
  }
}
// 恢复点击遮罩层
.drag-mas {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;  // 确保在拖拽手柄下面
  cursor: pointer;
}

.drag-handle {
  position: absolute;
  left: -1px;
  top: -1px;
  padding: 4px;
  background: #1890ff;
  color: white;
  cursor: move;
  z-index: 2;  // 调整层级
  opacity: 0;
  transition: all 0.2s;
  border-radius: 2px 0 2px 0;
  font-size: 12px;
  
  &:hover {
    opacity: 1;
    transform: scale(1.1);
    background: #40a9ff;
  }
  
  &.show {
    opacity: 1;
  }
}

.field-id {
  position: absolute;
  right: 1px;
  bottom: 4px;  // 改为底部显示
  color: #8c8c8c;  // 使用更柔和的颜色
  font-size: 12px;
  padding: 2px 4px;
  background: rgba(0, 0, 0, 0.02);  // 添加轻微背景
  border-radius: 2px;
  opacity: 0.8;
  z-index: 1;
  font-family: monospace;  // 使用等宽字体
  
  // 当组件被选中时显示更明显
  .active & {
    color: #1890ff;
    background: rgba(24, 144, 255, 0.08);
  }
}

// 确保删除图标和ID不重叠
.delete-icon {
  position: absolute;
  right: 4px;
  top: 4px;
  color: red;
  font-size: 14px;
  cursor: pointer;
  z-index: 10000;
  transition: all 0.2s;
  
  &:hover {
    color: #ff7875;
    transform: scale(1.1);
  }
}

.active {
  border-color: #1890ff !important;
  background: rgba(24, 144, 255, 0.05);
  box-shadow: 0 0 0 1px rgba(24, 144, 255, 0.2);
}

.active-grid {
  border-color: #722ed1 !important;
  background: rgba(114, 46, 209, 0.05);
  box-shadow: 0 0 0 1px rgba(114, 46, 209, 0.2);
}

:deep(.ant-form-item) {
  margin-bottom: 8px !important;
}

.ghost {
  position: relative;
  height: 8px !important;
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
  margin: 10px 0 !important;
  overflow: visible !important;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 2px;
    background: linear-gradient(
      90deg,
      rgba(37, 99, 235, 0.3) 0%,
      rgba(37, 99, 235, 0.9) 50%,
      rgba(37, 99, 235, 0.3) 100%
    );
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(37, 99, 235, 0.4);
    animation: ghostPulse 1.2s ease-in-out infinite;
  }
}

@keyframes ghostPulse {
  0% {
    opacity: 0.6;
    transform: translateY(-50%) scaleY(1);
  }
  50% {
    opacity: 1;
    transform: translateY(-50%) scaleY(1.2);
  }
  100% {
    opacity: 0.6;
    transform: translateY(-50%) scaleY(1);
  }
}
// 拖动时的样式
.dragging {
  opacity: 0.8;
  background: #fafafa;
  flex-shrink: 0;
  box-sizing: border-box;
}
.drag-ghost {
  background: #e6f7ff !important;
  border: 2px dashed #ff2018 !important;
  border-radius: 8px !important;
  box-shadow: 0 2px 12px rgba(24,144,255,0.10) !important;
  opacity: 0.7 !important;
  width: 100% !important;
  min-height: 40px;
}
.form-item-wrapper .drag-handle {
  opacity: 0;
  transition: opacity 0.2s;
}
.form-item-wrapper:hover .drag-handle,
.form-item-wrapper.active .drag-handle,
.drag-handle.show {
  opacity: 1;
}
.drag-chosen {
  box-shadow: 0 6px 24px rgba(24,144,255,0.18);
  z-index: 10;
  background: #fff;
  border: 1.5px solid #1890ff;
}
.is-hidden {
  opacity: 0.4;
}
.hidden-label {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff2018;
  font-size: 18px;
  font-weight: bold;
  background: rgba(255,255,255,0.5);
  z-index: 10;
  pointer-events: none;
  filter: none !important;
  opacity: 1 !important;
  mix-blend-mode: normal;
}
</style>