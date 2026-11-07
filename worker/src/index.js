// パス方式マルチゾーンのルーター Worker。
// civictech-karatsu.org/<path> を各アプリ（別 Cloudflare Pages）へ転送する。
// 各アプリは base:'/<path>' でビルドされているので、同じパスのまま origin に渡す。

const ROUTES = [
  { prefix: '/gikai', origin: 'https://karatsu-gikai.pages.dev' },
  { prefix: '/keizai', origin: 'https://karatsu-economy-dashboard.pages.dev' },
  { prefix: '/people-flow', origin: 'https://karatsu-people-flow.pages.dev' },
  // みらい議会は Next.js の basePath:'/mirai-gikai' で配信しているので、パスをそのまま渡す
  {
    prefix: '/mirai-gikai',
    origin: 'https://mirai-gikai-karatsu-web.vercel.app',
    keepPrefix: true,
  },
  // 例: { prefix: '/bousai', origin: 'https://karatsu-bousai.pages.dev' },
];

export default {
  async fetch(request) {
    const url = new URL(request.url);
    for (const { prefix, origin, keepPrefix } of ROUTES) {
      if (url.pathname === prefix || url.pathname.startsWith(prefix + '/')) {
        // 各アプリは base:'/<path>' でビルドされるが、Astro の出力は dist 直下に
        // 置かれる（リンクだけが /<path>/... になる）。Pages はその dist をルートで
        // 配信するため、origin へ渡す際は /<path> プレフィックスを除去する。
        const rest = keepPrefix
          ? url.pathname
          : url.pathname.slice(prefix.length) || '/';
        const target = new URL(rest + url.search, origin);
        return fetch(new Request(target, request));
      }
    }
    // ルート対象外（通常は Worker ルートが /gikai* のみなのでここには来ない）
    return fetch(request);
  },
};
