<template>
  <div class="allcontent">
    <TopPanel />
    <MainFrame />
  </div>
</template>

<script>
  import '@/assets/styles.scss';
  import TopPanel from '@/components/TopPanel.vue';
  import MainFrame from '@/components/MainFrame.vue';

  export default {
    components: { 
      TopPanel,
      MainFrame 
    }
  }
</script>