import React from "react";

import Close from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";
import InputLabel from "@material-ui/core/InputLabel";

import { whiteColor, hexToRgb } from "assets/jss/material-dashboard-react.js";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { ProductCommand } from "components/Model/Command";


const API_URL = "https://localhost:44358/api/";

export default class Product extends React.Component {
  

  constructor(props)
  {
    super(props);
    this.state = {
      command: null,
      product: null,
    };
  }
  
  getIdTable() {
    let idTable = null;
    const paths = window.location.pathname.split("/");
    if(paths && paths.length >= 5){
      idTable = window.location.pathname.split("/")[4];
    }
    return idTable;
  }

  getIdProduct() {
    let idProduct = null;
    const paths = window.location.pathname.split("/");
    if(paths && paths.length === 6){
      idProduct = window.location.pathname.split("/")[5];
    }
    return idProduct;
  }

  handleChangePrice = (event, value) => {
    let product = this.state.product; 
    if(!product) {
      product = new ProductCommand(); 
    }
    product.price = event.target.value;

    this.setState({product: product});
  };

  handleChangeName = (event, value) => {
    let product = this.state.product; 
    if(!product) {
      product = new ProductCommand(); 
    }
    product.name = event.target.value;

    this.setState({product: product});
  };


  getProduct()
  {
    let idTable = this.getIdTable();
    
    
    return fetch(API_URL + 'commands/table/' + idTable)
    .then((response) => response.json())
    .then((responseJson) => {
      
        if(this.getIdProduct()){
          for (let index = 0; index < responseJson.products.length; index++) {
            const product = responseJson.products[index];
            if(product && product.id && product.id === Number(this.getIdProduct())) {
              this.setState({product: product});
            }
          }
        } else {
          const product = new ProductCommand();
          product.price = null;
          this.setState({product: product});
        }

        this.setState({command: responseJson});
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  componentWillMount() {
    this.getProduct();
  }


  addProduct() {
    
    let idTable = this.getIdTable();

    let command = this.state.command;

    let existProduct = false; 
    
    if(this.state.command.products.length > 0){
      for (let index = 0; index < this.state.command.products.length; index++) {
        const product = this.state.command.products[index];
        if(product && product.id && product.id === Number(this.getIdProduct())) {
          existProduct = true;
          this.state.command.products[index] = this.state.product;
        }
      }

      if(!existProduct) {
        this.state.product.id = this.state.command.products.length + 1;
        this.state.command.products.push(this.state.product);
      }

    } else {
      this.state.product.id = 1;
      this.state.command.products = [];
      this.state.command.products.push(this.state.product);
    }
    
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
        window.location.href = `/admin/table/${idTable}`;
      })
      .catch((error) =>{
        console.error(error);
      });

  }

  removeProduct() {

    let idTable = this.getIdTable();

    let command = this.state.command;
    
    if(this.state.command.products.length > 0){
      for (let index = 0; index < this.state.command.products.length; index++) {
        const product = this.state.command.products[index];
        if(product && product.id && product.id === Number(this.getIdProduct())) {
          this.state.command.products.splice(index);
        }
      }
    }
    
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
        // window.location.href = `/admin/table/${idTable}`;
      })
      .catch((error) =>{
        console.error(error);
      });
  }
  
  render()
  {
    let idTable = this.getIdTable();

    if(!this.state.product) {
      return ( <div></div> )  
    }

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 style={{color: whiteColor, marginTop: "0px", minHeight: "auto", fontWeight: "300", fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif", marginBottom: "3px", textDecoration: "none" }}>
                  Edit Product
                </h4>
                <p style={{color: "rgba(" + hexToRgb(whiteColor) + ",.62)", margin: "0", fontSize: "14px", marginTop: "0", marginBottom: "0"}}>
                  Complete your product
                </p>

                {(this.state.product && this.state.product.id)?<Button color="rose" justIcon round onClick={() => this.removeProduct()} style={{ float: "right" }} ><Close /></Button>: "" }
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Name"
                      id="name"
                      defaultValue={(this.state.product)? this.state.product.name : ""}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: this.handleChangeName,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Price"
                      id="price"
                      defaultValue={(this.state.product)? this.state.product.price : ""}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: this.handleChangePrice,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: "#AAAAAA", marginTop: "50px" }}>About product</InputLabel>
                    <CustomInput
                      labelText="Want to add some description in this product"
                      id="about-me"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="rose"  href={`/admin/table/${idTable}`} style={{ float: "left" }}>Go back</Button>
                <Button color="primary" style={{ float: "left" }} onClick={() => this.addProduct()}>Update product</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
