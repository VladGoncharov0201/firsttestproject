import React, {useContext, useEffect, useState} from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {makeStyles} from "@material-ui/core/styles";
import {AuthContext} from "../context/AuthContext";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 275,
        textAlign: "center"
    },
    bullet: {
        display: 'inline-block',
        margin: '2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 25,
    },
    pos: {
        marginBottom: 12,
        textAlign: "center"
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
}))

export const LoginPage = () => {
    const auth = useContext(AuthContext)
    const {loading, error, request, clearError} =  useHttp()
    const message = useMessage()

    const [values, setValues] = useState({
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

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const loginHandler = async () => {
        try{
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        }catch (e) {}
    }

    const registerHandler = async () => {
        try{
            const data = await request('/api/auth/register', 'POST', {...form})
            auth.login(data.jwt)
        }catch (e) {}
    }

    return(
        <Card className={classes.root} variant="outlined">
            <CardContent style={{
                alignItems:'center',
                justifyContent:'center'}}>
                <Typography className={classes.title}
                            variant="outlined, h5"
                            style={{ color: '#340abf'}}
                            gutterBottom>
                    LOGO
                </Typography>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name="email" id="email" variant="outlined" onChange={changeHandler} />
                </form>
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        name="password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={changeHandler}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end">
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>} labelWidth={70}/>
                </FormControl>
            </CardContent>
            <CardActions style={{
                alignItems:'center',
                justifyContent:'center'}}>
                <Button style={{width:100, backgroundColor:'#340abf', marginTop:30}}
                        color="secondary"
                        variant="contained"
                        onClick={() => loginHandler()}
                        disabled={loading}>
                    LOGIN
                </Button>
                <Button style={{width:100, backgroundColor:'#340abf', marginTop:30}}
                        color="secondary"
                        variant="contained"
                        onClick={() => registerHandler()}
                        disabled={loading}>
                    REGISTRATION
                </Button>
            </CardActions>
        </Card>
    );
}
