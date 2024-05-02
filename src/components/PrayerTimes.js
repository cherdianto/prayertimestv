import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Modal, ModalBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CurrentTime from './CurrentTime';
import RunningText from './RunningText';
import Slider from './Slider';
import AllPrayerTimes from './AllPrayerTimes';
import CountdownTimer from './CountdownTimer';

const PrayerTimes = ({ cityName, countryName, mosqueName, mosqueLocation }) => {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [nextPrayerTimes, setNextPrayerTimes] = useState();
  const [alertTime, setAlertTime] = useState(null);
  const [alertSoundPlayed, setAlertSoundPlayed] = useState(false);
  const [modal, setModal] = useState(false); // State for the modal
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
        const dummyTime = {
          Asr: '14:58',
          Dhuhr: '11:36',
          Fajr: '04:23',
          Firstthird: '21:34',
          Imsak: '04:13',
          Isha: '20:37',
          Lastthird: '01:37',
          Maghrib: '17:30',
          Midnight: '23:36',
          Sunrise: '05:41',
          Sunset: '17:30',
        };
        // setPrayerTimes(data.timings);
        setPrayerTimes(dummyTime);
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
        setModal(true);
        // setAlertSoundPlayed(true);
        // const audio = new Audio('/alarm1.mp3');
        // audio.play();
        // setTimeout(() => {
        //   audio.pause();
        //   audio.currentTime = 0;
        // }, 5000); // Stop audio after 5 seconds
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [alertTime, alertSoundPlayed]);

  useEffect(() => {
    setAlertSoundPlayed(true);
    const audio = new Audio('/alarm1.mp3');
    audio.play();
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 2000); // Stop audio after 5 seconds
  }, [modal]);

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
      prayerTime.setMinutes(prayerTime.getMinutes() - 0);

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
      <Modal isOpen={modal} centered fullscreen>
        <ModalBody>
          <CountdownTimer
            setModal={setModal}
            label={nextPrayerTimes}
            time={2}
          />
        </ModalBody>
      </Modal>
      {/* First Row: Current Date, Mosque Name and Address, Current Time */}
      <div
        className="position-absolute top-0 start-0 end-0 bg-light bg-opacity-70 p-2"
        style={{
          zIndex: '1',
        }}
      >
        <Row
          style={{ height: '20vh' }}
          className="px-0 mx-0 d-flex align-items-center justify-content-between"
        >
          <Col className="d-flex flex-column justify-content-center fw-bold font-danger fs-1 lh-sm text-start">
            <h3 className="fw-bold lh-sm">
              {new Date().toLocaleDateString('id-ID', {
                weekday: 'long',
              })}
            </h3>
            <h3 className="fw-bold lh-sm">
              {new Date().toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </h3>
            <h3 className="fw-bold lh-sm">{hijriDate}</h3>
          </Col>
          <Col className="d-flex flex-column text-center justify-content-center fw-bold font-danger fs-1">
            <h1
              className="text-danger font-sedan fw-bold"
              style={{ fontSize: '50px' }}
            >
              {mosqueName}
            </h1>
            <h3>{mosqueLocation}</h3>
          </Col>
          <Col className="fw-bold font-danger fs-1 lh-sm text-end">
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
