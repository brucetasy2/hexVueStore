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

          <div class="my-4" >
            <div class="rounded-0 col-md-7"
                style="height:500px; background-size: cover;
                background-position: center center;"
                :style="{backgroundImage: 'url(' +products.imageUrl[0] + ')' }">
              </div>
            <!-- <img :src="products.imageUrl[0]"> -->
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

        <!-- 購物車調整 -->
        <div class="col-md-4">
          <div class="input-group mb-3 border mt-3">
            <div class="input-group-prepend">
              <button
              class="btn btn-outline-dark rounded-0 border-0 py-3 text-danger"
              type="button" id="button-addon1"
              :class = "this.cartsFilter.length <=0 ? 'disabled':'' "
              @click="quantityUpdata(curId,curNum-1)"
              >
                <i class="fas fa-minus"></i>
              </button>
            </div>

            <input type="text"
            class="form-control border-0 text-center my-auto shadow-none"
            aria-label="Example text with button addon"
            aria-describedby="button-addon1" :value="curNum"
            >

            <div class="input-group-append">
              <button class="btn btn-outline-dark rounded-0 border-0 py-3 text-success"
              type="button" id="button-addon2"
              :class = "this.cartsFilter.length <=0 ? disabled='disabled':'' "
              @click="quantityUpdata(curId,curNum+1)"
              >
                <i class="fas fa-plus"></i>
              </button>
            </div>

          </div>
          <a href="#" @click.prevent="addtoCart(curId,curNum)"
            class="btn btn-dark btn-block rounded-0 py-3 "
            :class = "this.cartsFilter.length>0 ? 'disabled':'' "
          >加入購物車</a>

          <!-- <a href="#" @click.prevent="removeAllCartItem()"
            class="btn btn-dark btn-block rounded-0 py-3 "
          >CLEAR購物車</a> -->

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
  },
  data() {
    return {
      products: [],
      isLoading: false,
      uuid: process.env.VUE_APP_UUID,
      carts: {},
      cartsFilter: {},
      curId: '',
      curNum: 1,
      status: {
        loadingItem: '',
      },
    };
  },
  created() {
    const { id } = this.$route.params;
    this.curId = this.$route.params.id;
    this.getProducts(id);
    this.getCart(id);
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
        .catch(() => {
          this.$swal.fire({
            icon: 'error',
            title: '取得產品資訊',
            text: '發生異常',
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

          // 成功回傳後，接續處理
          this.cartsFilter = this.carts.filter((somegood) => somegood.product.id === this.curId);
          const [curProductx] = this.cartsFilter;
          this.curNum = curProductx.quantity;
          EventBus.$emit('cartsQuantity', this.carts.length); // 購物車目前商品統計
        });
    },

    quantityUpdata(id, num) {
      // 避免商品數量低於 0 個
      console.log(`id ${id} and num ${num}`);
      if (num <= 0) return;
      const data = {
        product: id,
        quantity: num,
      };
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}${this.uuid}/ec/shopping`;

      this.$http.patch(url, data).then(() => {
        this.isLoading = false;
        this.curNum = num;
        console.log('quantityUpdata DOWN');
        this.getCart();
      });
    },

    addtoCart(id, quantity = 1) {
      this.status.loadingItem = id;
      const cart = {
        product: id,
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
        .catch(() => {
          this.$swal.fire({
            icon: 'error',
            title: '加入購物車..',
            text: '發生異常',
          });
          this.isLoading = false;
          this.status.loadingItem = '';
        });
    },

    removeAllCartItem() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}${this.uuid}/ec/shopping/all/product`;
      this.$http
        .delete(api)
        .then((res) => {
          window.xyzdel = res;
          this.isLoading = false;
          this.$swal.fire({
            icon: 'sucess',
            title: '購物車商品移除..',
            text: '成功',
          });
        })
        .catch((error) => {
          this.$swal.fire({
            icon: 'error',
            title: '購物車商品移除失敗...',
            text: `錯誤代碼${error.request.status}`,
          });
          this.isLoading = false;
        });
      this.getCart();
    },
  },
};
</script>
