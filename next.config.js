const nextConfig = {
  webpack(config, { webpack, dev, isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  images: {
    domains: ['images.prismic.io', 'prismic-io.s3.amazonaws.com', 'localhost'],
    deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // https://nextjs.org/docs/basic-features/image-optimization#image-sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 512, 800, 1920],
  },
}

module.exports = nextConfig
