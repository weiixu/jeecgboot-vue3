<script lang="tsx">
  import { defineComponent, onMounted, reactive, ref, VNode } from 'vue';
  import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons-vue';
  import FlowForm from './FlowForm.vue';
  import { FlowFormTypeEnum } from './constants';

  import AdvancedForm from '../AdvancedForm.vue';
  import AppendForm from '../AppendForm.vue';
  import CustomerForm from '../CustomerForm.vue';
  import DynamicForm from '../DynamicForm.vue';
  import RefForm from '../RefForm.vue';
  import RuleForm from '../RuleForm.vue';
  import UseForm from '../UseForm.vue';

  import { PageWrapper } from '/@/components/Page';
  import { Anchor, AnchorProps } from 'ant-design-vue';
  import BaseForm from '/@/views/demo/page/form/basic/index.vue';
  import DemoForm from '/@/views/demo/form/DemoForm.vue';
  import { BasicForm } from '/@/components/Form';
  import { AnchorLinkItemProps } from 'ant-design-vue/es/anchor';
  // import {
  //   BasicFiledsLayotForm,
  //   BasicFormCustomSlots,
  //   BasicFormSearch,
  //   BasicFixedWidthForm,
  //   BasicFormDynamicsRules,
  //   BasicFormSlots,
  //   BasicFormAdd,
  //   BasicFormFieldShow,
  //   BasicFormValue,
  //   BasicFormBtn,
  //   BasicFormFieldTip,
  //   BasicFunctionForm,
  //   BasicFormCleanRule,
  //   BasicFormFooter,
  //   BasicFormCompact,
  //   BasicFormLayout,
  //   BasicFormComponent,
  //   BasicFormModal,
  //   BasicFormConAttribute,
  //   BasicFormRander,
  //   BasicFormCustom,
  //   BasicFormRules,
  //   BasicFormCustomComponent,
  //   BasicFormSchemas,
  // } from '../../document/form';

  import { useFormData } from './hooks/useFormData';

  interface IAnchorData {
    key: string;
    href: string;
    title: string;
    type?: FlowFormTypeEnum;
  }
  interface IFlowFormDataItem extends IAnchorData {
    children?: IAnchorData[];
  }

  const props = {
    // /**
    //  * Help text max-width
    //  * @default: 600px
    //  */
    // maxWidth: { type: String, default: '600px' },
    // /**
    //  * Whether to display the serial number
    //  * @default: false
    //  */
    // showIndex: { type: Boolean },
    // /**
    //  * Help text font color
    //  * @default: #ffffff
    //  */
    // color: { type: String, default: '#ffffff' },
    // /**
    //  * Help text font size
    //  * @default: 14px
    //  */
    // fontSize: { type: String, default: '14px' },
    // /**
    //  * Help text list
    //  */
    // placement: { type: String, default: 'right' },
    // /**
    //  * Help text list
    //  */
    // text: { type: [Array, String] as PropType<string[] | string> },
  };
  export default defineComponent({
    name: 'FlowPage',
    // components: { Tooltip },
    props,
    setup(props, { slots }) {
      console.log('FlowPage :', props, slots);

      // const { prefixCls } = useDesign('basic-help');

      // const getTooltipStyle = computed((): CSSProperties => ({ color: props.color, fontSize: props.fontSize }));

      // const getOverlayStyle = computed((): CSSProperties => ({ maxWidth: props.maxWidth }));

      // function renderTitle() {
      //   const textList = props.text;

      //   if (isString(textList)) {
      //     return <p>{textList}</p>;
      //   }

      //   if (isArray(textList)) {
      //     return textList.map((text, index) => {
      //       return (
      //         <p key={text}>
      //           <>
      //             {props.showIndex ? `${index + 1}. ` : ''}
      //             {text}
      //           </>
      //         </p>
      //       );
      //     });
      //   }
      //   return null;
      // }

      // return () => {
      //   return (
      //     <Tooltip
      //       overlayClassName={`${prefixCls}__wrap`}
      //       title={<div style={unref(getTooltipStyle)}>{renderTitle()}</div>}
      //       autoAdjustOverflow={true}
      //       overlayStyle={unref(getOverlayStyle)}
      //       placement={props.placement as 'right'}
      //       getPopupContainer={() => getPopupContainer()}
      //     >
      //       <span class={prefixCls}>{getSlot(slots) || <InfoCircleOutlined />}</span>
      //     </Tooltip>
      //   );
      // };

      const { registerForm } = useFormData();

      const FormMapping = {
        DemoForm: <DemoForm />,
        BaseForm: <BaseForm />, // import('/@/views/demo/page/form/basic/index.vue'),
        BasicForm: <BasicForm onRegister={registerForm} />,
        AdvancedForm: <AdvancedForm />,
        AppendForm: <AppendForm />,
        CustomerForm: <CustomerForm />,
        DynamicForm: <DynamicForm />,
        RefForm: <RefForm />,
        RuleForm: <RuleForm />,
        UseForm: <UseForm />,
        // BasicFiledsLayotForm: <BasicFiledsLayotForm />,
        // BasicFormCustomSlots: <BasicFormCustomSlots />,
        // BasicFormSearch: <BasicFormSearch />,
        // BasicFixedWidthForm: <BasicFixedWidthForm />,
        // BasicFormDynamicsRules: <BasicFormDynamicsRules />,
        // BasicFormSlots: <BasicFormSlots />,
        // BasicFormAdd: <BasicFormAdd />,
        // BasicFormFieldShow: <BasicFormFieldShow />,
        // BasicFormValue: <BasicFormValue />,
        // BasicFormBtn: <BasicFormBtn />,
        // BasicFormFieldTip: <BasicFormFieldTip />,
        // BasicFunctionForm: <BasicFunctionForm />,
        // BasicFormCleanRule: <BasicFormCleanRule />,
        // BasicFormFooter: <BasicFormFooter />,
        // BasicFormCompact: <BasicFormCompact />,
        // BasicFormLayout: <BasicFormLayout />,
        // BasicFormComponent: <BasicFormComponent />,
        // BasicFormModal: <BasicFormModal />,
        // BasicFormConAttribute: <BasicFormConAttribute />,
        // BasicFormRander: <BasicFormRander />,
        // BasicFormCustom: <BasicFormCustom />,
        // BasicFormRules: <BasicFormRules />,
        // BasicFormCustomComponent: <BasicFormCustomComponent />,
        // BasicFormSchemas: <BasicFormSchemas />,
      };

      const basicFormKey = Object.keys(FormMapping)
        .map((key, inde) => {
          if ([FlowFormTypeEnum.DemoForm, FlowFormTypeEnum.BaseForm].includes(key as FlowFormTypeEnum)) return;
          return {
            key: key,
            href: `#${key}-${inde}`,
            title: `${key}`,
            type: FlowFormTypeEnum[key],
          };
        })
        .filter(Boolean) as IFlowFormDataItem[];

      const flowFormData: IFlowFormDataItem[] = reactive([
        {
          key: '1',
          href: '#demo-form',
          title: 'DemoForm',
          type: FlowFormTypeEnum.DemoForm,
        },
        {
          key: 'base-form',
          href: '#anchor-base-form',
          title: 'BaseForm',
          type: FlowFormTypeEnum.BaseForm,
        },
        {
          key: '3',
          href: '#all-form',
          title: 'All-form',
          children: basicFormKey,
        },
      ]);

      /** 获取锚点列表数据，支持过滤处理 */
      const getAnchorItems = (dataList: IFlowFormDataItem[]): AnchorLinkItemProps[] => {
        return dataList;
      };

      const showAnchor = ref<boolean>(true);
      const targetOffset = ref<number | undefined>();
      const setShowAnchor = () => {
        showAnchor.value = !showAnchor.value;
      };
      // const getContainer = (): Window | HTMLElement => {
      //  const containerDom = document.querySelector('#flow-page-wrap');
      //  console.log('wwwww getContainer containerDom:', containerDom, containerDom?.scrollTop);
      //  return (containerDom as HTMLElement) || window;
      // };
      // const getCurrentAnchor = (value) => {
      //   console.log('wwwww value:', value);
      //   // return '#anchor-2';
      // };
      const handleClick: AnchorProps['onClick'] = (_e, link) => {
        // _e.preventDefault();
        console.log(link);
      };
      const onChange = (link: string) => {
        console.log('Anchor:OnChange', link);
      };

      onMounted(() => {
        // targetOffset.value = window.innerHeight / 2;
      });

      const rednerForm = (item) => {
        let FormNode: VNode | null = null;
        const mForm = FormMapping[item.type];
        if (mForm) {
          FormNode = mForm;
        }
        return (
          <FlowForm key={item.key} id={item.href.replace('#', '')} title={item.title}>
            {FormNode}
            {item.children?.map((child) => rednerForm(child))}
          </FlowForm>
        );
      };

      return () => {
        return (
          <PageWrapper title="流程表单">
            <div class="flow-page-wrap">
              <div class="flow-page-main">{flowFormData.map((item) => rednerForm(item))}</div>
              <div class="flow-page-anchor" style={showAnchor.value ? { right: 0, width: undefined } : { width: 'auto' }}>
                <div class="flow-page-anchor-title">
                  大纲 <span onClick={setShowAnchor}>{showAnchor.value ? <EyeInvisibleOutlined /> : <EyeOutlined />}</span>
                </div>
                <div style={{ display: showAnchor.value ? undefined : 'none' }}>
                  <Anchor targetOffset={targetOffset.value} items={getAnchorItems(flowFormData)} onClick={handleClick} onChange={onChange} />
                </div>
              </div>
            </div>
          </PageWrapper>
        );
      };
    },
  });
</script>
<style lang="scss" scope>
  html,
  body {
    height: auto;
    overflow: scroll;
  }

  .anchor-item {
    height: 600px;
    background: #999;
  }

  .jeecg-page-wrapper {
    background-color: #f3f3f3;
    position: relative;
    min-width: 460px;
  }
  .jeecg-page-wrapper .jeecg-page-wrapper-content {
    margin-right: 0;
  }

  .jeecg-collapse-container__header {
    border-color: #ebebeb;
  }

  .jeecg-collapse-container {
    border-radius: 10px;
    background-color: #fff;
    overflow: hidden;
  }

  .jeecg-basic-form {
    & + .jeecg-basic-form {
      margin-top: 60px;
    }
  }

  // .jeecg-page-wrapper-content {
  //   display: flex;
  // }
  .flow-page-wrap {
    display: flex;
    height: 100%;
    overflow: hidden;
  }

  .flow-page-main {
    flex: 1;
  }

  .flow-page-anchor {
    // position: fixed;
    top: 20px;
    right: 0;
    margin-left: 10px;
    width: 230px;
    padding: 8px 16px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 6px;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  }

  .form-item-tooltip {
    display: flex;
    align-items: center;
    color: red;
    margin-left: 3px;
  }
</style>
