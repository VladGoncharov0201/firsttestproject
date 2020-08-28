import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import '@material-ui/core'
import {useRoutes} from "./routes"
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navigationbar} from "./components/Navigationbar";
import {Loader} from "./components/Loader";

function App() {
    const {token, login, logout, userId, ready, email, name} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    if(!ready){
        return <Loader />
    }

    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, email, name, isAuthenticated
        }}>
            <Router>
                {isAuthenticated && <Navigationbar />}
                <div className="container">
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    )
}

export default App
