import React, {useContext, useEffect, useState} from "react"
import { Typography, IconButton } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import AccountCircle from "@material-ui/icons/AccountCircle"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import { AuthContext } from "../context/AuthContext"
import Dialog from '@material-ui/core/Dialog'
import CloseIcon from '@material-ui/icons/Close'
import PropTypes from 'prop-types';
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import SaveIcon from '@material-ui/icons/Save';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import InputLabel from "@material-ui/core/InputLabel"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import InputAdornment from "@material-ui/core/InputAdornment"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import FormControl from "@material-ui/core/FormControl"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrw: 1,
    weight: 1280,
    hight: 1080,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    height: 810,
    padding: theme.spacing(2),
    textAlign: "center",
  },
}));

function Changename(props) {
  const {onClose, open, name} = props
  const auth = useContext(AuthContext)
  const {loading, error, request, clearError} =  useHttp()
  const message = useMessage()

  const [form, setForm] = useState({
    name: ''
  })

  useEffect( () => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const handleClose = () => {
    onClose(false)
  }

  const handleListItemClick = (value) => {
    onClose(value)
  }

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value })
  }

  const saveHandler = async () => {
    try{
      const data = await request('/api/change/changename', 'POST', {...form},
          {Authorization: 'Bearer ' + auth.token})
      const {name} = data
      localStorage.setItem("Name", name)
      handleClose()
    }catch (e) {}
  }

  return (
      <div>
        <Dialog onClose={handleClose}
                aria-labelledby="customized-dialog-title-changename"
                open={open}>
          <Card variant="outlined" style={{margin: "auto", width: 300}}>
            <CardContent style={{
              alignItems:'center',
              justifyContent:'center'}}>
              <Typography style={{width: 275, marginLeft: 10, color: '#036eb6'}}
                          variant="outlined"
                          component="h2"
                          gutterBottom>
                Change name
                <Button style={{marginLeft: 40}}
                        color="secondary"
                        onClick={handleClose}
                        disabled={loading}>
                  <CloseIcon style={{marginLeft: 30, color: '#484848'}} />
                </Button>
              </Typography>
              <form style={{margin: "auto", width: 270, textAlign: "center"}} noValidate autoComplete="off">
                <TextField style={{width: 250}}
                           label="Name"
                           name="name"
                           id="name"
                           variant="outlined"
                           onChange={changeHandler} />
              </form>
            </CardContent>
            <CardActions style={{
              alignItems:'center',
              justifyContent:'center'}}>
              <Button style={{backgroundColor:'#036eb6', marginLeft:165}}
                      color="secondary"
                      variant="contained"
                      onClick={saveHandler}
                      disabled={loading}>
                <SaveIcon />
                Save
              </Button>
            </CardActions>
          </Card>
        </Dialog>
      </div>)
}
Changename.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
}

function ChangeEmail(props) {
  const {onClose, open, email} = props
  const auth = useContext(AuthContext)
  const {loading, error, request, clearError} =  useHttp()
  const message = useMessage()

  const handleClose = () => {
    onClose(false)
  }

  const handleListItemClick = (value) => {
    onClose(value)
  }

  const [form, setForm] = useState({
    email: ''
  })

  useEffect( () => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value })
  }

  const saveHandler = async () => {
    try{
      const data = await request('/api/change/changeemail', 'POST', {...form},
          {Authorization: 'Bearer ' + auth.token})
      auth.logout()
    }catch (e) {}
  }

  return (
      <div>
        <Dialog onClose={handleClose}
                aria-labelledby="customized-dialog-title-changeemail"
                open={open}>
          <Card variant="outlined"
                style={{margin: "auto", width: 300}}>
            <CardContent style={{
              alignItems:'center',
              justifyContent:'center'}}>
              <Typography style={{width: 275, marginLeft: 10, color: '#036eb6'}}
                          variant="outlined"
                          component="h2"
                          gutterBottom>
                Change Email
                <Button style={{marginLeft: 40}}
                        color="secondary"
                        onClick={handleClose}
                        disabled={loading}>
                  <CloseIcon style={{marginLeft: 30, color: '#484848'}} />
                </Button>
              </Typography>
              <form style={{margin: "auto", width: 270, textAlign: "center"}} noValidate autoComplete="off">
                <TextField style={{width: 250}}
                           label="Email"
                           name="email"
                           id="email"
                           variant="outlined"
                           onChange={changeHandler} />
              </form>
            </CardContent>
            <CardActions style={{
              alignItems:'center',
              justifyContent:'center'}}>
              <Button style={{backgroundColor:'#036eb6', marginLeft:165}}
                      color="secondary"
                      variant="contained"
                      onClick={saveHandler}
                      disabled={loading}>
                <SaveIcon />
                Save
              </Button>
            </CardActions>
          </Card>
        </Dialog>
      </div>)
}
ChangeEmail.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
}

function ChangePassword(props) {
  const {onClose, open} = props
  const auth = useContext(AuthContext)
  const {loading, error, request, clearError} =  useHttp()
  const message = useMessage()

  const handleClose = () => {
    onClose(false)
  }

  const handleListItemClick = (value) => {
    onClose(value)
  }

  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [form, setForm] = useState({
    oldpassword: '',
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

  const saveHandler = async () => {
    try{
      const data = await request('/api/change/changepassword', 'POST', {...form},
          {Authorization: 'Bearer ' + auth.token})
      auth.logout()
    }catch (e) {}
  }

  return (
      <div>
        <Dialog onClose={handleClose}
                aria-labelledby="customized-dialog-title-changepassword"
                open={open}>
          <Card variant="outlined" style={{margin: "auto", width: 300}}>
            <CardContent style={{
              alignItems:'center',
              justifyContent:'center'}}>
              <Typography style={{width: 275, marginLeft: 10, color: '#036eb6'}}
                          variant="outlined"
                          component="h2"
                          gutterBottom>
                Change Password
                <Button style={{marginLeft: 10}}
                        color="secondary"
                        onClick={handleClose}
                        disabled={loading}>
                  <CloseIcon style={{marginLeft: 30, color: '#484848'}} />
                </Button>
              </Typography>
              <form style={{fontSize: 25, width: 270, textAlign: "center"}} noValidate autoComplete="off">
                <TextField label="Current password" name="oldpassword" id="oldpassword" variant="outlined" onChange={changeHandler} />
              </form>
              <FormControl style={{width: 210, textAlign: "center", marginLeft: 30, marginTop: 10}}
                           variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">New password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    name="New password"
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
              <Button style={{backgroundColor:'#036eb6', marginLeft:130}}
                      color="secondary"
                      variant="contained"
                      onClick={saveHandler}
                      disabled={loading}>
                <SaveIcon />
                Save
              </Button>
            </CardActions>
          </Card>
        </Dialog>
      </div>)
}
ChangePassword.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

export const MainPage = () => {
  const auth = useContext(AuthContext)
  const {email} = auth
  let name = localStorage.getItem("Name")

  const classes = useStyles()
  const [openName, setNameOpen] = React.useState(false)

  const handleNameOpen = () => {
    setNameOpen(true)
  }

  const handleNameClose = (value) => {
    setNameOpen(false)
  }

  const [openEmail, setEmailOpen] = React.useState(false)

  const handleEmailOpen = () => {
    setEmailOpen(true)
  }

  const handleEmailClose = (value) => {
    setEmailOpen(false)
  }

  const [openPassword, setPasswordOpen] = React.useState(false)

  const handlePasswordOpen = () => {
    setPasswordOpen(true)
  }

  const handlePasswordClose = (value) => {
    setPasswordOpen(false)
  }

  return (
      <div className={classes.root}>
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}>
          <Grid item xs={2}>
            <Paper
                className={classes.paper}
                style={{backgroundColor: "#3f51b5", color: "#fdfdfd"}}>
              <div>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit">
                  <AccountCircle/>
                  <Typography
                      variant="h6"
                      style={{marginRight: 10}}
                      className={classes.title}>
                    Profile
                  </Typography>
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

                <Typography variant="h6">Name</Typography>
                <Typography variant="subtitle1">{name}</Typography>
                <Button style={{color: '#036eb6'}} onClick={handleNameOpen}>Change name</Button>
                <Changename onClose={handleNameClose} name={name} open={openName}/>

                <Typography variant="h6">Email</Typography>
                <Typography variant="subtitle1">{email}</Typography>
                <Button style={{color: '#036eb6'}} onClick={handleEmailOpen}>Change email</Button>
                <ChangeEmail onClose={handleEmailClose} email={email} open={openEmail}/>

                <Typography variant="h6">Password</Typography>
                <Button style={{color: '#036eb6'}} onClick={handlePasswordOpen}>Change password</Button>
                <ChangePassword open={openPassword} onClose={handlePasswordClose}/>

              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
  )
}

