# ウェブサイト公開ガイド

このガイドでは、お名前.comのドメインを使用して無償でウェブサイトを公開する方法を説明します。

## 方法1: Netlify（最も簡単・推奨）

### ステップ1: プロジェクトをビルドする

ターミナルで以下のコマンドを実行して、プロジェクトをビルドします：

```bash
npm install
npm run build
```

これで `dist` フォルダに静的ファイルが生成されます。

### ステップ2: Netlifyアカウントを作成

1. [Netlify](https://www.netlify.com/) にアクセス
2. 「Sign up」をクリック
3. GitHub、GitLab、またはメールアドレスでアカウントを作成（無料）

### ステップ3: サイトをデプロイ

#### 方法A: ドラッグ&ドロップ（最も簡単）

1. Netlifyのダッシュボードにログイン
2. 「Sites」タブを開く
3. 「Add new site」→「Deploy manually」を選択
4. `dist` フォルダをドラッグ&ドロップ
5. デプロイが完了すると、`https://ランダムな名前.netlify.app` のようなURLが生成されます

#### 方法B: GitHub経由（自動デプロイ）

1. GitHubにリポジトリを作成してコードをプッシュ
2. Netlifyで「Add new site」→「Import an existing project」を選択
3. GitHubを選択してリポジトリを連携
4. ビルド設定：
   - Build command: `npm run build`
   - Publish directory: `dist`
5. 「Deploy site」をクリック

### ステップ4: カスタムドメインを設定

1. Netlifyのダッシュボードで、デプロイしたサイトを選択
2. 「Domain settings」をクリック
3. 「Add custom domain」をクリック
4. お名前.comで取得したドメインを入力（例: `example.com`）
5. 「Verify」をクリック

### ステップ5: DNS設定（お名前.com側）

1. お名前.comの管理画面にログイン
2. 「ドメイン設定」→「ネームサーバーの設定」を開く
3. Netlifyから提供されたネームサーバー情報を確認：
   - Netlifyの「Domain settings」→「DNS configuration」で確認
   - 通常は以下のような形式：
     - `dns1.p01.nsone.net`
     - `dns2.p01.nsone.net`
     - `dns3.p01.nsone.net`
     - `dns4.p01.nsone.net`
4. お名前.comでネームサーバーを変更：
   - 「ネームサーバーの設定」で「その他」を選択
   - Netlifyから提供された4つのネームサーバーを入力
   - 「確認画面へ進む」→「設定する」をクリック

**または、DNSレコードを追加する方法：**

ネームサーバーを変更せず、DNSレコードを追加する場合：

1. お名前.comの「ドメイン設定」→「DNS関連機能の設定」を開く
2. 「DNSレコード設定を利用する」を選択
3. 以下のレコードを追加：
   - タイプ: `A`
   - ホスト名: `@`（または空白）
   - 値: `75.2.60.5`（NetlifyのIPアドレス）
   - TTL: `3600`
4. サブドメイン（www）も設定する場合：
   - タイプ: `CNAME`
   - ホスト名: `www`
   - 値: `your-site-name.netlify.app`（Netlifyで生成されたURL）
   - TTL: `3600`

### ステップ6: SSL証明書の設定

Netlifyは自動的に無料のSSL証明書（Let's Encrypt）を設定します：
1. 「Domain settings」→「HTTPS」を確認
2. 「Verify DNS configuration」をクリック
3. DNS設定が正しければ、数分〜数時間でSSL証明書が自動的に発行されます

### ステップ7: 確認

1. DNS設定の反映には数時間〜最大48時間かかる場合があります
2. ブラウザで `https://your-domain.com` にアクセスして確認

---

## 方法2: Vercel（GitHub連携が簡単）

### ステップ1: GitHubにリポジトリを作成

1. [GitHub](https://github.com) にログイン
2. 新しいリポジトリを作成
3. ローカルで以下のコマンドを実行：

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/your-repo-name.git
git push -u origin main
```

### ステップ2: Vercelアカウントを作成

1. [Vercel](https://vercel.com/) にアクセス
2. 「Sign Up」をクリック
3. GitHubアカウントでログイン（推奨）

### ステップ3: プロジェクトをインポート

1. Vercelのダッシュボードで「Add New...」→「Project」を選択
2. GitHubリポジトリを選択
3. プロジェクト設定：
   - Framework Preset: `Vite`
   - Root Directory: `./`（デフォルト）
   - Build Command: `npm run build`（自動検出される）
   - Output Directory: `dist`（自動検出される）
4. 「Deploy」をクリック

### ステップ4: カスタムドメインを設定

1. デプロイしたプロジェクトを選択
2. 「Settings」→「Domains」を開く
3. ドメインを入力して「Add」をクリック

### ステップ5: DNS設定（お名前.com側）

Vercelの場合、DNSレコードを追加します：

1. お名前.comの「DNS関連機能の設定」を開く
2. 以下のレコードを追加：

**Aレコード（ルートドメイン用）：**
- タイプ: `A`
- ホスト名: `@`（または空白）
- 値: `76.76.21.21`（VercelのIPアドレス）
- TTL: `3600`

**CNAMEレコード（www用）：**
- タイプ: `CNAME`
- ホスト名: `www`
- 値: `cname.vercel-dns.com`
- TTL: `3600`

### ステップ6: SSL証明書

Vercelも自動的にSSL証明書を設定します。DNS設定が反映されれば自動的に有効になります。

---

## 方法3: GitHub Pages（完全無料、GitHubアカウント必要）

### ステップ1: vite.config.tsを更新

GitHub Pages用にbaseパスを設定する必要があります。

### ステップ2: GitHub Actionsで自動デプロイ

`.github/workflows/deploy.yml` ファイルを作成して自動デプロイを設定します。

### ステップ3: GitHub Pagesの設定

1. GitHubリポジトリの「Settings」→「Pages」を開く
2. Sourceを「GitHub Actions」に設定

### ステップ4: カスタムドメイン設定

1. GitHubリポジトリの「Settings」→「Pages」でカスタムドメインを設定
2. DNS設定でCNAMEレコードを追加

---

## トラブルシューティング

### DNS設定が反映されない

- DNS設定の反映には時間がかかります（数時間〜48時間）
- `nslookup your-domain.com` コマンドで確認できます
- [whatsmydns.net](https://www.whatsmydns.net/) でグローバルなDNS設定を確認できます

### SSL証明書が発行されない

- DNS設定が正しく反映されているか確認
- 数時間待ってから再度確認
- サポートに問い合わせ

### 404エラーが発生する

- SPA（Single Page Application）のリダイレクト設定を確認
- `netlify.toml` または `vercel.json` の設定を確認

---

## 推奨事項

- **最も簡単**: Netlify（ドラッグ&ドロップ）
- **GitHub連携**: Vercel
- **完全無料・シンプル**: GitHub Pages

DNS設定の反映を待つ間は、NetlifyやVercelが提供する一時的なURL（`*.netlify.app` や `*.vercel.app`）でサイトを確認できます。

