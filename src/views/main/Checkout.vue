<template>
    <div class="container">
      <!-- 區段1 ST -->
      <div class="bg-light pt-5 pb-7">
        <div class="container">
          <div class="row justify-content-center flex-md-row flex-column-reverse">
            <!-- 填寫表單 ST -->
            <div class="col-md-6">
              <!-- 聯絡人 -->
              <div class="bg-white p-4">
                <h4 class="font-weight-bold">貨品寄送資料</h4>
                <form @submit.prevent="createOrder">
                  <!-- item01 收件人姓名-->
                  <div class="form-group">
                    <validation-provider
                      name="收件人姓名"
                      v-slot="{ errors , passValid }"
                      rules="required|min:2">
                      <div class="container">
                        <div class="row justify-content-md-left">
                          <div class="col-3">
                            <label class="my-2" for="username">收件人姓名</label>
                          </div>
                          <div class="col-9">
                            <input
                            class="form-control"
                            id="username"
                            type="text"
                            v-model="DeliveryInf.name"
                            :class="passValid"
                            >
                          </div>
                        </div>
                        <div class="row justify-content-md-center">
                          <div class="col-12">
                            <strong>{{ errors[0] }} </strong>
                          </div>
                        </div>
                      </div>
                    </validation-provider>
                  </div>
                  <!-- item02 電子郵件-->
                  <div class="form-group">
                    <validation-provider
                      name="收件人電子郵件"
                      v-slot="{ errors , passValid }"
                      rules="required|email">
                      <div class="container">
                        <div class="row justify-content-md-left">
                          <div class="col-3">
                            <label class="my-2" for="Email">Email</label>
                          </div>
                          <div class="col-9">
                            <input
                            class="form-control "
                            id="email"
                            type="email"
                            v-model="DeliveryInf.email"
                            :class="passValid"
                            >
                          </div>
                        </div>
                        <div class="row justify-content-md-center">
                          <div class="col-12">
                              <strong>{{ errors[0] }} </strong>
                          </div>
                        </div>
                      </div>
                    </validation-provider>
                  </div>
                  <!-- item03 電話-->
                  <div class="form-group">
                    <validation-provider
                      name="收件人電話"
                      v-slot="{ errors , passValid }"
                      rules="required|min:8">
                      <div class="container">
                        <div class="row justify-content-md-left">
                          <div class="col-3">
                            <label class="my-2" for="tel">電話</label>
                          </div>
                          <div class="col-9">
                          <input
                            class="form-control"
                            id="tel"
                            type="text"
                            v-model="DeliveryInf.tel"
                            :class="passValid"
                            >
                          </div>
                        </div>
                        <div class="row justify-content-md-center">
                          <div class="col-12">
                              <strong>{{ errors[0] }} </strong>
                          </div>
                        </div>
                      </div>
                    </validation-provider>
                  </div>
                  <!-- item04 收件地址-->
                  <div class="form-group">
                    <validation-provider
                      name="收件地址"
                      v-slot="{ errors , passValid }"
                      rules="required">
                      <div class="container">
                        <div class="row justify-content-md-left">
                          <div class="col-3">
                            <label class="my-2" for="address">收件地址</label>
                          </div>
                          <div class="col-9">
                            <input
                            class="form-control"
                            id="address"
                            type="text"
                            v-model="DeliveryInf.address"
                            :class="passValid"
                            >
                          </div>
                        </div>
                        <div class="row justify-content-md-center">
                          <div class="col-12">
                            <strong>{{ errors[0] }} </strong>
                          </div>
                        </div>
                      </div>
                    </validation-provider>
                  </div>
                  <!-- item05 付款方式-->
                  <div class="form-group">
                    <validation-provider
                      name="付款方式"
                      v-slot="{ errors , passValid }"
                      rules="required">
                      <div class="container">
                        <div class="row justify-content-md-left">
                          <div class="col-3">
                            <label class="my-2" for="pay">付款方式</label>
                          </div>
                          <div class="col-9 ">
                            <select
                            v-model="DeliveryInf.payment"
                            class="form-control"
                            :class="passValid"
                            >
                              <option value="" disabled>
                                請選擇付款方式
                              </option>
                              <option value="Credit">
                                信用卡
                              </option>
                              <option value="ApplePay">
                                頻果支付
                              </option>
                              <option value="GooglePay">
                                谷哥支付
                              </option>
                            </select>
                          </div>
                        </div>
                        <div class="row justify-content-md-center">
                          <div class="col-12">
                              <strong>{{ errors[0] }} </strong>
                          </div>
                        </div>
                      </div>
                    </validation-provider>
                  </div>
                  <!-- item06 留言-->
                  <div class="form-group">
                      <div class="container">
                        <div class="row justify-content-md-right">
                          <div class="col-3">
                            <label class="my-2" for="message">留言</label>
                          </div>
                          <div class="col-9">
                            <textarea
                              id="message"
                              v-model="DeliveryInf.message"
                              class="form-control"
                              cols="30"
                              rows="3"
                            />
                          </div>
                        </div>
                      </div>
                  </div>

                   <div class="form-group">
                      <div class="container ">
                        <div class="row justify-content-md-right">
                          <div class="col-3">
                            <a href="./product.html" class="text-primary">
                              <i class="fas fa-chevron-left mr-2 text-primary">
                                </i> 回產品頁
                            </a>
                          </div>
                          <div class="col-9">
                           <button
                              type="submit"
                              class="btn btn-primary ml-4"
                              :disabled="invalid">
                              送出訂單
                            </button>
                          </div>
                        </div>
                      </div>
                  </div>

                </form>
              </div>
            </div>
            <!-- 填寫表單 ED -->

            <!-- 訂單明細 ST -->
            <div class="col-md-4">
              <div class="border p-4 mb-4" >
                <h4 class="mb-4">Order Detail </h4>
                <div class="d-flex" :class="idx>0 ? 'mt-2':'' "
                  v-for="(item , idx) in carts" :key="item.id">
                  <img
                  :src="item.product.imageUrl[0]"
                  alt="產品圖片" class="mr-2"
                  style="width: 48px; height: 48px; object-fit: cover">
                  <div class="w-100">
                    <div class="d-flex justify-content-between font-weight-bold">
                      <p class="mb-0">{{item.product.title}}</p>
                      <p class="mb-0">x {{item.quantity}}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                      <p class="text-muted mb-0"><small>NT${{item.product.price }}</small></p>
                      <p class="mb-0">NT${{item.product.price * item.quantity}}</p>
                    </div>
                  </div>
                </div>

                <table class="table mt-4 border-top border-bottom text-muted">
                  <tbody>
                    <tr>
                      <th scope="row" class="border-0 px-0 pt-4 font-weight-normal">Subtotal</th>
                      <td class="text-right border-0 px-0 pt-4">NT${{this.cartTotal}}</td>
                    </tr>

                    <tr v-if="this.coupon_Enable">
                      <th scope="row" class="border-0 px-0 pt-2 pb-2
                      font-weight-normal">discount</th>
                      <td class="text-right border-0 px-0 pt-2 pb-2">
                        NT${{this.coupon_discountValue}}
                      </td>
                    </tr>

                    <tr>
                      <th scope="row" class="border-0 px-0 pt-2 pb-2
                      font-weight-normal">Payment</th>
                      <td class="text-right border-0 px-0 pt-2 pb-4">
                        NT${{this.cartTotal-this.coupon_discountValue}}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div class="d-flex justify-content-between mt-4">
                  <p class="mb-0 h4 font-weight-bold">Total</p>
                  <p class="mb-0 h4 font-weight-bold">
                    NT${{this.cartTotal - this.coupon_discountValue}}</p>
                </div>
              </div>
            </div>
            <!-- 訂單明細 ED -->
          </div>
        </div>
      </div>
      <!-- 區段1 ED -->
    </div>
</template>

<script>

export default {
  name: 'CheckOut',
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

    // 處理Coupon
    this.coupon_log = JSON.parse(localStorage.getItem('rototoCoupon'));
    if (this.coupon_log === null) {
      this.coupon_log = '';
    }
    if (this.coupon_log.length > 0) {
      this.coupon_code = this.coupon_log;
    }
    this.CheckCoupon();
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
          console.log(this.cartTotal);
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
    CheckCoupon() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}${this.uuid}/ec/coupon/search`;
      this.$http
        .post(api, { code: this.coupon_code })
        .then((res) => {
          this.isLoading = false;
          this.coupon = res.data.data;
          this.coupon_Enable = true;
          this.coupon_discountValue = this.cartTotal * (this.coupon.percent / 100);
          // this.$swal.fire({
          //   icon: 'sucess',
          //   title: '使用優惠券',
          //   text: '成功',
          // });
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
          console.log('quantityUpdata DOWN');
          this.getCart();
        });
    },

    // removeCartItem(id) {
    //   this.isLoading = true;
    //   const api = `${process.env.VUE_APP_APIPATH}${this.uuid}/ec/shopping/${id}`;
    //   this.$http
    //     .delete(api)
    //     .then(() => {
    //       this.isLoading = false;
    //       this.$swal.fire({
    //         icon: 'sucess',
    //         title: '購物車商品移除..',
    //         text: '成功',
    //       });
    //       this.getCart();
    //     })
    //     .catch((error) => {
    //       this.$swal.fire({
    //         icon: 'error',
    //         title: '購物車商品移除失敗...',
    //         text: `錯誤代碼${error.request.status}`,
    //       });
    //       this.isLoading = false;
    //     });
    // },

    createOrder() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}${this.uuid}/ec/orders`;
      const order = { ...this.DeliveryInf };
      if (this.coupon.enabled) {
        order.coupon = this.coupon.code;
      }
      this.$http
        .post(api, order)
        .then(() => {
          this.$swal.fire({
            icon: 'sucess',
            title: '訂單建立',
            text: '成功',
          });

          // 處理Coupon
          localStorage.setItem('rototoCoupon', JSON.stringify(''));
          this.coupon_log = '';
          this.coupon_code = '';
          this.$router.push('/Checkoutsuccess');
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

    // ENOFMOTHOD
  },

};
</script>
