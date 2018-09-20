import React from 'react'
import '../App.css'
import swal from 'sweetalert';
import CONFIG from '../Configuracion/Config'
class formulario extends React.Component{

    habilitar(){
        document.getElementById("beneficio").disabled=false;
        document.getElementById("condicion").disabled=false;
        document.getElementById("resolucion").disabled=false;
        document.getElementById("autorizacion").disabled=false;
        document.getElementById("fecha").disabled=false;


    }

    guardar(){
        var Beneficio=document.getElementById("beneficio").value;
        var Condicion=document.getElementById("condicion").value;
        var Resolucion=document.getElementById("resolucion").value;
        var Autorizacion=document.getElementById("autorizacion").value;
        var Fecha=document.getElementById("fecha").value;


       console.log(Beneficio+" "+Condicion+" "+Resolucion+" "+Autorizacion+" "+Fecha); 
        
       fetch(CONFIG+"",
        {
        headers: {
        'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(
        {
            "": Beneficio,
            "": Condicion,
            "":Resolucion,
            "":Autorizacion,
            "":Fecha
        }
        
        )
    })
    .then((resp) => {

        if(resp){
            swal("Editado exitoso!","","success");
        }
        else{
            swal("Oops, Algo salió mal!!", "","error");
        }
    
    
    })
    .catch(error => {
    
    swal("Oops, Algo salió mal!!", "","error")
    console.error(error)
    });


    }

    render(){
        return(
            <div>
                {/* <div >
                    <h3>Formulario
                    <ul id="nav-mobile" className="row right hide-on-med-and-down">
                        <li><a className="col seleccionar">Regresar</a></li>
                    </ul>
                    </h3>
                </div> */}
                    
                <div className="container" >

                    
                    
                        <div className="row ">
                            <div className="col-md-12"><h4 >Datos del beneficio</h4></div>   
                        </div>


                        <div className="row sombra">
                            {/* <div className="col-md-2"><h4 >Beneficio:</h4></div> */}
                            <div className="col-md-12"><input type="text" id="beneficio" placeholder="Beneficios" disabled/></div>
                        </div>
                        <div className="row sombra">
                            {/* <div className="col-md-2"><h4 >Condicion:</h4></div> */}
                            <div className="col-md-12"><input type="text" id="condicion" placeholder="Condicion"disabled/></div>
                        </div>
                        <div className="row sombra">
                        
                            {/* <div className="col-md-2"><h4 >Resolucion:</h4></div> */}
                            <div className="col-md-12"><input type="text" id="resolucion" placeholder="Resolucion"disabled/></div>
                        </div>

                        <div className="row sombra">   
                            {/* <div className="col-md-2"><h4 >Autorizacion:</h4></div> */}
                            <div className="col-md-12"><input type="text" id="autorizacion" placeholder="Autorizacion"disabled /></div>
                        </div>
                        <div className="row sombra">   
                            {/* <div className="col-md-2"><h4 >Fecha:</h4></div> */}
                            <div className="col-md-6"><input type="date" id="fecha" placeholder="Fecha"disabled/></div>
                        </div>
                        <div className="row">
                               
                                <div className=" col-md-6">
                                    <button  onClick={this.habilitar} className="  waves-effect waves-light btn-large botonazul2  " type="submit">Editar<i className=" material-icons left">check</i></button>    
                                </div>
                                <div className=" col-md-6">
                                    <button  onClick={this.guardar} className="  waves-effect waves-light btn-large botonazul2  " type="submit">Guardar<i className=" material-icons left">save</i></button>    
                                </div>
                            
                            
                        </div>
                      
                    

                
                </div>
                

            </div>
        )
    }

}

export default formulario
