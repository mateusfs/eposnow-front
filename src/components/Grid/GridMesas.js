import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

import Card from "components/Card/Card.js";
import Button from "@material-ui/core/Button";
import CardBody from "components/Card/CardBody.js";
import GridContainer from "components/Grid/GridContainer.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const API_URL = "https://localhost:44358/api/";

export default class GridMesas extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
      items: null
    };
  }
  
  componentDidMount()
  {
    return fetch(API_URL + 'mesas')
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

    if(!this.state.items) {
      return (
        <div></div>
      );
    }


    const listItems = this.state.items.map((item) =>
      <Card style={{ width: "20rem", marginLeft: "20px" }}>
        <img
          className={useStyles.cardImgTop}
          data-src="holder.js/100px180/"
          alt="100%x180"
          style={{ height: "180px", width: "100%", display: "block" }}
          src={require(`assets/img/mesa-${item.id}.jpg`)}
          data-holder-rendered="true"
        />
        <CardBody>
          <h4>{item.nome}</h4>
          <p>
           Mostrar os detalhes sobre a <strong>{item.nome}</strong>
          </p>
          <Button color="primary" href={`/admin/mesa/${item.id}`}>Ver detalhes</Button>
        </CardBody>
      </Card>
    );

    return (
      <GridContainer>
        {listItems}
      </GridContainer>);
  }
}

GridMesas.propTypes = {
  children: PropTypes.node
};
