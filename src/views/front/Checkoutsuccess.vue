<template>
      <div class="bg-white sticky-top">

      <div class="container">
        <div style="min-height: 300px;
        background-image: url(https://images.unsplash.com/photo-1463936575829-25148e1db1b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60);
        background-position: center center;">
        </div>

      <div class="mt-5 mb-7">
        <div class="row">
          <div class="col-md-6">
            <h2>結帳完成 Success</h2>
            <p>十分感謝您的惠顧，我們將為您儘快出貨 ! <br/>
              您一定會喜歡我們精選的商品 <br/>
              如果您對商品有任何建議，也請讓我們知道<br/>
              再次感謝您的購買，這是對我們的支持與鼓勵，<br/>
              期待能很快再為您服務 !!!
            </p>
            <a href="./index.html"
            class="btn btn-outline-dark mr-2 rounded-0 mb-4">續繼選購</a>
          </div>

          <div class="col-md-6">
            <div class="card rounded-0 py-4">
              <div class="card-header border-bottom-0 bg-white px-4 py-0">
                <h2>Order Detail</h2>
              </div>

              <div class="card-body px-4 py-0">
                <ul class="list-group list-group-flush" >
                  <li class="list-group-item px-0"
                  v-for="item in orders[0].products" :key="item.id">
                    <div class="d-flex mt-2">
                      <img :src="item.product.imageUrl[0]"
                      alt="產品圖片" class="mr-2" style="width: 60px; height: 60px; object-fit: cover">
                      <div class="w-100 d-flex flex-column">
                        <div class="d-flex justify-content-between font-weight-bold">
                          <h5>{{item.product.title}}</h5>
                          <p class="mb-0">{{item.quantity}}</p>
                        </div>
                        <div class="d-flex justify-content-between mt-auto">
                          <p class="text-muted mb-0"><small>NT${{item.product.price}}</small></p>
                          <p class="mb-0">NT$ {{item.product.price * item.quantity}}</p>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li class="list-group-item px-0 pb-0">
                    <table class="table text-muted">
                      <tbody>
                        <tr>
                          <th scope="row" class="border-0 px-0 font-weight-normal">應付金額</th>
                          <td class="text-right border-0 px-0">
                            NT$ {{this.orderTotal-this.coupon_discountValue}}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row" class="border-0 px-0 pt-0 font-weight-normal">付款方式</th>
                          <td class="text-right border-0 px-0 pt-0">{{orders[0].payment}}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="d-flex justify-content-between mt-2">
                      <p class="mb-0 h4 font-weight-bold">應付金額</p>
                      <p class="mb-0 h4 font-weight-bold">
                        NT$ {{this.orderTotal-this.coupon_discountValue}}</p>
                    </div>
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>

</template>

<script>

export default {
  name: 'CheckOutSuccess',
  data() {
    return {
      isNew: false,
      isLoading: false,
      uuid: process.env.VUE_APP_UUID,
      orders: {},
      orderTotal: 0,
      coupon_discountValue: 0,
    };
  },
  created() {
    this.getOrders();
  },
  methods: {
    getOrders(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}${this.uuid}/ec/orders`;
      this.$http
        .get(api,
          {
            params: {
              page: `${page}`,
              paged: 1,
              orderBy: 'created_at',
              // eslint-disable-next-line key-spacing
              sort : 'desc',
            },
          })
        .then((res) => {
          this.orders = res.data.data;
          this.isLoading = false;
          this.orderTotal = 0;
          this.orders[0].products.forEach((item) => {
            this.orderTotal += item.product.price * item.quantity;
          });
          this.coupon_discountValue = this.orderTotal * (this.orders[0].coupon.percent / 100);
        })
        .catch((error) => {
          this.$swal.fire({
            icon: 'error',
            title: 'Oops Orders Error 2...',
            text: `錯誤代碼${error.request.status}`,
          });
          this.isLoading = false;
        });
    },

  },
  // endof method
};
</script>
