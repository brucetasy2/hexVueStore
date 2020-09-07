<template>
  <div>
    <Menu1 />
     <div class='container-fluid'>
      <div class='row'>
        <main role='main' class='col-md-12 ml-sm-auto px-4'>
          <!-- <router-link /> 造成錯誤 -->
        </main>
      </div>
    </div>
    <router-view />

   <Footer/>
<!-- new ed -->

  </div>
</template>

<script>
import Menu1 from '@/views/main/Home.vue';
import Footer from '@/views/main/Footer.vue';

export default {
  name: 'Homecontainer',
  components: {
    Menu1,
    Footer,
  },
  data() {
    return {
    };
  },
};
</script>

<style lang="scss"></style>
