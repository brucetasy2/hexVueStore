<template>
  <div>
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
            <span class="fa fa-chevron-left fa-lg text-success" ></span>
            <span class="sr-only">Previous</span>
          </a>

          <a class="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next">
             <span class="fa fa-chevron-right fa-lg text-success" ></span>
            <span class="sr-only">Next</span>
          </a>

        </div>
      </div>
    </div>
    <!-- 輪播區塊迄 -->

  </div>
</template>

<script>
export default {
  name: 'Landcarousel',

  created() {
    this.getProducts();
  },

  getProducts() {
    this.isLoading = true;
    const api = `${process.env.VUE_APP_APIPATH}${this.uuid}/ec/products`;
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

};

</script>
