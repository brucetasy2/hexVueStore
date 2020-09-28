import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('../views/front/Homecontainer.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/front/Index.vue'),
      },
      {
        path: '/index',
        name: 'Index',
        component: () => import('../views/front/Index.vue'),
      },
      {
        path: '/aboutproducts',
        name: 'Aboutproducts',
        component: () => import('../views/front/Aboutproducts.vue'),
      },
      {
        path: '/loveproducts',
        name: 'Loveproducts',
        component: () => import('../views/front/Loveproducts.vue'),
      },
      {
        path: '/productsdetail/:id',
        name: 'Productsdetail',
        component: () => import('../views/front/Productsdetail.vue'),
      },
      {
        path: '/ShareholderInfo',
        name: 'ShareholderInfo',
        component: () => import('../views/front/ShareholderInfo.vue'),
      },
      {
        path: '/Shoppingcart',
        name: 'Shoppingcart',
        component: () => import('../views/front/Shoppingcart.vue'),
      },
      {
        path: '/Checkout',
        name: 'Checkout',
        component: () => import('../views/front/Checkout.vue'),
      },
      {
        path: '/Checkoutsuccess',
        name: 'Checkoutsuccess',
        component: () => import('../views/front/Checkoutsuccess.vue'),
      },
      {
        path: '/NEXT',
        name: 'NEXT_STEP',
        component: () => import('../views/front/Next.vue'),
      },
    ],
  },
  {
    path: '/admin',
    name: 'Admin 管理頁面',
    component: () => import('../views/admin/Menucontainer.vue'),
    children: [
      {
        path: 'products',
        name: 'products_page',
        component: () => import('../views/admin/products.vue'),
      },
      {
        path: 'storages',
        name: 'storages_page',
        component: () => import('../views/admin/storages.vue'),
      },
      {
        path: 'orders',
        name: 'orders_page',
        component: () => import('../views/admin/orders.vue'),
      },
      {
        path: 'coupons',
        name: 'coupons_page',
        component: () => import('../views/admin/Coupons.vue'),
      },
      {
        path: 'mockorder',
        name: 'mockorder_page',
        component: () => import('../views/admin/Mockorder.vue'),
      },
      {
        path: 'Payment/:orderId',
        name: 'Payment_page',
        component: () => import('../views/admin/Payment.vue'),
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
