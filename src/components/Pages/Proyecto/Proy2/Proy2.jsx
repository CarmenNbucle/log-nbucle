import React, { useState, useContext, useEffect } from 'react'
import { MainContext, APP_STATE } from '../../../../Context/MainContext'
import {CAvatar,CButton,CButtonGroup,CCard,CCardBody,CCardFooter,CCardHeader,CCol,CProgress,CRow,CTable,CTableBody,CTableDataCell,CTableHead,CTableHeaderCell,CTableRow,} from '@coreui/react'
import '../../../../assets/style/charts.css';
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Container, Typography, Grid, Box, Button, Stack, Avatar, IconButton, Divider } from '@mui/material'
import ApiRequest from '../../../../helpers/axiosInstances'
import { AddOutlined, EditOutlined, DeleteOutline } from '@mui/icons-material'
import Page from '../../../common/Page'
import ToastAutoHide from '../../../common/ToastAutoHide'
import CommonTable from '../../../common/CommonTable'
import {sidebarConfig, sidebarConfigadmin} from '../../../layout/Menu/SidebarConfig'

import NavSection from '../../../layout/NavSection/NavSection'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { makeStyles } from '@mui/styles'

// azul --> info
// rojo --> danger
// amarillo --> warning
// verde --> success

// TRADUCIR https://marmelab.com/react-admin/Translation.html


const useStyles = makeStyles(theme=>({
	fondo: {
		backgroundColor: '#323232',
	},
	fondoventana: {
		backgroundColor: '#32323282',
	},
	powered: {
		textAlign: 'center',
		marginTop: '50px',
	},
	espacio: {
		marginTop: '100px',
	},
	miboton: {
		background: '#fff',
		color: '#323232 !important',
	},
	sidebar: {
		background: '#3c3c3c',
		marginTop: '30px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
}))


const Proyecto = () => {
	const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
	const [user, setUser] = useState({ picture: 'https://i.imgur.com/VGEVWUy.png', correo: '', name: '', cargo: '' })
	const classes = useStyles()
	const initialState = {
		avatar: 'https://i.imgur.com/gh3fPj5.png',
		nombre: "",
		proyecto: ""
	}
	const [tablaList, settablaList] = useState([])
	const [cantidades, setCantidades] = useState([])
	const [body, setBody] = useState(initialState)
	const [openDialog, setOpenDialog] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [mensaje, setMensaje] = useState({ ident: null, message: null, type: null })
	const [datos, setDatos] = useState([])
	const { globalState, globalDispatch } = useContext(MainContext)
	
	const init = async () => {
		var reservados = 0
		var libres = 0
		var total = 0
		var porreservados = 0
		var porlibres = 0

		/* Para la lista */
		const { data } = await ApiRequest().get('/proy2')	
		settablaList(data.columnas)

		//console.log('entro en el for: ' + data.columnas.lenght())
		//console.log('el si o no: ' + data.columnas[1].reservado)

		/* Para las línea */
		reservados = data.resevados
		total = data.total
		libres = total - reservados
		porreservados = Math.trunc(reservados* 100 /total)
	 	porlibres = 100 - porreservados

		setDatos({total, reservados, libres, porreservados, porlibres})
		//cambiasienoes(total);

		
		if (typeof globalState.auth.id === 'undefined') {
			localStorage.clear()
		} else {
			setUser(globalState.auth)
		}
	}


	function opcionesMenu(){
		if (user.username == 'Admin'){
			return (<NavSection navConfig={sidebarConfigadmin} />)
			console.log('si admin')
		}else{
			return (<NavSection navConfig={sidebarConfig} />)
			console.log('no admin')
		}
	}

	// function cambiasienoes(total){
	// 	for (var i = 0; i < total; i++) {
	// 		console.log('entro en el for')
	// 		if (tablaList[i].reservado == 1){
	// 			settablaList[i].reservado = 'si'
	// 		} else{
	// 			settablaList[i].reservado = 'no'
	// 		}
	// 	}
	// }

	// const progressGroupExample3 = [
	//   { title: 'Libres', percent: 4, value: datos.libres },
	// ]
  
	// const progressGroupExample2 = [
	//   { title: 'Reservados',  percent: 4, value: datos.libres },
	// ]
  
	
	//id, piso, reservado, visitas
	const columns = [
		{ field: 'id', headerName: 'ID', width: 120 },
		{ field: 'piso', headerName: 'Piso', width: 250 },
		{ field: 'reservado', headerName: 'Reservado', type: 'boolean', width: 200 },
		{ field: 'visitas', headerName: 'Visitas', width: 220 },
		{ field: '', headerName: 'Acciones', width: 200,
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
		try {
			const { data } = await ApiRequest().post('/proy2eliminar', { id: id })
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

	const handleDialog = () => {
		setOpenDialog(prev => !prev)
	}

	// const onChange = ({ target }) => {
	// 	const { name, value } = target
	// 	setBody({
	// 		...body,
	// 		[name]: value
	// 	})
	// }


	//const [body, setBody] = useState(initialState)
	// const onChange = (piso) => {
	// 	const { name, value } = {piso, event: SelectChangeEvent}
	// 	setBody({...body,
	// 		[name]: value});
	// };
	//https://mui.com/material-ui/react-select/#basic-select

	const onChange = (event, child ) => {
		const { name, value } = event.target 
		setBody({...body,
			[name]: value
		})
	}


	const onSubmit = async () => {
		try {
			const { data } = await ApiRequest().post('/proy2guardar', body)
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
			const { data } = await ApiRequest().post('/proy2editar', body)
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

	//https://mui.com/x/react-data-grid/

	return (
	  <>
		<Dialog maxWidth='xs' open={openDialog} onClose={handleDialog} className={classes.fondoventana}>
				<DialogTitle className={classes.fondo}>
					{'Editar piso'}
				</DialogTitle>
				<DialogContent className={classes.fondo}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={12}>
							<p>{body.piso}</p>
						</Grid>
						<Grid item xs={12} sm={12}>
							{/* <TextField
								margin='normal'
								name='reservado'
								value={body.nombre}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Reservado'
							/> */}

						<FormControl sx={{ m: 1, minWidth: 200 }} className={classes.fondo}>
							<InputLabel id="demo-simple-select-autowidth-label">Reservado</InputLabel>
							<Select 
							className={classes.fondo}
							name='reservado'
							value={body.nombre}
							onChange={onChange}
							variant='outlined'
							size='small'
							color='primary'
							fullWidth
							label='Reservado'
							labelId="demo-simple-select-autowidth-label"
							id="demo-simple-select-autowidth"
							>
							<MenuItem value="" className={classes.fondo}>
								<em>Elige una opción</em>
							</MenuItem>
							<MenuItem value={1} className={classes.fondo}>Si</MenuItem>
							<MenuItem value={0} className={classes.fondo}>No</MenuItem>
							</Select>
						</FormControl> 

					</Grid>
						{/* <Grid item xs={12} sm={12}>
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
						</Grid> */}
					</Grid>
				</DialogContent>
				<DialogActions className={classes.fondo}>
					<Button variant='text' color='primary' onClick={handleDialog}>cancelar</Button>
					<Button variant='contained' className={classes.miboton} onClick={isEdit ? () => onEdit() : () => onSubmit()}>guardar</Button>
				</DialogActions>
			</Dialog>
		<Page title="App | Proyecto">
		<CRow>
		  <CCol xs>
			
				<CRow className={classes.espacio}>
				  {/* <CCol xs={12} md={6} xl={6}>
					<CRow>
					  <CCol sm={6}>
						<div className="border-start border-start-4 border-start-info py-1 px-3">
						  <div className="text-medium-emphasis small">1º Fase</div>
						  <div className="fs-5 fw-semibold">82,123</div>
						</div>
					  </CCol>
					  <CCol sm={6}>
						<div className="border-start border-start-4 border-start-info py-1 px-3 mb-3">
						  <div className="text-medium-emphasis small">2º Fase</div>
						  <div className="fs-5 fw-semibold">17,877</div>
						</div>
					  </CCol>
					</CRow>
  
					<hr className="mt-0" />
					{progressGroupExample3.map((item, index) => (
					  <div className="progress-group" key={index}>
						<div className="progress-group-header">
						  <CIcon className="me-2" icon={item.icon} size="lg" />
						  <span>{item.title}</span>
						  <span className="ms-auto fw-semibold">
							{item.value}{' '}
							<span className="text-medium-emphasis small">({item.percent}%)</span>
						  </span>
						</div>
						<div className="progress-group-bars">
						  <CProgress thin color="info" value={item.percent} />
						</div>
					  </div>
					))}
				  </CCol> */}
  
				  {/* <CCol xs={12} md={12} xl={12}>
					<CRow>
					  <CCol sm={6}>
						<div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
						  <div className="text-medium-emphasis small">Reservados</div>
						  <div className="fs-5 fw-semibold">{datos.reservados}</div>
						</div>
					  </CCol>
					  <CCol sm={6}>
						<div className="border-start border-start-4 border-start-info py-1 px-3 mb-3">
						  <div className="text-medium-emphasis small">Libres</div>
						  <div className="fs-5 fw-semibold">{datos.libres}</div>
						</div>
					  </CCol>
					</CRow>
  
					<hr className="mt-0" />
  
					
					  <div className="progress-group">
						<div className="progress-group-header">
						  <span>Reservados</span>
						  <span className="ms-auto fw-semibold">
							{datos.reservados}{' '}
							<span className="text-medium-emphasis small">({datos.porreservados}%)</span>
						  </span>
						</div>
						<div className="progress-group-bars">
						  <CProgress thin color="warning" value={datos.porreservados} />
						</div>
					  </div>
					

					
					  <div className="progress-group">
						<div className="progress-group-header">
						  <span>Libres</span>
						  <span className="ms-auto fw-semibold">
							{datos.libres}{' '}
							<span className="text-medium-emphasis small">({datos.porlibres}%)</span>
						  </span>
						</div>
						<div className="progress-group-bars">
						  <CProgress thin color="info" value={datos.porlibres} />
						</div>
					  </div>
					
  
					<div className="mb-5"></div>
  
					
				  </CCol> */}
				  <br/>
				</CRow>
  
				<br />
  
				<ToastAutoHide message={mensaje} />
				<Container maxWidth='100%'>
					<Box sx={{ pb: 5 }}>
						{/* <Typography variant="h5">Lista de Pisos de Proy 2</Typography> */}
					</Box>
					<Grid container spacing={2} >
						{/* <Grid item xs={12} sm={4}>
							<Button onClick={handleDialog} startIcon={<AddOutlined />} variant='contained' color='primary'>Añadir</Button>
						</Grid> 
						<Grid item xs={12} sm={8} />*/}
						<Grid item xs={12} sm={2} className={classes.sidebar}>
							{opcionesMenu()}
							<p className={classes.powered}><a href="https://www.nbucle.com/es/"><img style={{width:'100px'}} src={'../src/assets/powered_nbucle.png'} alt="Nbucle Creative Communication" /></a></p>
						</Grid>
						<Grid item xs={12} sm={10}>
							<CommonTable data={tablaList} columns={columns} options={{ filtering: true }} />
						</Grid>
					</Grid>
				</Container>
			 
		  </CCol>
		</CRow>

		
		</Page>
	  </>
	)
  }

export default Proyecto

//https://react-chartjs-2.js.org/examples/multiaxis-line-chart