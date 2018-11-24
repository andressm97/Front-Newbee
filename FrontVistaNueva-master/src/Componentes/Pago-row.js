import React from 'react'
import CONFIG from '../Configuracion/Config'
import swal from 'sweetalert';
import Select from 'react-select';
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];
class PagoRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: null,
      idconcepto:'',
      array:this.props.datos
    }
}

  componentDidMount(){
    this.setState({
      selectedOption:{value:this.props.pago.concepto,label:this.props.pago.concepto},
      
      idconcepto : this.idconcepto(this.props.pago.concepto)
    
    
    });
      
  }

  idconcepto(valor){
    console.log("xddd4545454");
    let id_concepto="";
    console.log("valor:  "+valor);
    console.log("tamaño " +this.state.array.length)  ;

        for(let i=0; i<this.props.datos.length;i++){
            if(valor==this.props.datos[i].concepto){
                 id_concepto=this.props.datos[i].idConcepto;
                 console.log("el valor" +valor +"es igual a"+this.props.datos[i].concepto);
            }
 
        }
        console.log("el concepto es : "+id_concepto);
        return id_concepto;
  }
  
  componentWillUpdate(){
    console.log("idconcepto : "+this.state.idconcepto);
  }

  handleChange = (selectedOption) => {
    
    this.setState({ selectedOption:selectedOption ,
      idconcepto: this.idconcepto(selectedOption.value)
    });
    console.log(`Option selected:`, selectedOption);
    console.log("idconcepto : "+this.state.idconcepto);
    
  }

  colocar=()=>{
    var hola=document.getElementById(this.props.pago.idRec);
    console.log(hola.id);
    var holas=hola.id;
    this.props.Funciones(holas);
    }

  editarFila=()=>{

    var estadoAlumno;
    estadoAlumno = this.props.pago.estado;

    if(estadoAlumno=="M"){
      var editConcepto;
    editConcepto=this.props.pago.idRec.toString()+this.props.pago.concepto;

    var conceptoEdit = this.props.pago.concepto;

    document.getElementById(editConcepto).value= conceptoEdit;
    document.getElementById(editConcepto).disabled = false;
    document.getElementById(editConcepto).style.background='#F2F2F2';


    var editFecha;
    var fechaEdit = this.props.pago.fecha;
    var anioFecha = fechaEdit.substring(0,4);
      console.log("AÑO");
      console.log(anioFecha);

      var mesFecha = fechaEdit.substring(5,7);
      console.log("MES");
      console.log(mesFecha);
      var diaFecha = fechaEdit.substring(8,10);
      console.log("DIA");
      console.log(diaFecha);

      var fechaVolteada = diaFecha+"-"+mesFecha+"-"+anioFecha;

    editFecha=this.props.pago.idRec.toString()+this.props.pago.idAlum.toString();
    document.getElementById(editFecha).value= fechaVolteada;
    document.getElementById(editFecha).disabled = false;
    document.getElementById(editFecha).style.background='#F2F2F2';


    var editCiclo;
    var num = 250296;
    editCiclo=this.props.pago.idRec.toString()+num.toString();
    var _ciclo_= this.props.pago.ciclo;

    document.getElementById(editCiclo).value = _ciclo_;
    document.getElementById(editCiclo).disabled = false;
    document.getElementById(editCiclo).style.background='#F2F2F2';
    document.getElementById(editCiclo).focus();

    var numRecibo;
    numRecibo=this.props.pago.idRec.toString()+this.props.pago.numero;
    var numReciboEdit;
    numReciboEdit = this.props.pago.numero;
    document.getElementById(numRecibo).value= numReciboEdit;
    document.getElementById(numRecibo).disabled = false;
    document.getElementById(numRecibo).style.background='#F2F2F2';
    console.log(estadoAlumno);
    }
    else{
      //console.log("No tiene permiso para editar");
      //swal("No es posible realizar cambios", "", "info");

      var editCiclo;
    var num = 250296;
    editCiclo=this.props.pago.idRec.toString()+num.toString();

    document.getElementById(editCiclo).disabled = false;
    document.getElementById(editCiclo).style.background='#F2F2F2';
    document.getElementById(editCiclo).focus();
    }

  }


  SeleccionNumeroRecibo=()=>{

    var stringss;
    var prueba;
    stringss=this.props.pago.idRec.toString()+this.props.pago.numero;
    prueba = document.getElementById(stringss).value;

    if(prueba==""){
      prueba = this.props.pago.numero;
    }else{

      return prueba;
    }

    return prueba;

}

SeleccionConcepto=()=>{

  var stringss;
  var prueba;
  stringss=this.props.pago.idRec.toString()+this.props.pago.concepto;
  prueba = document.getElementById(stringss).value;

  if(prueba==""){
    prueba = this.props.pago.concepto;
  }else{

    return prueba;
  }

  return prueba;

}

SeleccionFecha=()=>{

  var stringss;
  var prueba;
  stringss=this.props.pago.idRec.toString()+this.props.pago.idAlum.toString();
  prueba = document.getElementById(stringss).value.replace(/^(\d{2})[-\/](\d{2})[-\/](\d{4})$/g,'$3-$2-$1');
  console.log("cueva ctm")
  console.log(prueba)
  if(prueba==""){
    prueba = this.props.pago.fecha.replace(/^(\d{2})[-\/](\d{2})[-\/](\d{4})$/g,'$3-$2-$1');
  }else{

    return prueba;
  }

  return prueba;

}


SeleccionCiclo=()=>{

  var num = 250296;
  var stringss;
  var prueba;
  stringss=this.props.pago.idRec.toString()+num.toString();
  prueba = document.getElementById(stringss).value;

  if(prueba==""){
    prueba = 0;
  }else{

    return prueba;
  }

  return prueba;

}


editarObservacion=()=>{

      var obs = this.props.pago.observacion;
      console.log("obs: "+obs)
      //var estadoAlumno = this.props.pago.estado;
      var idRecG = "";
      idRecG = this.SeleccionIdRec();

        swal({
          title: "Desea editar la observacion?",
          text: "Observacion: "+obs,
          icon: "warning",
          buttons: true,
          //dangerMode: true,
          closeOnClickOutside:false,
          closeOnEsc: false,
        })
        .then((willDelete) => {
          if (willDelete) {
            swal({
              closeOnClickOutside:false,
              closeOnEsc: false,

              content: {
                element: "input",
                attributes: {
                  value : obs
                },
              },
          })
            .then((value) => {
                    if(value != ''){
                        fetch(CONFIG+'recaudaciones/alumno/concepto/obs/'+value+'/'+idRecG)
                          .then((resp) => {
                              console.log(resp)
                              if(!(resp == true)){
                                  swal("Editado exitoso!","","success").then(function(){ // te descubri abel fake :v
                                      window.location.reload();
                                      }
                                  );
                              }
                              else{
                                   swal("Oops, Algo salió mal!!", "","error").then(function(){ // te descubri abel fake :v
                                      window.location.reload();
                                      }
                                  );
                              }

                          })
                          .catch(error => {
                              swal("Oops, Algo salió mal!!", "","error")
                              console.error(error)
                          });
                    }
                    else{
                        swal("No se hizo ningún cambio","","info");
                    }
           });
          } else {

          }
        });
}


SeleccionIdRec=()=>{

  var stringss;
  var prueba;
  stringss=this.props.pago.idRec.toString();

  if(stringss==""){
    stringss = "null";
  }else{

    return stringss;
  }

  return stringss;

}

SeleccionIdConceptoG=()=>{

  var stringss;

  stringss=this.props.pago.idconcepto;

  if(stringss==null){
    stringss = null;
  }else{

    return stringss;
  }

  return stringss;

}



GuardarFecth=()=>{

  var estadoAlumno;
  estadoAlumno = this.props.pago.estado;

  if(estadoAlumno=="M"){
    var cicloG = "";
        cicloG = this.SeleccionCiclo();

        var conceptoG = "";
        conceptoG = this.SeleccionConcepto();

        var numeroReciboG = "";
        numeroReciboG = this.SeleccionNumeroRecibo();

        var fechaG = "";
        fechaG = this.SeleccionFecha();

        var idRecG = "";
        idRecG = this.SeleccionIdRec();

        var idConceptoG = "";
        idConceptoG = this.SeleccionIdConceptoG();

        //http://localhost:8080/recaudaciones/alumno/concepto      CONFIG+'recaudaciones/alumno/concepto/listar/filtrar'
        fetch(CONFIG+"recaudaciones/alumno/concepto/actualizar",
        {
        headers: {
        'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(
        {
            "idRec": idRecG,
            "ciclo": cicloG,
            "concepto": conceptoG,
            "recibo": numeroReciboG,
            "fecha": fechaG,
            "id_concepto": idConceptoG
        }

        )
    })
    .then((response) => {
    return response.json()
    })
    .then((resp) => {console.log(resp);
    if(resp == true){
        swal("Editado exitoso!","","success",).then(function(){
            window.location.reload();
            }
        );
    }else{
        swal("Oops, el editado no se concreto","","info");
    }

    })
    .catch(error => {

    swal("Oops, Algo salió mal!!", "","error")
    console.error(error)
    });
  }else{
    console.log("No tiene permiso para guargar")
    swal("No es posible realizar cambios", "", "info");
  }



}

  render() {
    return(
    <tr>
      <td className="td">
        <form action="#">
          <label className="row center-xs color_white">
            <input
              onClick={this.colocar}
              className="checkbox1"
              id={this.props.pago.idRec}
              type="checkbox" />
              <span> </span>
              </label>
        </form>
     </td>

      <td className="td">
        {this.props.numero+1}
      </td>

      <td className="td">
        <form action="#">
          <label className="row center-xs color_white">
            <input
              id={this.props.pago.idRec.toString()+"250296"}
              placeholder = {this.props.pago.ciclo}
              disabled = "true"
              type="text" />
              <span> </span>
          </label>
        </form>
      </td>

      <td className="td">
        {/* <form action="#">
          <label className="row center-xs color_white">
            <input
              placeholder={this.props.pago.concepto}
              id={this.props.pago.idRec.toString()+this.props.pago.concepto}
              disabled = "true"
              type="text" />
              <span> </span>
          </label>
          
        </form> */}
          <Select

            value={this.state.selectedOption}
            onChange={this.handleChange}
            options={this.props.conceptos}

            />
      </td>

      <td className="td">

      <form action="#">
          <label className="row center-xs color_white">
            <input
              name={this.props.pago.idRec.toString()+this.props.pago.numero}
              placeholder= {this.props.pago.numero}
              id={this.props.pago.idRec.toString()+this.props.pago.numero}
              disabled = "true"
              type="text" />
              <span> </span>
          </label>
        </form>
      </td>

      <td className="td">{this.props.pago.nombre}</td>

      <td className="td">
        <form action="#">
          <label className="row center-xs color_white">
            <input
              name={this.props.pago.idRec.toString()+this.props.pago.idAlum.toString()}
              placeholder={this.props.pago.fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3-$2-$1')}
              id={this.props.pago.idRec.toString()+this.props.pago.idAlum.toString()}
              disabled = "true"
              type="text" />
              <span> </span>
          </label>
        </form>
      </td>

      <td className="td">
        {/* {this.props.pago.moneda} */}
        <Select

          value={this.state.selectedOption}
          onChange={this.handleChange}
          options={options}




          />
      </td>
      <td className="td">{'S/. '+this.props.pago.importe}</td>

      <td className="td">
        <button
          onClick={this.editarObservacion}
          className="waves-effect waves-light btn-small">
          <i className="large material-icons center">search</i>
        </button>
      </td>


      <td className="td">
            <button
              onClick={this.editarFila}
              className="waves-effect waves-light btn-small">
                <i className="large material-icons center">edit</i>
            </button>
      </td>
      <td className="td">
            <button
              onClick={this.GuardarFecth}
              className="waves-effect waves-light btn-small">
                <i className="large material-icons center">save</i>
            </button>
      </td>
	  </tr>
    )
  }
}

export default PagoRow;
