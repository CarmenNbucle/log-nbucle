import React, { useState, useContext, useEffect, Component} from 'react'
import { MainContext, APP_STATE  } from '../../../Context/MainContext'
import { sidebarConfig, sidebarConfigadmin } from '../../layout/Menu/SidebarConfig'
import { TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Container, Typography, Grid, Box, Button, Stack, Avatar, IconButton, Divider } from '@mui/material'
import ApiRequest from '../../../helpers/axiosInstances'
import { AddOutlined, EditOutlined, DeleteOutline } from '@mui/icons-material'
import Page from '../../common/Page'
import ToastAutoHide from '../../common/ToastAutoHide'
import CommonTable from '../../common/CommonTable'
import NavSection from '../../layout/NavSection/NavSection'
import { makeStyles } from '@mui/styles'


const useStyles = makeStyles(theme=>({
	fondoventana: {
		backgroundColor: '#323232',
	},
	powered: {
		textAlign: 'center',
		marginTop: '50px',
	},
	espacio: {
		marginTop: '130px',
	},
	miboton: {
		background: '#3c3c3c ',
		color: '#fff !important',
		'&:hover': {
			background: '#919191 ',
			color: '#3c3c3c !important',
		},
	},
	sidebar: {
		background: '#3c3c3c',
		marginTop: '30px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
}))

const Usuarios = () => {
	const initialState = { avatar: 'https://i.imgur.com/gh3fPj5.png', nombre: "", proyecto: ""}
	const [user, setUser] = useState({ picture: 'https://i.imgur.com/VGEVWUy.png', correo: '', name: '', cargo: '' })
	const { globalState, globalDispatch } = useContext(MainContext)
	const [usuariosList, setUsuariosList] = useState([])
	const [body, setBody] = useState(initialState)
	const [openDialog, setOpenDialog] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [mensaje, setMensaje] = useState({ ident: null, message: null, type: null })
	//const [idDelete, setIdeDelete] = useState(null)
	//const [openDialogDelete, setOpenDialogDelete] = useState(false)
	const classes = useStyles()

	function opcionesMenu(){
		if (user.username == 'Admin'){
			return (<NavSection navConfig={sidebarConfigadmin} />)
			//console.log('si admin')
		}else{
			return (<NavSection navConfig={sidebarConfig} />)
			//console.log('no admin')
		}
	}

	const init = async () => {
		const { data } = await ApiRequest().get('/usuarios')
		setUsuariosList(data)

		if (typeof globalState.auth.id === 'undefined') {
			localStorage.clear()
		} else {
			setUser(globalState.auth)
		}
	}

	const columns = [
		{ field: 'id', headerName: 'ID', width: 120 },
		{
			field: 'avatar',
			headerName: 'Avatar',
			width: 200,
			renderCell: (params) => (
				<Avatar src={params.value} />
			)
		},
		{ field: 'nombre', headerName: 'Nombre', width: 220 },
		{ field: 'proyecto', headerName: 'proyecto', width: 220 },
		{ field: '',
			headerName: 'Acciones',
			width: 200,
			renderCell: (params) => (
				<Stack direction='row' divider={<Divider orientation="vertical" flexItem />} justifyContent="center" alignItems="center" spacing={2}>
					<IconButton size='small' onClick={() => {
						setIsEdit(true)
						setBody(params.row)
						handleDialog()
					}}>
						<EditOutlined />
					</IconButton>
					<IconButton size='small' onClick={() => onDelete(params.id)}>
						<DeleteOutline />
					</IconButton>
				</Stack>
			)
		}
	]

	const onDelete = async (id) => {
		var sign = prompt("¿Está seguro que desea eliminarlo? Responda si o no");
		if(sign == 'si' ){
			try {
				const { data } = await ApiRequest().post('/eliminar', { id: id })
				setMensaje({
					ident: new Date().getTime(),
					message: data.message,
					type: 'success'
				})
				init()
			} catch ({ response }) {
				setMensaje({
					ident: new Date().getTime(),
					message: response.data.sqlMessage,
					type: 'error'
				})
			}
		}
	}

	const handleDialog = () => {
		setOpenDialog(prev => !prev)
	}

	const onChange = ({ target }) => {
		const { name, value } = target
		setBody({
			...body,
			[name]: value
		})
	}

	const onSubmit = async () => {
		try {
			const { data } = await ApiRequest().post('/guardar', body)
			handleDialog()
			setBody(initialState)
			setMensaje({
				ident: new Date().getTime(),
				message: data.message,
				type: 'success'
			})
			init()
			setIsEdit(false)
		} catch ({ response }) {
			setMensaje({
				ident: new Date().getTime(),
				message: response.data.sqlMessage,
				type: 'error'
			})
		}
	}

	const onEdit = async () => {
		try {
			const { data } = await ApiRequest().post('/editar', body)
			handleDialog()
			setBody(initialState)
			setMensaje({
				ident: new Date().getTime(),
				message: data.message,
				type: 'success'
			})
			init()
		} catch ({ response }) {
			setMensaje({
				ident: new Date().getTime(),
				message: response.data.sqlMessage,
				type: 'error'
			})
		}
	}

	useEffect(init, [])


	return (
		<>
			<Dialog maxWidth='xs' open={openDialog} onClose={handleDialog} className={classes.fondoventana}>
				<DialogTitle className={classes.fondoventana}>
					{isEdit ? 'Editar Usuario' : 'Crear Usuario'}
				</DialogTitle>
				<DialogContent className={classes.fondoventana}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={12}>
							{/* <Avatar src={body.avatar} /> */}
						</Grid>
						<Grid item xs={12} sm={12}>
							<TextField
								margin='normal'
								name='id'
								value={body.id}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='ID'
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<TextField
								margin='normal'
								name='nombre'
								value={body.nombre}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Nombre'
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<TextField
								margin='normal'
								name='proyecto'
								value={body.proyecto}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='proyecto'
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions className={classes.fondoventana}>
					<Button variant='text' color='primary' onClick={handleDialog}>cancelar</Button>
					<Button variant='contained' color='primary' onClick={isEdit ? () => onEdit() : () => onSubmit()}>guardar</Button>
				</DialogActions>
			</Dialog >
			<Page title="App | Usuarios">
				<ToastAutoHide message={mensaje} />
				<Grid container className={classes.espacio} >
					<Box sx={{ pb: 5 }}>
						<Typography variant="h5">Lista de usuarios</Typography>
					</Box>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={2} className={classes.sidebar}>
						{opcionesMenu()}
						<p className={classes.powered}><a href="https://www.nbucle.com/es/"><img style={{width:'100px'}} src={'../src/assets/powered_nbucle.png'} alt="Nbucle Creative Communication" /></a></p>
						</Grid>
						<Grid item xs={12} sm={10}>
							<Grid item xs={12} sm={4}>
								<Button onClick={handleDialog} className={classes.miboton} startIcon={<AddOutlined />} variant='contained' color='primary'>Nuevo</Button>
							</Grid>
							<Grid item xs={12} sm={8} />
							<Grid item xs={12} sm={12}>
								<CommonTable data={usuariosList} columns={columns} />
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Page>
		</>
	)
}

export default Usuarios

