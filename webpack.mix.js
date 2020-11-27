let mix = require('laravel-mix');

mix.react('frontend/js/products/index.jsx', 'public/js/products');
mix.react('frontend/js/orders/index.jsx', 'public/js/orders');
mix.react('frontend/js/carts/index.jsx', 'public/js/carts');
