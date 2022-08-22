import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { APP_VALUE_URL } from '../constants/app'

export const HomeRedirect = () => <Navigate to={`/${APP_VALUE_URL.ROOT_ROUTE}`} />

export const renderRoutes = (routes, extraProps = {}, switchProps = {}) =>
	routes ? (
		<Routes {...switchProps}>
			{routes.map((route, i) => (
				<Route
					exact={route.exact}
					key={route.key || i}
					path={route.path}
					render={props => route.render
						? route.render({ ...props, ...extraProps, route: route })
						: <route.component {...props} {...extraProps} route={route} />}
					strict={route.strict}
				/>
			))}
		</Routes>
	) : null
