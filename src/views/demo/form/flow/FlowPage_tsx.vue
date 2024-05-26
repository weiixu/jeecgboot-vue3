<script lang="tsx">
  import { defineComponent, onMounted, reactive, ref } from 'vue';
  import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons-vue';
  import FlowForm from './FlowForm.vue';
  import { Anchor, AnchorProps } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';

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

      const dataList = reactive([
        {
          key: '1',
          href: '#anchor-1',
          title: 'Anchor anchor-1',
        },
        {
          key: '2',
          href: '#anchor-2',
          title: 'Anchor anchor-2',
        },
        {
          key: '3',
          href: '#anchor-3',
          title: 'Anchor anchor-3',
          children: [
            {
              key: '4',
              href: '#anchor-3-1',
              title: 'Anchor anchor-3-1',
            },
            {
              key: '5',
              href: '#anchor-3-2',
              title: 'Anchor anchor-3-2',
            },
          ],
        },
      ]);

      const showAnchor = ref<boolean>();
      const targetOffset = ref<number | undefined>();
      onMounted(() => {
        targetOffset.value = window.innerHeight / 2;
      });
      const setShowAnchor = () => {
        showAnchor.value = !showAnchor.value;
      };
      const handleClick: AnchorProps['onClick'] = (e, link) => {
        e.preventDefault();
        console.log(link);
      };
      return () => {
        return (
          <PageWrapper class="page-wrap" title="流程表单">
            <div class="page-main">
              {dataList.map((item) => (
                <FlowForm key={item.key} id={item.href.replace('#', '')} title={item.title} />
              ))}
            </div>
            <div class="page-anchor">
              <div>
                大纲 <span onClick={setShowAnchor}>{showAnchor.value ? <EyeInvisibleOutlined /> : <EyeOutlined />}</span>
              </div>
              <Anchor target-offset={targetOffset} items={dataList} onClick={handleClick} />
            </div>
          </PageWrapper>
        );
      };
    },
  });
</script>
<style>
  .page-wrap {
    .jeecg-page-wrapper-content {
      display: flex;
    }
  }
  .page-main {
    flex: 1;
  }
  .page-anchor {
    width: 230px;
  }
</style>
