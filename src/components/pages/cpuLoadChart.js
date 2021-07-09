import React from "react";
import "../pages/FilterPastData.css";

const {
  Stitch,
  RemoteMongoClient,
  UserPasswordCredential,
} = require("mongodb-stitch-browser-sdk");
const client = Stitch.initializeDefaultAppClient("backup_data-fhymv");

export default class Test extends React.Component {
  state = {
    loading: true,
    getData: null,
    value: null,
    getInputTextFromSearchBox: null,
  };

  //   async componentWillMount() {
  //     this.getData();
  //   }

  async getData() {
    this.setState({
      getInputTextFromSearchBox: this.state.value,
    });

    const db = client
      .getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
      .db("cpu_load");

    var email = "acsoare@ymail.com";
    var password = "Underground22!!";
    const credentials = new UserPasswordCredential(
      email.toString(),
      password.toString()
    );
  }
}
