import React, {useContext, useState} from "react"
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
import InputLabel from "@material-ui/core/InputLabel"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import InputAdornment from "@material-ui/core/InputAdornment"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import FormControl from "@material-ui/core/FormControl"
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import {useHistory} from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

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
  paper2: {
    height: 750,
    padding: theme.spacing(2),
    textAlign: "center",
  },
}));

function Changename(props) {
  const {onClose, open} = props
  const auth = useContext(AuthContext)
  const {loading, request} =  useHttp()

  const [form, setForm] = useState({
    name: ''
  })

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
      const {name, message} = data
      localStorage.setItem("Name", name)
      alert(message)
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
  const {onClose, open} = props
  const auth = useContext(AuthContext)
  const {loading, request} =  useHttp()

  const handleClose = () => {
    onClose(false)
  }

  const handleListItemClick = (value) => {
    onClose(value)
  }

  const [form, setForm] = useState({
    email: ''
  })

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value })
  }

  const saveHandler = async () => {
    try{
      const data = await request('/api/change/changeemail', 'POST', {...form},
          {Authorization: 'Bearer ' + auth.token})
      const {email, message} = data
      localStorage.setItem("Email", email)
      alert(message)
      handleClose()
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
  const {loading, request} =  useHttp()

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

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value })
    setValues({ ...form, [event.target.name]: event.target.value })
  }

  const saveHandler = async () => {
    try{
      const data = await request('/api/change/changepassword', 'POST', {...form},
          {Authorization: 'Bearer ' + auth.token})
      const {message} = data
      alert(message)
      handleClose()
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
  let name = localStorage.getItem("Name")
  let email = localStorage.getItem("Email")

  const classes = useStyles()
  const [openName, setNameOpen] = React.useState(false)

  const history = useHistory()
  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/auth')
  }

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
      <div>
        <AppBar position="static" style={{position: "static", width: "auto", marginLeft: 300, backgroundColor: "#224f75"}}>
          <Toolbar>
            <Typography variant="h6"
                        style={{marginRight: 1300}}>
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
        <Paper
            className={classes.paper}
            style={{backgroundColor: "#036eb6", color: "#fdfdfd", width: 270, marginTop: -64}}>
          <div>
            <Typography variant="h6"
                        style={{fontWeight: "fontWeightBold", fontSize: 30}}
                        className={classes.title}>
              LOGO</Typography>
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
        <Paper className={classes.paper2} style={{width: "auto", marginTop: -777, marginLeft: 304}}>
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
      </div>
  )
}

