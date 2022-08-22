import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Grid, Paper, ButtonBase } from '@mui/material'
import Page from '../../common/Page'
import Tarjetas from '../../layout/Proyectos/Tarjetas'
import { makeStyles } from '@mui/styles'


const useStyles = makeStyles(theme=>({
	cabecera: {
		bgcolor: '#323232',
	},
}))




// ----------------------------------------------------------------------
//<img src='https://i.imgur.com/lMyNZPm.png' alt='...' style={{ position: 'absolute', width: '50%', height: 'auto', marginTop: 30 }} />


const Img = styled('img')({
	margin: 'auto',
	display: 'block',
	maxWidth: '100%',
	maxHeight: '100%',
  });

const Dashboard = () => {

	const classes = useStyles()

	return (
		
		<Page title="App proyectos | Dashboard">
			<Container maxWidth="x2">
				<Box className={classes.cabecera} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10%'}}>
					{/* <Typography sx={{ mt: 3, fontWeight: 'bold' }} variant='h5'>Bienvenido a sus</Typography>
					<Typography sx={{ mt: 3, fontWeight: 'bold' }} variant='h3'>proyectos</Typography> */}
				</Box>
				<Tarjetas />
			</Container>
			<p style={{textAlign:'center'}}><a href="https://www.nbucle.com/es/"><img style={{width:'100px'}} src={'../src/assets/powered_nbucle.png'} alt="Nbucle Creative Communication" /></a></p>
		</Page>
	)
}

export default Dashboard