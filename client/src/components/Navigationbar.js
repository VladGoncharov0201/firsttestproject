import React, {useContext} from "react"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";
import {IconButton} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export const Navigationbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/auth')
    }
    const classes = useStyles()

    return(
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6"
                                style={{marginLeft: 100}}
                                className={classes.title}>
                        LOGO</Typography>
                    <Typography variant="h6"
                                style={{marginRight: 10}}
                                className={classes.title}>
                        My Profile</Typography>
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit">
                            <AccountCircle />
                        </IconButton>
                    </div>
                    <Button color="inherit" variant="contained">
                        <a href="/auth" onClick={logoutHandler}>Logout</a>
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}