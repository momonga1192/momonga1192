# GitHubにプッシュする方法（GitHub Desktopが使えない場合）

## 方法1: Personal Access Tokenを使用（推奨）

### ステップ1: Personal Access Tokenを作成

1. GitHubにログイン
2. 右上のアイコンをクリック → 「Settings」
3. 左メニューの一番下「Developer settings」
4. 「Personal access tokens」→「Tokens (classic)」
5. 「Generate new token (classic)」をクリック
6. Note（メモ）: `Arcle website deployment` など適当に入力
7. Expiration（有効期限）: 適切な期間を選択（90日や無期限など）
8. **スコープ**: `repo` にチェック（すべてのリポジトリへのアクセス）
9. 「Generate token」をクリック
10. **トークンをコピー**（この画面でしか表示されません！）

### ステップ2: トークンを使ってプッシュ

ターミナルで以下のコマンドを実行：

```bash
cd /Users/yuta/Develop/Arcle

# プッシュを実行（ユーザー名とパスワードを聞かれたら）
git push -u origin main
```

**認証情報の入力：**
- Username: `momonga1192`
- Password: （先ほどコピーしたPersonal Access Tokenを貼り付け）

---

## 方法2: SSHキーを使用

### ステップ1: SSHキーを生成（まだ持っていない場合）

```bash
# SSHキーを生成
ssh-keygen -t ed25519 -C "your_email@example.com"

# 公開鍵を表示してコピー
cat ~/.ssh/id_ed25519.pub
```

### ステップ2: GitHubにSSHキーを登録

1. GitHubにログイン
2. 「Settings」→「SSH and GPG keys」
3. 「New SSH key」をクリック
4. Title: 適当な名前（例: `MacBook Pro`）
5. Key: 先ほどコピーした公開鍵を貼り付け
6. 「Add SSH key」をクリック

### ステップ3: リモートURLをSSH形式に変更

```bash
cd /Users/yuta/Develop/Arcle

# リモートURLをSSH形式に変更
git remote set-url origin git@github.com:momonga1192/momonga1192.git

# プッシュ
git push -u origin main
```

---

## 方法3: GitHub CLIで認証を再設定

ターミナルで以下を実行：

```bash
# GitHub CLIでログアウト
gh auth logout

# 再度ログイン（ブラウザが開きます）
gh auth login

# Gitの認証情報をGitHub CLIのものに設定
gh auth setup-git

# プッシュ
cd /Users/yuta/Develop/Arcle
git push -u origin main
```

---

## 現在の状況確認

現在、以下のコマンドで状況を確認できます：

```bash
# Gitのリモート設定を確認
git remote -v

# GitHub CLIの認証状態を確認
gh auth status

# Gitの認証情報を確認
git config --global credential.helper
```

---

## トラブルシューティング

### エラー: "Permission denied"

- Personal Access Tokenのスコープに `repo` が含まれているか確認
- トークンの有効期限が切れていないか確認

### エラー: "remote origin already exists"

```bash
# リモートを削除して再追加
git remote remove origin
git remote add origin https://github.com/momonga1192/momonga1192.git
```

### 認証情報がキャッシュされている場合

```bash
# macOSのキーチェーンから認証情報を削除
# キーチェーンアクセス.appを開いて、github.comの認証情報を削除

# または、Gitの認証情報キャッシュをクリア
git credential-osxkeychain erase
host=github.com
protocol=https
# （空行を入力してEnter）
```

---

## 推奨方法

**最も簡単な方法は「方法1: Personal Access Token」です。**

1. GitHubでPersonal Access Tokenを作成
2. プッシュ時にユーザー名とトークンを入力

これで確実にプッシュできます！

