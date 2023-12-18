import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="theme-color" content="#2296f3" />
        <meta name="title" content="Choose Luxury" />
        <meta name="description" content="Choose Luxury" />
        <meta name="keywords" content="Choose Luxury" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="berrydashboard.io" />
        <meta property="og:title" content="Choose Luxury" />
        <meta property="og:description" content="Choose Luxury" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Choose Luxury" />
        <meta property="twitter:description" content="Choose Luxury" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Quicksand:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />

        <NextScript />
      </body>
    </Html>
  );
}
