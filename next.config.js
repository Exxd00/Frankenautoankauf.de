/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ السماح بالنشر حتى لو وُجدت أخطاء TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },

  // (اختياري) لو احتجت مستقبلًا إعدادات إضافية
  reactStrictMode: true,

  // 🔁 Redirect legacy dash URLs to the canonical routes
  // Examples:
  //   /auto-verkaufen-altes-auto  -> /auto-verkaufen/altes-auto
  //   /autoankauf-aalen           -> /autoankauf/aalen
  async redirects() {
    return [
      {
        source: "/auto-verkaufen-bastlerfahrzeug",
        destination: "/auto-verkaufen/bastlerfahrzeug",
        permanent: true,
      },
      {
        source: "/auto-verkaufen-defektes-auto",
        destination: "/faelle",
        permanent: true,
      },
      {
        source: "/auto-verkaufen-export",
        destination: "/auto-verkaufen/exportfahrzeug",
        permanent: true,
      },
      {
        source: "/auto-verkaufen-mit-motorschaden",
        destination: "/auto-verkaufen/motorschaden",
        permanent: true,
      },
      {
        source: "/auto-verkaufen-ohne-tuev",
        destination: "/auto-verkaufen/ohne-tuev",
        permanent: true,
      },
      {
        source: "/auto-verkaufen-unfallschaden",
        destination: "/auto-verkaufen/unfallschaden",
        permanent: true,
      },
      {
        source: "/autoankauf-amberg",
        destination: "/autoankauf/amberg",
        permanent: true,
      },
      {
        source: "/autoankauf-ansbach",
        destination: "/autoankauf/ansbach",
        permanent: true,
      },
      {
        source: "/autoankauf-bamberg",
        destination: "/autoankauf/bamberg",
        permanent: true,
      },
      {
        source: "/autoankauf-bayreuth",
        destination: "/autoankauf/bayreuth",
        permanent: true,
      },
      {
        source: "/autoankauf-coburg",
        destination: "/autoankauf/coburg",
        permanent: true,
      },
      {
        source: "/autoankauf-erlangen",
        destination: "/autoankauf/erlangen",
        permanent: true,
      },
      {
        source: "/autoankauf-fuerth",
        destination: "/autoankauf/fuerth",
        permanent: true,
      },
      {
        source: "/autoankauf-hof",
        destination: "/autoankauf/hof",
        permanent: true,
      },
      {
        source: "/autoankauf-ingolstadt",
        destination: "/autoankauf/ingolstadt",
        permanent: true,
      },
      {
        source: "/autoankauf-kitzingen",
        destination: "/autoankauf/kitzingen",
        permanent: true,
      },
      {
        source: "/autoankauf-kulmbach",
        destination: "/autoankauf/kulmbach",
        permanent: true,
      },
      {
        source: "/autoankauf-neumarkt",
        destination: "/autoankauf/neumarkt",
        permanent: true,
      },
      {
        source: "/autoankauf-nuernberg",
        destination: "/autoankauf/nuernberg",
        permanent: true,
      },
      {
        source: "/autoankauf-regensburg",
        destination: "/autoankauf/regensburg",
        permanent: true,
      },
      {
        source: "/autoankauf-schwabach",
        destination: "/autoankauf/schwabach",
        permanent: true,
      },
      {
        source: "/autoankauf-wuerzburg",
        destination: "/autoankauf/wuerzburg",
        permanent: true,
      },
      {
        source: "/defektes-auto",
        destination: "/faelle",
        permanent: true,
      },
      {
        source: "/ohne-tuev",
        destination: "/auto-verkaufen/ohne-tuev",
        permanent: true,
      },
      {
        source: "/unfall-auto",
        destination: "/auto-verkaufen/unfallwagen",
        permanent: true,
      },

      {
        source: "/auto-verkaufen-:case",
        destination: "/auto-verkaufen/:case",
        permanent: true,
      },
      {
        source: "/autoankauf-:city",
        destination: "/autoankauf/:city",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
