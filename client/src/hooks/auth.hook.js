import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)
    const [email, setEmail] = useState(null)
    const [name, setName] = useState(null)

    const login = useCallback((jwtToken, id, mail, peoplename) => {
        setToken(jwtToken)
        setUserId(id)
        setEmail(mail)
        setName(peoplename)
        localStorage.setItem(storageName, JSON.stringify({
            token: jwtToken, userId: id, email: mail, name: peoplename
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setEmail(null)
        setName(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token){
            login(data.token, data.userId, data.email, data.name)
        }
        setReady(true)
    }, [login])

    return{ login, logout, token, userId, ready, email, name }
}