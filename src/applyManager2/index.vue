<template>
  <!-- <PageWrapper :title="currentPage?.title ?? ''"> -->
  <a-card style="width: 100%;">
    <template #title>

      <a-crud-search ref="searchRef"
                     @register="registerSearch"
                     >

        <a-button
            @click="handleTest"
            type="primary"
            style="float: left; margin : 10px"
            size="middle"
            class="!px-2"
        >

          test pdf</a-button
        >
        <router-link
            to="/home"

        >to page1</router-link
        >
        <a-button
            @click="handleGetData"
            type="primary"
            style="float: left; margin : 10px"
            size="middle"
            class="!px-2"
        >

          test getdata</a-button
        >
        <a-button
            @click="handleTestBtn"
            type="primary"
            style="float: left; margin : 10px"
            size="middle"
            class="!px-2"
        >

          test ref</a-button
        >

      </a-crud-search>
    </template>
    <div></div>
    <a-row>
      <a-col :span="24">
        <a-crud-dict style="width:200px;" @change="changeDict" :api="GetDiagnosis" :params='{"page":1,"rows":30,"limit":30,"code":1}' searchField="dmmc" />
        <div class="mr-0 overflow-hidden bg-white vben-basic-table vben-basic-table-form-container">
          <a-crud-table
            @register="registerTable2"
            ref="crudTableRef"
          >
            <template #buttons>
              <a-button
                  @click="handleAddShow('insert')"
                  type="primary"
                  style="float: left; magin-top: 10px"
                  size="middle"
                  class="!px-2"
              >
                <template #icon>
                  <PlusOutlined />
                </template>
                新增</a-button
              >
            </template>
            <template #default="{row}">
              <a-button   @click="handleUpdateShow(row)">编辑</a-button>
              <a-button v-if="row.pid != 0" @click="handleAddShow('insert')">新建下级</a-button>
            </template>

            <template #testSlot="{row}">
                  <div>{{row}}</div>
            </template>
          </a-crud-table>
        </div>
      </a-col>
    </a-row>


  </a-card>
  <div>
    <a-crud-form @register="registerForm">

      <template #testSlot="{data}">
        {{data}}
      </template>

<!--      <template #default="{formState}">-->
<!--        <a-button @click="handleSave(formState)">保存</a-button>-->
<!--      </template>-->

    </a-crud-form>
  </div>
  <!-- </PageWrapper> -->
</template>
<script lang="ts" setup>
  import { defineComponent, getCurrentInstance, onMounted, reactive, ref } from 'vue';

  import retireData from './data/form.tsx';
  import searchData from './data/search';
  import jsonData from './data/test.js';
  import antdCrud from 'antdv-crud';
  import {
    PlusOutlined,

  } from '@ant-design/icons-vue';
  import { web_archivesManagement_getManagement_details, web_alterationApply_getByList, summaryPageList, GetDiagnosis } from '../api/';

const {proxy } = getCurrentInstance() as any;

  import tableData from "./data/table";
  import {formatDate} from "../../package/utils";
  import { jsPDF } from 'jspdf';
  const checkboxConfig = ref({
    checkAll: true,
    checkAllText: '全选',
    checkAllField: 'id',
    checkMethod: ()=>{
      return false;
    }
  });

const crudTableRef = ref();
  const test = ref(123);
  const handleData = ref();
  const [
    {
      registerTable: registerTable2 ,
      registerSearch,
      registerForm
    },
    {getData,
      getTableRef,
        getTableData,
      getTotalPagination,
      getCurrentPagination,
      setCurrentPagination,
      handleFormShow,
      mergeFormResetParams,
      handleFormSubmit,
      mergeSearchParams,
      mergeTableProps,
      mergeSearchResetParams,
      getSearch,
      getSearchParams,
      setSearchParams,
      resetSearch,
      reset}
  ]= antdCrud.useCrudTable(
      {

        table: {
          api: summaryPageList,
          columns: tableData.tableForm(),
          isMenu: true,
           menuWidth: 300,
          isView: true,
          isEdit: false,
          beforeCallback: (props) => {
            props.params.userId = 'sfadfas';
          },
          // editIcon: false,
          // viewIcon: false,1
          size: 'mini',
          isSortable: false, // 是否开启排序，这是总开关，这里开启后，如果column中设置sortable: false，则该字段也不会排序
          $attrs: {
            stripe: false,
            exportConfig: {},
            sortConfig:  {defaultSort:  {field: 'medicalRecordNo', order: 'asc'} },
            treeConfig: { childrenField: 'thirdPhysicianList' },
            height: '200px',
            onCheckboxChange: checkboxChange,
        checkboxConfig: checkboxConfig
          },
          toolBox: {
            showType: 'button',
            showExport: false,
            showPrint: false
          },
        },
        search: {
          formData: searchData.searchForm(),

        },
        form: {
          title: retireData.title,
          typeInfo: retireData.typeInfo,
          formData: [{formList:   (() => new Map(JSON.parse(jsonData).formData.map(item => [item.name, item]))), title: ''}],
          dataCallback: handleDataCallback,
          requestCallback: handleRequestCallback,
          name: 'bmgl',
        },
      }
  );
const test2 = ref();
onMounted(async () => {

});


function handleDataCallback(res) {
  console.log(res);
  }

  async function handleRequestCallback (api ,params) {
    return await api(params, handleData.value);
  }

 function handleAddShow(t) {
   console.log([{formList:    new Map(JSON.parse(jsonData).formData.map(item => [item.name, item])), title: '测试数据'}], retireData.formData);
   mergeFormResetParams({ page: 234234});
   handleFormShow(t);
 }

 function handleSave(formState) {
   console.log(formState);
   formState.abccdefg = 'tset';
   handleFormSubmit({eee: 1});
 }

 function beforeCallback(props) {
   console.log(props);
   props.params.userId = new Date();
 }


 function handleUpdateShow(row) {
  handleData.value = row;
   console.log(handleData.value);
  handleFormShow('update', row);
 }

 function changeDict(ev, data) {
   console.log(ev, data);
 }

  function checkboxChange(e) {
    console.log(e);
  }


  function handleTest(e) {
    var doc = new jsPDF();
// 添加并设置字体
    doc.addFont('/src/assets/fonts/HARMONYOS_SANS_SC_BOLD.ttf', 'SourceHanSans-Normal', 'normal');
    doc.setFont('SourceHanSans-Normal');
    doc.text('简体中文、繁體体中文、English、ジャパン、한국어', 20, 20);
    doc.save('my.pdf');
  }

  function handleTestBtn(e) {
    console.log(e, crudTableRef.value.getTableRef().openExport());

  }


 async function handleGetData() {
await mergeTableProps({api: web_alterationApply_getByList});
  //  await mergeSearchParams({test: '1234123123'});
   await mergeSearchResetParams({test234: 23424});
   const params = await getSearchParams();
     getSearch({...params, test234: 23424});
    //getData();
  }

</script>
<style scoped lang="less">
  .ant-card-body {
    padding: 0 5px !important;
  }



</style>
