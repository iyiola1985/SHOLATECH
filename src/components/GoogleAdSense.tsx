import Script from "next/script";

const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-4646271044974299";

/** Sitewide AdSense auto ads — loads in <head> on every page. */
export default function GoogleAdSense() {
  if (!ADSENSE_CLIENT) return null;

  return (
    <Script
      id="google-adsense"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
      strategy="beforeInteractive"
    />
  );
}
