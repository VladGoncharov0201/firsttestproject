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
        const {name} = req.body
        const email = req.user.userId

        const value = [name, email]
        const updatename = 'UPDATE users.users SET name = $1 WHERE email = $2'
        client.query(updatename, value, function check(err, result) {
            if (result) {
                res.status(200).json({message: 'Данные успешно изменены'})
            } else {
                res.json({message: 'Возникла ошибка, попробуйте еще раз'})
            }
        })
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
})

router.post('/changeemail', auth, async (req, res) => {
    try{
        const {email} = req.body
        const authemail = req.user.userId

        const value = [email, authemail]
        const updatename = 'UPDATE users.users SET email = $1 WHERE email = $2'
        client.query(updatename, value, function check(err, result) {
            if (result) {
                res.status(200).json({message: 'Данные успешно изменены'})
            } else {
                res.json({message: 'Возникла ошибка, попробуйте еще раз'})
            }
        })
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
})

module.exports = router