<template>
  <PageWrapper class="page-wrap" title="流程表单">
    <div class="page-main">
      <FlowForm v-for="item in dataList" :key="item.key" :id="item.href.replace('#', '')" :title="item.title" />
    </div>
    <div class="page-anchor">
      <div>大纲 <span @click="setShowAnchor"></span></div>
      <Anchor :target-offset="targetOffset" :items="dataList" @click="handleClick" />
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  // import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons-vue';
  import { onMounted, reactive, ref } from 'vue';
  import FlowForm from './FlowForm.vue';
  import { Anchor, AnchorProps } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';

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
