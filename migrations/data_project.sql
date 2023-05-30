CREATE TABLE IF NOT EXISTS data_project (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    contact TEXT NOT NULL,
    ressources TEXT NOT NULL
);