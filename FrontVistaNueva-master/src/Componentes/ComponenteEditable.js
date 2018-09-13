import React from 'react'
import TableHeaderEditable from './Table-Header-Editable'
import EditableList from './EditableList'
import Imprimir from './Imprimir';
import swal from 'sweetalert';
import CONFIG from '../Configuracion/Config'


class ComponenteEditable extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props.listado)
        console.log(this.props.alumno)
        console.log(this.props.conceptos)
        this.state={
            listadopagos : this.props.listado,
            total : [],
            totalnuevo:[]
            
        }
        
        for(let j=0;j<this.state.listadopagos.length;j++){
            if(this.state.listadopagos[j].check==true){
                this.state.total.push(this.state.listadopagos[j]); 
            }
            
        }
        
        this.editarFecha = this.editarFecha.bind(this);
        this.guardarFecha = this.guardarFecha.bind(this);
    }

    guardarFecha(){
     
        var idRecaudaciones = [];
        idRecaudaciones = this.SeleccionRecaudaciones();
    /*
        var observ = [];
        observ = this.SeleccionObsercv();
    */
        var fechitasArreglos = [];
        fechitasArreglos = this.SeleccionFechitasArreglos();

        //http://localhost:8080/recaudaciones/alumno/concepto      CONFIG+'recaudaciones/alumno/concepto/listar/filtrar'                  
        fetch(CONFIG+"recaudaciones/alumno/concepto/actualizar",
        {
        headers: {
        'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(
        {
            "idRec": idRecaudaciones,
            "fecha": fechitasArreglos,
     //       "observacion": observ
        }
        
        )
    })
    .then((response) => {
    return response.json()
    })
    .then((resp) => {
    if(resp.length > 0){
        this.setState({
            totalnuevo: resp,
          }
        );     
        for(let y = 0;y<this.state.totalnuevo.length;y++){
            this.state.totalnuevo[y].fecha = this.formateador(this.state.totalnuevo[y].fecha)
        }
        console.log(this.state.totalnuevo);
        //console.log(cadena.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3-$2-$1') + "xd")
        //console.log(this.state.totalnuevo[0].fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3-$2-$1'));//);
    swal("Editado exitoso!","","success");
    }else{
        swal("Oops","","info");
    }
    
    })
    .catch(error => {
    
    swal("Oops, Algo salió mal!!", "","error")
    console.error(error)
    });
        
        
        
    
    var primero;
    for(let i=0;i<this.state.total.length;i++){
      primero = this.state.total[i].idRec.toString()+this.state.total[i].idAlum.toString();
      document.getElementById(primero).style.background='#FFFFFF';
      document.getElementById(primero).disabled = true;
    }
 
}

formateador(milis){
        var cadena = "";
        var d = new Date(milis),
         month = '' + (d.getMonth() + 1),
         day = '' + d.getDate(),
         year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return  cadena = year+"-"+month+"-"+day;
}

SeleccionFechitasArreglos(){

    var new_fechas = [];
    var stringss;
    for(var i=0;i<this.state.total.length;i++){
    stringss =  document.getElementById(this.state.total[i].idRec.toString()+this.state.total[i].idAlum.toString()).value
    if(stringss==""){
        new_fechas.push(this.state.total[i].fecha.toString());
    }
    else
    {
        new_fechas.push(document.getElementById(this.state.total[i].idRec.toString()+this.state.total[i].idAlum.toString()).value.replace(/^(\d{2})[-\/](\d{2})[-\/](\d{4})$/g,'$3-$2-$1'));
    }

    }

    return new_fechas;

}
    

    render() { 
        return (

           <div>
                <div className="margenFECHA">
                    <button onClick={this.editarFecha} className="waves-effect waves-light btn-small botonazul2 start">
                    <i className="large material-icons">border_color</i>
                    </button>
                </div> 
                <div className="margenFECHA2">
                    <button onClick={this.guardarFecha} className="waves-effect waves-light btn-small botonazul2 start">
                    <i className="large material-icons">save</i>
                    </button>
                </div>
                 <div className="row center-xs centrar">
                    <div className="center-xs-12 margin_top ">
                        <TableHeaderEditable/>
                        <EditableList  listado={this.state.total} />
                    </div>
                </div>  
                <div className="col-md-6">
                  <Imprimir onClick={this.enviar} listado={this.state.totalnuevo} conceptos={this.props.conceptos} alumno={this.props.alumno}/> 
                </div>
            </div>  
        )
      }

      editarFecha(){
        var primero;

        for(let i=0;i<this.state.total.length;i++){
          primero = this.state.total[i].idRec.toString()+this.state.total[i].idAlum.toString();
          document.getElementById(primero).disabled = false;
          document.getElementById(primero).style.background='#F2F2F2';

          if(i==0){
            document.getElementById(primero).disabled = false;
            document.getElementById(primero).focus();
           
          }
          else{
            document.getElementById(primero).disabled = false;
          }
        } 
      }
      
        SeleccionRecaudaciones(){
    
        var new_recaudaciones = [];
        
        for(var i=0;i<this.state.total.length;i++){
        
        new_recaudaciones.push(this.state.total[i].idRec.toString());
        
        }
    
        return new_recaudaciones;
    
    }
    
      
      
      
           
          
}



export default ComponenteEditable;