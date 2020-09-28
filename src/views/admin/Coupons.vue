<template>
    <div class="sourceObjects">
        <Loading :active.sync="isLoading" />

        <div class="text-right mt-4 mx-5">
            <button class="btn btn-primary" @click="openModal('new')">
                新增優惠券
            </button>
        </div>

        <div class="d-flex align-items-center my-4">
            <table
                class="table table-striped table-bordered" cellspacing="0" width="100%">
                <thead>
                    <tr>
                    <th width="60"> 名稱     </th>
                    <th width="60"> 折扣百分比</th>
                    <th width="40"> 優惠碼   </th>
                    <th width="40"> 到期日   </th>
                    <th width="120">是否啟用 </th>
                    <th width="200">編輯    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in sourceObjects" :key="item.id">
                    <td>{{item.title}}</td>
                    <td>{{item.percent}}</td>
                    <td>{{item.code}}</td>
                    <td class="text-center">
                    {{ item.deadline.datetime }}
                    </td>
                    <td>
                        <span v-if="item.enabled" class="text-success">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td>
                        <div class="btn-group">
                        <button
                        class="btn btn-outline-primary btn-sm" @click="openModal('edit', item)">
                            編輯
                        </button>
                        <button
                        class="btn btn-outline-danger btn-sm" @click="openModal('delete', item)">
                            刪除
                        </button>
                        </div>
                    </td>
                    </tr>
                </tbody>
            </table>
        </div>
      <!-- MODAL AREA DEFINE START -->
        <!-- eidtModal START-->
        <div
          id="eidtModal"
          class="modal fade"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div
            class="modal-dialog"
            role="document"
          >
            <div class="modal-content">
              <div class="modal-header">
                <h5 id="exampleModalLabel" class="modal-title">建立優惠券</h5>
                <button type="button" class="close"
                    data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input id="title"
                    type="text"
                    class="form-control"
                    placeholder="請輸入標題"
                    v-model="tempObject.title"
                  >
                </div>
                <div class="form-group">
                  <label for="coupon_code">優惠碼</label>
                  <input
                    id="coupon_code"
                    type="text"
                    class="form-control"
                    placeholder="請輸入優惠碼"
                    v-model="tempObject.code"
                  >
                </div>
                <div class="form-group">
                  <label for="due_date">到期日</label>
                  <input
                    id="due_date"
                    type="date"
                    class="form-control"
                    v-model="due_date"
                  >
                </div>
                <div class="form-group">
                  <label for="due_time">到期時間</label>
                  <input
                    id="due_time"
                    type="time"
                    step="1"
                    class="form-control"
                    v-model="due_time"
                  >
                </div>
                <div class="form-group">
                  <label for="price">折扣百分比</label>
                  <input
                    id="price"
                    type="number"
                    class="form-control"
                    placeholder="請輸入百分比 10= 金額百分之十免費 "
                    v-model="tempObject.percent"
                  >
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      id="enabled"
                      v-model="tempObject.enabled"
                      class="form-check-input"
                      type="checkbox"
                      :true-value="1"
                      :false-value="0"
                    >
                    <label
                      class="form-check-label"
                      for="enabled"
                    >是否啟用</label>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  關閉
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="eidtModalConfirm"
                >
                  {{ isNew === true ? '新增優惠卷' : '更新優惠券' }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- eidtModal ENDOF-->

        <!-- delModal START-->
        <div
          id="delModal"
          class="modal fade"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
        <div
          class="modal-dialog"
          role="document"
        >
          <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
              <h5
                id="exampleModalLabel"
                class="modal-title"
              >
                <span>刪除優惠卷</span>
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body">
              是否刪除
              <strong class="text-danger">{{ tempObject.title }}</strong> 優惠券(刪除後將無法恢復)。
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-dismiss="modal"
              >
                取消
              </button>

              <button
                type="button"
                class="btn btn-danger"
                @click="delModalConfirm"
              >
                確認刪除
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- delModal ENDOF-->
      <!-- MODAL AREA DEFINE ENDOF -->
    </div>
</template>

<script>

export default {
  data() {
    return {
      isNew: false,
      isLoading: false,
      uuid: process.env.VUE_APP_UUID,
      xerror: 'NO_ERROR',
      tempObject: {
        title: '',
        code: '',
        percent: 10,
        enabled: true,
      },
      sourceObjects: {},
      due_date: '',
      due_time: '',
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
        this.getSourceObjects();
      });
  },
  methods: {
    getSourceObjects() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}${this.uuid}/admin/ec/coupons`;
      this.$http
        .get(api)
        .then((res) => {
          this.sourceObjects = res.data.data;
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
    openModal(isNew, item) {
      switch (isNew) {
        case 'new':
          this.tempObject = {};
          this.isNew = true;
          $('#eidtModal').modal('show');
          break;
          // 由於 const 與 let 宣告環境較特別，故需要在 case 外層宣告一個 {} 確保作用域
        case 'edit': {
          this.tempObject = { ...item };
          this.isNew = false;

          // 使用 split 切割相關時間戳
          const dedlineAtSplite = this.tempObject.deadline.datetime.split(' ');
          [this.due_date, this.due_time] = dedlineAtSplite; // 日期
          $('#eidtModal').modal('show');
        }
          break;
        case 'delete':
          this.tempObject = { ...item };
          $('#delModal').modal('show');
          break;
        default:
          break;
      }
    },

    eidtModalConfirm() {
      // 新增商品
      let api = `${process.env.VUE_APP_APIPATH}${this.uuid}/admin/ec/coupon`;
      let httpMethod = 'post';

      // 當不是新增商品時則切換成編輯商品 API
      if (!this.isNew) {
        api = `${process.env.VUE_APP_APIPATH}${this.uuid}/admin/ec/coupon/${this.tempObject.id}`;
        httpMethod = 'patch';
      }

      this.isLoading = true;
      // 針對日期做組合重新寫入到物件中
      // 日期格式 Y-m-d H:i:s，例如：「2020-06-16 09:31:18」
      this.tempObject.deadline_at = `${this.due_date} ${this.due_time}`;

      this.$http[httpMethod](api, this.tempObject).then(() => {
        this.isLoading = false;
        $('#eidtModal').modal('hide');
        this.$swal.fire({
          icon: 'success',
          title: `${this.isNew ? '新增' : '修改'} 優惠券存檔`,
          text: '成功 !',
        });
        this.getSourceObjects();
      }).catch((error) => {
        this.xerror = error.response.data;
        this.isLoading = false;
        $('#eidtModal').modal('hide');
        this.$swal.fire({
          icon: 'error',
          title: `${this.isNew ? '新增產品' : '修改產品'} 存檔`,
          text: `錯誤代碼${this.xerror.message}`,
        });
      });
    },
    delModalConfirm() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}${this.uuid}/admin/ec/coupon/${this.tempObject.id}`;

      this.$http.delete(api).then(() => {
        this.isLoading = false;
        $('#delModal').modal('hide');
        this.$swal.fire({
          icon: 'success',
          title: '刪除優惠券',
          text: '成功 !',
        });
        this.getSourceObjects();
      }).catch((error) => {
        this.xerror = error.response.data;
        this.isLoading = false;
        $('#delModal').modal('hide');
        this.$swal.fire({
          icon: 'error',
          title: '刪除優惠券',
          text: `錯誤代碼${this.xerror.message}`,
        });
      });
    },
  },
};
</script>
