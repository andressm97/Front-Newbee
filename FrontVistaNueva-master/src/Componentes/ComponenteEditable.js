import React from 'react'
import TableHeaderEditable from './Table-Header-Editable'
import EditableList from './EditableList'

class ComponenteEditable extends React.Component{

    

    render() { 
        return (
            <div className="">
                  <h3>Imprimir la wea
                  <ul id="nav-mobile" className="right  hide-on-med-and-down">
                  <li ><a className="seleccionar" onClick={this.Regresar} >Regresar<i className="material-icons right">reply</i></a></li>
              </ul>
                  </h3>
                
              <hr />
      
            <div className="row center-xs centrar">
                <div className="center-xs-12 margin_top ">
                    <TableHeaderEditable />
                    <EditableList  listado={this.props.listado} />
                </div>
            </div>
              <footer>
                <div className="row center-xs centrar color">
                Realizado por Newbee ft. Hardcode © 2018 
                </div>
                </footer>
      
            </div>
          )
      }

}

export default ComponenteEditable;