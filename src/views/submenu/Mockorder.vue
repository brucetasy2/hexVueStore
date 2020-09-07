<template>
    <div>
      <Loading :active.sync="isLoading" />
      <div class="text-right mt-4 mx-5">
        <button class="btn btn-primary" @click="accountModal()">
          結帳..
        </button>
      </div>
      <!-- SECTION 主畫面 START -->
      <div class="row mt-4">
        <div
          v-for="(item, index) in products"
          :key="index"
          class="col-md-4 mb-4">
          <div class="card border-0 shadow-sm">
            <div
              style="height: 150px; background-size: cover; background-position: center"
              :style="{backgroundImage: `url(${item.imageUrl})`}"/>

              <div class="card-body">
                <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                <h5 class="card-title">
                  <a
                    href="#"
                    class="text-dark"
                  >{{ item.title }}</a>
                </h5>
                <!-- 由於 content 是使用
                vue2Editor 生成 HTML
                標籤  所以必須使用 v-html 渲染，
                因此這邊會出現提示警告是正常的
                如果要解決 ESLint 錯誤，只需要使用該方式就可以
                -->
                <!-- eslint-disable -->
                <p
                  class="card-text"
                  v-html="item.content"
                >
                  {{ item.content }}
                </p>
                <!--eslint-enable-->

                <div class="d-flex justify-content-between align-items-baseline">
                  <div
                    v-if="!item.price"
                    class="h5">
                    {{ item.origin_price }} 元</div>
                  <del
                    v-if="item.price"
                    class="h6">原價 {{ item.origin_price }} 元</del>
                  <div
                    v-if="item.price"
                    class="h5">
                    現在只要 {{ item.price }} 元
                  </div>
                </div>
              </div>

            <div class="card-footer d-flex">
              <button
                type="button"
                class="btn btn-outline-secondary btn-sm"
                :disabled="status.loadingItem === item.id"
                @click="getDetailed(item.id)">
                <i
                  v-if="status.loadingItem === item.id"
                  class="spinner-grow spinner-grow-sm"/>
                查看更多...
              </button>

              <button
                type="button"
                class="btn btn-outline-danger btn-sm ml-auto"
                :disabled="status.loadingItem === item.id"
                @click="addtoCart(item)">
                <i
                  v-if="status.loadingItem === item.id"
                  class="spinner-grow spinner-grow-sm"/>
                加到購物車
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- SECTION 主畫面 EDNOF -->

      <!-- SECTION 查看明細 START -->
      <div id="productModal" class="modal fade"
      tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 id="exampleModalLabel" class="modal-title">
                  <p >產品名稱:</p>
                  <p class="mx-1 text-info">{{ tempProduct.title }}</p>
                </h5>

                <button type="button" class="close" data-dismiss="modal"
                aria-label="Close" >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div class="modal-body">
                <img :src="tempProduct.image" class="img-fluid" alt>
                <blockquote class="blockquote mt-0 ">
                  <!-- 由於 content 是使用 vue2Editor 生成 HTML 標籤
                  所以必須使用 v-html 渲染，因此這邊會出現提示警告是正常的 -->
                  <!-- eslint-disable -->
                  <p class="mb-0 text-left" v-html="tempProduct.content" />
                  <!--eslint-enable-->
                  <footer class="blockquote-footer text-left">
                    {{ tempProduct.description }} <br>
                    {{ tempProduct.id }}
                  </footer>
                </blockquote>

                <div class="d-flex justify-content-between align-items-baseline">
                  <div v-if="!tempProduct.price" class="h4">
                    <!-- {{ tempProduct.origin_price|currency}} 元 -->
                    {{ tempProduct.origin_price}} 元
                  </div>

                  <div v-else>
                    <del class="h6">原價 {{ tempProduct.origin_price }} 元</del>
                    <div class="h4 text-primary">
                      <!-- 特價 {{ tempProduct.price|currency }} 元 -->
                      {{ tempProduct.price|currency }}
                    </div>
                  </div>
                </div>

                <select v-model="tempProduct.num" name class="form-control mt-3">
                  <option value="0" disabled selected>
                    請選擇數量
                  </option>
                  <option v-for="num in 10" :key="num" :value="num">
                    選購 {{ num }} {{ tempProduct.unit }}
                  </option>
                </select>
              </div>

              <div class="modal-footer">
                <div v-if="tempProduct.num" class="text-muted text-nowrap mr-3">
                  小計
                  <strong>{{ tempProduct.num * tempProduct.price }}</strong> 元
                </div>

                <button type="button" class="btn btn-primary"
                @click="addtoCart(tempProduct, tempProduct.num)">
                  <i v-if="tempProduct.id === status.loadingItem"
                  class="fas fa-spinner fa-spin" />
                  加到購物車
                </button>
              </div>
            </div>
        </div>
      </div>
      <!-- SECTION 查看明細 ENDOF -->

      <!-- modal 結帳畫面 START -->
      <div id="accountModal"
        class="modal fade bd-example-modal-lg"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <!-- modal 頁首 START-->
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal"
                aria-label="Close" >
                  <span aria-hidden="true">&times;</span>
              </button>
              <!-- 內部 START-->
              <div class="container">
                <div class="row justify-content-between mb-2">
                  <div class="col-4">
                  </div>
                  <div class="col-4">
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      @click="removeAllCartItem()"
                    >
                      <i class="far fa-trash-alt" /> 刪除所有品項
                    </button>
                  </div>
                </div>
                <!-- 顯示購物車資料 start-->
                <table class="table">
                  <thead>
                    <th />
                    <th>品名</th>
                    <th width="150px">
                      數量
                    </th>
                    <th>單位</th>
                    <th>單價</th>
                  </thead>

                  <tbody v-if="carts.length">
                    <tr
                      v-for="item in carts"
                      :key="item.id"
                    >
                      <td class="align-middle">
                        <button
                          type="button"
                          class="btn btn-outline-danger btn-sm"
                          @click="removeCartItem(item.product.id)"
                        >
                          <i class="far fa-trash-alt" />
                        </button>
                      </td>

                      <td class="align-middle">
                        {{ item.product.title }}
                        <div
                          v-if="coupon_code==coupon.code"
                          class="text-success"
                        >
                          已套用優惠券
                        </div>

                      </td>
                      <td class="align-middle">
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <button
                              class="btn btn-outline-primary"
                              @click="quantityUpdata(item.product.id, item.quantity + 1)"
                            >
                              +
                            </button>
                          </div>
                          <input
                            id="inlineFormInputGroupUsername"
                            type="text"
                            class="form-control text-center"
                            :value="item.quantity"
                            @keyup.enter="quantityUpdata(item.product.id, $event.target.value)"
                          >
                          <div class="input-group-append">
                            <button
                              class="btn btn-outline-primary"
                              :disabled="item.quantity === 1"
                              @click="quantityUpdata(item.product.id, item.quantity - 1)"
                            >
                              -
                            </button>
                          </div>
                        </div>
                      </td>
                      <td class="align-middle">
                        {{ item.product.unit }}
                      </td>
                      <td class="align-middle text-right">
                        {{ item.product.price }}
                      </td>
                    </tr>
                  </tbody>

                  <tfoot>
                    <tr>
                      <td
                        colspan="4"
                        class="text-right"
                      >
                        總計
                      </td>
                      <td class="text-right">
                        {{ cartTotal }}
                      </td>
                    </tr>

                    <tr v-if="coupon.enabled && coupon_code==coupon.code">
                       <td colspan="8" class="text-right text-success">
                        折扣說明:方案{{coupon.title }} =>
                        <strong class="text-danger">{{coupon.percent}} % </strong>
                      </td>
                    </tr>

                    <tr v-if="coupon.enabled && coupon_code==coupon.code">
                      <td
                        colspan="4"
                        class="text-right text-success"
                      >
                        折扣價
                      </td>
                      <td class="text-right text-success">
                        {{ cartTotal * (coupon.percent / 100) }}
                      </td>
                    </tr>
                  </tfoot>
                </table>
                <!-- 顯示購物車資料 endof-->
                <!-- 套用優惠碼 START-->
                <div class="input-group mb-3 input-group">
                  <input
                    v-model="coupon_code"
                    type="text"
                    class="form-control"
                    placeholder="請輸入優惠碼"
                    >
                    <div class="input-group-append">
                      <button
                      class="btn btn-outline-secondary"
                      type="button"
                      @click="addCoupon"
                      >
                      套用優惠碼
                      </button>
                    </div>
                </div>
                <!-- 套用優惠碼 ENDOF-->
              </div>
              <!-- 內部 ENDOF-->
            </div>
            <!-- modal 頁首 ENDOF-->

            <!-- 表單驗證範圍 STAR -->
            <div >
              <validation-observer
                v-slot="{ invalid }"
                class="col-md-6"
              >
                <!-- FORM START-->
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
                      name="收件人姓名"
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
                  <!-- SEND-->
                  <div class="text-right mb-3 mr-5">
                    <button
                      type="submit"
                      class="btn btn-primary"
                      :disabled="invalid"
                    >
                      送出表單
                    </button>
                  </div>
                </form>
                <!-- FORM ENDOF -->
              </validation-observer>
            </div>
            <!-- 表單驗證範圍 ENDOF -->

            <!-- modal 頁尾 START-->
            <div class="modal-footer">
              <button type="button" class="close" data-dismiss="modal"
                aria-label="Close" >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <!-- modal 頁尾 ENDOF-->
          </div>
        </div>
      </div>
      <!-- modal 結帳畫面 ENDOF -->

      <Pagination
      :pages="pagination"
      @naviPages="getProducts"
    />
    </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    Pagination,
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
      coupon: {},
      coupon_code: '',
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
    this.getProducts();
    this.getCart();
  },
  methods: {
    // 取得產品清單
    getProducts(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}${this.uuid}/ec/products`;
      this.$http
        .get(api, {
          params: {
            page: `${page}`,
            paged: `${process.env.VUE_APP_PAGED}`,
          },
        })
        .then((res) => {
          this.products = res.data.data;
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
          this.carts.forEach((item) => {
            this.cartTotal += item.product.price;
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
    addtoCart(item, quantity = 1) {
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
          $('#productModal').modal('hide');
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
            title: '加入購物車失敗...',
            text: `錯誤代碼${error.request.status}`,
          });
          this.isLoading = false;
          this.status.loadingItem = '';
        });
    },
    getDetailed(id) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}${this.uuid}/ec/product/${id}`;
      this.$http
        .get(api)
        .then((res) => {
          this.tempProduct = res.data.data;
          this.isLoading = false;
          $('#productModal').modal('show');
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
    accountModal() {
      $('#accountModal').modal('show');
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
    addCoupon() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}${this.uuid}/ec/coupon/search`;
      this.$http
        .post(api, { code: this.coupon_code })
        .then((res) => {
          this.isLoading = false;
          this.coupon = res.data.data;
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
          this.isLoading = false;
        });
    },

    createOrder() {
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
  },
};
</script>
