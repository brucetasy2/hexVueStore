<template>
  <div>
    <Menu1 />
     <div class='container-fluid'>
      <div class='row'>
        <main role='main' class='col-md-12 ml-sm-auto px-4'>
        </main>
      </div>
    </div>
    <router-view />
   <Footer/>
  </div>
</template>

<script>
import Menu1 from '@/components/Home.vue';
import Footer from '@/components/Footer.vue';

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
