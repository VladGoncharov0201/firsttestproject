import React, {useContext} from 'react'
import {Typography, IconButton} from "@material-ui/core"
import Button from "@material-ui/core/Button"
import {makeStyles} from "@material-ui/core/styles"
import AccountCircle from '@material-ui/icons/AccountCircle'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import {NavLink} from "react-router-dom"
import {AuthContext} from "../context/AuthContext"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrw: 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1
    },
    paper: {
        height: 810,
        padding: theme.spacing(2),
        textAlign: 'center',
    },
}))

export const MainPage = () => {
    const auth = useContext(AuthContext)
    const {email, name} = auth

    const classes = useStyles()
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    };

    return(
        <div className={classes.root}>
            <Grid container direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={2}>
                <Grid item xs={2}>
                    <Paper className={classes.paper} style={{backgroundColor: '#3f51b5', color: '#fdfdfd'}}>
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit">
                                <AccountCircle />
                                <Typography variant="h6"
                                            style={{marginRight: 10}}
                                            className={classes.title}>
                                    Profile</Typography>
                            </IconButton>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={10}>
                    <Paper className={classes.paper}>
                        <Grid
                            container
                            direction="column"
                            justify="flex-start"
                            alignItems="flex-start">
                            <Typography variant="h6">
                                Name
                            </Typography>
                            <Typography variant="subtitle1">
                                {name}
                            </Typography>
                            <Button onClick={() => { alert('clicked') }} color="primary">
                                <div>
                                    <Button color="primary" onClick={handleClickOpen}>
                                        <NavLink to="/name">Change name</NavLink>
                                    </Button>
                                </div>
                            </Button>
                            <Typography variant="h6">
                                Email
                            </Typography>
                            <Typography variant="subtitle1">
                                {email}
                            </Typography>
                            <Button onClick={() => { alert('clicked') }} color="primary">
                                <NavLink to="/email">Change email</NavLink>
                            </Button>
                            <Typography variant="h6">
                                Password
                            </Typography>
                            <Button onClick={() => { alert('clicked') }} color="primary">
                                <NavLink to="/password">Change password</NavLink>
                            </Button>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}