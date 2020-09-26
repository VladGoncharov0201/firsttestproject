const express = require('express')
const config = require('config')
const {Client} = require('pg')
var CryptoJS = require("crypto-js")

const app = express()

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/change', require('./routes/change.routes'))

const PORT = config.get('port')

async function start() {
    try{

        const connectionString = config.get('connectionString')

        const client = new Client({
            connectionString: connectionString,
        })
        client.connect()

        const createTable = "CREATE TABLE IF NOT EXISTS users.users (email varchar(255), " +
            "password varchar(255), " +
            "name varchar(255))"

        const hashedPassword = CryptoJS.AES.encrypt('admin', 'secret_key').toString()

        await client.query(createTable, (err, res) => {
            if (res) {
                const SelectTable = "SELECT * FROM users.users"
                client.query(SelectTable, (err, res) => {
                    if (res) {
                        if (res.rowCount === 0) {
                            const text = 'INSERT INTO users.users (email, password, name) VALUES($1, $2, $3) RETURNING *'
                            const values = ['admin@admin.com', hashedPassword, 'admin']
                            client.query(text, values, (err, res) => {
                                if (res) {
                                    console.log(res.rows)
                                }
                            })
                        } else {
                            console.log(res.rows)
                        }
                    }
                })
            } if (err) {
                console.log("Server Error", err.message)
            }
        })

        app.listen(PORT, () => console.log('App has been started on port ' + PORT))

        return client

    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()

