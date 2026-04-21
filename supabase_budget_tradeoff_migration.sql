-- budget_tradeoff_rules: 予算トレードオフルール
-- 例: 「娯楽」で使ったら「食費」の予算を50%分自動削減
CREATE TABLE IF NOT EXISTS budget_tradeoff_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  trigger_category TEXT NOT NULL,         -- 支出を記録したカテゴリ
  target_category TEXT NOT NULL,          -- 予算を削減するカテゴリ
  reduce_ratio NUMERIC NOT NULL           -- 削減割合 0.0〜1.0 (例: 0.5 = 使った額の50%削減)
    CHECK (reduce_ratio > 0 AND reduce_ratio <= 1),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, trigger_category, target_category)
);

ALTER TABLE budget_tradeoff_rules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tradeoff rules" ON budget_tradeoff_rules
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own tradeoff rules" ON budget_tradeoff_rules
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own tradeoff rules" ON budget_tradeoff_rules
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own tradeoff rules" ON budget_tradeoff_rules
  FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_budget_tradeoff_rules_user
  ON budget_tradeoff_rules (user_id, trigger_category);
