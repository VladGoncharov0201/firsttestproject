import React from 'react'
import {Typography, IconButton} from "@material-ui/core"
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import AccountCircle from '@material-ui/icons/AccountCircle';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import {NavLink} from "react-router-dom";

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
    const classes = useStyles()

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
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
                            <TextField id="standard-basic" label="Name" />
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
                            <TextField id="standard-basic" label="Email" />
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