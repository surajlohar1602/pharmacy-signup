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
export default class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      UserName: "",
      Password: "",

      RoleValue: "Admin",
      UserNameFlag: false,
      PasswordFlag: false,

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
  handleSignUp = (e) => {
    this.props.history.push("/");
  };
  CheckValidity() {
    console.log("CheckValidity Calling.....");
    //Reset Flag
    this.setState({
      UserNameFlag: false,
      PasswordFlag: false,
    });

    if (this.state.UserName === "") {
      this.setState({ UserNameFlag: true });
    }
    if (this.state.Password === "") {
      this.setState({ PasswordFlag: true });
    }
  }
  handleSubmit = (e) => {
    this.CheckValidity();
    if (this.state.UserName !== "" && this.state.Password !== "") {
      console.log("Acceptable");
      let data = {
        userName: this.state.UserName,
        password: this.state.Password,

        role: this.state.RoleValue,
      };

      authService
        .SignIn(data)
        .then((data) => {
          console.log("data : ", data);
          if (data.data.isSuccess) {
            this.handleSubmit = (e) => {
              this.props.history.push("/HomePage");
            };
          } else {
            console.log("Sign In Failed");
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
  render() {
    console.log("State : ", this.state);
    return (
      <div className="SignUp-Container">
        <div className="SignUp-SubContainer">
          <div className="Header">Sign In</div>
          <div className="Body">
            <form className="form">
              <TextField
                className="TextField"
                name="UserName"
                label="UserName"
                variant="outlined"
                size="small"
                error={this.state.UserNameFlag}
                value={this.state.UserName}
                onChange={this.handleValues}
              />
              <TextField
                className="TextField"
                name="Password"
                label="Password"
                variant="outlined"
                size="small"
                type="password"
                error={this.state.PasswordFlag}
                value={this.state.Password}
                onChange={this.handleValues}
              />

              <RadioGroup
                className="Roles"
                name="Role"
                value={this.state.Rolevalue}
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
            <Button className="Btn" color="primary" onClick={this.handleSignUp}>
              Create New Account
            </Button>
            <Button
              className="Btn"
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Sign In
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
