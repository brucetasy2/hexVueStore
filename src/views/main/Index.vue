<template>
  <div>
    <Loading :active.sync="isLoading" />

<!-- 1st -->
<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner">
    <!-- #1 ST -->
    <div class="carousel-item active">
      <img class="d-block w-100"
      style="height: 500px; object-fit: cover;"
      src="https://images.unsplash.com/photo-1520006709240-e2a6f6323d8e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
      alt="1 slide">

      <div class="carousel-caption ">
        <div class="row">
          <div class="col"></div>
          <div class="col col-lg-3">
            <div class="d-flex flex-column">
              <div class="p-2">
                <h2 class="font-weight-bold text-lg-center" style="color:#27233A;">
                  天性堅韌
                </h2>
              </div>
              <div class="p-2">
                <p class="font-weight-bold "
                  style="font-size:24px; color:#27233A;">
                  幾個星期不澆水也活得下去，很適合忙碌健忘的現代人。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- #1 ED -->
    <!-- #2 ST -->
    <div class="carousel-item">
      <img class="d-block w-100"
      style="height: 500px; object-fit: cover;"
      src="https://images.unsplash.com/photo-1491381444146-6ef9fec7d309?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
      alt="2 slide">

      <div class="carousel-caption ">
        <div class="row">
          <div class="col"></div>
          <div class="col col-lg-3">
            <div class="d-flex flex-column">
              <div class="p-2">
                <h2 class="font-weight-bold text-lg-center"  style="color:#F0425C; ">
                  圓胖、喜感、逗趣
                </h2>
              </div>
              <div class="p-2">
                <p class="font-weight-bold "
                  style="font-size:24px;  color:#F0425C;">
                  撫慰與調節現代人緊張的生活步調，減低憂鬱發生。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- #2 ED -->

    <!-- #3 ST -->
    <div class="carousel-item">
      <img class="d-block w-100"
      style="height: 500px; object-fit: cover;"
      src="https://images.unsplash.com/photo-1485199926533-8c38475abf2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
      alt="3 slide">

      <div class="carousel-caption ">
        <div class="row ">
          <div class="col col-lg-5">
            <div class="p-2">
              <h2 class="font-weight-bold text-lg-center" style="color:#673C41; ">
                吸收有害物質
              </h2>
              </div>
              <div class="p-2">
                <p class="font-weight-bold "
                  style="font-size:24px; color:#673C41;">
                  對甲醛、苯等有害物質會有一定的淨化。<br/>接觸空氣面積較大的多肉，效果也會越好。
                </p>
              </div>
          </div>
          <div class="col ">
            <div class="d-flex flex-column">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- #3 ED -->
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators"
  role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators"
  role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>

<!-- 1end -->
    <div class="container mt-6">
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

    <!-- 變更 Landcarousel 到 元件 目前失效中  -->
    <Landcarousel > 元件 目前失效中 </Landcarousel >

    <div class="container my-3">
      <div class="row">
        <div class="col text-danger my-4" style="font-size:24px;font-weight:bold;">
          Rototo 肉多多
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h5 style="font-size:16px;color:#00522E;">
            提供名家設計款多肉植物，搭配特選花器、配合主題凸顯您的品味。<br/>
            配合季節推出限量訂製品，，是送禮與自用最佳選擇 !
          </h5>
        </div>
      </div>

      <div class="row">
        <div class="col">
        <p>
             多肉植物<br/>
             有時像蛋糕上的奶油裝飾品、<br/>
             有時化身毛茸茸的溫暖模樣、<br/>
             有時也像花朵燦爛綻放、 <br/>
             有時也迎風飄揚...
        </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import { EventBus } from '@/components/Eventbus.js';
import { Landcarousel } from '@/components/Landcarousel.vue';

export default {
  name: 'index',
  components: {
    Landcarousel,
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
