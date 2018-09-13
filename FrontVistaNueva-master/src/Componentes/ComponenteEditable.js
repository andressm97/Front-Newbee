import React from 'react'
import TableHeader from './Table-Header'
import EditableList from './EditableList'
import swal from 'sweetalert';
import CONFIG from '../Configuracion/Config'

class ComponenteEditable extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props.listado)
        this.state={
            listadopagos : this.props.listado,
            total : []
            
        }
        
        for(let j=0;j<this.state.listadopagos.length;j++){
            if(this.state.listadopagos[j].check==true){
                this.state.total.push(this.state.listadopagos[j]); 
            }
        }

        this.editarFecha = this.editarFecha.bind(this);
        this.guardarFecha = this.guardarFecha.bind(this);
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
                    <TableHeader />
                    <EditableList  listado={this.state.total} />
                </div>
            </div>  
            </div>  
        )
      }

      editarFecha(){
        var primero;

        for(let i=0;i<this.state.total.length;i++){
          primero = this.state.total[i].idRec.toString()+this.state.total[i].idAlum.toString();
          document.getElementById(primero).disabled = false;
        } 
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
            fetch("http://localhost:8080/recaudaciones/alumno/concepto/actualizar",
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
        if(resp){
            
        console.log("resp: "+resp);
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
          console.log(this.state.total[i].idRec)
          document.getElementById(primero).disabled = true; 
        }
     
    }


    SeleccionFechitasArreglos(){
    
        var new_fechas = [];
        var stringss;
        for(var i=0;i<this.state.total.length;i++){
        stringss =  document.getElementById(this.state.total[i].idRec.toString()+this.state.total[i].idAlum.toString()).value
        if(stringss==""){
            new_fechas.push(this.state.total[i].fecha.toString());
        }else{
         /*   var a = document.getElementById(this.state.total[i].idRec.toString()+this.state.total[i].idAlum.toString()).value;
            console.log(a);
            a = document.getElementById(this.state.total[i].idRec.toString()+this.state.total[i].idAlum.toString()).value.replace(/^(\d{2})[-\/](\d{2})[-||\/](\d{4})$/g,'$3-$2-$1');
            console.log(a);*/
            new_fechas.push(document.getElementById(this.state.total[i].idRec.toString()+this.state.total[i].idAlum.toString()).value.replace(/^(\d{2})[-\/](\d{2})[-\/](\d{4})$/g,'$3-$2-$1'));
        }
    
        }
    
        return new_fechas;
    
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