<template>
  <div class="body">
    <div class="flow-page-anchor">
      <Anchor
        :target-offset="targetOffset"
        :items="[
          {
            key: '1',
            href: '#components-anchor-demo-basic',
            title: 'Basic demo',
          },
          {
            key: '2',
            href: '#components-anchor-demo-static',
            title: 'Static demo',
          },
          {
            key: '3',
            href: '#api',
            title: 'API',
            children: [
              {
                key: '4',
                href: '#anchor-props',
                title: 'Anchor Props',
              },
              {
                key: '5',
                href: '#link-props',
                title: 'Link Props',
              },
            ],
          },
        ]"
      />
    </div>
    <div class="anchor-item" id="components-anchor-demo-basic">1</div>
    <div class="anchor-item" id="components-anchor-demo-static">2</div>
    <div class="anchor-item" id="api">3</div>
    <div class="anchor-item" id="anchor-props">4</div>
    <div class="anchor-item" id="link-props">5</div>
  </div>
</template>
<script lang="ts" setup>
  import { Anchor } from 'ant-design-vue';
  import { onMounted, ref } from 'vue';
  const targetOffset = ref<number | undefined>(undefined);
  onMounted(() => {
    // targetOffset.value = window.innerHeight / 2;
  });
</script>
<style scope>
  html,
  body {
    height: auto;
    overflow: scroll;
  }
  .anchor-item {
    height: 600px;
    background: #999;
  }

  .flow-page-anchor {
    position: fixed;
    top: 90px;
    right: 0;
    margin-right: 20px;
    width: 230px;
    padding: 8px 16px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 6px;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  }
</style>
