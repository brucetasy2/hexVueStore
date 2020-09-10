<template>
 <div class="bg-white sticky-top">

      <div class="container">
      <div style="min-height: 300px;
      background-image: url(https://images.unsplash.com/photo-1463936575829-25148e1db1b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60);
      background-position: center center;">
      </div>
      <div class="row justify-content-between mt-4 mb-7">
        <div class="col-md-7">
          <h2 class="mb-0">產品名稱 : {{products.title}}</h2>
          <p class="font-weight-bold">原價 {{products.origin_price}} 特價 {{products.price}}</p>
          <p v-html="products.content"></p>

          <div class="my-4">
            <img :src="products.imageUrl[0]">
          </div>

          <div class="accordion border
            border-bottom border-top-0
            border-left-0 border-right-0 mb-3"
            id="accordionExample">
            <div class="card border-0">
              <div class="card-header px-0 py-4 bg-white border border-bottom-0
                border-top border-left-0 border-right-0" id="headingOne"
                data-toggle="collapse" data-target="#collapseOne">
                <div class="d-flex justify-content-between align-items-center pr-1">
                  <h4 class="mb-0">
                    細節說明
                  </h4>
                  <i class="fas fa-minus"></i>
                </div>
              </div>

              <div id="collapseOne" class="collapse show"
                aria-labelledby="headingOne" data-parent="#accordionExample">
                <div class="card-body pb-5">
                  {{products.description}}
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="col-md-4">
          <div class="input-group mb-3 border mt-3">
            <div class="input-group-prepend">
              <button
              class="btn btn-outline-dark rounded-0 border-0 py-3"
              type="button" id="button-addon1"
              @click="quantityUpdata(products.id,products.quantity + 1)"
              >
                <i class="fas fa-minus"></i>
              </button>
            </div>

            <input type="text"
            class="form-control border-0 text-center my-auto shadow-none"
            aria-label="Example text with button addon"
            aria-describedby="button-addon1" value="1"
            >

            <div class="input-group-append">
              <button class="btn btn-outline-dark rounded-0 border-0 py-3"
              type="button" id="button-addon2"
              @click="quantityUpdata(products.id,products.products - 1)"
              >
                <i class="fas fa-plus"></i>
              </button>
            </div>

          </div>
          <a href="./checkout.html" class="btn btn-dark btn-block rounded-0 py-3">加入購物車</a>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import { EventBus } from '@/components/Eventbus.js';

export default {
  name: 'ProductsDetail',
  components: {
    // Pagination,
  },
  data() {
    return {
      products: [],
      isLoading: false,
      uuid: process.env.VUE_APP_UUID,
      carts: {},
      status: {
        loadingItem: '',
      },
    };
  },
  created() {
    const { id } = this.$route.params;
    this.getProducts(id);
    // this.getCart();
  },
  methods: {
    getProducts(id) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}${this.uuid}/ec/product/${id}`;
      this.$http
        .get(api)
        .then((res) => {
          this.products = res.data.data;
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

    quantityUpdata(id, num) {
      // 避免商品數量低於 0 個
      if (num <= 0) return;
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}${this.uuid}/ec/shopping`;

      const data = {
        product: id,
        quantity: num,
      };

      this.$http.patch(url, data).then(() => {
        this.isLoading = false;
        this.getCart();
      });
    },
    getOrder() {
      // 取得目前電單中 有沒有此項目，若有更新購置數量 ，若是沒有預設為 1 todo
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}${this.uuid}/ec/orders`;
      const order = { ...this.DeliveryInf };
      if (this.coupon.enabled) {
        order.coupon = this.coupon.code;
      }
      this.$http
        .post(api, order)
        .then((res) => {
          this.$swal.fire({
            icon: 'sucess',
            title: '訂單建立',
            text: '成功',
          });
          this.$router.push(`/admin/Payment/${res.data.data.id}`);
        })
        .catch((error) => {
          this.$swal.fire({
            icon: 'error',
            title: '建立訂單失敗...',
            text: `錯誤代碼${error.request.status}`,
          });
        });
      this.isLoading = false;
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

  },
};
</script>
