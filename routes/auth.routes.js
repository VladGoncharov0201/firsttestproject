const {Router} = require('express')
const bcrypt = require('bcrypt');
const config = require('config')
const {check, validationResult} = require('express-validator')
const router = Router()
const jwt = require('jsonwebtoken')
const user = require("pg");
const { Client } = require('pg')
const connectionString = config.get('connectionString')
const client = new Client({
    connectionString: connectionString,
})
client.connect()


// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Введен некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 8 символов').isLength({min: 4})
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Были введены некорректные данные при регистрации'
            })
        }

        const {email, password} = req.body

        const hashedPassword = await bcrypt.hash(password, 12)

        const value = [email]
        const somepeople = 'SELECT email FROM users.users WHERE email = $1'
        client.query(somepeople, value, function check(err, result) {
            if (result) {
                if (result.rowCount === 1){
                    return res.status(400).json({message: 'Такой пользователь уже существует'})
                } if (result.rowCount === 0){
                    const values = [email, hashedPassword]
                    const insertpeople = 'INSERT INTO users.users (email, password) VALUES($1, $2) RETURNING *'
                    client.query(insertpeople, values, function insert(err, result) {
                        if (result) {
                            return res.status(201).json({message: 'Пользователь сохранен'})
                        }
                    })
                }
            } if (err) {
                return console.log('Где-то есть ошибка')
            }
        })

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
})

// /api/auth/login
router.post('/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Были введены некорректные данные при входе в систему'
            })
        }

        const {email, password} = req.body

        const passwordforcheck = password
        const value = [email]
        const somepeople = 'SELECT * FROM users.users WHERE email = $1'
        client.query(somepeople, value, function check(err, result) {
            if (result){
                if (result.rowCount === 0){
                    return res.status(400).json({message: 'Пользователь не найден'})
                } if (result.rowCount === 1){
                    const {password} = result.rows[0]
                    bcrypt.compare(passwordforcheck, password, function(err, result) {
                        if (result === false) {
                            return res.status(400).json({message: 'Вы ввели неверные данные'})
                        } if (result === true){
                            const token = jwt.sign(
                                {userId: email},
                                config.get('jwtSecret'),
                                {expiresIn: '1h'}
                            )
                            return res.json({jwt: token, userId: email})
                        }
                    })
                    } else {
                        console.log('Произошла ошибка, попробуйте еще раз')
                    }
                }
            }
        )

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
})

module.exports = router