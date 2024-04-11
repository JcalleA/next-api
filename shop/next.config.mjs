/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'bimyou.online',
            port: '',
            pathname: '/tienda/wp-content/uploads/**',
          },
        ],
      },
};

export default nextConfig;
