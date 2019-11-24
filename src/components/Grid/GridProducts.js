import React from "react";

import { makeStyles } from "@material-ui/core/styles";


import Card from "components/Card/Card.js";
import Tasks from "components/Tasks/Tasks.js";
import GridItem from "components/Grid/GridItem.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const API_URL = "https://localhost:44358/api/";


export default class GridProducts extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
      command: null
    };
  }
  
  getIdTable() {
    let idTable = null;
    const paths = window.location.pathname.split("/");
    if(paths && paths.length === 4){
      idTable = window.location.pathname.split("/")[3];
    }
    return idTable;
  }

  componentDidMount()
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
    this.componentDidMount();
  }

  getProducts() {
    let array = [];
    this.state.command.products.forEach((element, key) => {
      array.push(key)
    });
    return array;
  }

  render()
  {

    let idTable = this.getIdTable();

    if(!this.state.command || (this.state.command && this.state.command.products.length == 0)) {
      return (
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <div style={{ float: "left"}}>
                <h4 className={useStyles.cardTitleWhite}>Products</h4>
                <p className={useStyles.cardCategoryWhite}>
                Add or remove a command product
                </p>
              </div>
              <div style={{ float: "right"}}>
                <Button type="button" color="success" href={`/admin/product/table/${idTable}`}>Add Product</Button>
              </div>
            </CardHeader>
            <CardBody>
             <h3>Product list is empty.</h3>
          </CardBody>
          </Card>
       </GridItem>
      );
    }

    return (
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <div style={{ float: "left"}}>
              <h4 className={useStyles.cardTitleWhite}>Products</h4>
              <p className={useStyles.cardCategoryWhite}>
              Add or remove a command product
              </p>
            </div>
            <div style={{ float: "right"}}>
              <Button type="button" color="success" href={`/admin/product/table/${idTable}`}>Add Product</Button>
            </div>
          </CardHeader>
          <CardBody>
            <Tasks
              tasksIndexes={this.getProducts()}
              tasks={this.state.command.products}
            />
          </CardBody>
        </Card>
    </GridItem>
    );
  }
}

