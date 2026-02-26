import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // This allows Turbopack to handle MDX natively
  experimental: {
    mdxRs: true,
  },
};

const withMDX = createMDX({});
export default withMDX(nextConfig);
