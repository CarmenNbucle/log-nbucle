import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

const RouteController = props => {
	const { component: Component, texto: Texto, fondo: Fondo, ...rest } = props

	const [isTokenOk, setIsTokenOk] = useState(true)

	const init = () => {
		if (localStorage.getItem("auth")) {
			const auth = JSON.parse(localStorage.getItem("auth"))
			if (auth.isAuth===true) {
				setIsTokenOk(true)
			} else {
				setIsTokenOk(false)
			}
		} else {
			setIsTokenOk(false)
		}
	}
	useEffect(init, [])

	return isTokenOk ? <Component {...rest} texto={Texto} fondo={Fondo} /> : <Navigate to={'/login'} />
}

export default RouteController
