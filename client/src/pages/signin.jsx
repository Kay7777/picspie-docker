import React from "react";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Container,
  Snackbar,
} from "@material-ui/core";

class SignIn extends React.Component {
  state = {
    email: "",
    password: "",
    error: false,
  };

  handleSignIn = async () => {
    const { email, password, username } = this.state;
    const doc = await axios.post("/api/user/signin", {
      email,
      password,
    });
    console.log(doc);
    if (doc && doc.data === "success") {
      window.location = "/";
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <div style={{ position: "relative", top: 70 }}>
        <Container className="text-center">
          <CardContent>
            <Typography color="textSecondary" style={{ fontSize: 40 }}>
              PicsPie
            </Typography>
            <TextField
              id="standard-basic"
              label="Email"
              style={{ width: 300, marginTop: 10 }}
              value={email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
            <br />
            <TextField
              id="standard-basic"
              label="Password"
              type="password"
              style={{ width: 300, marginTop: 10 }}
              value={password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              style={{
                width: 300,
                marginTop: 10,
                backgroundColor: "#0F9D58",
              }}
              onClick={this.handleSignIn}
            >
              Sign In
            </Button>
            <br />
            <Button
              variant="contained"
              color="primary"
              style={{
                width: 300,
                marginTop: 10,
                backgroundColor: "#4285F4",
              }}
              href="/api/google"
            >
              Google Account
            </Button>
          </CardContent>
        </Container>
        <Snackbar open={error} autoHideDuration={2000}>
          <Alert
            severity="error"
            onClose={() => this.setState({ error: false })}
          >
            Please check your email and password, if you use the same email to
            sign in with Google Account, Please use the google account, thank
            you!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default SignIn;
