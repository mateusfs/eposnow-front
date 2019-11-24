import React from "react";

import Icon from "@material-ui/core/Icon";
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Accessibility from "@material-ui/icons/Accessibility";

import Card from "components/Card/Card.js";
import CardIcon from "components/Card/CardIcon.js";
import GridItem from "components/Grid/GridItem.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import GridProducts from "components/Grid/GridProducts.js";
import GridContainer from "components/Grid/GridContainer.js";

import { grayColor } from "assets/jss/material-dashboard-react.js";
import { Command } from "components/Model/Command";

const API_URL = "https://localhost:44358/api/";

export default class GridTable extends React.Component {

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

  openCommand() {
    let idTable = this.getIdTable();

    let command = this.state.command;
    
    if(command == null) {
      command = new Command();
    }

    command.status = 1;
    command.table.id = idTable;
    command.table.name = "Table " + idTable;

    return fetch(API_URL + 'commands', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(command)
    })
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({command: responseJson});
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  closedCommand() {
    let idTable = this.getIdTable();
    let command = this.state.command;
    if(command == null) {
      command = new Command();
    }
    command.status = 2;
    return fetch(API_URL + 'commands', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(command)
    })
    .then((response) => response.json())
    .then((responseJson) => {
        window.location.href = `/admin/table/` + idTable;        
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  concludeCommand() {
    let command = this.state.command;
    command.status = 0;
    command.products = [];

    return fetch(API_URL + 'commands', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(command)
    })
    .then((response) => response.json())
    .then((responseJson) => {
        window.location.href = `/admin/dashboard`;        
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  getPrice() {
    
    let price = 0;

    for (let index = 0; index < this.state.command.products.length; index++) {
      const product = this.state.command.products[index];
      price = parseInt(price) + parseInt(product.price);  
    }

    return price;
  }

  getCategory() {
    return this.state.command.products.length;
  }

  render()
  {

    let idTable = this.getIdTable();

    if(!this.state.command  || (this.state.command && this.state.command.products && this.state.command.products.length == 0 && this.state.command.status !== 1)) {
      return (
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="success">
              <h3>Welcome to Table {idTable}</h3>
            </CardHeader>
            <CardBody>
              <Button type="button" color="success" onClick={() => this.openCommand()}>Open command</Button>
            </CardBody>
          </Card>
        </GridItem>
      );
    }

    if((this.state.command && this.state.command.status === 2)) {
      return (
        <div>
          <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>donut_small</Icon>
                </CardIcon>
                <p style={{color: grayColor[0], margin: "0", fontSize: "14px",marginTop: "0", paddingTop: "10px", marginBottom: "0" }}>Category</p>
                  <h3 style={{ color: grayColor[2], marginTop: "0px", minHeight: "auto", fontWeight: "300", fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif", marginBottom: "3px", textDecoration: "none"}}>
                  { this.getCategory() }
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div style={{ color: grayColor[0], display: "inline-flex", fontSize: "12px", lineHeight: "22px"}}>
                    <Icon>donut_small</Icon>
                    Category
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="success" stats icon>
                  <CardIcon color="success">
                    <Store />
                  </CardIcon>
                  <p style={{color: grayColor[0], margin: "0", fontSize: "14px",marginTop: "0", paddingTop: "10px", marginBottom: "0" }}>Current price</p>
                  <h3 style={{ color: grayColor[2], marginTop: "0px", minHeight: "auto", fontWeight: "300", fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif", marginBottom: "3px", textDecoration: "none" }}>
                    R$ {this.getPrice()}
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div style={{ color: grayColor[0], display: "inline-flex", fontSize: "12px", lineHeight: "22px"}}>
                    <DateRange />
                    Current command price
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="danger" stats icon>
                  <CardIcon color="danger">
                    <Icon>info_outline</Icon>
                  </CardIcon>
                  <p style={{color: grayColor[0], margin: "0", fontSize: "14px",marginTop: "0", paddingTop: "10px", marginBottom: "0" }}>Products</p>
                  <h3 style={{ color: grayColor[2], marginTop: "0px", minHeight: "auto", fontWeight: "300", fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif", marginBottom: "3px", textDecoration: "none" }}>
                    {this.state.command.products.length}
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div style={{ color: grayColor[0], display: "inline-flex", fontSize: "12px", lineHeight: "22px"}}>
                    <LocalOffer />
                    Products placed in command
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                    <Accessibility />
                  </CardIcon>
                  <p style={{color: grayColor[0], margin: "0", fontSize: "14px",marginTop: "0", paddingTop: "10px", marginBottom: "0" }}>Customers</p>
                  <h3 style={{ color: grayColor[2], marginTop: "0px", minHeight: "auto", fontWeight: "300", fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif", marginBottom: "3px", textDecoration: "none" }}>
                    {this.state.command.customers}
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div style={{ color: grayColor[0], display: "inline-flex", fontSize: "12px", lineHeight: "22px"}}>
                    <Accessibility />
                    Number of customers at the table
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="success">
                  <h3>Command closed by Table {idTable}</h3>
                </CardHeader>
                <CardBody>
                  <Button type="button" color="success" onClick={() => this.concludeCommand()}>Conclude command</Button>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      );
    }

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>donut_small</Icon>
                </CardIcon>
                <p style={{color: grayColor[0], margin: "0", fontSize: "14px",marginTop: "0", paddingTop: "10px", marginBottom: "0" }}>Category</p>
                <h3 style={{ color: grayColor[2], marginTop: "0px", minHeight: "auto", fontWeight: "300", fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif", marginBottom: "3px", textDecoration: "none"}}>
                { this.getCategory() }
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div style={{ color: grayColor[0], display: "inline-flex", fontSize: "12px", lineHeight: "22px"}}>
                  <Icon>donut_small</Icon>
                  Category
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p style={{color: grayColor[0], margin: "0", fontSize: "14px",marginTop: "0", paddingTop: "10px", marginBottom: "0" }}>Current price</p>
                <h3 style={{ color: grayColor[2], marginTop: "0px", minHeight: "auto", fontWeight: "300", fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif", marginBottom: "3px", textDecoration: "none" }}>
                  R$ {this.getPrice()}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div style={{ color: grayColor[0], display: "inline-flex", fontSize: "12px", lineHeight: "22px"}}>
                  <DateRange />
                  Current command price
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p style={{color: grayColor[0], margin: "0", fontSize: "14px",marginTop: "0", paddingTop: "10px", marginBottom: "0" }}>Products</p>
                <h3 style={{ color: grayColor[2], marginTop: "0px", minHeight: "auto", fontWeight: "300", fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif", marginBottom: "3px", textDecoration: "none" }}>
                  {this.state.command.products.length}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div style={{ color: grayColor[0], display: "inline-flex", fontSize: "12px", lineHeight: "22px"}}>
                  <LocalOffer />
                  Products placed in command
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p style={{color: grayColor[0], margin: "0", fontSize: "14px",marginTop: "0", paddingTop: "10px", marginBottom: "0" }}>Customers</p>
                <h3 style={{ color: grayColor[2], marginTop: "0px", minHeight: "auto", fontWeight: "300", fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif", marginBottom: "3px", textDecoration: "none" }}>
                  {this.state.command.customers}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div style={{ color: grayColor[0], display: "inline-flex", fontSize: "12px", lineHeight: "22px"}}>
                  <Accessibility />
                  Number of customers at the table
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridProducts>
          </GridProducts>
        </GridContainer>
        <Button type="button" style={{float: "right" }} color="danger" onClick={() => this.closedCommand()}>Closed command</Button>
      </div>
    );
  }
}

