import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { MainContext, APP_STATE } from '../../../Context/MainContext'
import { useLocation } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { Box, Drawer, Typography, Stack } from '@mui/material'
import imagesList from '../../../assets'
import NavSection from '../NavSection/NavSection'
import { MHidden } from '../@material-extend'
import {sidebarConfig, sidebarConfigadmin} from './SidebarConfig'
import { APP_VALUE_URL } from '../../../constants/app'

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280

const RootStyle = styled('div')(({ theme }) => ({
	[theme.breakpoints.up('lg')]: {
		flexShrink: 0,
		width: DRAWER_WIDTH
	}
}))

// ----------------------------------------------------------------------

const MenuApp = ({ isOpenSidebar, onCloseSidebar, isOpenSidebarDesktop, texto }) => {
	const { pathname } = useLocation()
	const [user, setUser] = useState({ picture: 'https://i.imgur.com/VGEVWUy.png', correo: '', name: '', cargo: '' })
	const { globalState, globalDispatch } = useContext(MainContext)

	const init = () => {
		if (isOpenSidebar) {
			onCloseSidebar()
		}
		if (typeof globalState.auth.id === 'undefined') {
			localStorage.clear()
		} else {
			setUser(globalState.auth)
		}
	}

	useEffect(init, [pathname])

	function opcionesMenu(){
		if (user.username == 'Admin'){
			return (<NavSection navConfig={sidebarConfigadmin} isOpenSidebarDesktop={isOpenSidebarDesktop} />)
			console.log('si admin')
		}else{
			return (<NavSection navConfig={sidebarConfig} isOpenSidebarDesktop={isOpenSidebarDesktop} />)
			console.log('no admin')
		}
	}

	// {user.user}

	const renderContent = (
		<>
			<Stack sx={{ p: 2.5, pt: 3, position: 'relative' }} direction="row" alignItems="right" spacing={{ xs: 0.5, sm: 1.5 }}>
				<>
				</>
			</Stack>
			<Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
				<Stack
					alignItems="center"
					spacing={3}
					sx={{
						p: 2.5,
						pt: 5,
						borderRadius: 2,
						position: 'relative'
					}}
				>
					<Box
						component="img"
						src={imagesList.Logo}
						sx={{ width: 100, position: 'absolute', top: -50 }}
					/>

					<Box sx={{ textAlign: 'center' }}>
						<Typography gutterBottom variant="h6">
							{APP_VALUE_URL.NAME}
						</Typography>
						<Typography variant="body2" sx={{ color: 'text.secondary' }}>
							{APP_VALUE_URL.VERSION}
						</Typography>
					</Box>
				</Stack>
			</Box>
			{opcionesMenu()}
			{/* <NavSection navConfig={sidebarConfig} isOpenSidebarDesktop={isOpenSidebarDesktop} /> */}
			<Box sx={{ flexGrow: 1 }} />
		</>
	)

	return (
		<RootStyle>
			<MHidden width="lgUp">
				<Drawer
					open={isOpenSidebar}
					onClose={onCloseSidebar}
					PaperProps={{
						sx: { width: DRAWER_WIDTH }
					}}
				>
					{renderContent}
				</Drawer>
			</MHidden>

			<MHidden width="lgDown">
				<Drawer
					open={isOpenSidebarDesktop}
					variant='persistent'
					PaperProps={{
						sx: {
							width: DRAWER_WIDTH,
							bgcolor: '#323232'
						}
					}}
				>
					{renderContent}
				</Drawer>
			</MHidden>
		</RootStyle>
	)
}

MenuApp.propTypes = {
	isOpenSidebar: PropTypes.bool,
	onCloseSidebar: PropTypes.func
}

export default MenuApp