CREATE TABLE IF NOT EXISTS account(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

-- ngo_id should be account_id

CREATE TABLE IF NOT EXISTS ngo_detail(
    ngo_id INTEGER REFERENCES account(id),
    name TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    theme TEXT NOT NULL CHECK( theme IN ('singlepage', 'multipage') ) DEFAULT 'multipage',
    publish BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS ngo_event(
    ngo_id INTEGER REFERENCES account(id),
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    starts DATE NOT NULL,
    ends DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS ngo_volunteer(
    ngo_id INTEGER REFERENCES account(id),
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    introduction TEXT NOT NULL
);
