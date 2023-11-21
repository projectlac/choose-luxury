/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@babel/preset-react',
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/react',
  '@fullcalendar/timegrid',
  '@fullcalendar/list',
  '@fullcalendar/timeline'
]);

const nextConfig = withTM({
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['pos.nvncdn.net', 'clux.azurewebsites.net', 'cluxstorage.blob.core.windows.net']
  }
});

module.exports = nextConfig;
