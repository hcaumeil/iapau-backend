CREATE TABLE IF NOT EXISTS subject (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT,
    id_data_challenge UUID,
    FOREIGN KEY (id_data_challenge) REFERENCES data_challenge (id)
);