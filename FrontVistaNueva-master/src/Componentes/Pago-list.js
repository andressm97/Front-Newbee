import React from 'react'
import PagoRow from './Pago-row'
import CONFIG from '../Configuracion/Config'
class PagoList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      concepto:[],
      datos:[]
    }
  }

  componentDidMount(){

   
  }


  render() { 
    console.log("CONCEPTOS XD");
    console.log(this.state.concepto)
    console.log("listas");
    console.log(this.state.datos)
    return (
        <tbody>
          {
            this.props.listado.map((pago,key) => {
              return <PagoRow Funciones={this.props.funcion} key={pago.idRec} numero={key}
                                  pago={pago} conceptos={this.props.conceptos} datos={this.props.datos}/>
            })
          }
        </tbody>
    )
  }
}

export default PagoList