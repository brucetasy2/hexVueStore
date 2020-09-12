<template>
    <div class="container">
      <Loading :active.sync="isLoading" />
      <div class="row justify-content-center">
        <div class="col-md-6 bg-white py-5" style="min-height: calc(100vh - 56px - 76px);">

          <div class="d-flex justify-content-between">
            <h2 class="mt-2">Cart Detail</h2>
          </div>
          <!-- 明細區塊 -->
          <div class="d-flex mt-4 bg-light" v-for="item in carts" :key="item.id">
            <img :src="item.product.imageUrl[0]"
                 alt="產品圖片" style="width: 120px; height: 120px; object-fit: cover;">
            <div class="w-100 p-3 position-relative">
              <a href="#" class="position-absolute"
                style="top: 16px; right: 16px;"
                @click="removeCartItem(item.product.id)">
                <i class="fas fa-times"></i>
              </a>
              <p class="mb-0 font-weight-bold">{{item.product.title}}</p>
              <p class="mb-1 text-muted" style="font-size: 14px;">{{item.product.category}}</p>
              <div class="d-flex justify-content-between align-items-center w-100">
                <div class="input-group w-50 align-items-center">
                  <div class="input-group-prepend pr-1">
                    <a href="#" @click="quantityUpdata(item.product.id,item.quantity-1)">
                      <i class="fas fa-minus"></i></a>
                  </div>
                  <input type="text" class="form-control border-0
                  text-center my-auto shadow-none bg-light px-0"
                  placeholder="" aria-label="Example text
                  with button addon" aria-describedby="button-addon1"
                  :value="item.quantity">
                  <div class="input-group-append pl-1">
                    <a href="#" @click="quantityUpdata(item.product.id,item.quantity+1)">
                      <i class="fas fa-plus"></i></a>
                  </div>
                </div>
                <p class="mb-0 ml-auto">NT${{item.product.price * item.quantity}}</p>
              </div>
            </div>
          </div>

          <div class="d-flex mt-4 bg-light">
              <input v-model="coupon_code"
                type="text" class="form-control" placeholder="請輸入優惠碼">
              <button class="btn btn-outline-secondary"
              type="button" style="width: 150px;"  @click="addCoupon()">
                套用優惠碼
              </button>
          </div>

          <!-- 結帳金額 -->
          <table class="table mt-4 text-muted">
            <tbody>
              <tr>
                <th scope="row" class="border-0 px-0 font-weight-normal">總價</th>
                <td class="text-right border-0 px-0">NT${{this.cartTotal}}</td>
              </tr>
              <tr v-if="this.coupon_Enable">
                <th scope="row" class="border-0 px-0 pt-0 font-weight-normal">折扣</th>
                <td class="text-right border-0 px-0 pt-0">
                  NT$ {{ this.coupon_discountValue }}</td>
              </tr>
            </tbody>
          </table>

          <div class="d-flex justify-content-between mt-4">
            <p class="mb-0 h4 font-weight-bold">應付</p>
            <p class="mb-0 h4 font-weight-bold">NT$ {{this.cartTotal-this.coupon_discountValue}}</p>
          </div>
         <router-link :to="`/Checkout`"
          class="btn btn-dark btn-block mt-4 rounded-0 py-3">送出訂單
         </router-link>
        </div>
      </div>
    </div>

</template>

<script>

export default {
  name: 'Cart2',
  components: {
  },
  data() {
    return {
      isNew: false,
      isLoading: false,
      products: {},
      carts: {},
      cartTotal: 0,
      uuid: process.env.VUE_APP_UUID,
      xerror: 'NO_ERROR',
      tempProduct: {},
      coupon_Enable: false,
      coupon_discountValue: 0,
      coupon: {},
      coupon_code: '',
      coupon_log: '',
      status: {
        loadingItem: '',
      },
      DeliveryInf: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        message: '',
      },
    };
  },
  created() {
    this.getCart();
    this.coupon_log = JSON.parse(localStorage.getItem('rototoCoupon'));
    if (this.coupon_log === null) {
      this.coupon_log = '';
    }
    if (this.coupon_log.length > 0) {
      this.coupon_code = this.coupon_log;
      this.addCoupon();
    }
  },
  methods: {
    // 取得購物車內容
    getCart() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}${this.uuid}/ec/shopping`;
      this.$http
        .get(api)
        .then((res) => {
          this.carts = res.data.data;
          this.isLoading = false;
          // 購物車目前商品價值統計
          this.cartTotal = 0;
          this.carts.forEach((item) => {
            console.log(this.cartTotal);
            this.cartTotal += item.product.price * item.quantity;
          });
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
    addCoupon() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}${this.uuid}/ec/coupon/search`;
      this.$http
        .post(api, { code: this.coupon_code })
        .then((res) => {
          this.isLoading = false;
          this.coupon = res.data.data;
          this.coupon_Enable = true;
          this.coupon_log = this.coupon_code;
          localStorage.setItem('rototoCoupon', JSON.stringify(this.coupon_log));
          this.coupon_discountValue = this.cartTotal * (this.coupon.percent / 100);
          this.$swal.fire({
            icon: 'sucess',
            title: '使用優惠券',
            text: '成功',
          });
        })
        .catch((error) => {
          this.$swal.fire({
            icon: 'error',
            title: '使用優惠券失敗...',
            text: `錯誤代碼${error.request.status}`,
          });
          this.coupon_Enable = false;
          this.coupon_discountValue = 0;
          this.coupon_log = '';
          localStorage.setItem('rototoCoupon', JSON.stringify(this.coupon_log));
          this.isLoading = false;
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

      this.$http.patch(url, data)
        .then(() => {
          this.isLoading = false;
          this.curNum = num;
          this.getCart();
        });
    },

    removeCartItem(id) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}${this.uuid}/ec/shopping/${id}`;
      this.$http
        .delete(api)
        .then(() => {
          this.isLoading = false;
          this.$swal.fire({
            icon: 'sucess',
            title: '購物車商品移除..',
            text: '成功',
          });
          this.getCart();
        })
        .catch((error) => {
          this.$swal.fire({
            icon: 'error',
            title: '購物車商品移除失敗...',
            text: `錯誤代碼${error.request.status}`,
          });
          this.isLoading = false;
        });
    },

    // ENOFMOTHOD
  },

};
</script>
