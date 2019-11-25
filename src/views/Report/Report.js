import React from "react";

import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";

import Card from "components/Card/Card.js";
import CardIcon from "components/Card/CardIcon.js";
import GridItem from "components/Grid/GridItem.js";
import CardFooter from "components/Card/CardFooter.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const API_URL = "https://localhost:44358/api/";

export default function ReportPage() {
  const classes = useStyles();
  return (
    <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>book</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Report by category</p>
            </CardHeader>
            <CardFooter stats>
              <div style={{ float: "left" }} className={classes.stats}>
                <Icon>book</Icon>
                Report by category
              </div>
              <Button color="warning"  href={API_URL + `report`} target="_blank" style={{ float: "right" }}>Generate</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>bookmark_border</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Report by price</p>
            </CardHeader>
            <CardFooter stats>
              <div style={{ float: "left" }} className={classes.stats}>
                <Icon>bookmark_border</Icon>
                Report by price
              </div>
              <Button color="success"  href={API_URL + `report`} target="_blank" style={{ float: "right" }}>Generate</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>bookmark</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Report by products</p>
            </CardHeader>
            <CardFooter stats>
              <div style={{ float: "left" }} className={classes.stats}>
                <Icon>bookmark</Icon>
                Report by products
              </div>
              <Button color="danger"   href={API_URL + `report`} target="_blank" style={{ float: "right" }}>Generate</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>bookmarks</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Report by commands</p>
            </CardHeader>
            <CardFooter stats>
              <div style={{ float: "left" }} className={classes.stats}>
                <Icon>bookmarks</Icon>
                Report by commands
              </div>
              <Button color="info"   href={API_URL + `report`} target="_blank" style={{ float: "right" }}>Generate</Button>
            </CardFooter>
          </Card>
        </GridItem>
    </GridContainer>
  );
}
