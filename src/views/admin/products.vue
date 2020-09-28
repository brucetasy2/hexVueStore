<template>
  <div class="products">
    <Loading :active.sync="isLoading" />

    <div class="text-right mt-4 mx-5">
      <button class="btn btn-primary" @click="openModal('new')">
        建立新的產品
      </button>
    </div>

    <div class="d-flex align-items-center my-4">
        <table
        class="table table-striped table-bordered" cellspacing="0" width="100%">
          <thead>
            <tr>
              <th width="100">
                分類
              </th>
              <th>產品名稱</th>
              <th width="80">
                原價
              </th>
              <th width="80">
                售價
              </th>
              <th width="120">
                是否啟用
              </th>
              <th width="200">
                編輯
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.id">
              <td>{{ item.category }}</td>
              <td>{{ item.title }}</td>
              <td class="text-right">
                {{ item.origin_price | currency }}
              </td>
              <td class="text-right">
                {{ item.price | currency }}
              </td>
              <td>
                <span v-if="item.enabled" class="text-success">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <button class="btn btn-outline-primary btn-sm" @click="openModal('edit', item)">
                    編輯
                  </button>
                  <button class="btn btn-outline-danger btn-sm" @click="openModal('delete', item)">
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
    <Pagination
      :pages="pagination"
      @naviPages="getProducts"
    />

    <!-- Modal (Show Product) START-->
    <div
      id="productModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 id="exampleModalLabel" class="modal-title">
              <span v-if="isNew">新增產品</span>
              <span v-else>編輯 {{ tempProduct.title }} 產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div v-for="i in 5" :key="i + 'img'" class="form-group">
                  <label :for="'img' + i">輸入圖片網址 {{ i }}</label>
                  <input
                    :id="'img' + i"
                    v-model="tempProduct.imageUrl[i - 1]"
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                  />
                </div>

                <div class="form-group">
                  <label for="customFile">
                    或上傳圖片
                    <i v-if="status.fileUploading" class="fas fa-spinner fa-spin" />
                  </label>
                  <input
                    id="customFile"
                    ref="file"
                    type="file"
                    class="form-control"
                    @change="uploadFile"
                  />
                </div>
                <img class="img-fluid" :src="tempProduct.imageUrl[0]" alt />
              </div>

              <div class="col-sm-8">
                <div class="form-group">
                  <ValidationProvider name="標題" rules="required|min:4"  v-slot="{ errors }">
                      <label class="d-flex" for="title" >標題</label>
                      <input
                        id="title"
                        v-model="tempProduct.title"
                        type="text"
                        class="form-control"
                        placeholder="請輸入標題"
                        required
                      />
                     <small id="titleErr" class="form-text d-flex text-danger">
                       {{ errors[0] }}
                     </small>
                  </ValidationProvider>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <ValidationProvider name="分類" rules="required|min:4"  v-slot="{ errors }">
                    <label class="d-flex" for="category">分類</label>
                    <input
                      id="category"
                      v-model="tempProduct.category"
                      type="text"
                      class="form-control"
                      placeholder="請輸入分類"
                      required
                    />
                    <small id="categoryErr" class="form-text d-flex text-danger">
                       {{ errors[0] }}
                    </small>
                    </ValidationProvider>
                  </div>

                  <div class="form-group col-md-6">
                    <ValidationProvider name="單位" rules="required|min:2"  v-slot="{ errors }">
                    <label class="d-flex" for="unit">單位</label>
                    <input
                      id="unit"
                      v-model="tempProduct.unit"
                      type="text"
                      class="form-control"
                      placeholder="請輸入單位"
                    />
                    <small id="unitErr" class="form-text d-flex text-danger">
                       {{ errors[0] }}
                    </small>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <ValidationProvider name="原價" rules="required"  v-slot="{ errors }">
                    <label class="d-flex" for="origin_price">原價</label>
                    <input
                      id="origin_price"
                      v-model="tempProduct.origin_price"
                      type="number"
                      class="form-control"
                      placeholder="請輸入原價"
                    />
                    <small id="origin_priceErr" class="form-text d-flex text-danger">
                       {{ errors[0] }}
                    </small>
                    </ValidationProvider>
                  </div>

                  <div class="form-group col-md-6">
                  <ValidationProvider name="售價" rules="required" v-slot="{ errors }">
                    <label class="d-flex" for="price">售價</label>
                    <input
                      id="price"
                      v-model="tempProduct.price"
                      type="number"
                      class="form-control"
                      placeholder="請輸入售價"
                    />
                    <small id="priceErr" class="form-text d-flex text-danger">
                       {{ errors[0] }}
                    </small>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="form-group">
                  <ValidationProvider name="產品說明" rules="required|min:10"  v-slot="{ errors }">
                  <label class="d-flex" for="description">產品說明</label>
                  <textarea
                    id="description"
                    v-model="tempProduct.description"
                    type="text"
                    class="form-control"
                    placeholder="請輸入產品說明"
                    required
                  />
                  <small id="descriptionErr" class="form-text d-flex text-danger">
                    {{ errors[0] }}
                  </small>
                  </ValidationProvider>
                </div>

                <div class="form-group">
                  <ValidationProvider name="產品描述" rules="required|min:6"  v-slot="{ errors }">
                  <label class="d-flex" for="content">產品描述</label>
                  <vue-editor
                    id="content"
                    v-model="tempProduct.content"
                  />
                  <small id="contentErr" class="form-text d-flex text-danger">
                    {{ errors[0] }}
                  </small>
                  </ValidationProvider>
                </div>

                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input d-flex"
                      id="is_enabled"
                      v-model="tempProduct.enabled"
                      type="checkbox"
                    />
                    <label class="form-check-label d-flex" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
              取消
            </button>

            <button type="button" class="btn btn-primary" @click="updateProduct">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal (Show Product) ENDOF-->

    <!-- Modal (Delete Product) START-->
    <div
      id="delProductModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-warning text-white">
            <h5 id="exampleModalLabel" class="modal-title">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong>
            商品(請注意，刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-warning" @click="delProduct">
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal (Delete Product) ENDOF-->
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'Products',
  components: {
    VueEditor,
    Pagination,
  },
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {
        imageUrl: [],
      },
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false,
      },
      uuid: process.env.VUE_APP_UUID,
      xerror: 'NO_ERROR',
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
        this.getProducts();
      })
      .catch((err) => {
        this.$swal.fire({
          icon: 'error',
          title: 'Oops0...',
          text: `錯誤代碼${err.request.status}`,
        });
      });
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}${this.uuid}/admin/ec/products`;
      this.$http
        .get(api,
          {
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

    // openModal
    openModal(isNew, item) {
      switch (isNew) {
        case 'new':
          this.tempProduct = {
            imageUrl: [],
          };
          this.isNew = true;
          $('#productModal').modal('show');
          break;
        case 'edit':
          this.isNew = false;
          this.getDetails(item.id);
          break;
        case 'delete':
          this.tempProduct = { ...item };
          $('#delProductModal').modal('show');
          break;
        default:
          break;
      }
    },
    delProduct() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}${this.uuid}/admin/ec/product/${this.tempProduct.id}`;
      this.$http.delete(url)
        .then(() => {
          $('#delProductModal').modal('hide');
          this.isLoading = true;
          this.$swal.fire({
            icon: 'success',
            title: `刪除產品 ${this.tempProduct.title}`,
            text: '成功 !',
            timer: 1500,
          });
          this.getProducts(this.pagination.current_page);
        })
        .catch((error) => {
          this.isLoading = false;
          this.$swal.fire({
            icon: 'error',
            title: `刪除產品 ${this.tempProduct.title}`,
            text: `錯誤代碼${error.request.status}`,
          });
        });
      this.getProducts(this.pagination.current_page);
    },
    uploadFile() {
      const uploadedFile = this.$refs.file.files[0];
      const formData = new FormData();
      formData.append('file', uploadedFile);
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UID}/admin/storage`;

      this.status.fileUploading = true;
      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        this.status.fileUploading = false;
        if (response.status === 200) {
          this.tempProduct.imageUrl.push(response.data.data.path);
        }
      }).catch((error) => {
        this.status.fileUploading = false;
        this.$swal.fire({
          icon: 'error',
          title: 'Oops2...',
          text: `請檢查是不是檔案大小超過 2MB ${error.request.status}`,
        });
      });
    },
    updateProduct() {
      // 新增商品
      let api = `${process.env.VUE_APP_APIPATH}${this.uuid}/admin/ec/product`;
      let httpMethod = 'post';

      // 當不是新增商品時則切換成編輯商品 API
      if (!this.isNew) {
        api = `${process.env.VUE_APP_APIPATH}${this.uuid}/admin/ec/product/${this.tempProduct.id}`;
        httpMethod = 'patch';
      }

      this.$http[httpMethod](api, this.tempProduct).then(() => {
        $('#productModal').modal('hide');
        this.$swal.fire({
          icon: 'success',
          title: `${this.isNew ? '新增產品' : '修改產品'} 存檔`,
          text: '成功!',
          timer: 1500,
        });
        this.isLoading = false;
        this.getProducts(this.pagination.current_page);
      }).catch((error) => {
        this.xerror = error.response.data;
        this.isLoading = false;
        $('#productModal').modal('hide');
        this.$swal.fire({
          icon: 'error',
          title: `${this.isNew ? '新增產品' : '修改產品'} 存檔`,
          text: '失敗!',
          timer: 1500,
        });
      });
    },
    getDetails(id) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}${this.uuid}/admin/ec/product/${id}`;
      this.$http.get(api)
        .then((res) => {
          this.tempProduct = res.data.data;
          $('#productModal').modal('show');
          this.isLoading = false;
        })
        .catch((error) => {
          this.$swal.fire({
            icon: 'error',
            title: 'Oops3...',
            text: `錯誤代碼${error.request.status}`,
          });
          this.isLoading = false;
        });
    },
  },
};
</script>
