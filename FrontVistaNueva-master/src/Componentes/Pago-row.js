import React from 'react'
import CONFIG from '../Configuracion/Config'
import swal from 'sweetalert';

class PagoRow extends React.Component {
  
  colocar=()=>{
    var hola=document.getElementById(this.props.pago.idRec);
    console.log(hola.id);
    var holas=hola.id;
    this.props.Funciones(holas);
    }
  
  editarFila=()=>{

    var editConcepto;
    editConcepto=this.props.pago.idRec.toString()+this.props.pago.concepto;
    
    var conceptoEdit = this.props.pago.concepto;
   
    document.getElementById(editConcepto).value= conceptoEdit;
    document.getElementById(editConcepto).disabled = false;
    document.getElementById(editConcepto).style.background='#F2F2F2';
    

    var editFecha;
    var fechaEdit = this.props.pago.fecha;
    editFecha=this.props.pago.idRec.toString()+this.props.pago.idAlum.toString();
    document.getElementById(editFecha).value= fechaEdit;
    document.getElementById(editFecha).disabled = false;
    document.getElementById(editFecha).style.background='#F2F2F2';

    var editCiclo;
    var num = 250296;
    editCiclo=this.props.pago.idRec.toString()+num.toString();
    
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
  prueba = document.getElementById(stringss).value;
  
  if(prueba==""){
    prueba = this.props.pago.fecha;
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
    prueba = "null";
  }else{
   
    return prueba;
  }
 
  return prueba;

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
            "numero": numeroReciboG,
            "fecha": fechaG,
            "idconcepto": idConceptoG
        }
        
        )
    })
    .then((response) => {
    return response.json()
    })
    .then((resp) => {
    if(resp == true){
      
    swal("Editado exitoso!","","success");
    }else{
        swal("Oops","","info");
    }
    
    })
    .catch(error => {
    
    swal("Oops, Algo salió mal!!", "","error")
    console.error(error)
    });

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
        
      </td>

      <td className="td">
        <form action="#">
          <label className="row center-xs color_white">
            <input
              id={this.props.pago.idRec.toString()+"250296"}
              disabled = "true"
              type="text" />
              <span> </span>
          </label>
        </form>
      </td>

      <td className="td">{this.props.pago.apeNom}</td>

      <td className="td">
        <form action="#">
          <label className="row center-xs color_white">
            <input
              placeholder={this.props.pago.concepto}
              id={this.props.pago.idRec.toString()+this.props.pago.concepto}
              disabled = "true"
              type="text" />
              <span> </span>
          </label>
        </form>
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

      <td className="td">{this.props.pago.moneda}</td>
      <td className="td">{'S/. '+this.props.pago.importe}</td>
      <td className="td">{this.props.pago.observacion}</td>
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