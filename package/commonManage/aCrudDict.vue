<template>

    <vxe-pulldown ref="pulldownRef" id="dictPulldown"  style="width: 100%;"  popup-class-name="dropdown-table" :transfer="transfer">
      <template #default>
        <a-input v-model:value="searchName"
                 autocomplete="off"
                 id="dictInput"
                 :disabled="isDisabled"
                 @keydown="handleKeydown"
                 @blur="blurEvent"
                 allow-clear
                 @change="handleChange"
                 @focus="focusEvent"
                 v-bind="dictProps"
        ></a-input>
      </template>

      <template #dropdown>
        <div class="dropdown-table-body" id="dictTable" style="z-index: 999;">
          <vxe-table
              border
              show-overflow
              :header-cell-class-name="() => 'headerCellClassName'"
              :cell-class-name="() => 'cellClassName unitClassName'"

              resizable
              size="mini"
              ref="xTable1"
              height="300"
              :column-config="{resizable: true}"
              :scroll-y="{enabled: true, gt: 0}"
              :data="tableData"
              :row-config="{isCurrent: true}"
              :edit-config="{}"
              :loading="loading"
              :keyboard-config="{isArrow: true}"
              @cell-dblclick="handleSubmit"
              :sort-config="{trigger: 'cell'}">

            <vxe-column v-for="item in tableField" :type="item?.type??''" :key="item.field" :field="item.field" :title="item.title" :width="item.width??100"     ></vxe-column>


          </vxe-table>
          <div style="text-align: right;padding: 10px;border-bottom: 1px solid #eee;"  v-if="showPage"  >
            <a-pagination
                size="small"   :show-size-changer="false"
                show-less-items
                :showTotal="total => `共${total}条`"
                v-model:current="currentPage"
                :total="tableTotal"
                :defaultPageSize="pageSize"
                v-model:pageSize="pageSize"
                @change="pageChangeEvent"
            />
          </div>
          <div style="padding: 10px;font-size: 12px;"  v-if="showHistory && historyData.length > 0"  >
            <span>查询历史：</span>
            <span style="cursor: pointer; width: 100px;">
              <span style="color: dodgerblue; " v-for="(item, index) in historyData" @click="handleHistoryData(item)" >
                {{item}}
                <span v-if="index != historyData.length -1">&nbsp;|&nbsp;</span>
              </span>
            </span>
          </div>
        </div>
      </template>
    </vxe-pulldown>


</template>

<script setup lang="ts">
import {ref, onMounted, reactive, watch} from 'vue'
import {debounceRef} from "../utils";

const props = defineProps({
  dictProps: {type: Object},
  modelValue: {type: String, default: ''},
  api: {required: true, type: Function},
  params: {required: true, type: Object},
  showPage: {type: Boolean, default: true},
  isDisabled: {type: Boolean, default: false},
  transfer: {type: Boolean, default: false},
  immediate: {type: Boolean, default: true},
  showHistory: {type: Boolean, default: true},
   pageField: {type: String, default: 'page'},
   sizeField: {type: String, default: 'limit'},
  name: {type: String, default: 'dmmc'},
  defaultValue: {type: String, default: ''},
  debounceTime: {type: String, default: '200'},
  searchField: {type: String, default: 'dmmc'},

  callbackFun: {},
  tableField: {type: Array, default: () => [{field: 'dmmc', title: '名称', width: 100}, {field: 'dm', title: '代码', width: 100}, {field: 'icd10', title: 'icd10', width: 120}]},
});

const emits = defineEmits(['change', 'update:modelValue']);

const searchNameTmp = ref(null); // 如果没有选择字典，则输入框恢复上一次选中的值

onMounted(()=>{
  currentPage.value = props.params[props.pageField];
  pageSize.value = props.params[props.sizeField];
  searchNameTmp.value =  searchName.value = props.modelValue;
  if (props.immediate) {
    getData();
  }

  // Add click event listener to document to handle clicks outside the component
  window.addEventListener('click', (ev) => {
    const pulldown = pulldownRef.value;
    const target = ev.target as HTMLElement;
    // Check if click is outside the component
    if (pulldown && !pulldown.$el.contains(target)) {
      pulldown.hidePanel();
    }
  });
})



const searchName = ref(null);
const loading = ref(false)

const currentIndex = ref(0);
const currentRow = ref();
const xTable1 = ref();

const currentPage = ref(1);
const tableTotal = ref(0);
const pageSize = ref(10);
const paginationConfig = ref();
const currentData = ref();
const historyData = ref([]);
const tableData = ref([])
const pagerConfig = reactive({
  total: 0,
  currentPage: 1,
  pageSize: 10
})
const pulldownRef = ref()
const focusEvent = () => {
  const $pulldown = pulldownRef.value
  if ($pulldown) {
    $pulldown.showPanel();
    if (tableData.value.length === 0 && searchName.value?.length > 0) {
      getData();
    }

  }   
}
const blurEvent = () => {
  const $pulldown = pulldownRef.value
 if (!$pulldown.isPanelVisible()) {
  searchName.value = searchNameTmp.value;
 }

}
watch(() => props.modelValue, (data) => { 
   searchName.value = data; 
  
} )
 
watch( searchName, (data) => {
  console.log(data);
  emits('update:modelValue', data);
  // 如果面板显示，则说明为输入状态
  if (pulldownRef.value.isPanelVisible()) {
    currentPage.value = 1;
    getData();
  } else {
    // 否则就是双击选择状态


  }

})

const  getData = debounce(() => {



  loading.value = true;
  props.api({...props.params,
    [props.pageField]: currentPage.value,
    [props.sizeField]: pageSize.value,
    [props.searchField??props.name]: searchName.value }).then(res => {

    loading.value = false;

    if (props.callbackFun) {
      props.callbackFun(res, tableData, tableTotal);
    } else {
      if (res.code == 0) {
        tableData.value = res.data.content || res.data;
        tableTotal.value = res.data.total || res.data?.length;

        if(tableData.value.length > 0) {
          currentRow.value = tableData.value[0];
          currentIndex.value = 0;
          xTable1.value.setCurrentRow(currentRow.value);
        }

      } else {
        tableData.value =  [];
        tableTotal.value = 0;
      }
    }


  }).catch(() => {
    loading.value = false;
  })
}, props.debounceTime);

const pageChangeEvent = (ev) => {
  currentPage.value = ev;
  getData();
}

function handleSubmit(ev) {
  pulldownRef.value.togglePanel();
  searchName.value = ev.row[props.searchField??props.name];
  currentData.value = ev;
  if (!historyData.value.includes(searchName.value)) {
    historyData.value.push(searchName.value);
    historyData.value = historyData.value.splice(-3);
  }
  searchNameTmp.value = searchName.value;
  emits('change',  searchName.value, currentData.value, tableData);

}



function handleChange(ev) {
  console.log(ev);
  if (ev.type == 'click') {
    searchName.value = null;
    searchNameTmp.value = null;
    currentData.value = null;
    emits('change',  searchName.value, currentData.value, tableData);
  }
}

function handleHistoryData(item) {
  searchName.value = item;
}

function handleKeydown(ev) {
  console.log(ev);
  const keyEvent = {40: handleKeydownDownSelect, 38: handleKeydownUpSelect, 13: handleKeydownEnterSelect};
  if (keyEvent[ev.keyCode]) {
    keyEvent[ev.keyCode](ev);
  }
}


function handleKeydownDownSelect(ev) {
  if (currentIndex.value + 1 < tableData.value.length) {
    currentIndex.value++;
    xTable1.value.setCurrentRow(tableData.value[currentIndex.value]);
    xTable1.value.scrollToRow(tableData.value[currentIndex.value]);
  }
}
function handleKeydownUpSelect(ev) {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    xTable1.value.setCurrentRow(tableData.value[currentIndex.value]);
    xTable1.value.scrollToRow(tableData.value[currentIndex.value]);
  }
}
function handleKeydownEnterSelect(ev) {
  if (currentIndex.value) {
    handleSubmit({row: xTable1.value.getCurrentRecord(), visibleData: tableData.value, rowIndex: currentIndex.value, $rowIndex: currentIndex.value})
  }

}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

</script>
<script lang="ts">
export default {
  name: 'aCrudDict',
};
</script>
<style   lang="less">
::v-deep(.vxe-pulldown) {

width: 100%;

}
.dropdown-table {

  background-color: #fff;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
  .dropdown-table-body {
    width: 600px;
  }

  .dropdown-table-footer {
    border-top: 1px solid #e8eaec;
  }

  .dropdown-table-body {
    width: auto !important;
  }
}

</style>