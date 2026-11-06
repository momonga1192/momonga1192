# GitHubにコードをプッシュする手順

このガイドでは、`https://github.com/momonga1192/momonga1192` リポジトリにコードをプッシュする手順を説明します。

## 📋 前提条件

- Gitがインストールされていること
- GitHubアカウントにログインしていること
- リポジトリ `momonga1192/momonga1192` へのアクセス権限があること

---

## 🚀 手順

### ステップ1: Gitリポジトリを初期化

プロジェクトのディレクトリで以下のコマンドを実行：

```bash
cd /Users/yuta/Develop/Arcle
git init
```

### ステップ2: すべてのファイルをステージング

```bash
git add .
```

**注意**: `.gitignore` ファイルで `node_modules` や `dist` は除外されているので、これらはプッシュされません。

### ステップ3: 初回コミット

```bash
git commit -m "Initial commit: Arcle website"
```

### ステップ4: メインブランチに設定

```bash
git branch -M main
```

### ステップ5: リモートリポジトリを追加

```bash
git remote add origin https://github.com/momonga1192/momonga1192.git
```

### ステップ6: コードをプッシュ

```bash
git push -u origin main
```

**注意**: 初回プッシュ時、GitHubの認証が求められる場合があります：
- Personal Access Token（PAT）を使用する場合
- GitHub CLIを使用する場合
- SSHキーを使用する場合

---

## 🔐 認証方法

### 方法A: Personal Access Token（推奨）

1. GitHubで「Settings」→「Developer settings」→「Personal access tokens」→「Tokens (classic)」
2. 「Generate new token (classic)」をクリック
3. スコープで `repo` にチェック
4. トークンを生成してコピー
5. プッシュ時にパスワードの代わりにトークンを入力

### 方法B: GitHub CLI

```bash
# GitHub CLIをインストール（未インストールの場合）
brew install gh

# GitHubにログイン
gh auth login

# その後、通常通りプッシュ
git push -u origin main
```

### 方法C: SSHキー

1. SSHキーを生成（まだ持っていない場合）
2. GitHubにSSHキーを登録
3. リモートURLをSSH形式に変更：
   ```bash
   git remote set-url origin git@github.com:momonga1192/momonga1192.git
   ```
4. プッシュ：
   ```bash
   git push -u origin main
   ```

---

## ✅ 確認

プッシュが成功すると、GitHubのリポジトリページ（https://github.com/momonga1192/momonga1192）でコードが確認できます。

---

## 🔄 今後の更新方法

コードを変更した後は、以下のコマンドで更新できます：

```bash
# 変更を確認
git status

# 変更をステージング
git add .

# コミット
git commit -m "変更内容の説明"

# プッシュ
git push
```

---

## 🛠️ トラブルシューティング

### エラー: "remote origin already exists"

既にリモートが設定されている場合：

```bash
# 既存のリモートを確認
git remote -v

# リモートを削除して再追加
git remote remove origin
git remote add origin https://github.com/momonga1192/momonga1192.git
```

### エラー: "failed to push some refs"

リモートリポジトリに既にファイルがある場合：

```bash
# リモートの変更を取得
git pull origin main --allow-unrelated-histories

# コンフリクトを解決してから再度プッシュ
git push -u origin main
```

### 認証エラー

- Personal Access Tokenが正しいか確認
- トークンのスコープに `repo` が含まれているか確認
- GitHub CLIを使用して再認証

