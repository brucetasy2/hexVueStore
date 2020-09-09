<template>
<!-- new st -->
<div>

<div class="container">
      <div class="row flex-md-row-reverse flex-column">
        <div class="col-md-6">
          <img
          src="https://images.unsplash.com/photo-1474974573965-2ed43d64cb45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60
          alt="
          class="img-fluid">
        </div>

        <div class="col-md-6 d-flex flex-column justify-content-center mt-md-0 mt-3">
          <h2 class="font-weight-bold">多肉肉 ， 肉多多</h2>
          <h5 class="font-weight-normal text-muted mt-2">
            有時像蛋糕上的奶油裝飾品、
            有時化身毛茸茸的溫暖模樣、
            有時也像花朵燦爛綻放、
            有時也迎風飄揚...
          </h5>
          <div class="input-group mb-0 mt-4">
            <input type="text" class="form-control rounded-0" placeholder="" />
            <div class="input-group-append">
              <button class="btn btn-dark rounded-0" type="button" id="search">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-5">
        <div class="card-columns">
          <div class="card" v-for="item in products" :key="item.id">
            <img :src="item.imageUrl[0]" class="card-img-top" alt="這是產品圖片">
            <div class="card-body">
              <h5 class="card-title">{{ item.category }}
                <strong> {{ item.title}}</strong>
              </h5>
              <p class="card-text text-center" v-html="item.content"> </p>
              <div class="d-flex justify-content-end">
                <button class="btn btn btn-outline-success text-nowrap rounded-lg ">
                    細節
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

<!-- 輪播區塊起 -->
    <div class="bg-light mt-7">
      <div class="container">
        <div id="carouselExampleControls"
        class="carousel slide"
        data-ride="carousel"
        >

          <div class="carousel-inner" >
            <div class="carousel-item "
            v-for="(item, index) in products" :key="item.id"
            :class = "index===0 ? 'active':'' "
            >
              <div class="row justify-content-center py-7">
                <div class="col-md-8 d-flex">
                  <img :src="item.imageUrl[0]"
                  alt="" class="rounded-circle mr-5"
                  style="width: 160px; height: 160px; object-fit: cover;">
                  <div class="d-flex flex-column">
                    <p class="h5">{{ item.title}}</p>
                    <p class="mt-auto text-muted" v-html="item.content"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <a
          class="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev">
            <!-- <span class="carousel-control-prev-icon " aria-hidden="true"></span> -->
            <span class="fa fa-chevron-left fa-lg text-success" ></span>
            <span class="sr-only">Previous</span>
          </a>

          <a class="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next">
            <!-- <span class="carousel-control-next-icon" aria-hidden="true"></span> -->
             <span class="fa fa-chevron-right fa-lg text-success" ></span>
            <span class="sr-only">Next</span>
          </a>

        </div>
      </div>
    </div>
<!-- 輪播區塊迄 -->

    <div class="container my-7">
      <div class="row">
        <div class="col-md-4">
          <img src="https://images.unsplash.com/photo-1508022713622-df2d8fb7b4cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          alt="" style="width: 48px; height: 48px; object-fit: cover;">
          <h4 class="mt-4">Lorem 01 ipsum</h4>
          <p class="text-muted">Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
            sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.</p>
        </div>
        <div class="col-md-4">
          <img src="https://images.unsplash.com/photo-1548689816-c399f954f3dd?ixlib=rb-1.2.1
          &ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
          alt="" style="width: 48px; height: 48px; object-fit: cover;">
          <h4 class="mt-4">Lorem ipsum</h4>
          <p class="text-muted">Lorem ipsum dolor sit amet,
            consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
            ut labore et dolore magna.</p>
        </div>
        <div class="col-md-4">
          <img src="https://images.unsplash.com/photo-1548689816-c399f954f3dd?ixlib=rb-1.2.1
          &ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
          alt="" style="width: 48px; height: 48px; object-fit: cover;">
          <h4 class="mt-4">Lorem ipsum</h4>
          <p class="text-muted">Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
            sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.</p>
        </div>
      </div>
    </div>

    <div class="bg-light py-7">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-4 text-center">
            <h3>Lorem ipsum</h3>
            <p class="text-muted">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.</p>
            <button class="btn btn-dark mt-4 rounded-0">Lorem ipsum</button>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>
<script>

export default {
  name: 'index',
  components: {
  },
  data() {
    return {
      products: [],
      tempProduct: {
        imageUrl: [],
      },
      isLoading: false,
      uuid: process.env.VUE_APP_UUID,
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      console.log(`UUID=${this.uuid}`);
      const api = `${process.env.VUE_APP_APIPATH}${this.uuid}/ec/products`;
      this.$http
        .get(api,
          {
            // params: {
            //   page: `${page}`,
            //   paged: `${process.env.VUE_APP_PAGED}`,
            // },
          })
        .then((res) => {
          this.products = res.data.data;
          // this.pagination = res.data.meta.pagination;
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

    // getDetails(id) {
    //   this.isLoading = true;
    //   const api = `${process.env.VUE_APP_APIPATH}${this.uuid}/admin/ec/product/${id}`;
    //   this.$http.get(api)
    //     .then((res) => {
    //       this.tempProduct = res.data.data;
    //       $('#productModal').modal('show');
    //       this.isLoading = false;
    //     })
    //     .catch((error) => {
    //       this.$swal.fire({
    //         icon: 'error',
    //         title: 'Oops3...',
    //         text: `錯誤代碼${error.request.status}`,
    //       });
    //       this.isLoading = false;
    //     });
    // },
  },
};
</script>
