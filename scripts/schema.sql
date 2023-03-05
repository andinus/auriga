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
    notif TEXT NOT NULL,
    phone TEXT NOT NULL DEFAULT '',
    image TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1475&q=80',
    upi TEXT NOT NULL DEFAULT '',
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
