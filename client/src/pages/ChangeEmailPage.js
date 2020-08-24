import React, {useEffect, useState} from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {makeStyles} from "@material-ui/core/styles";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles(() => ({
    root: {
        maxWidth: 275,
        textAlign: "center"
    },
    title: {
        fontSize: 25,
    },
}))

export const ChangeEmailPage = () => {
    const {loading, error, clearError} =  useHttp()
    const message = useMessage()

    const [setValues] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect( () => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
        setValues({ ...form, [event.target.name]: event.target.value })
    }

    const classes = useStyles()

    return(
        <Card className={classes.root} variant="outlined">
            <CardContent style={{
                alignItems:'center',
                justifyContent:'center'}}>
                <Typography className={classes.title}
                            variant="outlined, h5"
                            style={{ color: '#340abf'}}
                            gutterBottom>
                    Change Email
                </Typography>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name="email" id="email" variant="outlined" onChange={changeHandler} />
                </form>
            </CardContent>
            <CardActions style={{
                alignItems:'center',
                justifyContent:'center'}}>
                <Button style={{width:100, backgroundColor:'#340abf', marginTop:30}}
                        color="secondary"
                        variant="contained"
                        //onClick={() => }
                        disabled={loading}>
                    <NavLink style={{ color: '#f1f1f1'}} to="/main">Cancel</NavLink>
                </Button>
                <Button style={{width:100, backgroundColor:'#340abf', marginTop:30}}
                        color="secondary"
                        variant="contained"
                    //onClick={() => }
                        disabled={loading}>
                    Save changes
                </Button>
            </CardActions>
        </Card>
    );
}