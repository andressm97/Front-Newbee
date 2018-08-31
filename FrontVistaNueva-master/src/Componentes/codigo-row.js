import React from 'react'
import {browserHistory} from 'react-router-3';

class CodigoRow extends React.Component{


    gogo=(e)=>{
      
            browserHistory.push('/'+ this.props.alumno.cod_alumno);
            // console.log("Vista nueva");
            e.preventDefault();
            
    }
    

render(){
    return(
        <tr>
             <td className="td">
            <form action="#">
                <label className="row center-xs color_white">
                <button type="submit" onClick={this.gogo} className="btn btn-primary btn-lg">CONSULTAR</button>
                
                <span></span>
                
                </label>



            </form>

            </td> 
            <td className="td">{this.props.alumno.cod_alumno}</td>
            <td className="td">{this.props.alumno.nombre_alumno}</td>
            <td className="td">{this.props.alumno.nombre_programa}</td>
        
        </tr>
    )
}



}

export default CodigoRow;