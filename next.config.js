const { initOpenNextCloudflareForDev } = require('@opennextjs/cloudflare')
initOpenNextCloudflareForDev()

module.exports = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Cloudflare Workers cannot run the Next.js image optimizer without a Cloudflare Images binding.
    // Disable it so `next/image` renders original images directly.
    unoptimized: true,
  },
}
