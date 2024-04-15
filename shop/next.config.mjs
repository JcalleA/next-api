/** @type {import('next').NextConfig} */
const nextConfig = {

  
  
    images: {
      unoptimized: true,
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
