# LPデザイン刷新の実装計画

LP各ページのデザインを、高品質な画像を追加することでより洗練された、信頼感のあるものにアップデートします。

## Proposed Changes

各LPのヒーローセクションおよび主要なセクションに、テーマに沿った画像を生成・配置します。

### [Component Name] LPページ群 (`components/lp/`)

#### [MODIFY] [JosysRescue.tsx](file:///Users/yuta/Develop/Arcle/components/lp/JosysRescue.tsx)

- **ヒーローセクション**: 信頼できるITのプロフェッショナルやオフィス環境の画像を配置。
- **ソリューションセクション**: 各サービス内容(ヘルプデスク、セキュリティ等)を象徴するイメージを追加。

#### [MODIFY] [HajimeteAI.tsx](file:///Users/yuta/Develop/Arcle/components/lp/HajimeteAI.tsx)

- **ヒーローセクション**: AI技術や未来的なパートナーシップをイメージさせる抽象的かつ高品質な画像を配置。
- **ソリューションセクション**: AI導入、チャットボット、研修などをイメージさせるビジュアルを追加。

#### [MODIFY] [Mieruka.tsx](file:///Users/yuta/Develop/Arcle/components/lp/Mieruka.tsx)

- **ヒーローセクション**: 洗練されたデータダッシュボードやビジネス成長をイメージさせる画像を配置。
- **機能紹介**: 具体的なデータの流れや分析イメージを追加。

#### [MODIFY] [WebMadoguchi.tsx](file:///Users/yuta/Develop/Arcle/components/lp/WebMadoguchi.tsx)

- **ヒーローセクション**: Web制作の伴走支援をイメージさせる協力的な雰囲気の画像を配置。
- **提供価値**: Web制作や運用のプロセスを可視化するイメージを追加。

### [Component Name] 主要サービスページ (`components/`)

#### [MODIFY] [Josys.tsx](file:///Users/yuta/Develop/Arcle/components/Josys.tsx), [GenAI.tsx](file:///Users/yuta/Develop/Arcle/components/GenAI.tsx) 等

- LPページと同様のトーン＆マナーで画像を配置し、統一感を持たせる。

## Verification Plan

### Automated Tests

- `npm run build` を実行し、コードの構文エラーや型エラーがないことを確認。

### Manual Verification

- ブラウザツール（`open_browser_url`）を使用して、各ページの表示を確認。
- 特に以下の点を確認：
  - 画像が適切なサイズで表示されているか。
  - テキストとのバランス（可読性）が損なわれていないか。
  - レスポンシブ表示（モバイル等）で画像が崩れていないか。
  - アニメーション（IntersectionObserver）と画像が調和しているか。
