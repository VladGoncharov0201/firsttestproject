const {Router} = require('express')
var CryptoJS = require("crypto-js")
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

        const hashednewPassword = CryptoJS.AES.encrypt(password, 'secret_key').toString()

        const value = [authemail]
        const somepeople = 'SELECT * FROM users.users WHERE email = $1'
        client.query(somepeople, value, function check(err, result) {
                if (result){
                    const {password} = result.rows[0]
                    const passwordforcheckindb = CryptoJS.AES.decrypt(password, 'secret_key')
                    const originalpassword = passwordforcheckindb.toString(CryptoJS.enc.Utf8)
                    if (originalpassword === oldpassword) {
                        const value = [hashednewPassword, authemail]
                        const updatepassword = 'UPDATE users.users SET password = $1 WHERE email = $2'
                        client.query(updatepassword, value, function check(err, result) {
                            if (result){
                                return res.status(200).json({message: 'Пароль успешно изменен'})
                            } else{
                                return res.status(500).json({message: 'Что-то пошло не так, пароль не был изменен'})
                            }
                        })
                    } if (originalpassword !== oldpassword){
                        return res.status(400).json({message: 'Введен неверный пароль'})
                    }
                } else {
                    return res.status(500).json({message: 'Что-то пошло не так'})
                }
            }
        )
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
})

module.exports = router