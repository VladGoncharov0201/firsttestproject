import React, { useContext } from "react"
import { Typography, IconButton } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import AccountCircle from "@material-ui/icons/AccountCircle"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import CloseIcon from '@material-ui/icons/Close'
import PropTypes from 'prop-types';
import {TextFields} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrw: 1,
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

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props
  return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
              <CloseIcon />
            </IconButton>
        ) : null}
      </MuiDialogTitle>
  )
})

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions)

function Changename(props) {
  const {onClose, open, name} = props
  console.log(props)

  const handleClose = () => {
    onClose(false)
  }

  const handleListItemClick = (value) => {
    onClose(value)
  }
  return (
      <div>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title-changename" open={open}>
          <DialogTitle id="customized-dialog-title-changename" onClose={handleClose}>
            Change name
          </DialogTitle>
          <DialogContent dividers>

          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleListItemClick} color="primary">
              Save changes
            </Button>
          </DialogActions>
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

  const handleClose = () => {
    onClose(false)
  }

  const handleListItemClick = (value) => {
    onClose(value)
  }
  return (
      <div>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title-changeemail" open={open}>
          <DialogTitle id="customized-dialog-title-changeemail" onClose={handleClose}>
            Change email
          </DialogTitle>
          <DialogContent dividers>

          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleListItemClick} color="primary">
              Save changes
            </Button>
          </DialogActions>
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

  const handleClose = () => {
    onClose(false)
  }

  const handleListItemClick = (value) => {
    onClose(value)
  }
  return (
      <div>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title-changepassword" open={open}>
          <DialogTitle id="customized-dialog-title-changepassword" onClose={handleClose}>
            Change password
          </DialogTitle>
          <DialogContent dividers>

          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleListItemClick} color="primary">
              Save changes
            </Button>
          </DialogActions>
        </Dialog>
      </div>)
}
ChangePassword.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}


export const MainPage = () => {
  const auth = useContext(AuthContext)
  const {email, name} = auth

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
                <Button onClick={handleNameOpen}>Change name</Button>
                <Changename onClose={handleNameClose} name={name} open={openName}/>

                <Typography variant="h6">Email</Typography>
                <Typography variant="subtitle1">{email}</Typography>
                <Button onClick={handleEmailOpen}>Change email</Button>
                <ChangeEmail onClose={handleEmailClose} email={email} open={openEmail}/>

                <Typography variant="h6">Password</Typography>
                <Button onClick={handlePasswordOpen}>Change password</Button>
                <ChangePassword open={openPassword} onClose={handlePasswordClose}/>

              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
  )
}

