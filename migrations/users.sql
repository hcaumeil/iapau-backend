CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT NOT NULL,
    surname TEXT,
    name TEXT,
    password TEXT NOT NULL,
    salt TEXT, 
    level INT,
    study_level TEXT,
    town TEXT,
    school TEXT,
    role TEXT
);