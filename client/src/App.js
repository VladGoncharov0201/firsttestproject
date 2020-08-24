import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import '@material-ui/core'
import {useRoutes} from "./routes"
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navigationbar} from "./components/Navigationbar";

function App() {
    const {token, login, logout} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)
    return (
        <AuthContext.Provider value={{
            token, login, logout, isAuthenticated
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
