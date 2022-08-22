import React, { useState, useContext, useEffect } from 'react'
import { Grid, CssBaseline, Paper, Avatar, Typography, TextField, Button, InputAdornment, IconButton, LinearProgress, Box, Link } from '@mui/material'
import { LockOpen, Visibility, VisibilityOff, LockOutlined } from '@mui/icons-material'
import { useHistory } from 'react-router-dom'
import ApiRequest from '../../../helpers/axiosInstances'
import { MainContext, APP_STATE, AUTH_TYPES } from '../../../Context/MainContext'
import ToastAutoHide from '../../common/ToastAutoHide'
import Page from '../../common/Page'
import { makeStyles } from '@mui/styles'


const useStyles = makeStyles(theme=>({
	loginForm: {
		margin: '18em auto',
	},
	sformInput: {
		color: 'rgb(255 255 255 / 60%)',
		borderColor: 'rgb(255 255 255 / 39%)',
		label: {
			color: '#fff',
		},
		fieldset: {
			color: 'rgb(255 255 255 / 60%)',
			borderColor: 'rgb(255 255 255 / 39%)',
		},
	},
	sendButton: {
		background: 'transparent',
		color: '#fff',
		border: '2px solid #fff',
		width: '40%',
		display: 'flex',
		margin: '0px auto',
	},
	'sendButton:hover' : {
		background: '#fff',
		color: '#000',
		border: '2px solid #000',
	},
	blanco: {
		color: '#fff !important',
	},
	centrar: {
		textAlign: 'center',
	},
	powered: {
		textAlign: 'center',
	},
	'& .MuiOutlinedInput-notchedOutline': {
		borderColor: 'rgb(255 255 255 / 54%)',
		'& fieldset': {
			color: '#fff',
			borderWidth: '2',
			borderColor: 'rgb(255 255 255 / 45%) !important',
		},
		'& input:invalid + fieldset': {
			borderColor: 'red',
			borderWidth: 2,
		},
		'& input:valid:focus + fieldset': {
			borderLeftWidth: 6,
			padding: '4px !important', // override inline-style
		},
	},
}))

//https://codesandbox.io/s/xvrr1g?file=/demo.tsx


const Login = () => {
	const { globalDispatch } = useContext(MainContext)
	const [bodyLogin, setBodyLogin] = useState({ username: '', password: '' })
	const [showPass, setShowPass] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [mensaje, setMensaje] = useState({ ident: null, message: null, type: null })
	const { push } = useHistory()

	const onChange = e => {
		const { name, value } = e.target
		setBodyLogin({
			...bodyLogin,
			[name]: value
		})
	}

	const handleSubmit = () => {
		setIsLoading(true)
		ApiRequest().post('/login', bodyLogin)
			.then(({ data }) => {
				globalDispatch({
					type: AUTH_TYPES.LOGIN_OK,
					payload: data
				})
				setIsLoading(false)
				push('/app')
			})
			.catch(({ response }) => {
				globalDispatch({ type: AUTH_TYPES.LOGIN_FAIL })
				setMensaje({
					ident: new Date().getTime(),
					message: response.data,
					type: 'error'
				})
				setIsLoading(false)
			})
	}

	const classes = useStyles()

	const init = () => {
		globalDispatch({
			type: APP_STATE.CLEAR_APP_STATE
		})
		localStorage.clear()
	}

	useEffect(init, [])

	return (
		<Page title="APP | Login">
			<ToastAutoHide message={mensaje} />
			<Grid container component="main" sx={{ height: '100vh' }}>
				<CssBaseline />
				<Grid item xs={false} sm={12} md={12}
					sx={{
						backgroundImage: 'url(./src/assets/fondo.jpg)',
						backgroundRepeat: 'no-repeat',
						backgroundColor: (t) =>
							t.palette.mode === 'dark' ? "#27aae1" : "#27aae1",
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}>



					{/*formulario*/}
					<Grid item xs={12} sm={8} md={5} className={classes.loginForm} >
						<Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
							{/* <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
								<LockOutlined />
							</Avatar> */}
							<Typography component="h1" variant="h5" color="white">
								Inicio sesión
							</Typography>
							<Box component="form" noValidate sx={{ mt: 1 }}>
								<TextField
									required
									fullWidth
									value={bodyLogin.username}
									onChange={onChange}
									variant="outlined"
									margin="normal"
									label="Usuario"
									name="username"
									id="custom-css-outlined-input"
								/>
								<TextField
									required
									fullWidth
									variant="outlined"
									value={bodyLogin.password}
									onChange={onChange}
									margin="normal"
									name="password"
									label="Contraseña"
									type={showPass ? "text" : "password"}
									autoComplete="password"
									onKeyDown={e => { if (e.keyCode === 13) { handleSubmit() } }}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton onClick={() => setShowPass(!showPass)}
													onMouseDown={(event) => {
														event.preventDefault()
													}}
												>
													{showPass ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>
										)
									}}
									id="custom-css-outlined-input"
								/>
								<Grid container>
									<Grid item xs>
										<Link href="/login" variant="body2" >
											<p className={classes.centrar} >¿Olvidaste tu contraseña?</p>
										</Link>
									</Grid>
								</Grid>
								{isLoading ? <LinearProgress color='secondary' /> : null}
								<Button
									startIcon={<LockOpen />}
									fullWidth
									variant="contained"
									color="primary"
									sx={{ mt: 3, mb: 2 }}
									onClick={handleSubmit}
									className={classes.sendButton}
								>
									Entrar
								</Button>
								
							</Box>
						</Box>
					</Grid>




					<p className={classes.powered}><a href="https://www.nbucle.com/es/"><img style={{width:'100px'}} src={'../src/assets/powered_nbucle.png'} alt="Nbucle Creative Communication" /></a></p>
				</Grid>
				
			</Grid>
			
		</Page>
	)
}

export default Login
