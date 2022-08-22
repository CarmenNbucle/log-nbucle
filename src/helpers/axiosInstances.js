import axios from 'axios'
import { APP_VALUE_URL } from '../constants/app'

const ApiRequest = () => {
	const axinstace = axios.create({
		baseURL: APP_VALUE_URL.API
	})
	// interceptor de respuesta (despues de solicitud)
	axinstace.interceptors.response.use(
		response => response,          // Cualquier código de estado que se encuentre dentro del rango de 2xx hace que esta función se active
		error => Promise.reject(error) // Cualquier código de estado que esté fuera del rango de 2xx hace que esta función se active
	)

	return axinstace
}
export default ApiRequest