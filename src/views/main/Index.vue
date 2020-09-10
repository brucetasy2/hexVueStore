<template>
  <div>
    <Loading :active.sync="isLoading" />
    <div class="container">
      <div class="row flex-md-row-reverse flex-column">
        <div class="col-md-6">
          <img
          src="https://images.unsplash.com/photo-1474974573965-2ed43d64cb45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60
          alt="
          class="img-fluid rounded-lg">
        </div>

        <div class="col-md-6 d-flex flex-column justify-content-center mt-md-0 mt-3 text-left">
          <h2 class="font-weight-bold ">Rototo 肉多多</h2>
          <h5 class="font-weight-normal text-muted mt-2">訂閱獲取優惠卷 & 最新商品訊息</h5>

          <div>
            <!-- <ValidationProvider name="電子郵件" rules="required|min:5"  v-slot="{ errors }"> -->
            <div class="input-group mb-0 mt-4">
                <input type="text" class="form-control rounded-sm mr-3"
                placeholder="請輸入電子郵件帳號"
                v-model="userEmail"/>
                <div class="input-group-append ">
                  <button @click="subscription"
                  class="btn btn-dark rounded-sm "
                  type="button" id="subscription" >
                    訂閱電子報
                  </button>
                </div>
            </div>
              <!-- <small id="descriptionErr" class="form-text d-flex text-danger">
                    {{ errors[0] }}
              </small>
             </ValidationProvider> -->
          </div>

        </div>
      </div>

      <div class="row mt-5">
        <div class="card-columns">
          <div class="card" v-for="item in products" :key="item.id">
            <img :src="item.imageUrl[0]" class="card-img-top rounded-sm" alt="這是產品圖片">
            <div class="card-body">
              <h5 class="card-title">{{ item.category }}
                <strong> {{ item.title}}</strong>
              </h5>
              <p class="card-text text-center" v-html="item.content"> </p>
              <div class="d-flex justify-content-end">
                <button @click="addtoCart(item, 1)"
                class="btn btn btn-outline-success text-nowrap rounded-lg">
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 輪播區塊起 -->
    <div class="bg-light mt-7">
      <div class="container">
        <div id="carouselExampleControls"
        class="carousel slide"
        data-ride="carousel"
        >

          <div class="carousel-inner" >
            <div class="carousel-item "
            v-for="(item, index) in products" :key="item.id"
            :class = "index===0 ? 'active':'' "
            >
              <div class="row justify-content-center py-7">
                <div class="col-md-8 d-flex">
                  <img :src="item.imageUrl[0]"
                  alt="" class="rounded-circle mr-5"
                  style="width: 160px; height: 160px; object-fit: cover;">
                  <div class="d-flex flex-column">
                    <p class="h5">{{ item.title}}</p>
                    <p class="mt-auto text-muted" v-html="item.content"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <a
          class="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev">
            <!-- <span class="carousel-control-prev-icon " aria-hidden="true"></span> -->
            <span class="fa fa-chevron-left fa-lg text-success" ></span>
            <span class="sr-only">Previous</span>
          </a>

          <a class="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next">
            <!-- <span class="carousel-control-next-icon" aria-hidden="true"></span> -->
             <span class="fa fa-chevron-right fa-lg text-success" ></span>
            <span class="sr-only">Next</span>
          </a>

        </div>
      </div>
    </div>
    <!-- 輪播區塊迄 -->

    <div class="py-4">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-4 text-center">
            <h3 class="text-danger">Rototo 肉多多 、多肉肉 </h3>
            <p class="text-muted">
             有時像蛋糕上的奶油裝飾品、
             有時化身毛茸茸的溫暖模樣、 有時也像花朵燦爛綻放、 有時也迎風飄揚...</p>
            <!-- <button class="btn btn-dark mt-4 rounded-0">Wait..</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import { EventBus } from '@/components/Eventbus.js';

export default {
  name: 'index',
  components: {
  },
  data() {
    return {
      products: [],
      tempProduct: {
        imageUrl: [],
      },
      isLoading: false,
      uuid: process.env.VUE_APP_UUID,
      userEmail: '',
      carts: {},
      status: {
        loadingItem: '',
      },
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}${this.uuid}/ec/products`;
      this.$http
        .get(api)
        .then((res) => {
          this.products = res.data.data;
          // this.pagination = res.data.meta.pagination;
          this.isLoading = false;
        })
        .catch((error) => {
          this.$swal.fire({
            icon: 'error',
            title: 'Oops1...',
            text: `錯誤代碼${error.request.status}`,
          });
          this.isLoading = false;
        });
    },

    subscription() {
      if (this.userEmail.length === 0) {
        this.$swal.fire({
          icon: 'error',
          title: '訂閱失敗',
          text: '請輸入您的電子郵件 !',
          timer: 6000,
        });
      } else {
        this.$swal.fire({
          icon: 'success',
          title: '訂閱成功',
          text: '獲得優惠碼:888 !',
          timer: 6000,
        });
      }
    },

    addtoCart(item, quantity = 1) {
      this.tempProduct = item;
      this.status.loadingItem = item.id;
      const cart = {
        product: item.id,
        quantity,
      };

      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}${this.uuid}/ec/shopping`;
      this.$http
        .post(api, cart)
        .then(() => {
          this.isLoading = false;
          this.status.loadingItem = '';
          this.$swal.fire({
            icon: 'sucess',
            title: '加入購物車..',
            text: '成功',
            timer: 1500,
          });
          this.getCart();
        })
        .catch((error) => {
          this.$swal.fire({
            icon: 'error',
            title: '加入購物車..',
            text: `失敗,錯誤代碼${error.request.status}`,
          });
          this.isLoading = false;
          this.status.loadingItem = '';
        });
    },

    getCart() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}${this.uuid}/ec/shopping`;
      this.$http
        .get(api)
        .then((res) => {
          this.carts = res.data.data;
          this.isLoading = false;
          // 購物車目前商品統計
          EventBus.$emit('cartsQuantity', this.carts.length);
        })
        .catch((error) => {
          this.$swal.fire({
            icon: 'error',
            title: '取得購物車內容失敗...',
            text: `錯誤代碼${error.request.status}`,
          });
          this.isLoading = false;
        });
    },

  },
};
</script>
