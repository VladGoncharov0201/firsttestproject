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
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        weight: 1280
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
    const {name} = auth

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
                                style={{marginRight: 1280}}>
                        My Profile</Typography>
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit">
                            <AccountCircle />
                            <Typography variant="subtitle1">{name}</Typography>
                        </IconButton>
                    </div>
                    <Button>
                        <a href="/auth" onClick={logoutHandler}><ExitToAppIcon style={{color: "#fdfdfd"}} /></a>
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}