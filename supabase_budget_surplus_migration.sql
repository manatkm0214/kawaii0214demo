-- budget_surplus: 月次余剰予算の振り分けテーブル
CREATE TABLE IF NOT EXISTS budget_surplus (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  month TEXT NOT NULL,                              -- YYYY-MM (余剰が発生した月)
  amount INTEGER NOT NULL CHECK (amount >= 0),      -- 余剰額
  allocation TEXT NOT NULL CHECK (allocation IN ('saving', 'carryover', 'expense')),
  -- saving   : 貯金に回す
  -- carryover: 翌月の予算に繰り越す
  -- expense  : 特定カテゴリの支出に充てる
  target_category TEXT,                             -- allocation='expense' の場合のカテゴリ
  note TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, month)
);

ALTER TABLE budget_surplus ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own surplus" ON budget_surplus
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own surplus" ON budget_surplus
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own surplus" ON budget_surplus
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own surplus" ON budget_surplus
  FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_budget_surplus_user_month ON budget_surplus (user_id, month DESC);
