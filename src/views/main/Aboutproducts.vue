<template>
<div>
  <Loading :active.sync="isLoading" />
    <nav class="navbar navbar-expand-lg navbar-light
    justify-content-center border border-left-0
    border-right-0 border-top border-bottom">
      <div class="navbar-nav flex-row overflow-auto navbar-custom-scroll">
        <a @click.prevent="userSele('*')"
          class="nav-item nav-link text-nowrap px-2"
          :class = "this.CureSele===0 ? 'active':'' " href="#">
          全部商品
        </a>
        <a  @click.prevent="userSele('kristian')"
          class="nav-item nav-link text-nowrap px-2"
          :class = "this.CureSele===1 ? 'active':'' " href="#">
          kristian
        </a>
        <a  @click.prevent="userSele('ergita')"
          class="nav-item nav-link text-nowrap px-2"
          :class = "this.CureSele===2 ? 'active':'' " href="#">
          ergita
        </a>
        <a   @click.prevent="userSele('Stephanie')"
          class="nav-item nav-link text-nowrap px-2"
          :class = "this.CureSele===3 ? 'active':'' " href="#">
          Stephanie
        </a>
      </div>
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
              :class = " isTracer(item.id)  ? 'text-danger' : 'text-white' "
              @click="gotracer(item.id)" ></i>
            </div>

            <div class="card-body">
              <span class="badge badge-secondary float-right ml-2">
                {{ item.category }}
              </span>

            <router-link :to="`/Productsdetail/${item.id}`">
              <h5 class="card-title font-weight-bold text-brown">
                {{ item.title }}
              </h5>
            </router-link>

              <p class="card-text" v-html="item.content"></p>

              <div class="row justify-content-around ">
                <!-- text-right pr-2 -->
                <!-- {{ item.origin_price }}元 {{ item.price }}元 -->

                  <div class="col">
                    <p
                    :style="item.origin_price < item.price ?
                      'text-decoration:none;' : 'text-decoration: line-through;'">
                      原價:{{ item.origin_price }}元</p>
                  </div>
                  <div class="col">
                    <p :style="item.origin_price < item.price ?
                      '' : 'font-weight:900;'">
                      特價:{{ item.price }}元
                    </p>
                    </div>

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

  <!-- <Pagination
        :pages="pagination"
        @naviPages="getProducts"
      /> -->
</div>
</template>

<script>
// import Pagination from '@/components/Pagination.vue';
// eslint-disable-next-line import/extensions
import { EventBus } from '@/components/Eventbus.js';

export default {
  name: 'AboutProducts',
  components: {
    // Pagination,
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
      tdl: {
        'text-decoration-line': 'line-through',
      },
      tdln: {
        'text-decoration-line': 'none',
      },
    };
  },
  created() {
    this.getProducts();
    this.userSele(this.CureSele);
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
          this.userSele(this.CureSele);
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

    userSele(para1) {
      this.CureSele = para1;
      if (para1 === '*') {
        this.products = this.rowproducts.filter((item) => item.category !== para1);
      } else {
        this.products = this.rowproducts.filter((item) => item.category === para1);
      }
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

    gotracer(id) {
      // console.log(`id ${id}`);
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
