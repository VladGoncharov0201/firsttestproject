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

        //const hashedoldPassword = await bcrypt.hash(oldpassword, 12)
        const hashednewPassword = await bcrypt.hash(password, 12)

        const value = [hashednewPassword, authemail]
        const updatepassword = 'UPDATE users.users SET password = $1 WHERE email = $2'
        client.query(updatepassword, value, function check(err, result) {
            if (result) {
                return res.status(200).json({message: 'Пароль успешно изменен'})
            } else {
                res.json({message: 'Возникла ошибка, попробуйте еще раз'})
            }
        })

        /*
        const value = [authemail]
        const somepeople = 'SELECT * FROM users.users WHERE email = $1'
        client.query(somepeople, value, function check(err, result) {
                if (result){
                    const {password} = result.rows[0]
                    bcrypt.compare(oldpassword, password, function(err, result) {
                        if (result === false) {
                            return res.status(400).json({message: 'Вы ввели неверные пароль'})
                        } if (result === true){
                            return res.status(200).json({message: 'Пароль был успешно изменен'})
                        }
                    })
                } else {
                    return res.status(500).json({message: 'Что-то пошло не так'})
                }
            }
        )
        */
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
})

module.exports = router