<template>
<div>
  <Loading :active.sync="isLoading" />
    <nav class="navbar navbar-expand-lg navbar-light
    justify-content-center border border-left-0
    border-right-0 border-top border-bottom">
      <h2>您喜愛的商品</h2>
   </nav>

    <div class="container mt-md-5 mt-3 mb-7">
      <div class="row">
        <div  class="col-lg-4 col-sm-6 mb-3 mb-4"
        v-for="item in products" :key="item.id">
          <div  class="card h-100 rounded-0">

           <router-link :to="`/Productsdetail/${item.id}`">
              <div class="rounded-0"
                style="height: 300px; background-size: cover;
                background-position: center center;"
                :style="{backgroundImage: 'url(' +item.imageUrl[0] + ')' }">
              </div>
            </router-link>

            <div class="position-absolute p-2 heart-icon bg-secondary">
              <i class="fas fa-heart "
              :class = " isTracer(item.id)  ? 'text-danger' : 'text-white' " href="#"
              @click="gotracer(item.id)" ></i>
            </div>

            <div class="card-body">
              <span class="badge badge-secondary float-right ml-2">
                {{ item.category }}
              </span>
              <a href="#" class="">
                <h5 class="card-title font-weight-bold text-brown">
                {{ item.title }}
                </h5>
              </a>
              <p class="card-text" v-html="item.content"></p>

              <div  class="text-right pr-2 h6">
                {{ item.origin_price }}元 {{ item.price }}元
              </div>
            </div>

            <div  class="card-footer d-flex border-top-0 bg-white">
              <button  type="button"
                class="btn btn-outline-brown btn-block rounded-0"
                @click="addtoCart(item, 1)"
                >
                <i  aria-hidden="true"
                class="fa fa-cart-plus"></i> 加到購物車
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="container mt-md-5 mt-3 mb-7"  v-if="products.length==0 ">
      <div class="row">
        <div class="col">
          <h5>您目前尚未加入任何喜愛的商品<i class="text-danger far fa-sad-tear fa-lg"></i></h5>
        </div>
      </div>
    </div>

</div>
</template>

<script>
// eslint-disable-next-line import/extensions
import { EventBus } from '@/components/Eventbus.js';

export default {
  name: 'LoveProducts',
  components: {
  },
  data() {
    return {
      pagination: {},
      rowproducts: [],
      products: [],
      isLoading: false,
      uuid: process.env.VUE_APP_UUID,
      userEmail: '',
      CureSele: '*',
      dynamicPage: 1000,
      fixPage: 1000,
      carts: {},
      cartTotal: 0,
      status: {
        loadingItem: '',
      },
      tracerpro: [],
    };
  },
  created() {
    this.getProducts();
    this.userSele();
    this.getCart();
    this.tracerpro = JSON.parse(localStorage.getItem('rototo'));
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}${this.uuid}/ec/products`;
      this.$http
        .get(api,
          {
            params: {
              page: `${page}`,
              paged: `${this.CureSele === '*' ? this.fixPage : this.dynamicPage}`,
            },
          })
        .then((res) => {
          this.rowproducts = res.data.data;
          this.userSele();
          this.pagination = res.data.meta.pagination;
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

    userSele() {
      this.products.splice(0, this.products.length);
      this.rowproducts.forEach((item) => {
        if (this.isTracer(item.id)) {
          this.products.push(item);
        }
      });
      this.getCart();
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
          EventBus.$emit('cartsQuantity', this.carts.length); // 購物車目前商品統計
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

    gotracer(id) {
      if (this.tracerpro === null || this.tracerpro.length < 0) {
        this.tracerpro = [];
        this.tracerpro.push(id);
      } else {
        const pos = this.tracerpro.indexOf(id);
        if (pos < 0) {
          this.tracerpro.push(id);
        } else {
          this.tracerpro.splice(pos, 1);
        }
        localStorage.setItem('rototo', JSON.stringify(this.tracerpro));
      }
      this.userSele();
    },

    isTracer(id) {
      if (this.tracerpro === null || this.tracerpro.length < 0) {
        return false;
      }
      const pos = this.tracerpro.indexOf(id);
      if (pos >= 0) {
        return true;
      }
      return false;
    },
  },
};
</script>
