# Arcle LP & サービスページ デザイン刷新計画

既存のLPページおよび主要サービスページのデザインを刷新し、高品質な画像と洗練された2カラムレイアウトを導入することで、視覚的な訴求力とブランドの信頼性を大幅に向上させます。

## 現状と課題

- テキスト中心の構成で、視覚的なインパクトが弱い
- レイアウトが均一（グリッド形式）で、情報の重み付けが不明瞭
- サービス内容を想起させる具体的・高品質なビジュアルが不足している

## 決定したデザインパターン

1. **ヒーローセクションの2カラム化**:
   - 左側にメッセージ、右側に象徴的な高品質画像を配置
2. **ソリューション紹介の交互レイアウト**:
   - 画像とテキストを交互（Z型）に配置し、リズム感のある視覚体験を提供
3. **信頼性を高める要素の追加**:
   - 各サービス紹介に具体的な提供価値を示すチェックリストを導入
4. **統一されたカラーシステム**:
   - 各サービスのテーマカラーに基づいた、ブラー効果やグラデーションを活用

## 修正対象ファイルと進捗

### ランディングページ (LP) [完了]

- [x] [JosysRescue.tsx](file:///Users/yuta/Develop/Arcle/components/lp/JosysRescue.tsx)
- [x] [HajimeteAI.tsx](file:///Users/yuta/Develop/Arcle/components/lp/HajimeteAI.tsx)
- [x] [Mieruka.tsx](file:///Users/yuta/Develop/Arcle/components/lp/Mieruka.tsx)
- [x] [WebMadoguchi.tsx](file:///Users/yuta/Develop/Arcle/components/lp/WebMadoguchi.tsx)

### サービスページ [進行中]

- [x] [Josys.tsx](file:///Users/yuta/Develop/Arcle/components/Josys.tsx)
- [x] [GenAI.tsx](file:///Users/yuta/Develop/Arcle/components/GenAI.tsx)
- [/] [WebProduction.tsx](file:///Users/yuta/Develop/Arcle/components/WebProduction.tsx)
- [ ] [DataConsulting.tsx](file:///Users/yuta/Develop/Arcle/components/DataConsulting.tsx)

> [!WARNING]
> **画像生成ツール (generate_image) の制限について**
> 現在、APIのキャパシティ制限によりエラーが発生しやすくなっています。
> そのため、コード内では `/images/` 配下の適切なパスを先行して設定し、画像 asset は API が利用可能になり次第、順次生成・配置します。

## 検証計画

- 画面幅に応じたレスポンシブ動作の確認（特にモバイルでの縦並び）
- `reveal-hidden` アニメーションのタイミングと動作の確認
- 全ページを通じてトーン＆マナーが統一されているかの目視確認
- `npm run build` によるビルドエラーのチェック
