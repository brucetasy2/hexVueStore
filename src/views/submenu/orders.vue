<template>
<div class="orders">
  <Loading :active.sync="isLoading" />

  <div class="d-flex align-items-center my-4">
     <table
      class="table table-striped table-bordered" cellspacing="0" width="100%">
      <thead>
        <tr>
          <th class="th-sm">下單時間
          </th>
          <th class="th-sm" colspan="2">訂單明細資料
          </th>
          <th class="th-sm">付款方式
          </th>
          <th class="th-sm">應付金額
          </th>
          <th class="th-sm">是否付款
          </th>
        </tr>
      </thead>

      <tbody v-if="orders.length">
        <tr
        v-for="(item,key) in orders"
        :key="key"
        :class="{'text-secondary': !item.is_paid}"
        >
          <td>{{ item.created.datetime }}</td>
          <td colspan="2">
            <ul class="list-unstyled">
              <li v-for="(product ,i ) in item.products"
              :key="i"
              >產品:{{product.product.title}}
               數量:{{product.quantity}}
               單位:{{product.unit}}
              </li>
            </ul>
          </td>
          <td> {{ item.payment }}</td>
          <td> {{ item.amount | currency }}</td>
          <td>
            <div class="custom-control custom-switch">
               <input
                :id="item.id"
                v-model="item.paid"
                type="checkbox"
                class="custom-control-input"
                @change="setOrderPaid(item)"
              >
              <label
                class="custom-control-label"
                :for="item.id"
              >
              <span
                  v-if="item.paid"
                  class="text-success"
                >已付款</span>
                <span
                  v-else
                  class="text-muted"
                >尚未付款</span>
              </label>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <Pagination
      :pages="pagination"
      @naviPages="getOrders"
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
      uuid: process.env.VUE_APP_UUID,
      xerror: 'NO_ERROR',
      pagination: [],
      orders: {
        user: {
        },
      },
    };
  },
  created() {
    this.token = document.cookie.replace(/(?:(?:^|.*;\s*)BruceStoreT7_token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    const url = `${process.env.VUE_APP_APIPATH}auth/check`;
    // Axios 預設值
    this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`;
    this.$http
      .post(url, { api_token: this.token })
      .then(() => {
        this.getOrders();
      })
      .catch((err) => {
        this.$swal.fire({
          icon: 'error',
          title: 'Oops Orders Error 1...',
          text: `錯誤代碼${err.request.status}`,
        });
      });
  },

  methods: {
    getOrders(page = 1) {
      this.isLoading = true;
      // Axios 預設值
      // this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`;
      const api = `${process.env.VUE_APP_APIPATH}${this.uuid}/admin/ec/orders`;
      this.$http
        .get(api,
          {
            params: {
              page: `${page}`,
              paged: 5,
            },
          })
        .then((res) => {
          this.orders = res.data.data;
          this.pagination = res.data.meta.pagination;
          this.isLoading = false;
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
    setOrderPaid(item) {
      const url = `
      ${process.env.VUE_APP_APIPATH}admin/ec/orders/${item.id}/${item.paid ? 'paid' : 'unpaid'}
      `;
      this.$http
        .PATCH(url, item.id)
        .then(() => {
          this.$swal.fire({
            icon: 'success',
            title: `${item.id} 存檔`,
            text: '成功 !',
          });
        })
        .catch((err) => {
          this.$swal.fire({
            icon: 'error',
            title: 'Oops Orders Error 2...',
            text: `錯誤代碼${err.request.status}`,
          });
        });
      this.getOrders(this.pagination.current_page);
    },
  },
};

</script>
