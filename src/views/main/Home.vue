<template>
  <div class="bg-white sticky-top">
    <div class="container">
      <nav class="navbar px-0 navbar-expand-lg navbar-light bg-white">
        <!-- <a class='navbar-brand text-light bg-dark' href='#'>Vue 前台管理系統</a> -->
        <a class="navbar-brand position-absolute" href="./index.html"
           style="left: 50%; transform: translate(-50%, -50%); top: 50%;">
           Navbar
        </a>

        <button
          class="navbar-toggler" type="button"
          data-toggle="collapse" data-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

         <div class="collapse navbar-collapse bg-white custom-header-md-open" id="navbarNav">
            <ul class="navbar-nav">
               <li class="nav-item active">
                 <router-link to='index'
                 class='nav-link'>index</router-link>
              </li>

               <li class="nav-item active">
                 <router-link to='about'
                 class='nav-link'>關於我們</router-link>
              </li>

              <li class="nav-item">
                <router-link to='ShareholderInfo'
                class='nav-link'>股東訊息</router-link>
              </li>
            </ul>
          </div>

          <div class="d-flex">
            <a href="#"><i class="fas fa-heart mr-5"></i></a>
            <a href="./cart-2.html"><i class="fas fa-shopping-cart"></i></a>
          </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  name: 'HomeList',
};
</script>
