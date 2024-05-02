import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CurrentTime from './CurrentTime';
import RunningText from './RunningText';
import Slider from './Slider';
import AllPrayerTimes from './AllPrayerTimes';

const PrayerTimes = ({ cityName, countryName, mosqueName, mosqueLocation }) => {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [nextPrayerTimes, setNextPrayerTimes] = useState();
  const [alertTime, setAlertTime] = useState(null);
  const [alertSoundPlayed, setAlertSoundPlayed] = useState(false);
  const [mosquePhotos, setMosquePhotos] = useState([
    'https://via.placeholder.com/600x200?text=Mosque+Photo+1',
    'https://via.placeholder.com/600x200?text=Mosque+Photo+2',
    'https://via.placeholder.com/600x200?text=Mosque+Photo+3',
    'https://via.placeholder.com/600x200?text=Mosque+Photo+4',
  ]);
  const [hijriDate, setHijriDate] = useState('');
  const prayerKeys = ['Imsak', 'Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.aladhan.com/v1/timingsByCity?city=${cityName}&country=${countryName}&method=8`
        );
        console.log(response.data);
        const { data } = response.data;
        setPrayerTimes(data.timings);
        setHijriDate(
          `${data.date.hijri.day} ${data.date.hijri.month.en} ${data.date.hijri.year}`
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [cityName, countryName]);

  useEffect(() => {
    if (prayerTimes) {
      const nextPrayer = getNextPrayerTime();
      setNextPrayerTimes(nextPrayer);
      setPrayerAlert(nextPrayer);
      setAlertSoundPlayed(false);
    }
  }, [prayerTimes]);

  // Set up interval to check if it's time to show the alert
  useEffect(() => {
    const interval = setInterval(() => {
      if (alertTime && new Date() >= alertTime && !alertSoundPlayed) {
        // alert('siap2,.');
        setAlertSoundPlayed(true);
        const audio = new Audio('/alarm1.mp3');
        audio.play();
        setTimeout(() => {
          audio.pause();
          audio.currentTime = 0;
        }, 5000); // Stop audio after 5 seconds
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [alertTime, alertSoundPlayed]);

  const getNextPrayerTime = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    let nextPrayer = '';
    for (const key of prayerKeys) {
      if (prayerTimes[key]) {
        const [prayerHour, prayerMinute] = prayerTimes[key]
          .split(':')
          .map((str) => parseInt(str));
        if (
          currentHour < prayerHour ||
          (currentHour === prayerHour && currentMinute < prayerMinute)
        ) {
          nextPrayer = key;
          break;
        }
      }
    }

    return nextPrayer;
  };

  // Function to set the alert time
  const setPrayerAlert = (nextPrayer) => {
    if (nextPrayer !== '') {
      const [prayerHour, prayerMinute] = prayerTimes[nextPrayer]
        .split(':')
        .map((str) => parseInt(str));
      const now = new Date();
      const prayerTime = new Date();
      prayerTime.setHours(prayerHour);
      prayerTime.setMinutes(prayerMinute);
      prayerTime.setSeconds(0); // Set seconds to 0

      // Adjust the alert time here (e.g., 5 minutes before the prayer)
      prayerTime.setMinutes(prayerTime.getMinutes() - 23);

      if (prayerTime > now) {
        setAlertTime(prayerTime);
      }
    }
  };

  return (
    <Container
      fluid
      className="min-vh-100 p-0 m-0 text-center overflow-hidden position-relative d-flex flex-column"
    >
      {/* First Row: Current Date, Mosque Name and Address, Current Time */}
      <div
        className="position-absolute top-0 start-0 end-0 bg-light bg-opacity-70 p-2"
        style={{
          zIndex: '1',
        }}
      >
        <Row
          style={{ height: '15vh' }}
          className="px-0 mx-0 d-flex align-items-center justify-content-between"
        >
          <Col className="d-flex flex-column align-items-center justify-content-center fw-bold font-danger fs-1">
            <h3 className="fw-bold">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </h3>
            <h3 className="fw-bold">{hijriDate}</h3>
          </Col>
          <Col className="d-flex flex-column align-items-center justify-content-center fw-bold font-danger fs-1">
            <h1
              className="text-danger font-sedan fw-bold"
              style={{ fontSize: '50px' }}
            >
              {mosqueName}
            </h1>
            <h3>{mosqueLocation}</h3>
          </Col>
          <Col>
            <CurrentTime />
          </Col>
        </Row>
      </div>

      {/* Second Row: Photos of the Mosque (Slider) */}
      <div className="flex-grow-1 bg-dark d-flex align-items-center">
        <Slider photos={mosquePhotos} />
      </div>

      {/* Third Row: All Prayer Times */}
      <div className="position-relative mb-5 py-3 px-0">
        <AllPrayerTimes
          prayerKeys={prayerKeys}
          prayerTimes={prayerTimes}
          nextPrayer={nextPrayerTimes}
        />
      </div>

      {/* Fourth Row: Running Text */}
      <div className="mt-auto" style={{ position: 'absolute', bottom: 0 }}>
        <RunningText
          mosqueName={mosqueName}
          mosqueLocation={mosqueLocation}
          prayerTimes={prayerTimes}
        />
      </div>
    </Container>
  );
};

export default PrayerTimes;
