<template>
<div>
  <h1>Checkoutsuccess</h1>
</div>
      <!-- <div class="bg-white sticky-top">
      <div class="container">
        <nav class="navbar px-0 navbar-expand-lg navbar-light bg-white">
          <a class="navbar-brand position-absolute" href="./index.html"
            style="left: 50%; transform: translate(-50%, -50%); top: 50%;">
            Navbar
          </a>
          <button class="navbar-toggler"
          type="button" data-toggle="collapse"
          data-target="#navbarNav" aria-controls="navbarNav"
          aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse bg-white custom-header-md-open" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link pl-0" href="./product.html">Lorem ipsum</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="./detail.html">Lorem ipsum</a>
              </li>
            </ul>
          </div>
          <div class="d-flex">
            <a href="#"><i class="fas fa-heart mr-5"></i></a>
            <a href="./cart-2.html"><i class="fas fa-shopping-cart"></i></a>
          </div>
        </nav>
      </div>

      <div class="container">
      <div style="min-height: 400px; background-image:
      url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1
      &ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80);
      background-position: center center;">
      </div>
      <div class="mt-5 mb-7">
        <div class="row">
          <div class="col-md-6">
            <h2>Checkout Success</h2>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
              sed diam nonumy eirmod tempor invidunt ut labore et dolore
              magna aliquyam erat, sed diam voluptua. At vero eos et accusam
              et justo duo dolores et ea</p>
            <a href="./index.html" class="btn btn-outline-dark mr-2 rounded-0 mb-4">Back To Home</a>
          </div>
          <div class="col-md-6">
            <div class="card rounded-0 py-4">
              <div class="card-header border-bottom-0 bg-white px-4 py-0">
                <h2>Order Detail</h2>
              </div>
              <div class="card-body px-4 py-0">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item px-0">
                    <div class="d-flex mt-2">
                      <img src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80" alt="" class="mr-2" style="width: 60px; height: 60px; object-fit: cover">
                      <div class="w-100 d-flex flex-column">
                        <div class="d-flex justify-content-between font-weight-bold">
                          <h5>Lorem ipsum</h5>
                          <p class="mb-0">x10</p>
                        </div>
                        <div class="d-flex justify-content-between mt-auto">
                          <p class="text-muted mb-0"><small>NT$12,000</small></p>
                          <p class="mb-0">NT$12,000</p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item px-0">
                    <div class="d-flex mt-2">
                      <img src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80" alt="" class="mr-2" style="width: 60px; height: 60px; object-fit: cover">
                      <div class="w-100 d-flex flex-column">
                        <div class="d-flex justify-content-between font-weight-bold">
                          <h5>Lorem ipsum</h5>
                          <p class="mb-0">x10</p>
                        </div>
                        <div class="d-flex justify-content-between mt-auto">
                          <p class="text-muted mb-0"><small>NT$12,000</small></p>
                          <p class="mb-0">NT$12,000</p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item px-0 pb-0">
                    <table class="table text-muted">
                      <tbody>
                        <tr>
                          <th scope="row" class="border-0 px-0 font-weight-normal">Lorem ipsum</th>
                          <td class="text-right border-0 px-0">NT$24,000</td>
                        </tr>
                        <tr>
                          <th scope="row" class="border-0 px-0 pt-0 font-weight-normal">Payment</th>
                          <td class="text-right border-0 px-0 pt-0">ApplePay</td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="d-flex justify-content-between mt-2">
                      <p class="mb-0 h4 font-weight-bold">Lorem ipsum</p>
                      <p class="mb-0 h4 font-weight-bold">NT$24,000</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div> -->

</template>

<script>

export default {
  data() {
    return {
      isNew: false,
      isLoading: false,
      uuid: process.env.VUE_APP_UUID,
      xerror: 'NO_ERROR',
    };
  },
  created() {

  },
  methods: {

  },
};
</script>
