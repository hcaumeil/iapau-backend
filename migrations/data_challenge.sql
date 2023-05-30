CREATE TABLE IF NOT EXISTS data_challenge (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    begin_date DATE NOT NULL,
    end_date DATE NOT NULL
);
