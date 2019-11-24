import React from "react";
// @material-ui/core components
import Edit from "@material-ui/icons/Edit";
import Table from "@material-ui/core/Table";
import Close from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";

import { defaultFont, grayColor, primaryColor } from "assets/jss/material-dashboard-react.js";
import tooltipStyle from "assets/jss/material-dashboard-react/tooltipStyle";
import { ProductCommand } from "components/Model/Command";

const API_URL = "https://localhost:44358/api/";

export default class Tasks extends React.Component {
  
  constructor(props)
  {
    super(props);
    this.state = {
      command: null
    };
  }

  getProduct()
  {
    let idTable = this.getIdTable();

    return fetch(API_URL + 'commands/table/' + idTable)
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({command: responseJson});
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  componentWillMount() {
    this.getProduct();
  }
  
  getIdTable() {
    let idTable = null;
    const paths = window.location.pathname.split("/");
    if(paths && paths.length === 4){
      idTable = window.location.pathname.split("/")[3];
    }
    return idTable;
  }

  removeProduct(idProduct) {

    
    if(this.state.command.products.length > 0){
      for (let index = 0; index < this.state.command.products.length; index++) {
        const product = this.state.command.products[index];
        if(product && product.id && product.id === idProduct) {
          this.state.command.products.splice(index, 1);
        }
      }
    }
    
    return fetch(API_URL + 'commands', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.command)
    })
    .then((response) => response.json())
    .then((responseJson) => {
       window.location.reload();
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render()
  {

  let idTable = this.getIdTable();

  return (
      <Table style={{ marginBottom: "0", overflow: "visible"}}>
        <TableBody>
          {this.props.tasksIndexes.map(value => (
            <TableRow key={value} style={{  position: "relative", borderBottom: "1px solid " + grayColor[5]}}>
              <TableCell style={{ ...defaultFont, padding: "8px", verticalAlign: "middle", border: "none", lineHeight: "1.42857143", fontSize: "14px" }}>
                {this.props.tasks[value].name}
                </TableCell>
              <TableCell style={{ ...defaultFont, padding: "8px", verticalAlign: "middle", border: "none", lineHeight: "1.42857143", fontSize: "14px" }}>
                {this.props.tasks[value].price}
                </TableCell>
              <TableCell style={{float: "right", display: "flex", border: "none", padding: "12px 8px !important",verticalAlign: "middle"}}>
                <Tooltip
                  id="tooltip-top"
                  title="Edit Product"
                  placement="top"
                  classes={{ tooltip: JSON.stringify(tooltipStyle) }}
                >
                  <IconButton
                    href={`/admin/product/table/${idTable}/${this.props.tasks[value].id}`}
                    aria-label="Edit"
                    style={{ width: "27px", height: "27px", padding: "0" }}
                  >
                    <Edit style={{ width: "17px", height: "17px", padding: "0", backgroundColor: "transparent", color: primaryColor[0], boxShadow: "none" }} />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  id="tooltip-top-start"
                  title="Remove product"
                  placement="top"
                  classes={{ tooltip: JSON.stringify(tooltipStyle) }}
                  >
                  <IconButton
                    aria-label="Close"
                    onClick={() => this.removeProduct(this.props.tasks[value].id)}
                    style={{ width: "27px", height: "27px", padding: "0" }}
                  >
                    <Close style={{ width: "17px", height: "17px", padding: "0", backgroundColor: "transparent", color: primaryColor[0], boxShadow: "none" }} />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}
