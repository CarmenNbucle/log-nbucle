import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import Header from '../../layout/Header'
import MenuApp from '../../layout/Menu'
import { renderRoutes } from '../../../routes/RouteUtils'

const APP_BAR_MOBILE = 64
const APP_BAR_DESKTOP = 64
const DRAWER_WIDTH = 280

const RootStyle = styled('div')({
	display: 'flex',
	minHeight: '100%',
	overflow: 'hidden',
	backgroundColor: '#323232'
})

const MainStyle = styled('div', { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		flexGrow: 1,
		overflow: 'hidden',
		minHeight: '100%',
		paddingTop: APP_BAR_MOBILE + 24,
		paddingBottom: theme.spacing(10),
		[theme.breakpoints.up('lg')]: {
			paddingTop: APP_BAR_DESKTOP + 24,
			paddingLeft: '3em',
			paddingRight: '3em'
		},
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginLeft: `-${DRAWER_WIDTH}px`,
		...(open && {
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen
			}),
			marginLeft: 0
		})
	})
)

// ----------------------------------------------------------------------

const Pproyectos = props => {
	const [openMobile, setOpenMobile] = useState(false)
	const [openDesktop, setOpenDesktop] = useState(true)
	const { route, texto, fondo } = props

	return (
				<RootStyle>
			{/*<Header onOpenSidebar={() => setOpenMobile(true)} isOpenSidebarDesktop={openDesktop} onSidebarDesktop={() => setOpenDesktop(prev => !prev)} />
			<MenuApp isOpenSidebar={openMobile} onCloseSidebar={() => setOpenMobile(false)} isOpenSidebarDesktop={openDesktop} /> */}
			<Header texto={texto} fondo={fondo} />
			<MainStyle open={openDesktop}>
				{renderRoutes(route.routes)}
			</MainStyle>
		</RootStyle>
	)
}

export default Pproyectos