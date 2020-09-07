<template>
 <div
    class="container next"
    style="margin-top: 120px;"
  >
  <Loading :active.sync="isLoading" />
    <div class="card">
      <div
        class="mx-auto"
        style="margin-top: 40px;"
      >
        <h2> 請登入系統</h2>
      </div>

      <div
        class="card-body"
        style="margin-top: 20px;"
      >
        <form
          class="form-login"
          @submit.prevent="login"
        >
          <div class="input-group form-group">
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="fas fa-user" /></span>
            </div>

            <input
              v-model="user.email"
              type="text"
              name="email"
              class="form-control"
              placeholder="Username"
              required
            >
          </div>

          <div class="input-group form-group">
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="fas fa-key" /></span>
            </div>
            <input
              v-model="user.password"
              type="password"
              name="password"
              class="form-control"
              placeholder="Password"
            >
          </div>

          <div class="form-group mx-5">
            <input
              type="button"
              name="btn"
              value="Login"
              class="btn btn-outline-danger float-right login_btn mx-2"
              @click="login"
            >

            <input
              type="button"
              name="btn"
              value="Logout"
              class="btn btn-outline-warning float-right login_btn mx-2"
              @click="logout"
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      token: '',
      expired: '',
      isLoading: false,
    };
  },
  created() {
    this.token = document.cookie.replace(
      /(?:(?:^|.*;\s*)BruceStoreT7_token\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    const url = `${process.env.VUE_APP_APIPATH}auth/check`;
    // Axios 預設值
    this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`;
    this.$http
      .post(url, { api_token: this.token })
      .then(() => {
        this.$router.push('/admin/products');
      });
  },
  methods: {
    login() {
      const api = `${process.env.VUE_APP_APIPATH}auth/login`;
      this.isLoading = true;
      this.$http
        .post(api, this.user)
        .then((response) => {
          const { token } = response.data;
          const { expired } = response.data;
          // 寫入 cookie token  expires 設置有效時間
          document.cookie = `BruceStoreT7_token=${token}; expires=${new Date(expired * 1000)}; path=/`;

          this.$swal.fire({
            icon: 'success',
            title: `${this.user.email}`,
            text: '您好',
          });
          this.isLoading = false;
          this.$router.push('/admin/products');
        })
        .catch((error) => {
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `很抱歉，您無法登入，錯誤代碼${error.request.status}`,
          });
          this.isLoading = false;
        });
    },

    //   清除token
    logout() {
      this.token = document.cookie.replace(
        /(?:(?:^|.*;\s*)BruceStoreT7_token\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      document.cookie = 'BruceStoreT7_token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
    },
  },
};
</script>
