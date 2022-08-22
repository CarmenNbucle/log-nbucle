import React, { useState, useEffect, useContext, useRef, createElement } from 'react'
import ReactDOM from 'react-dom' 
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Container, Typography, Grid, Box, Button, Stack, Avatar, IconButton, Divider } from '@mui/material'
import ApiRequest from '../../../helpers/axiosInstances'
import { AddOutlined, EditOutlined, DeleteOutline } from '@mui/icons-material'
import Page from '../../common/Page'
import ToastAutoHide from '../../common/ToastAutoHide'
import CommonTable from '../../common/CommonTable'
import { MainContext, APP_STATE } from '../../../Context/MainContext'
import '../../../assets/style/tarjetas.css';
import UnaTarjetas from './UnaTarjetas';

//const user = document.getElementById('name').innerHTML;


const Tarjetas = () => {
	const { globalState, globalDispatch } = useContext(MainContext)
	var user = globalState.auth.username
	const [usuariosList, setUsuariosList] = useState([])
	const [mensaje, setMensaje] = useState({ ident: null, message: null, type: null })
	//const [datos, setDatos] = useState([])

	const init = async () => {
	
        try {
            const data  = await ApiRequest().get('/proyectos') 
			setUsuariosList( data )
		} catch ({ response }) {
			setMensaje({
				ident: new Date().getTime(),
                message: 'No se encuentra ningún proyecto asignado a este usuario',
				type: 'error'
			})
		}
		//console.log('El usuario es ' +  globalState.auth.user + ' : ' + usuario.username)
		user = globalState.auth.user
	}

	useEffect(init, [])

	function damelo(usuariosList) {
		for (const [datas, value] of Object.entries(usuariosList)) {
			var listItems = ''
			var unaporuna = usuariosList['data'];
			var personas = unaporuna.length;
			var ind=0
			if(datas == 'data'){
				for (ind=0; ind<personas; ind++){
					
					listItems = unaporuna.filter(unaporuna => unaporuna.nombre == user).map(filteredPerson => (
						<UnaTarjetas className={`boxe-${filteredPerson.id}`} ids= {filteredPerson.id} proyecto= {filteredPerson.proyecto} key={filteredPerson.id} />
					  ))
	
				}
				return <div>{listItems}</div>;
			}
		}	
	}


	// const onProyect = ({ target }) => {
	// 	const { name, value } = target
	// 	setBody({
	// 		...body,
	// 		[name]: value
	// 	})
	// }

	return (
		<>
			<Page title="APP | Usuarios">
				<ToastAutoHide message={mensaje} />
				
					{/* <Box sx={{ pb: 5 }}>
						<Typography variant="h5">¡Hola {user}!</Typography>
					</Box> */}
				<div className='misTarjetas'>
				{damelo(usuariosList)}
				</div>
				
				{/* {console.log('A ver si funciona: ' + Object.entries(usuariosList))}
				{console.log('Tenemos json: ' + JSON.stringify(usuariosList['data']))}
				{console.log('Tenemos en data: ' + usuariosList['data'])} */}
				
				
			</Page>


		</>
	)

}

export default Tarjetas;