// シビックテック唐津が公開する Web アプリ（データツール）の一覧。
//
// 新しいアプリを追加するときは、この配列に 1 件足すだけ。
//   1. ここに { path, title, ... } を追記
//   2. アプリ本体は別リポジトリ（civictech-karatsu/<repo>）で開発
//   3. worker/ のルーター（src/index.js の ROUTES と wrangler.toml の routes）に /<path> の転送先を足す
// これでトップの「アプリ一覧」に自動で並びます。

export type AppStatus = 'live' | 'wip' | 'planned';

export interface CivicApp {
  /** アクセスパス（先頭スラッシュなし）。例: 'gikai' → civictech-karatsu.org/gikai */
  path: string;
  /** 表示名 */
  title: string;
  /** 1〜2 文の説明 */
  description: string;
  /** 公開状況 */
  status: AppStatus;
  /** GitHub リポジトリ名（civictech-karatsu/<repo>）。未作成なら省略可 */
  repo?: string;
  /** カードに添えるアイコン（絵文字でOK） */
  icon?: string;
}

export const STATUS_LABEL: Record<AppStatus, string> = {
  live: '公開中',
  wip: '開発中',
  planned: '構想中',
};

export const apps: CivicApp[] = [
  {
    path: 'gikai',
    title: '唐津の議員見える化プロジェクト',
    description:
      '唐津市議会の会議録から、議員ごとの発言をワードクラウドで可視化。各議員が議会で「どんなテーマを多く語っているか」が一目で分かります。',
    status: 'live',
    repo: 'gikai',
    icon: '🗳️',
  },
  {
    path: 'keizai',
    title: '唐津市 経済動向ダッシュボード',
    description:
      '唐津市の月次経済動向データ（2010年〜・観光/雇用/一次産業など）を、BIツールのようにフィルター・ソート・グラフで自由に閲覧。コロナ前後の変化や指標どうしの比較も直感的に読み取れます。',
    status: 'live',
    repo: 'karatsu-economy-dashboard',
    icon: '📈',
  },
  {
    path: 'people-flow',
    title: '唐津市 エリア別人流マップ',
    description:
      '唐津市のエリア別人流（滞在人口）データを国土地理院マップ上に可視化。月次の推移を地図で再生でき、エリアごとに時間帯・平日休日・年代別のプロファイルまで掘り下げて見られます。',
    status: 'live',
    repo: 'karatsu-people-flow',
    icon: '🗺️',
  },
  {
    path: 'mirai-gikai',
    title: 'みらい議会＠唐津市',
    description:
      '唐津市議会でいまどんな議案が審議されているかを、やさしい言葉で解説。「説明をもっと詳しく」で、条文や金額などの正確な情報にも切り替えられます。',
    status: 'live',
    repo: 'mirai-gikai-karatsu',
    icon: '🏛️',
  },
];
