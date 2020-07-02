const { Pool } = require('pg')

new Pool({
    user: 'postgres',
    password: 'user1',
    port: 5432,
    database: 'gymmanager'
})