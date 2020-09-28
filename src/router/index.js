import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('../views/main/Homecontainer.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/main/Index.vue'),
      },
      {
        path: '/index',
        name: 'Index',
        component: () => import('../views/main/Index.vue'),
      },
      {
        path: '/aboutproducts',
        name: 'Aboutproducts',
        component: () => import('../views/main/Aboutproducts.vue'),
      },
      {
        path: '/loveproducts',
        name: 'Loveproducts',
        component: () => import('../views/main/Loveproducts.vue'),
      },
      {
        path: '/productsdetail/:id',
        name: 'Productsdetail',
        component: () => import('../views/main/Productsdetail.vue'),
      },
      {
        path: '/ShareholderInfo',
        name: 'ShareholderInfo',
        component: () => import('../views/main/ShareholderInfo.vue'),
      },
      {
        path: '/Shoppingcart',
        name: 'Shoppingcart',
        component: () => import('../views/main/Shoppingcart.vue'),
      },
      {
        path: '/Checkout',
        name: 'Checkout',
        component: () => import('../views/main/Checkout.vue'),
      },
      {
        path: '/Checkoutsuccess',
        name: 'Checkoutsuccess',
        component: () => import('../views/main/Checkoutsuccess.vue'),
      },
      {
        path: '/NEXT',
        name: 'NEXT_STEP',
        component: () => import('../views/main/Next.vue'),
      },
    ],
  },
  {
    path: '/admin',
    name: 'Admin 管理頁面',
    component: () => import('../views/submenu/Menucontainer.vue'),
    children: [
      {
        path: 'products',
        name: 'products_page',
        component: () => import('../views/submenu/products.vue'),
      },
      {
        path: 'storages',
        name: 'storages_page',
        component: () => import('../views/submenu/storages.vue'),
      },
      {
        path: 'orders',
        name: 'orders_page',
        component: () => import('../views/submenu/orders.vue'),
      },
      {
        path: 'coupons',
        name: 'coupons_page',
        component: () => import('../views/submenu/Coupons.vue'),
      },
      {
        path: 'mockorder',
        name: 'mockorder_page',
        component: () => import('../views/submenu/Mockorder.vue'),
      },
      {
        path: 'Payment/:orderId',
        name: 'Payment_page',
        component: () => import('../views/submenu/Payment.vue'),
      },
    ],
  },
  {
    path: '*',
    redirect: '/',
    meta: {},
  },
];

const router = new VueRouter({
  routes,
});

export default router;
