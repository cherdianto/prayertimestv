import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const AllPrayerTimes = ({ prayerTimes, prayerKeys, nextPrayer }) => {
  return (
    // <div className="position-relative mb-5 py-3 px-0">
    <Container fluid>
      <Row className="d-flex align-items-center" style={{ height: '15vh' }}>
        {prayerKeys.map((key) => (
          <Col
            key={key}
            style={{
              backgroundColor: key === nextPrayer ? 'red' : 'transparent',
              color: key === nextPrayer ? 'white' : 'black',
            }}
          >
            <h1 className="font-sedan">{key}</h1>
            <h1 style={{ fontSize: '45px' }}>{prayerTimes[key] || '-'}</h1>
          </Col>
        ))}
      </Row>
    </Container>
    // </div>
  );
};

export default AllPrayerTimes;
