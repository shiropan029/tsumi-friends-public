-- accountIdとnameのワイルドカード検索を高速化するためpg_trgmのindexを作成する
-- DropIndex
DROP INDEX "user_account_accountId_idx";

-- DropIndex
DROP INDEX "user_account_name_idx";

-- pg_trgm拡張を有効化（LIKE/ILIKEによる部分一致検索を高速化するため）
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- accountIdにGINインデックスを作成
CREATE INDEX IF NOT EXISTS user_account_account_id_trgm ON user_account USING gin ("accountId" gin_trgm_ops);

-- nameにGINインデックスを作成
CREATE INDEX IF NOT EXISTS user_account_name_trgm ON user_account USING gin (name gin_trgm_ops);