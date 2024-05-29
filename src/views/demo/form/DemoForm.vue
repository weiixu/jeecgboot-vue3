<template>
  <PageWrapper title="表单示例">
    <CollapseContainer title="基础示例">
      <BasicForm
        ref="basicForm1"
        autoFocusFirstItem
        :labelWidth="200"
        :schemas="schemas"
        :labelCol="{ span: 8 }"
        :wrapperCol="{
          span: 10,
        }"
        :actionColOptions="{
          offset: 8,
          span: 12,
        }"
        :submitButtonOptions="{
          text: '提交',
        }"
        :oldValue="oldValue"
        @validate-success="handleValidateSuccess"
        @validate-error="
          (value) => {
            handleValidateError(value, 'basicForm1');
          }
        "
        @submit="handleSubmit"
        @reset="handleReset"
      >
        <template #jAreaLinkage="{ model, field }">
          <JAreaLinkage v-model:value="model[field]" :showArea="true" :showAll="false" />
        </template>
        <template #localSearch="{ model, field }">
          <ApiSelect
            :api="optionsListApi"
            showSearch
            v-model:value="model[field]"
            optionFilterProp="label"
            resultField="list"
            labelField="name"
            valueField="id"
          />
        </template>
        <template #selectA="{ model, field }">
          <a-select :options="optionsA" mode="multiple" v-model:value="model[field]" @change="valueSelectA = model[field]" allowClear />
        </template>
        <template #selectB="{ model, field }">
          <a-select :options="optionsB" mode="multiple" v-model:value="model[field]" @change="valueSelectB = model[field]" allowClear />
        </template>
        <template #remoteSearch="{ model, field }">
          <ApiSelect
            :api="optionsListApi"
            showSearch
            v-model:value="model[field]"
            :filterOption="false"
            resultField="list"
            labelField="name"
            valueField="id"
            @search="onSearch"
            :params="searchParams"
          />
        </template>
      </BasicForm>
      <BasicForm
        ref="basicForm2"
        autoFocusFirstItem
        :labelWidth="200"
        :schemas="schemas"
        :actionColOptions="{ span: 24 }"
        :labelCol="{ span: 8 }"
        :oldValue="oldValue"
        @validate-success="handleValidateSuccess"
        @validate-error="
          (value) => {
            handleValidateError(value, 'basicForm2');
          }
        "
        @submit="handleSubmit"
        @reset="handleReset"
      />
      <Anchor :items="getAnchorItems(anchorItems)">
        <template #customTitle="item">
          <div>
            {{ item.title }}
            <span class="fields-error" v-if="item.fieldsError > 0">{{ item.fieldsError }}</span>
          </div>
        </template>
      </Anchor>
      <div class="btn-group">
        <a-button type="primary" preIcon="ant-design:reload-outlined" @click="callAllFormSubmit" style="margin-left: 8px">提交全部表单</a-button>
        <a-button type="primary" @click="callAllFormValidate" style="margin-left: 8px">验证全部表单</a-button>
        <a-button type="primary" @click="callAllFormReset" style="margin-left: 8px">重置全部表单</a-button>
      </div>
    </CollapseContainer>
  </PageWrapper>
</template>
<script lang="ts">
  import { computed, defineComponent, unref, ref, onMounted, reactive } from 'vue';
  import { BasicForm, FormSchema, ApiSelect, JAreaLinkage } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';

  import { optionsListApi } from '/@/api/demo/select';
  import { useDebounceFn } from '@vueuse/core';
  import { treeOptionsListApi } from '/@/api/demo/tree';
  import { Select, Anchor } from 'ant-design-vue';
  import { cloneDeep } from 'lodash-es';

  const valueSelectA = ref<string[]>([]);
  const valueSelectB = ref<string[]>([]);
  const options = ref<Recordable[]>([]);
  for (let i = 1; i < 10; i++) options.value.push({ label: '选项' + i, value: `${i}` });

  const optionsA = computed(() => {
    return cloneDeep(unref(options)).map((op) => {
      op.disabled = unref(valueSelectB).indexOf(op.value) !== -1;
      return op;
    });
  });
  const optionsB = computed(() => {
    return cloneDeep(unref(options)).map((op) => {
      op.disabled = unref(valueSelectA).indexOf(op.value) !== -1;
      return op;
    });
  });
  const oldValue = computed(() => {
    return {
      // field1: 'field1',
      // field2: 'field2',
      field3: 'field3',
      // field4: 'field4',
      field5: 'field5',
      // field7: 'field7',
      field8: 'field8',
      // field9: 'field9',
      field10: 'field10',
      // field11: 'field11',
      // field30: 'field30',
      // field311: 'field311',
      // field31: 'field31',
      // field32: 'field32',
      // field33: 'field33',
      // field34: 'field34',
      // field35: 'field35',
      // province: 'province',
      // city: 'city',
      // selectA: 'selectA',
      // selectB: 'selectB',
      // field20: 'field20',
      // field21: 'field21',
      // field22: 'field22',
    };
  });
  const provincesOptions = [
    {
      id: 'guangdong',
      label: '广东省',
      value: '1',
      key: '1',
    },
    {
      id: 'jiangsu',
      label: '江苏省',
      value: '2',
      key: '2',
    },
  ];
  const citiesOptionsData = {
    guangdong: [
      {
        label: '珠海市',
        value: '1',
        key: '1',
      },
      {
        label: '深圳市',
        value: '2',
        key: '2',
      },
      {
        label: '广州市',
        value: '3',
        key: '3',
      },
    ],
    jiangsu: [
      {
        label: '南京市',
        value: '1',
        key: '1',
      },
      {
        label: '无锡市',
        value: '2',
        key: '2',
      },
      {
        label: '苏州市',
        value: '3',
        key: '3',
      },
    ],
  };

  const schemas: FormSchema[] = [
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '基础字段',
    },
    {
      field: 'field1',
      component: 'Input',
      label: '字段1',

      colProps: {
        span: 8,
      },
      // componentProps:{},
      // can func
      componentProps: ({ schema, formModel }) => {
        console.log('form:', schema);
        console.log('formModel:', formModel);
        return {
          placeholder: '自定义placeholder',
          onChange: (e: any) => {
            console.log(e);
          },
        };
      },
      renderComponentContent: () => {
        return {
          prefix: () => 'pSlot',
          suffix: () => 'sSlot',
        };
      },
      showTooltip: true,
      tooltip: '新建',
    },
    {
      field: 'field2',
      component: 'Input',
      label: '字段2',
      defaultValue: '111',
      colProps: {
        span: 8,
      },
      componentProps: {
        onChange: (e: any) => {
          console.log(e);
        },
      },
      suffix: '天',
    },
    {
      field: 'field3',
      component: 'DatePicker',
      label: '字段3',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field4',
      component: 'Select',
      label: '字段4',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
            key: '1',
          },
          {
            label: '选项2',
            value: '2',
            key: '2',
          },
        ],
      },
    },
    {
      field: 'field5',
      component: 'CheckboxGroup',
      label: '字段5',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
        ],
      },
      showTooltip: true,
      tooltip: '无数据',
    },
    {
      field: 'field7',
      component: 'RadioGroup',
      label: '字段7',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
        ],
      },
    },
    {
      field: 'field8',
      component: 'Checkbox',
      label: '字段8',
      colProps: {
        span: 8,
      },
      renderComponentContent: 'Check',
    },
    {
      field: 'field9',
      component: 'Switch',
      label: '字段9',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field10',
      component: 'RadioButtonGroup',
      label: '字段10',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
        ],
      },
    },
    {
      field: 'field11',
      component: 'Cascader',
      label: '字段11',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
              {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                  {
                    value: 'xihu',
                    label: 'West Lake',
                  },
                ],
              },
            ],
          },
          {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
              {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                  {
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      field: 'divider-api-select',
      component: 'Divider',
      label: '远程下拉演示',
    },
    {
      field: 'field30',
      component: 'ApiSelect',
      label: '懒加载远程下拉',
      required: true,
      componentProps: {
        // more details see /src/components/Form/src/components/ApiSelect.vue
        api: optionsListApi,
        params: {
          id: 1,
        },
        resultField: 'list',
        // use name as label
        labelField: 'name',
        // use id as value
        valueField: 'id',
        // not request untill to select
        immediate: false,
        onChange: (e) => {
          console.log('selected:', e);
        },
        // atfer request callback
        onOptionsChange: (options) => {
          console.log('get options', options.length, options);
        },
      },
      colProps: {
        span: 8,
      },
      defaultValue: '0',
    },
    {
      field: 'field311',
      component: 'JAreaLinkage',
      label: '省市区选择',
      helpMessage: ['JAreaLinkage组件', '省市区选择'],
      required: true,
      slot: 'jAreaLinkage',
      colProps: {
        span: 8,
      },
      defaultValue: ['130000', '130200'],
    },
    {
      field: 'field31',
      component: 'Input',
      label: '下拉本地搜索',
      helpMessage: ['ApiSelect组件', '远程数据源本地搜索', '只发起一次请求获取所有选项'],
      required: true,
      slot: 'localSearch',
      colProps: {
        span: 8,
      },
      defaultValue: '0',
    },
    {
      field: 'field32',
      component: 'Input',
      label: '下拉远程搜索',
      helpMessage: ['ApiSelect组件', '将关键词发送到接口进行远程搜索'],
      required: true,
      slot: 'remoteSearch',
      colProps: {
        span: 8,
      },
      defaultValue: '0',
    },
    {
      field: 'field33',
      component: 'ApiTreeSelect',
      label: '远程下拉树',
      helpMessage: ['ApiTreeSelect组件', '使用接口提供的数据生成选项'],
      required: true,
      componentProps: {
        api: treeOptionsListApi,
        resultField: 'list',
      },
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field34',
      component: 'ApiRadioGroup',
      label: '远程Radio',
      helpMessage: ['ApiRadioGroup组件', '使用接口提供的数据生成选项'],
      required: true,
      componentProps: {
        api: optionsListApi,
        params: {
          count: 2,
        },
        resultField: 'list',
        // use name as label
        labelField: 'name',
        // use id as value
        valueField: 'id',
      },
      defaultValue: '1',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field35',
      component: 'ApiRadioGroup',
      label: '远程Radio',
      helpMessage: ['ApiRadioGroup组件', '使用接口提供的数据生成选项'],
      required: true,
      componentProps: {
        api: optionsListApi,
        params: {
          count: 2,
        },
        resultField: 'list',
        // use name as label
        labelField: 'name',
        // use id as value
        valueField: 'id',
        isBtn: true,
      },
      colProps: {
        span: 8,
      },
    },
    {
      field: 'divider-linked',
      component: 'Divider',
      label: '字段联动',
    },
    {
      field: 'province',
      component: 'Select',
      label: '省份',
      colProps: {
        span: 8,
      },
      componentProps: ({ formModel, formActionType }) => {
        return {
          options: provincesOptions,
          placeholder: '省份与城市联动',
          onChange: (e: any) => {
            // console.log(e)
            let citiesOptions = e == 1 ? citiesOptionsData[provincesOptions[0].id] : citiesOptionsData[provincesOptions[1].id];
            // console.log(citiesOptions)
            if (e === undefined) {
              citiesOptions = [];
            }
            formModel.city = undefined; //  reset city value
            const { updateSchema } = formActionType;
            updateSchema({
              field: 'city',
              componentProps: {
                options: citiesOptions,
              },
            });
          },
        };
      },
    },
    {
      field: 'city',
      component: 'Select',
      label: '城市',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [], // defalut []
        placeholder: '省份与城市联动',
      },
    },
    {
      field: 'divider-selects',
      component: 'Divider',
      label: '互斥多选',
      helpMessage: ['两个Select共用数据源', '但不可选择对方已选中的项目'],
    },
    {
      field: 'selectA',
      component: 'Select',
      label: '互斥SelectA',
      slot: 'selectA',
      defaultValue: [],
      colProps: {
        span: 8,
      },
    },
    {
      field: 'selectB',
      component: 'Select',
      label: '互斥SelectB',
      slot: 'selectB',
      defaultValue: [],
      colProps: {
        span: 8,
      },
    },
    {
      field: 'divider-others',
      component: 'Divider',
      label: '其它',
    },
    {
      field: 'field20',
      component: 'InputNumber',
      label: '字段20',
      required: true,
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field21',
      component: 'Slider',
      label: '字段21',
      componentProps: {
        min: 0,
        max: 100,
        range: true,
        marks: {
          20: '20°C',
          60: '60°C',
        },
      },
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field22',
      component: 'Rate',
      label: '字段22',
      defaultValue: 3,
      colProps: {
        span: 8,
      },
      componentProps: {
        disabled: false,
        allowHalf: true,
      },
    },
  ];

  /** 获取锚点列表数据，支持过滤处理 */
  const anchorItems = reactive([
    {
      key: 'basicForm1',
      href: '#basicForm1',
      title: 'BaseForm1',
      fieldsError: 0,
    },
    {
      key: 'basicForm2',
      href: '#basicForm2',
      title: 'BaseForm2',
      fieldsError: 0,
    },
  ]);
  /** 获取锚点列表数据，支持过滤处理 */
  const getAnchorItems = (dataList) => {
    return dataList;
  };

  export default defineComponent({
    components: {
      BasicForm,
      CollapseContainer,
      PageWrapper,
      ApiSelect,
      JAreaLinkage,
      ASelect: Select,
      Anchor,
    },
    setup() {
      const check = ref(null);
      const { createMessage } = useMessage();
      const keyword = ref<string>('');
      const searchParams = computed<Recordable>(() => {
        return { keyword: unref(keyword) };
      });

      function onSearch(value: string) {
        keyword.value = value;
      }

      /** 表单组 */
      const basicForm1 = ref(null);
      const basicForm2 = ref(null);
      const basicFormList = [basicForm1, basicForm2];
      const getAllForm = () => {
        return basicFormList.map((_form) => _form.value);
      };
      const getAllFormRef = () => {
        return basicFormList.map((_form) => _form.value?.formElRef);
      };
      const callAllFormSubmit = async () => {
        getAllForm().forEach((_form) => {
          _form?.submit();
        });
      };

      const callAllFormReset = async () => {
        getAllForm().forEach((_form) => {
          _form?.resetFields();
        });
      };

      const callAllFormValidate = async () => {
        try {
          const allResult = await Promise.all(getAllForm().map((form) => form?.validate()));
          // const allResult = await Promise.all(getAllFormRef().map((form) => form?.validateFields()));
          // let res1 = null;
          // let res2 = null;
          // res1 = await form1Ref?.validateFields();
          // res2 = await form2Ref?.validateFields();
          console.log('所有表单验证通过:', allResult);
        } catch (error) {
          console.log('error:', error);
        }
        // const res1 = await basicForm1.value?.validateFields();
        // const res2 = await basicForm2.value?.validateFields();

        // 调用更多子组件的方法...
        console.log('onMounted basicForm:', {
          allForm: getAllForm(),
          getAllFormRef: getAllFormRef(),
          getSchema1: basicForm1.value?.getSchema,
          getSchema2: basicForm2.value?.getSchema,
        });
      };

      function handleValidateError(errorValues: any, formKey: string) {
        const num = errorValues?.errorFields?.length;
        if (num > 0) {
          createMessage.warn(formKey + '共有' + num + '个字段验证失败!');
          anchorItems.forEach((item) => {
            if (item.key === formKey) {
              item.fieldsError = num;
            }
          });
          console.log('wwwww anchorItems:', anchorItems);
        }
        console.log('handleValidateError', errorValues);
      }

      onMounted(() => {
        // callAllFormValidate();
        // document.addEventListener('scroll', () => {
        //   console.log('onMounted scroll', window.scrollY);
        // });
      });

      return {
        schemas,
        anchorItems,
        getAnchorItems,
        optionsListApi,
        optionsA,
        optionsB,
        oldValue,
        valueSelectA,
        valueSelectB,
        onSearch: useDebounceFn(onSearch, 300),
        searchParams,
        handleReset: () => {
          keyword.value = '';
        },
        handleValidateSuccess: (values: any) => {
          createMessage.info('handleValidateSuccess');
          console.log(values);
        },
        handleValidateError,
        handleSubmit: (values: any) => {
          createMessage.success('click search,values:' + JSON.stringify(values));
        },
        basicForm1,
        basicForm2,
        callAllFormSubmit,
        callAllFormReset,
        callAllFormValidate,
        check,
      };
    },
  });
</script>
<style lang="scss">
  .btn-group {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .fields-error {
    color: #fff;
    background-color: #d00;
    border-radius: 10px;
    text-align: center;
    line-height: 19px;
    margin-left: 3px;
    font-size: 12px;
    font-weight: bold;
    display: inline-block;
    width: 19px;
    height: 19px;
  }
</style>
