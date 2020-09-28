<template>
  <div>
    <MenuList />
    <div class='container-fluid'>
      <div class='row'>
        <main role='main' class='col-md-12 ml-sm-auto px-4'>
          <!-- <router-link /> 造成錯誤-->
        </main>
      </div>
    </div>
    <!-- 很重要，找好久 有router-link 就要有 router-view -->
    <router-view />
  </div>
</template>

<script>
import MenuList from '@/components/AdmMenu.vue';

export default {
  name: 'Menucontainer',
  components: {
    MenuList,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss"></style>
