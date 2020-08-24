const {Router} = require('express')
const router = Router()
const config = require('config')
const { Client } = require('pg')
const connectionString = config.get('connectionString')
const client = new Client({
    connectionString: connectionString,
})
client.connect()
const auth = require('../middleware/auth.middleware')

router.post('/changename', auth, async (req, res) => {
    try{
        const user = req.user.userId

        const value = [user]
        const somepeople = 'SELECT * FROM users.users WHERE email = $1'
        client.query(somepeople, value, function check(err, result) {
            if (result){
            }
        })

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
})

router.get('/', auth, async (req, res) => {
    try{
        const user = req.user.userId

        const value = [user]
        const somepeople = 'SELECT * FROM users.users WHERE email = $1'
        client.query(somepeople, value, function check(err, result) {
                if (result){
                }
        })
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
})

module.exports = router