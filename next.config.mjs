/** @type {import('next').NextConfig} */
const nextConfig = {
  // SpaceX patch/Flickr images come from many third-party hosts (imgur,
  // staticflickr farms, imgbox). Rather than enumerate every remote pattern,
  // external launch imagery is rendered with plain <img> tags. No next/image
  // optimization is used for remote assets, so no remotePatterns are needed.
  reactStrictMode: true,
};

export default nextConfig;
