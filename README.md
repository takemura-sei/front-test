# 都道府県別人口推移グラフ

都道府県を選択すると人口推移グラフを表示する SPA です。

**本番 URL**: https://front-test-one-iota.vercel.app/

## 機能

- 都道府県をチェックボックスで複数選択し、折れ線グラフで人口推移を比較
- 総人口 / 年少人口 / 生産年齢人口 / 老年人口の切り替え
- 選択した都道府県ごとに異なる色で表示

## 技術スタック

| 項目 | 内容 |
|------|------|
| フレームワーク | Nuxt 4 |
| スタイリング | Tailwind CSS v4 |
| グラフ | vue-chartjs + Chart.js |
| リンター/フォーマッター | Biome |
| テスト | Vitest + @nuxt/test-utils |
| デプロイ | Vercel |

## セットアップ

```bash
npm install
```

`.env` ファイルを作成して環境変数を設定してください：

```
NUXT_YUMEMI_URL=https://frontend-engineer-codecheck-api.mirai.yumemi.io
NUXT_YUMEMI_API_KEY=your_api_key
```

## 開発サーバー起動

```bash
npm run dev
```

`http://localhost:3000` で確認できます。

## コマンド一覧

```bash
npm run dev       # 開発サーバー起動
npm run build     # プロダクションビルド
npm run lint      # リント
npm run format    # フォーマット
npm run test      # テスト実行
```

## アーキテクチャ

### API キーの保護

API キーはサーバーサイドのみで使用します。Nuxt のサーバールートをプロキシとして使用することで、クライアントバンドルに API キーが含まれないようにしています。

```
ブラウザ → Nuxt サーバールート（/api/prefectures） → 外部 API
```

### 状態管理

Pinia は使用せず、composable のモジュールスコープに `ref` を置くことでグローバル状態を管理しています。

```typescript
// usePopulation.ts
const populationMap = ref<Map<number, PopulationData[]>>(new Map())

export const usePopulation = () => {
  // ...
}
```

## ディレクトリ構成

```
app/
├── components/
│   ├── PrefectureList.vue        # 都道府県チェックボックス一覧
│   ├── PopulationGraph.vue       # 折れ線グラフ
│   └── PopulationTypeSelector.vue # 人口種別ラジオボタン
├── composables/
│   ├── usePrefectures.ts         # 都道府県一覧取得
│   └── usePopulation.ts          # 人口データ管理
├── pages/
│   └── index.vue                 # メインページ
├── types/
│   └── api.ts                    # API レスポンス型定義
└── tests/
    ├── unit/
    │   └── usePopulation.test.ts
    └── nuxt/
        └── PrefectureList.test.ts
server/
└── api/
    ├── prefectures.get.ts        # 都道府県一覧 API プロキシ
    └── population.get.ts         # 人口データ API プロキシ
```
