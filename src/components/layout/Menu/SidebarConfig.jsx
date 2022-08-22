import React, { useState } from 'react'
import { PersonOutlined, HomeOutlined, DirectionsRunSharp } from '@mui/icons-material'

const sidebarConfig = [
	{
		title: 'inicio',
		path: '/app',
		icon: <HomeOutlined />
	}
	// ,
	// {
	// 	title: 'usuarios',
	// 	path: '/app/usuarios',
	// 	icon: <PersonOutlined />
	// }
	// },
	// {
	// 	title: 'proyecto',
	// 	path: '/app/proyecto',
	// 	icon: <DirectionsRunSharp />
	// }
]

const sidebarConfigadmin = [
	{
		title: 'inicio',
		path: '/app',
		icon: <HomeOutlined />
	},
	{
		title: 'usuarios',
		path: '/app/usuarios',
		icon: <PersonOutlined />
	}
	// },
	// {
	// 	title: 'proyecto',
	// 	path: '/app/proyecto',
	// 	icon: <DirectionsRunSharp />
	// }
]

export {sidebarConfig, sidebarConfigadmin}