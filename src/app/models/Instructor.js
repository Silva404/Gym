const { formatter, date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback) {

        db.query(`SELECT instructors.*, count(members) AS total_students
        FROM instructors
        LEFT JOIN members ON (members.instructors_id = instructors.id)
        GROUP BY instructors.id
        ORDER BY instructors.id DESC`, (err, results) => {
            if (err) throw "Database error"

            callback(results.rows)
        })

    },
    create(data, callback) {
        const query = `
        INSERT INTO instructors (            
            avatar_url,
            name,
            gender,
            services,
            birth,
            created_at
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
    `

        const values = [
            data.avatar_url,
            data.name,
            data.gender,
            data.services,
            date(data.birth).iso,
            date(Date.now()).iso,
        ]

        db.query(query, values, (err, results) => {
            if (err) throw "Database error"

            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query(`SELECT * FROM instructors WHERE id = $1`, [id], (err, results) => {
            if (err) throw `Database error ${err}`

            callback(results.rows[0])
        })
    },
    findBy(filter, callback) {
        db.query(`SELECT instructors.*, count(members) AS total_students
        FROM instructors
        LEFT JOIN members ON (members.instructors_id = instructors.id)
        WHERE instructors.name ILIKE '%${filter}%'
        GROUP BY instructors.id
        ORDER BY instructors.id DESC`, (err, results) => {
            if (err) throw "Database error"

            callback(results.rows)
        })
    },
    update(data, callback) {
        const query = `
        UPDATE instructors SET
        avatar_url=($1),
        name=($2),
        birth=($3),
        gender=($4),
        services=($5)
        WHERE id = $6
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.gender,
            data.services,
            data.id
        ]

        db.query(query, values, (err, results) => {
            if (err) throw `Database error ${err}`

            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM instructors WHERE id = $1`, [id], (err, results) => {
            if (err) throw "Database error"

            return callback()
        })
    },
    paginate(params){
        const { filter, limit, offset, callback } = params

        let query = `SELECT * 
        FROM instructors
        LEFT JOIN members ON (instructors.id = member.instructors_id)`

        if (filter) {
            query = `${query}
            WHERE instructors.name ILIKE ${filter}
            OR WHERE instructors.services ILIKE ${filter}
            `
        }
    }
}   