import React, { lazy } from 'react'
import { APP_VALUE_URL } from '../constants/app'
import { HomeRedirect } from './RouteUtils'
const RouteController = lazy(() => import('./RouteController'))
const NotFound = lazy(() => import('../components/Pages/NotFound'))
const Login = lazy(() => import('../components/Pages/Login'))
const Home = lazy(() => import('../components/Pages/Home'))
const Pproyecto = lazy(() => import('../components/Pages/Pproyectos'))
const Dashboard = lazy(() => import('../components/Pages/Dashboard'))
const Usuarios = lazy(() => import('../components/Pages/Usuarios'))
const Proyecto = lazy(() => import('../components/Pages/Proyecto/Proyecto'))
const Proy1 = lazy(() => import('../components/Pages/Proyecto/Proy1'))
const Proy2 = lazy(() => import('../components/Pages/Proyecto/Proy2'))

const routes = [
	{
		path: "/",
		exact: true,
		component: HomeRedirect
	},
	{
		path: "/login",
		exact: true,
		render: props => <Login {...props} />
	},
	{
		path: `/${APP_VALUE_URL.ROOT_ROUTE}`,
		render: props => <RouteController component={Home} {...props} />,
		routes: [
			{
				path: `/${APP_VALUE_URL.ROOT_ROUTE}`,
				exact: true,
				render: props => <RouteController component={Dashboard} {...props} />
			},
			{
				path: `/${APP_VALUE_URL.ROOT_ROUTE}/usuarios`,
				exact: true,
				render: props => <RouteController component={Usuarios} {...props} />
			},
			{
			   path: `/${APP_VALUE_URL.ROOT_ROUTE}/*`,
			   exact: true,
			   render: props => <NotFound {...props} />
		    },
		]
	},
	{
		path: `/Proyecto`,
		render: props => <RouteController component={Pproyecto} texto='Proyecto' fondo='../src/assets/Proyecto.jpg'{...props} />,
		routes: [
			{
				path: `/Proyecto`,
				exact: true,
				render: props => <RouteController component={Proyecto}  {...props} />
		   },
		]
	},
	{
		path: `/Proy1`,
		render: props => <RouteController component={Pproyecto} texto='Proy1' fondo='../src/assets/Proy1.jpg' {...props} />,
		routes: [
			{
				path: `/Proy1`,
				exact: true,
				render: props => <RouteController component={Proy1}  {...props} />
		   },
		]
	},
	{
		path: `/Proy2`,
		render: props => <RouteController component={Pproyecto} texto='Proy2' fondo='../src/assets/Proy2.jpg' {...props} />,
		routes: [
			{
				path: `/Proy2`,
				exact: true,
				render: props => <RouteController component={Proy2}  {...props} />
		   },
		]
	},
	{
		path: '*',
		render: props => <NotFound {...props} />
	}
]

export default routes