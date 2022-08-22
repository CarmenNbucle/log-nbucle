import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom'
// material
import { alpha, useTheme, styled } from '@mui/material/styles'
import { Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton } from '@mui/material'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'

// ----------------------------------------------------------------------

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(
	({ theme }) => ({
		...theme.typography.body2,
		height: 48,
		position: 'relative',
		textTransform: 'capitalize',
		paddingLeft: theme.spacing(5),
		paddingRight: theme.spacing(2.5),
		color: theme.palette.text.secondary,
		'&:before': {
			top: 0,
			right: 0,
			width: 3,
			bottom: 0,
			content: "''",
			display: 'none',
			position: 'absolute',
			borderTopLeftRadius: 4,
			borderBottomLeftRadius: 4,
			backgroundColor: '#3c3c3c !important'
		}
	})
)

const ListItemIconStyle = styled(ListItemIcon)({
	width: 22,
	height: 22,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
})

// ----------------------------------------------------------------------

NavItem.propTypes = {
	item: PropTypes.object,
	active: PropTypes.func
}

function NavItem({ item, active, isOpenSidebarDesktop }) {
	const theme = useTheme()
	const isActiveRoot = active(item.path)
	const { title, path, icon, info, children } = item
	const [open, setOpen] = useState(isActiveRoot)

	const handleOpen = () => {
		setOpen((prev) => !prev)
	}

	const activeRootStyle = {
		color: 'primary.main',
		fontWeight: 'fontWeightMedium',
		bgcolor: '#000',
		'&:before': { display: 'block' }
	}

	const activeSubStyle = {
		color: 'text.primary',
		fontWeight: 'fontWeightMedium'
	}

	if (children) {
		return (
			<>
				<ListItemStyle
					onClick={handleOpen}
					sx={{
						...(isActiveRoot && activeRootStyle)
					}}
				>
					<ListItemIconStyle>{icon && icon}</ListItemIconStyle>
					<ListItemText primary={title} />
					{info && info}
					<Box
						icon={open ? <ArrowBackIosNewOutlinedIcon /> : <ArrowBackIosNewOutlinedIcon />}
						sx={{ width: 16, height: 16, ml: 1 }}
					/>
				</ListItemStyle>

				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{children.map((item) => {
							const { title, path } = item
							const isActiveSub = active(path)

							return (
								<ListItemStyle
									key={title}
									component={RouterLink}
									to={path}
									sx={{
										...(isActiveSub && activeSubStyle)
									}}
								>
									<ListItemIconStyle>
										<Box
											component="span"
											sx={{
												width: 4,
												height: 4,
												display: 'flex',
												borderRadius: '50%',
												alignItems: 'center',
												justifyContent: 'center',
												backgroundColor: '#323232',
												transition: (theme) => theme.transitions.create('transform'),
												...(isActiveSub && {
													transform: 'scale(2)',
													bgcolor: 'primary.contrastText'
												})
											}}
										/>
									</ListItemIconStyle>
									<ListItemText disableTypography primary={title} />
								</ListItemStyle>
							)
						})}
					</List>
				</Collapse>
			</>
		)
	}

	return (
		<ListItemStyle
			component={RouterLink}
			to={path}
			sx={{
				...(isActiveRoot && activeRootStyle)
			}}
		>
			<ListItemIconStyle>{icon && icon}</ListItemIconStyle>
			<ListItemText disableTypography primary={title} />
			{info && info}
		</ListItemStyle>
	)
}

NavSection.propTypes = {
	navConfig: PropTypes.array
}

export default function NavSection({ navConfig, ...other }) {
	const { pathname } = useLocation()
	const match = (path) => (path === pathname ? true : `${path}/form` === pathname ? true  : false)

	return (
		<Box {...other}>
			<List disablePadding>
				{navConfig.map((item) => (
					<NavItem key={item.title} item={item} active={match} />
				))}
			</List>
		</Box>
	)
}