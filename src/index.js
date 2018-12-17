import React from "react";
import ReactDOM from "react-dom";
import {
  Grid,
  Row,
  Col,
  Clearfix,
  Navbar,
  ButtonToolbar,
  Button,
  Table,
  ListGroup,
  ListGroupItem,
  Label
} from "react-bootstrap";

import "./styles.css";

class LapTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      lapCount: 0,
      laps: []
    };
  }

  formatTime = time => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);

    const minutes = `0${min}`.slice(-2);
    const seconds = `0${sec}`.slice(-2);

    return `${minutes}:${seconds}`;
  };

  handleStartButton = () => {
    this.timerStart();
  };

  handleLapButton = () => {
    const lapSeconds = this.state.seconds;
    const laps = this.state.laps;
    const recentLap = this.state.lapCount;
    laps.push(lapSeconds);
    this.setState({ laps: laps });
    this.setState({ lapCount: recentLap + 1 });
  };

  timer = () => {
    const currentSeconds = this.state.seconds;
    this.setState({ seconds: currentSeconds + 1 });
  };

  timerStart = () => {
    this.counter = setInterval(this.timer, 1000);
  };

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>Bootstrap Lap Timer</Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row>
            <Col>
              <h1 className="maintime">
                {this.formatTime(this.state.seconds)}
              </h1>
              <ButtonToolbar>
                <Button
                  onClick={this.handleStartButton}
                  bsStyle="danger"
                  bsSize="large"
                >
                  <span
                    className="glyphicon glyphicon-play"
                    aria-hidden="true"
                  />{" "}
                  Start
                </Button>
                <Button
                  onClick={this.handleLapButton}
                  bsStyle="primary"
                  bsSize="large"
                >
                  <span
                    className="glyphicon glyphicon-plus-sign"
                    aria-hidden="true"
                  />{" "}
                  Lap
                </Button>
              </ButtonToolbar>
            </Col>
          </Row>
          <Row className="laplist">
            <Col>
              <ListGroup>
                <ListGroupItem>Lap List</ListGroupItem>
                {this.state.laps.map((item, i) => (
                  <ListGroupItem>
                    <Label>{this.state.laps.indexOf(item) + 1}</Label>{" "}
                    {this.formatTime(item)}{" "}
                    <strong>{`+${this.formatTime(
                      this.state.seconds - item
                    )}`}</strong>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

ReactDOM.render(<LapTimer />, document.getElementById("app"));
