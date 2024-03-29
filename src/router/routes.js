const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', name: 'loginDefault', component: () => import('pages/LoginPage.vue') },
      { path: 'login', name: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'register', name: 'register', component: () => import('pages/RegisterPage.vue') },
      { path: 'email-confirmation', name: 'email-confirmation', component: () => import('pages/EmailConfirmation.vue') },
      { path: 'forgot-password', name: 'forgot-password', component: () => import('pages/ForgotPassword.vue') },
      { path: 'reset-password', name: 'reset-password', component: () => import('pages/ResetPassword.vue') },
      { path: 'products/:id', name: 'products', component: () => import('pages/products/public.vue') }
    ]
  },
  {
    path: '/loggedIn',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'user-page', name: 'user-page', component: () => import('pages/UserPage.vue') },
      { path: 'category', name: 'category', component: () => import('pages/category/ListPage.vue') },
      { path: 'form-category/:id?', name: 'form-category', component: () => import('pages/category/FormCategory.vue') },
      { path: 'product', name: 'product', component: () => import('pages/products/ListPage.vue') },
      { path: 'form-product/:id?', name: 'form-product', component: () => import('pages/products/formProducts.vue') },
      { path: 'config', name: 'config', component: () => import('pages/config/HomeConfig.vue') }
    ],
    meta: {
      requiresAuth: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
