// CountdownTimer.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/countdownTimer.css'; // CSS for countdown timer

const CountdownTimer = ({ setModal, label, time }) => {
  const [countdown, setCountdown] = useState(time * 60); // 10 minutes in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown > 0) {
          return prevCountdown - 1;
        } else {
          setModal(false); // Close the modal when the countdown reaches 0
          return prevCountdown;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [setModal]);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <Container className="d-flex flex-column">
      <Row>
        <h2>Iqamah {label} </h2>
      </Row>
      {/* <br /> */}
      <Row className="justify-content-center">
        <Col>
          <div className="countdown-timer">
            <div className="digit">
              <div>{formatTime(minutes)}</div>
            </div>
            <div className="colon">:</div>
            <div className="digit">
              <div>{formatTime(seconds)}</div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CountdownTimer;
