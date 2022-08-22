import React, { useState, useEffect } from 'react' 
import '../../../assets/style/tarjetas.css'
import ApiRequest from '../../../helpers/axiosInstances'
import {Button} from '@mui/material'
import { APP_VALUE_URL } from '../../../constants/app'
import Page from '../../common/Page'

const UnaTarjetas = (props) => {
    //const [mensaje, setMensaje] = useState({ ident: null, message: null, type: null })
	const [datos, setDatos] = useState([])

    var reservados = 0
	var libres = 0
	var total = 0
	var porreservados = 0
	var porlibres = 0
    var proyecto = props.proyecto

    const init = async () => {
		

		/* Para la lista */
		const { data } = await ApiRequest().get('/' + proyecto)

		/* Para las línea */
		reservados = data.resevados
		total = data.total
		libres = total - reservados
		porreservados = Math.trunc(reservados* 100 /total)
	 	porlibres = 100 - porreservados

		setDatos({total, reservados, libres, porreservados, porlibres})
		
	}

	useEffect(init, [])



     const miimagen = {
         backgroundImage:'url(../src/assets/'+ props.proyecto +'.jpg)',
         backgroundSize: 'cover'
    }


    return (
        <Page title="APP | Proyecto">
        <a href={'/'+ props.proyecto} className='boton_entrar_tarjeta'>
        <div className='contenedor_tarjeta' style={{
            backgroundImage:'url(../src/assets/'+ props.proyecto +'.jpg)',
            backgroundSize: 'cover'}}>
            {/* <img className='imagen_tarjeta' src={'../src/assets/'+ props.proyecto +'.jpg'} alt="foto del proyecto" /> */}
            <div className='contenedor_text_tarjeta'>
                {/* <p className='descripcion_tarjeta'>Proyecto en Madrid - España</p>
                <p className='id_tarjeta'>ID: {props.ids}</p> */}
                {/* {isLoading ? <LinearProgress color='secondary' /> : null} */}
                {/* <Button fullWidth onClick={handleProy(props.proyecto)} className='boton_entrar_tarjeta'>Entrar</Button>   */}
                <div className='finaltarjeta'>
                    <div><p className='nombre_tarjeta'>{props.proyecto}</p></div>

                   {/* <div className={"c100 p"+datos.porreservados+" center"}>
                        <span>{datos.porreservados}%</span>
                         <div className="slice">
                            <div className="bar"></div>
                            <div className="fill"></div>
                        </div> 
                    </div>
                    */}
                    <div className='medidaporcentaje'>
                        <label for="file">{datos.reservados}/{datos.total} vendidos</label>
                        <progress id="file" value={datos.porreservados} max="100"> {datos.porreservados}% </progress>
                    </div>
                </div>
            </div>
        </div>
        </a>
        </Page>				
    );
}

export default UnaTarjetas;