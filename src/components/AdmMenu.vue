<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand text-light bg-primary" href="#">Vue 後台管理系統</a>
    <div>
      <ul class="navbar-nav mr-auto">

        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'products_page'}">
            產品列表
          </router-link>
        </li>

        <li class="nav-item">
           <router-link class='nav-link' :to="{ name:'orders_page'}">訂單列表</router-link>
        </li>

        <li class="nav-item">
           <router-link class='nav-link' :to="{ name:'storages_page'}">圖檔管理</router-link>
        </li>

        <li class="nav-item">
           <router-link  class='nav-link' :to="{ name:'coupons_page'}">優惠券</router-link>
        </li>

        <li class="nav-item">
           <router-link class='nav-link' :to="{ name:'mockorder_page'}">模擬下單</router-link>
        </li>

        <li>
          <a @click.prevent="backHome" class="text-muted ml-3 ">
            <i class="fas fa-home fa-2x text-info"></i>
          </a>
        </li>

        <li class="nav-item">
          <a @click.prevent="logout" class="text-muted ml-3 ">
            <i class="fas fa-sign-out-alt fa-2x text-danger">
            </i>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    backHome() {
      this.$router.push('/');
    },
    logout() {
      this.token = document.cookie.replace(
        /(?:(?:^|.*;\s*)BruceStoreT7_token\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      document.cookie = 'BruceStoreT7_token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
      this.$router.push('/');
    },
  },
};
</script>
