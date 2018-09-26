import React from 'react'
import '../App.css'
import swal from 'sweetalert';
import CONFIG from '../Configuracion/Config'
import Select from 'react-select';
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

class formulario extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
                listas:[],
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

        fetch(CONFIG+'/beneficio/listar/' + this.state.codigo)
        .then((response)=>{
            return response.json()
        }).then((datos)=>{
            console.log("xddddddd");
            console.log(datos);

            this.setState({
                datosiniciales:datos
            });
        })
        .catch(error=>{
            console.error(error)
        });

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
                condicion:array2
            });
        })
        .catch(error=>{
            console.error(error)
        });
        
    
        



    }
    componentDidMount(){

    
        if(this.state.datosiniciales.cod_alumno!=null){

            document.getElementById("resolucion").value=this.state.datosiniciales.resolucion;
            document.getElementById("autorizacion").value=this.state.datosiniciales.autorizacion;
            document.getElementById("observacion").value=this.state.datosiniciales.observacion;
            

            
        }
        else{

            // document.getElementById("resolucion").value="xddd";
            swal("xdd","","warning");
            //this.state.OpcionSeleccionada="xdddddd";
        }


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
        //document.getElementById("condicion").disabled=false;
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
        console.log("guardado");
         console.log(Beneficio+" "+Condicion+" "+Resolucion+" ");
        // var codigo=this.props.codigo;
        // var programa=this.props.idprograma;

       console.log(Beneficio+" "+Condicion+" "+Resolucion+" "+Autorizacion+" "+Fecha); 

       if(Beneficio!="" && Condicion!=""&& Resolucion!="" && Autorizacion!="" && Fecha!=""){
       fetch(CONFIG+"beneficio/insertar_b", // "http://localhost:8080/" 
        {
        headers: {
        'Content-Type': 'application/json'
        },
        method: "POST",
            body: JSON.stringify(
            {
                "beneficio": Beneficio,
                "condicion": Condicion,
                "resolucion":Resolucion,
                "autorizacion":Autorizacion,
                "fecha":Fecha,
            }
        
        )
        })

        .then((resp) => {
            console.log(resp)
            console.log(this.state.lf);
            if(resp){
                fetch( CONFIG+"beneficio/insertar_ab", // "http://localhost:8080/"
                {
                headers: {
                'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(
                    {
                        "cod_alumno": this.state.codigo,
                        "id_programa":this.state.programa,
                    }
                  )
                })
        
                .then((resp_) => {
        
                    if(resp_){
                        
                        swal("Guardado Exitoso!!", "","success")
                        
                    }
                    else{
                        swal("Oops, Algo salió mal!!", "","error");
                    }
                
                
                })
                .catch(error => {
                
                swal("Oops, Algo salió mal!!", "","error")
                console.error(error)
                });
               
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
        console.log("tipooooo");
    console.log(this.state.listas);
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
                            <textarea class="form-control " id="observacion" placeholder="Observaciones..." rows="3"></textarea>
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
