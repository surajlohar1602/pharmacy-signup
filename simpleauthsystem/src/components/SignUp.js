import React, { Component } from "react";

import "./SignUp.css";
import TextField from "@material-ui/core/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import AuthServices from "../services/AuthServices";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const authService = new AuthServices();

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      UserName: "",
      Password: "",
      ConfirmPassword: "",
      RoleValue: "Admin",
      UserNameFlag: false,
      PasswordFlag: false,
      ConfirmPasswordFlag: false,

      open: false,
      Message: "",
    };
  }

  handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  handleValues = (e) => {
    const { name, value } = e.target;
    this.setState(
      { [name]: value },
      console.log("name", name, "value:", value)
    );
  };

  handleChangeRole = (e) => {
    this.setState({ RoleValue: e.target.value });
  };

  CheckValidity() {
    console.log("CheckValidity Calling.....");
    //Reset Flag
    this.setState({
      UserNameFlag: false,
      PasswordFlag: false,
      ConfirmPasswordFlag: false,
    });

    if (this.state.UserName === "") {
      this.setState({ UserNameFlag: true });
    }
    if (this.state.Password === "") {
      this.setState({ PasswordFlag: true });
    }
    if (this.state.ConfirmPassword === "") {
      this.setState({ ConfirmPasswordFlag: true });
    }
  }

  handleSubmit = (e) => {
    this.CheckValidity();
    if (
      this.state.UserName !== "" &&
      this.state.Password !== "" &&
      this.state.ConfirmPassword !== ""
    ) {
      console.log("Acceptable");
      let data = {
        userName: this.state.UserName,
        password: this.state.Password,
        confirmPassword: this.state.ConfirmPassword,
        role: this.state.RoleValue,
      };

      authService
        .SignUp(data)
        .then((data) => {
          console.log("data : ", data);
          if (data.data.isSuccess) {
            this.handleSubmit = (e) => {
              this.props.history.push("/SignIn");
            };
          } else {
            console.log("Sign Up Failed");
            this.setState({ open: true, Message: data.data.message });
          }
        })
        .catch((error) => {
          console.log("error : ", error);
          this.setState({ open: true, Message: "Something Went Wrong" });
        });
    } else {
      console.log("Not Acceptable");
      this.setState({ open: true, Message: "Something Went Wrong" });
    }
  };
  handleSignIn = (e) => {
    this.props.history.push("/SignIn");
  };

  render() {
    console.log("state:", this.state);
    return (
      <div className="SignUp-Container">
        <div className="SignUp-SubContainer">
          <div className="Header">Sign Up</div>
          <div className="Body">
            <form className="form">
              <TextField
                error={this.state.UserNameFlag}
                className="TextField"
                name="UserName"
                label="UserName"
                variant="outlined"
                size="small"
                value={this.state.UserName}
                onChange={this.handleValues}
              />
              <TextField
                error={this.state.PasswordFlag}
                className="TextField"
                name="Password"
                label="Password"
                variant="outlined"
                size="small"
                type="password"
                value={this.state.Password}
                onChange={this.handleValues}
              />
              <TextField
                error={this.state.ConfirmPasswordFlag}
                className="TextField"
                name="ConfirmPassword"
                label="Confirm Password"
                variant="outlined"
                size="small"
                type="password"
                value={this.state.ConfirmPassword}
                onChange={this.handleValues}
              />
              <RadioGroup
                className="Roles"
                name="Role"
                value={this.state.RoleValue}
                onChange={this.handleChangeRole}
              >
                <FormControlLabel
                  className="RoleValue"
                  value="Admin"
                  control={<Radio />}
                  label="Admin"
                />
                <FormControlLabel
                  className="RoleValue"
                  value="User"
                  control={<Radio />}
                  label="User"
                />
              </RadioGroup>
            </form>
          </div>
          <div className="buttons">
            <Button className="Btn" color="primary" onClick={this.handleSignIn}>
              Sign In
            </Button>
            <Button
              className="Btn"
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Sign Up
            </Button>
          </div>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          message={this.state.Message}
          action={
            <React.Fragment>
              <Button color="secondary" size="small" onClick={this.handleClose}>
                UNDO
              </Button>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </div>
    );
  }
}
