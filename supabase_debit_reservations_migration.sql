-- debit_reservations: カード・後払い引き落とし予約枠
CREATE TABLE IF NOT EXISTS debit_reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL CHECK (amount > 0),
  description TEXT NOT NULL DEFAULT '',
  card_name TEXT NOT NULL DEFAULT 'カード',    -- 利用したカード名
  category TEXT NOT NULL DEFAULT 'その他',
  month_charged TEXT NOT NULL,                  -- YYYY-MM カード利用月
  debit_month TEXT NOT NULL,                    -- YYYY-MM 引き落とし予定月
  is_settled BOOLEAN NOT NULL DEFAULT FALSE,    -- 引き落とし済みフラグ
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE debit_reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own reservations" ON debit_reservations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reservations" ON debit_reservations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reservations" ON debit_reservations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reservations" ON debit_reservations
  FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_debit_reservations_user_month
  ON debit_reservations (user_id, month_charged DESC);
