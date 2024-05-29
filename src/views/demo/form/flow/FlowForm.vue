<script lang="tsx">
  import { defineComponent } from 'vue';
  import { CollapseContainer } from '/@/components/Container/index';

  export default defineComponent({
    name: 'FlowForm',
    components: { CollapseContainer },

    props: {
      id: String,
      title: String,
    },
    setup(props, { slots }) {
      console.log('setup props:', props);
      const { title, id } = props;
      return () => {
        return (
          <div class="flow-form-wrap" id={id}>
            <CollapseContainer title={title}>
              <div class="flow-form-body">{slots.default?.()}</div>
            </CollapseContainer>
          </div>
        );
      };
    },
  });
</script>
<style lang="scss">
  .flow-form-wrap {
    // background-color: #666;
    margin-bottom: 40px;
    & + .flow-form-wrap {
      margin-top: 40px;
    }
  }
  .flow-form-body {
    min-height: 360px;
    margin-bottom: 40px;
  }
</style>
