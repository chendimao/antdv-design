import textareaConfig from '../formDesign/component/formControlConfig/textareaConfig.vue';
import selectConfig from '../formDesign/component/formControlConfig/selectConfig.vue';
import treeSelectConfig from '../formDesign/component/formControlConfig/treeSelectConfig.vue';
import cascaderConfig from '../formDesign/component/formControlConfig/cascaderConfig.vue';
import autoCompleteConfig from '../formDesign/component/formControlConfig/autoCompleteConfig.vue';
import checkboxConfig from '../formDesign/component/formControlConfig/checkboxConfig.vue';
import switchConfig from '../formDesign/component/formControlConfig/switchConfig.vue';
import dateConfig from '../formDesign/component/formControlConfig/dateConfig.vue';
import datetimeConfig from '../formDesign/component/formControlConfig/datetimeConfig.vue';
import yearConfig from '../formDesign/component/formControlConfig/yearConfig.vue';
import monthConfig from '../formDesign/component/formControlConfig/monthConfig.vue';
import progressConfig from '../formDesign/component/formControlConfig/progressConfig.vue';
import badgeConfig from '../formDesign/component/formControlConfig/badgeConfig.vue';
import avatarConfig from '../formDesign/component/formControlConfig/avatarConfig.vue';
import descriptionsConfig from '../formDesign/component/formControlConfig/descriptionsConfig.vue';
import statisticConfig from '../formDesign/component/formControlConfig/statisticConfig.vue';
import tagConfig from '../formDesign/component/formControlConfig/tagConfig.vue';
import rateConfig from '../formDesign/component/formControlConfig/rateConfig.vue';
import sliderConfig from '../formDesign/component/formControlConfig/sliderConfig.vue';
import colorPickerConfig from '../formDesign/component/formControlConfig/colorPickerConfig.vue';
import tabsConfig from '../formDesign/component/formControlConfig/tabsConfig.vue';
import stepsConfig from '../formDesign/component/formControlConfig/stepsConfig.vue';
import calendarConfig from '../formDesign/component/formControlConfig/calendarConfig.vue';
import uploadConfig from '../formDesign/component/formControlConfig/uploadConfig.vue';


export const baseComponent  = [


    {
        text: '输入框',
        type: 'text',
        name: 'input',
        span: 24,
        show: true,
        value: '',
        disabled: (data, form, type) => {
            return false;
        },
        disabledType: 'boolean',
        wrapperCol: {  },
        rules:[
        ],
        labelCol: { style: { width: '100px' } },
        labelAlign: 'right',
        $attrs: { },
        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
          <line x1="7" y1="10" x2="17" y2="10" stroke="currentColor" stroke-width="2"/>
          <line x1="7" y1="14" x2="13" y2="14" stroke="currentColor" stroke-width="2"/>
        </svg>`,
        class: '',
    },
    {
        text: '数字输入框',
        type: 'number',
        name: 'numberInput',
        span: 24,
        show: true,
        value: '',
        disabled: (data, form, type) => {
            return false;
        },
        labelCol: { style: { width: '100px' } },
        labelAlign: 'right',
        wrapperCol: {  },
        rules:[
        ],
        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
          <text x="12" y="14" text-anchor="middle" font-size="10" fill="currentColor" font-family="Arial">123</text>
        </svg>`,
        class: '',
    },{
        text: '单选框',
        type: 'radio',
        name: 'radioInput',
        span: 24,
        show: true,
        $attrs: {
            options: [
                { label: '选项1', value: '1' },
                { label: '选项2', value: '2' }
              ],
              optionsValueType: "string",
              defaultValueType: "string",
        },
        value: '',
        disabled: (data, form, type) => {
            return false;
        },
        labelCol: { style: { width: '100px' } },
        labelAlign: 'right',
        wrapperCol: {  },
        rules:[
        ],
        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"/>
          <circle cx="8" cy="12" r="1" fill="currentColor"/>
          <line x1="14" y1="10" x2="20" y2="10" stroke="currentColor" stroke-width="2"/>
          <line x1="14" y1="14" x2="18" y2="14" stroke="currentColor" stroke-width="2"/>
        </svg>`,
        class: '',
    },
    {
        text: '多行文本',
        type: 'textarea',
        name: 'textarea',
        configComponent: textareaConfig,
        span: 24,
        show: true,
        value: '',
        disabled: (data, form, type) => {
            return false;
        },
        labelCol: { style: { width: '100px' } },
        labelAlign: 'right',
        wrapperCol: {  },
        rules:[
        ],
        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
          <line x1="7" y1="9" x2="17" y2="9" stroke="currentColor" stroke-width="2"/>
          <line x1="7" y1="12" x2="17" y2="12" stroke="currentColor" stroke-width="2"/>
          <line x1="7" y1="15" x2="13" y2="15" stroke="currentColor" stroke-width="2"/>
        </svg>`,
        class: '',
    },
    {
        text: '下拉选择',
        type: 'select',
        name: 'select',
        configComponent: selectConfig,
        span: 24,
        show: true,
        value: '',
        disabled: (data, form, type) => {
            return false;
        },
        labelCol: { style: { width: '100px' } },
        labelAlign: 'right',
        wrapperCol: {  },
        rules:[
        ],
        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
          <path d="M7 9L12 14L17 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="7" y1="12" x2="17" y2="12" stroke="currentColor" stroke-width="2"/>
        </svg>`,
        class: '',
    },
    {
        text: '树选择',
        type: 'treeSelect',
        name: 'treeSelect',
        configComponent: treeSelectConfig,
        span: 24,
        show: true,
        value: '',
        disabled: (data, form, type) => {
            return false;
        },
        labelCol: { style: { width: '100px' } },
        labelAlign: 'right',
        wrapperCol: {  },
        rules:[
        ],
        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 11L12 8L15 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 8V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" stroke="currentColor" stroke-width="2"/>
        </svg>`,
        class: '',
    },
    {
        text: '级联选择',
        type: 'cascader',
        name: 'cascader',
        configComponent: cascaderConfig,
        span: 24,
        show: true,
        value: '',
        disabled: (data, form, type) => {
            return false;
        }, 
        labelCol: { style: { width: '100px' } },
        labelAlign: 'right',
        wrapperCol: {  },
        rules:[
        ],
        $attrs: {
            options: [],
            optionsValueType: 'string',
        },
        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M3 12H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M7 8L9 6L11 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7 14L9 12L11 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
        class: '',
    },
    {
        text: '自动完成',
        type: 'autoComplete',
        name: 'autoComplete',
        configComponent: autoCompleteConfig,
        span: 24,
        show: true,
        value: '',
        disabled: (data, form, type) => {
            return false;
        },
        labelCol: { style: { width: '100px' } },
        labelAlign: 'right',
        wrapperCol: {  },
        rules:[
        ],
        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
          <circle cx="11" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
          <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
        class: '',
    },
    {
        text: '多选框',
        type: 'checkbox',
        name: 'checkbox',
        configComponent: checkboxConfig,
        span: 24,
        show: true,
        value: [],
        disabled: (data, form, type) => {
            return false;
        },
        labelCol: { style: { width: '100px' } },
        labelAlign: 'right',
        wrapperCol: {  },
        rules:[
        ],
        $attrs: {
            options: [
                { label: '选项1', value: '1' },
                { label: '选项2', value: '2' }
            ],
            optionsValueType: 'string',
        },
        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="6" width="4" height="4" rx="1" stroke="currentColor" stroke-width="2" fill="none"/>
          <path d="M6 8L8 10L10 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="12" y1="8" x2="20" y2="8" stroke="currentColor" stroke-width="2"/>
          <rect x="3" y="12" width="4" height="4" rx="1" stroke="currentColor" stroke-width="2" fill="none"/>
          <path d="M6 14L8 16L10 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="12" y1="14" x2="20" y2="14" stroke="currentColor" stroke-width="2"/>
        </svg>`,
        class: '',
    },
    {
        text: '开关',
        type: 'switch',
        name: 'switch',
        configComponent: switchConfig,
        span: 24,
        show: true,
        value: '',
        disabled: (data, form, type) => {
            return false;
        },
        labelCol: { style: { width: '100px' } },
        labelAlign: 'right',
        wrapperCol: {  },
        rules:[
        ],
        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="8" width="18" height="8" rx="4" stroke="currentColor" stroke-width="2" fill="none"/>
          <text x="12" y="13" text-anchor="middle" font-size="6" fill="currentColor" font-family="Arial">标签</text>
        </svg>`,
        class: '',
    },
    {
        text: '日期',
        type: 'date',
        name: 'date',
        configComponent: dateConfig,
        span: 24,
        show: true,
        value: '',
        disabled: (data, form, type) => {
            return false;
        },
        labelCol: { style: { width: '100px' } },
        labelAlign: 'right',
        wrapperCol: {  },
        rules:[
        ],
        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
          <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
          <circle cx="8" cy="7" r="1" fill="currentColor"/>
          <circle cx="16" cy="7" r="1" fill="currentColor"/>
        </svg>`,
        class: '',
    },
    {
        text: '日期时间',
        type: 'datetime',
        name: 'datetime',
        configComponent: datetimeConfig,
        span: 24,
        show: true,
        value: '',
        disabled: (data, form, type) => {
            return false;
        },
        labelCol: { style: { width: '100px' } },
        labelAlign: 'right',
        wrapperCol: {  },
        rules:[
        ],
        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
          <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
          <circle cx="8" cy="7" r="1" fill="currentColor"/>
          <circle cx="16" cy="7" r="1" fill="currentColor"/>
          <circle cx="12" cy="16" r="2" stroke="currentColor" stroke-width="2" fill="none"/>
          <line x1="12" y1="14" x2="12" y2="16" stroke="currentColor" stroke-width="2"/>
          <line x1="12" y1="16" x2="14" y2="16" stroke="currentColor" stroke-width="2"/>
        </svg>`,
        class: '',
    },
    {
        text: '年份',
        type: 'year',
        name: 'year',
        configComponent: yearConfig,
        span: 24,
        show: true,
        value: '',
        disabled: (data, form, type) => {
            return false;
        },
        labelCol: { style: { width: '100px' } },
        labelAlign: 'right',
        wrapperCol: {  },
        rules:[
        ],
        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
          <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
          <text x="12" y="16" text-anchor="middle" font-size="8" fill="currentColor" font-family="Arial">2024</text>
        </svg>`,
        class: '',
    },
    {
        text: '月份',
        type: 'month',
        name: 'month',
        configComponent: monthConfig,
        span: 24,
        show: true,
        value: '',
        disabled: (data, form, type) => {
            return false;
        },
        labelCol: { style: { width: '100px' } },
        labelAlign: 'right',
        wrapperCol: {  },
        rules:[
        ],
        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
          <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
          <text x="12" y="16" text-anchor="middle" font-size="8" fill="currentColor" font-family="Arial">12</text>
        </svg>`,
        class: '',
    },
    {
        text: '进度条',
        type: 'progress',
        name: 'progress',
        configComponent: progressConfig,
        span: 24,
        show: true,
        value: '',
        disabled: (data, form, type) => {
            return false;
        },
        labelCol: { style: { width: '100px' } },
        labelAlign: 'right',
        wrapperCol: {  },
        rules:[
        ],
        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="10" width="18" height="4" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
          <rect x="3" y="10" width="12" height="4" rx="2" fill="currentColor"/>
        </svg>`,
        class: '',
    },
    {
        text: '徽标',
        type: 'badge',
        name: 'badge',
        configComponent: badgeConfig,
        span: 24,
        show: true,
        value: '',
        disabled: (data, form, type) => {
            return false;
        },
        labelCol: { style: { width: '100px' } },
        labelAlign: 'right',
        wrapperCol: {  },
        rules:[
        ],
        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
          <circle cx="12" cy="12" r="3" fill="currentColor"/>
        </svg>`,
        class: '',
    },
    {
        text: '头像',
        type: 'avatar',
        name: 'avatar',
        configComponent: avatarConfig,
        span: 24,
        show: true,
        value: '',
        disabled: (data, form, type) => {
            return false;
        },
        labelCol: { style: { width: '100px' } },
        labelAlign: 'right',
        wrapperCol: {  },
        rules:[
        ],
        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
          <circle cx="12" cy="9" r="3" stroke="currentColor" stroke-width="2" fill="none"/>
          <path d="M6 20C6 16.6863 8.68629 14 12 14C15.3137 14 18 16.6863 18 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>`,
        class: '',
    },
    {
        text: '描述列表',
        type: 'descriptions',
        name: 'descriptions',
        configComponent: descriptionsConfig,
        span: 24,
        show: true,
        value: '',
        disabled: (data, form, type) => {
           
            return false;
        },
        labelCol: { style: { width: '100px' } },
        labelAlign: 'right',
        wrapperCol: {  },
        rules:[
        ],
        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
          <line x1="7" y1="8" x2="17" y2="8" stroke="currentColor" stroke-width="2"/>
          <line x1="7" y1="12" x2="17" y2="12" stroke="currentColor" stroke-width="2"/>
          <line x1="7" y1="16" x2="13" y2="16" stroke="currentColor" stroke-width="2"/>
        </svg>`,
        class: '',
    },
    {
        text: '统计数值',
        type: 'statistic',
        name: 'statistic',
        configComponent: statisticConfig,
        span: 24,
        show: true,
        value: '',
        disabled: (data, form, type) => {
           
            return false;
        },
        labelCol: { style: { width: '100px' } },
        labelAlign: 'right',
        wrapperCol: {  },
        rules:[
        ],
        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
          <text x="12" y="12" text-anchor="middle" font-size="8" fill="currentColor" font-family="Arial">123</text>
          <text x="12" y="18" text-anchor="middle" font-size="6" fill="currentColor" font-family="Arial">统计</text>
        </svg>`,
        class: '',
    },
    {
        text: '标签',
        type: 'tag',
        name: 'tag',
        configComponent: tagConfig,
        span: 24,
        show: true,
        value: '',
        disabled: (data, form, type) => {
           
            return false;
        },
        labelCol: { style: { width: '100px' } },
        labelAlign: 'right',
        wrapperCol: {  },
        rules:[
        ],
        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="8" width="18" height="8" rx="4" stroke="currentColor" stroke-width="2" fill="none"/>
          <text x="12" y="13" text-anchor="middle" font-size="6" fill="currentColor" font-family="Arial">标签</text>
        </svg>`,
        class: '',
    },
    {
        text: '评分',
        type: 'rate',
        name: 'rate',
        configComponent: rateConfig,
        span: 24,
        show: true,
        value: '',
        disabled: (data, form, type) => {
           
            return false;
        },
        labelCol: { style: { width: '100px' } },
        labelAlign: 'right',
        wrapperCol: {  },
        rules:[
        ],
        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" fill="currentColor"/>
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" fill="none"/>
        </svg>`,
        class: '',
    },
    {
        text: '滑块',
        type: 'slider',
        name: 'slider',
        configComponent: sliderConfig,
        span: 24,
        show: true,
        value: '',
        disabled: (data, form, type) => {
           
            return false;
        },
        labelCol: { style: { width: '100px' } },
        labelAlign: 'right',
        wrapperCol: {  },
        rules:[
        ],
        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2"/>
          <circle cx="8" cy="12" r="3" fill="currentColor"/>
        </svg>`,
        class: '',
    },
    
   
    {
        text: '步骤条',
        type: 'steps',
        name: 'steps',
        configComponent: stepsConfig,
        span: 24,
        show: true,
        value: '',
        disabled: (data, form, type) => {
           
            return false;
        },
        labelCol: { style: { width: '100px' } },
        labelAlign: 'right',
        wrapperCol: {  },
        rules:[
        ],
        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="6" cy="12" r="2" fill="currentColor"/>
          <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" stroke-width="2"/>
          <circle cx="18" cy="12" r="2" stroke="currentColor" stroke-width="2" fill="none"/>
        </svg>`,
        class: '',
    },
    {
        text: '日历',
        type: 'calendar',
        name: 'calendar',
        configComponent: calendarConfig,
        span: 24,
        show: true,
        value: '',
        disabled: (data, form, type) => {
           
            return false;
        },
        labelCol: { style: { width: '100px' } },
        labelAlign: 'right',
        wrapperCol: {  },
        rules:[
        ],
        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
          <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
          <circle cx="8" cy="7" r="1" fill="currentColor"/>
          <circle cx="16" cy="7" r="1" fill="currentColor"/>
          <circle cx="8" cy="14" r="1" fill="currentColor"/>
          <circle cx="12" cy="14" r="1" fill="currentColor"/>
          <circle cx="16" cy="14" r="1" fill="currentColor"/>
          <circle cx="8" cy="18" r="1" fill="currentColor"/>
          <circle cx="12" cy="18" r="1" fill="currentColor"/>
        </svg>`,
        class: '',
    },
    {
        text: '上传',
        type: 'upload',
        name: 'upload',
        configComponent: uploadConfig,
        span: 24,
        show: true,
        value: '',
        disabled: (data, form, type) => {
           
            return false;
        },
        labelCol: { style: { width: '100px' } },
        labelAlign: 'right',
        wrapperCol: {  },
        rules:[
        ],
        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7 10L12 5L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 5V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
        class: '',
    },


];

export const gridComponent  = [


    {
        text: '2列栅格',
        type: 'grid',
        name: 'grid',
        span: 24,
        show: true,
        value: '',
        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="8" height="18" stroke="currentColor" stroke-width="2" fill="none"/>
          <rect x="13" y="3" width="8" height="18" stroke="currentColor" stroke-width="2" fill="none"/>
        </svg>`,
        columns: [
            { span: 12, children: [] },
            { span: 12, children: [] },
        ],
    } ,
    {
        text: '3列栅格',
        type: 'grid',
        name: 'grid',
        span: 24,
        show: true,
        value: '',
        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="3" width="5" height="18" stroke="currentColor" stroke-width="2" fill="none"/>
          <rect x="9" y="3" width="5" height="18" stroke="currentColor" stroke-width="2" fill="none"/>
          <rect x="16" y="3" width="5" height="18" stroke="currentColor" stroke-width="2" fill="none"/>
        </svg>`,
        columns: [
            { span: 8, children: [] },
            { span: 8, children: [] },
            { span: 8, children: [] },
        ],
    }, {
        text: '4列栅格',
        type: 'grid',
        name: 'grid',
        span: 24,
        show: true,
        value: '',
        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="3" width="4" height="18" stroke="currentColor" stroke-width="2" fill="none"/>
          <rect x="7" y="3" width="4" height="18" stroke="currentColor" stroke-width="2" fill="none"/>
          <rect x="12" y="3" width="4" height="18" stroke="currentColor" stroke-width="2" fill="none"/>
          <rect x="17" y="3" width="4" height="18" stroke="currentColor" stroke-width="2" fill="none"/>
        </svg>`,
        columns: [
            { span: 6, children: [] },
            { span: 6, children: [] },
            { span: 6, children: [] },
            { span: 6, children: [] },
        ],
    } ,  
    {
        text: '标签页',
        type: 'tabs',
        name: 'tabs',
        configComponent: tabsConfig,
        span: 24,
        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
          <rect x="4" y="4" width="6" height="4" rx="1" stroke="currentColor" stroke-width="2" fill="currentColor"/>
          <rect x="11" y="4" width="6" height="4" rx="1" stroke="currentColor" stroke-width="2" fill="none"/>
        </svg>`,
        columns: [
            { title: '标签1', key: '1', children: [] },
            { title: '标签2', key: '2', children: [] },
        ],
        show: true,
        value: '',
        $attrs: {
            type: 'line',
            centered: false,
            animated: true,
            tabPosition: 'top',
        },
        disabled: (data, form, type) => {
           
            return false;
        },
        labelCol: { style: { width: '100px' } },
        labelAlign: 'right',
        wrapperCol: {  },
        rules:[
        ],
        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3L12 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 3L12 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
        class: '',
    },
];

export const otherComponent = [
    {
        text: '输入框',
        type: 'text',
        name: 'input',
        span: 24,
        show: true,
    }
];