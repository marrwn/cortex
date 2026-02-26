import { Layout, Navbar } from "nextra-theme-docs";
import { Banner, Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import { Footer } from "@/components/Sections/Footer";
import Image from "next/image";

export const metadata = {
  // Define your metadata here
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
};
const navbar = (
  <Navbar
    logo={<Image src="cortex.svg" width={150} height={150} alt="Cortex" />}
    // ... Your additional navbar options
  />
);
const footer = <Footer>MIT {new Date().getFullYear()} © Nextra.</Footer>;

export default async function RootLayout({ children }) {
  return (
    <html
      // Not required, but good for SEO
      lang="en"
      // Required to be set
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
      style={{ colorScheme: "light" }}
    >
      <Head
        // ... Your additional head options
        backgroundColor={{
          dark: "rgb(15, 23, 42)",
          light: "rgb(255, 253, 242)",
        }}
        color={{
          hue: 257,
        }}
      >
        {/* Your additional tags should be passed as `children` of `<Head>` element */}
      </Head>
      <body style={{ margin: 0, backgroundColor: "rgb(255, 253, 242)" }}>
        <Layout
          darkMode={true}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/marrwn/cortex"
          footer={Footer}
          // ... Your additional layout options
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
