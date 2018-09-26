import React from 'react'
import '../App.css'
import swal from 'sweetalert';
import CONFIG from '../Configuracion/Config'
import Select from 'react-select';


class formulario extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
                listas:[],
                listacondicion:[],
                tipo:[],
                condicion:[],
                datosiniciales:[],
                OpcionBeneficio:null,
                OpcionCondicion:null,
                codigo:this.props.codigo,
                programa:this.props.idprograma,
                lf:false
        }

        this.guardar=this.guardar.bind(this)
        this.handleChangeBeneficio=this.handleChangeBeneficio.bind(this)
        this.handleChangeCondicion=this.handleChangeCondicion.bind(this)
    }

    componentWillMount(){

        

        fetch(CONFIG+'/beneficio/tipo')
        .then((response)=>{
            return response.json()
        }).then((listas)=>{
            console.log("listas");
            console.log(listas);
            var array=[];

            for(var i=0;i<listas.length;i++){
                var e={value:listas[i].tipo,label:listas[i].tipo}
                array.push(e);
            
            }

            this.setState({
                tipo:array,
                listas:listas
            });
        })
        .catch(error=>{
            console.error(error)
        });

        fetch(CONFIG+'/beneficio/condicion')
        .then((response)=>{
            return response.json()
        }).then((condicion)=>{
            console.log("condicion");
            console.log(condicion);
            var array2=[];

            for(var i=0;i<condicion.length;i++){
                var e={value:condicion[i].condicion,label:condicion[i].condicion}
                array2.push(e);
            
            }

            this.setState({
                condicion:array2,
                listacondicion:condicion
            });
        })
        .catch(error=>{
            console.error(error)
        });
        
    
        



    }
    componentDidMount(){

        fetch(CONFIG+'/beneficio/listar/' + this.state.codigo)
        .then((response)=>{
            return response.json()
        }).then((datos)=>{
            if(datos.cod_alumno!=null){

                document.getElementById("resolucion").value=datos.resolucion;
                document.getElementById("autorizacion").value=datos.autorizacion;
                document.getElementById("observacion").value=datos.observacion;
                document.getElementById("beneficio").value=datos.benef_otrogado;
                document.getElementById("importemaximo").value=datos.benef_max;
                document.getElementById("fecha").value=datos.fecha;
                this.setState({
                    OpcionBeneficio:{value:datos.tipo,label:datos.tipo},
                    OpcionCondicion:{value:datos.condicion,label:datos.condicion}
                })
                console.log("opcion");
                console.log(this.state.OpcionBeneficio);
                
            }
            else{
                this.state.OpcionBeneficio="xddd";
                // document.getElementById("resolucion").value="xddd";
                swal("xdd","","warning");
               
                
            }
    

          
        })
        .catch(error=>{
            console.error(error)
        });

       
        

    }


    handleChangeBeneficio =(Opcion)=>{
        this.setState({OpcionBeneficio:Opcion});
        console.log("Opcion elegida : ",Opcion);

        for(let i=0;i<this.state.listas.length;i++){
            if(this.state.listas[i].tipo==Opcion.value){
                document.getElementById("resolucion").value=this.state.listas[i].resolucion;
                document.getElementById("importemaximo").value=this.state.listas[i].beneficio_max;
            }
        }
        

        // if(Opcion.value=="DOCENTE UNMSM"){
        //     document.getElementById("autorizacion").value="xddd"
        // }
        // else{
        //     document.getElementById("autorizacion").value="no hay wee"
        // }
    }
    handleChangeCondicion=(Opcion)=>{
        this.setState({OpcionCondicion:Opcion});
        console.log("Opcion elegida : ",Opcion);

    }

    habilitar(){
        document.getElementById("beneficio").disabled=false;
        document.getElementById("autorizacion").disabled=false;
        document.getElementById("fecha").disabled=false;
        document.getElementById("observacion").disabled=false;
        
    }

    guardar(){
        var id_tipo="";
        var id_tcondicion="";
        for(let i=0; i<this.state.listas.length;i++){
            if(this.state.OpcionBeneficio.value==this.state.listas[i].tipo){
                id_tipo=i;
            }
        }
        for(let i=0; i<this.state.listacondicion.length;i++){
            if(this.state.OpcionCondicion.value==this.state.listacondicion[i].condicion){
                id_tcondicion=i;
            }
        }
        var Observacion=document.getElementById("observacion").value;
        var valor=document.getElementById("beneficio").value;
        var Autorizacion=document.getElementById("autorizacion").value;
        var fecha=document.getElementById("fecha").value.replace(/^(\d{2})[-\/](\d{2})[-\/](\d{4})$/g,'$3-$2-$1');
        // console.log("xdddd");
        // console.log(id_tipo);
        // console.log(id_tbeneficio);
        // console.log(Observacion);
        // console.log(valor);
        // console.log(Autorizacion);
        // console.log(fecha);
    


       if(valor!="" && fecha!=""){
       fetch(CONFIG+"beneficio/insertar", // "http://localhost:8080/" 
        {
        headers: {
        'Content-Type': 'application/json'
        },
        method: "POST",
            body: JSON.stringify(
            {
                "beneficio_otorgado":valor,
                "id_bcondicion": id_tcondicion,
                "autorizacion":Autorizacion,
                "fecha":fecha,
                "observacion":Observacion,
                "id_beneficio":id_tipo,
                "cod_alumno":this.props.codigo,
                "id_programa":this.props.idprograma
            }
        
        )
        })

        .then((resp) => {
            console.log(resp)
            console.log(this.state.lf);
            if(resp){
               
                console.log("funciona beneficio");
                console.log(this.state.lf);
            }
            else{
                swal("Oops, Algo salió mal!!", "","error");
            }
        
        
        })
        .catch(error => {
        
        swal("Oops, Algo salió mal!!", "","error")
        console.error(error)
        });
        console.log(this.state.lf+" ko")
    }else{ swal("Tiene que completar todos los campos", "","warning")}
    }

    render(){
        console.log("wewewexd");
        console.log(this.state.datosiniciales);
        //console.log(this.props.codigo)
        //console.log(this.props.idprograma)
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
                            <div className="col-md-4"><h6 >Beneficio:</h6></div>
                            {/* <div className="col-md-12"><input type="text" id="beneficio" placeholder="Beneficios" disabled/></div> */}
                            <div className="col-md-8 ">
                            <Select 
                                value={this.state.OpcionBeneficio}
                                options={this.state.tipo} 
                                onChange={this.handleChangeBeneficio}
                                
                                />
                            </div>
                            <div className="col-md-4">
                            <h6>Importe maximo: </h6>
                            </div>
                            <div className="col-md-2">
                            <input className="form-control estilo" type="text" id="importemaximo" placeholder="" disabled/>
                            </div>
                            <div className="col-md-4">
                            <h6>Valor otorgado: </h6>
                            </div>
                            
                            <div className="col-md-2 ">                            
                            <input className="form-control estilo" type="text" id="beneficio" placeholder="" disabled/>
                            </div>
                            
                            
                        </div>
                        <div className="row sombra">
                            <div className="col-md-4"><h6 >Condicion:</h6></div>
                            {/* <div className="col-md-12"><input type="text" id="condicion" placeholder="Condicion"disabled/></div> */}
                            <div className="col-md-8"> 
                                    <Select 
                                       
                                        className="selectCondicion"
                                        value={this.state.OpcionCondicion}
                                        options={this.state.condicion}
                                        onChange={this.handleChangeCondicion}
                                        
                                        
                                        

                                    />
                            
                            </div>
                        </div>
                        <div className="row sombra">
                        
                            {/* <div className="col-md-3"><h6 >Resolucion:</h6></div> */}
                            <div className="col-md-12"><input type="text" id="resolucion" placeholder="Resolucion"disabled/></div>
                            {/* <div className="col-md-9">
                            <Select/>
                            </div> */}
                            
                        </div>

                        <div className="row sombra">   
                            {/* <div className="col-md-2"><h4 >Autorizacion:</h4></div> */}
                            <div className="col-md-12"><input type="text" id="autorizacion" placeholder="Autorizacion"disabled /></div>
                        </div>
                        <div className="row sombra2">   
                            {/* <div className="col-md-2"><h4 >Autorizacion:</h4></div> */}
                            <div className="col-md-12">
                            {/* <input type="text" id="autorizacion" placeholder="Observacion"disabled /> */}
                            <textarea class="form-control " id="observacion" placeholder="Observaciones..." rows="3"disabled></textarea>
                            </div>
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
