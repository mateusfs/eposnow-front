import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Card from "components/Card/Card.js";
import Button from "@material-ui/core/Button";
import CardBody from "components/Card/CardBody.js";
import GridContainer from "components/Grid/GridContainer.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const API_URL = "https://localhost:44358/api/";

export default class GridTables extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
      items: null
    };
  }
  
  componentDidMount()
  {
    return fetch(API_URL + 'tables')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({items: responseJson});
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  componentWillMount() {
    this.componentDidMount();
  }

  render()
  {

    if(!this.state.items || (this.state.items && this.state.items.length === 0)) {
      return (
        <div></div>
      );
    }


    const listItems = this.state.items.map((item) =>
      <Card style={{ width: "20rem", marginLeft: "20px" }} key={item.id}>
        <img
          className={useStyles.cardImgTop}
          data-src="holder.js/100px180/"
          alt="100%x180"
          style={{ height: "180px", width: "100%", display: "block" }}
          src={require(`assets/img/table-${item.id}.jpg`)}
          data-holder-rendered="true"
        />
        <CardBody key={item.id}>
          <h4>{item.name}</h4>
          <p>
          Show details about the <strong>{item.name}</strong>
          </p>
          <Button color="primary" style={{ float: "right" }} key={item.id} href={`/admin/table/${item.id}`}>See details</Button>
        </CardBody>
      </Card>
    );

    return (
      <GridContainer>
        {listItems}
      </GridContainer>);
  }
}

