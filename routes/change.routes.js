const {Router} = require('express')
const bcrypt = require('bcrypt')
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
                res.status(200).json({message: 'Имя успешно изменено'})
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
        const updateemail = 'UPDATE users.users SET email = $1 WHERE email = $2'
        client.query(updateemail, value, function check(err, result) {
            if (result) {
                res.status(200).json({message: 'Email успешно изменен'})
            } else {
                res.json({message: 'Возникла ошибка, попробуйте еще раз'})
            }
        })
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
})

router.post('/changepassword', auth, async (req, res) => {
    try{
        const {oldpassword, password} = req.body
        const authemail = req.user.userId

        const hashedPassword = await bcrypt.hash(oldpassword, 12)

        const value = [password, authemail, hashedPassword]
        const updateemail = 'UPDATE users.users SET email = $1 WHERE email = $2 and password = $3'
        client.query(updateemail, value, function check(err, result) {
            if (result) {
                res.status(200).json({message: 'Email успешно изменен'})
            } else {
                res.json({message: 'Возникла ошибка, попробуйте еще раз'})
            }
        })
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
})

module.exports = router