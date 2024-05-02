// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col } from 'reactstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import CurrentTime from './CurrentTime';
// import RunningText from './RunningText';
// import Slider from './Slider';

// const PrayerTimes = ({ mosqueName, mosqueLocation }) => {
//   const [prayerTimes, setPrayerTimes] = useState({});
//   const [playAlarm, setPlayAlarm] = useState(false);
//   const [mosquePhotos, setMosquePhotos] = useState([
//     'https://via.placeholder.com/600x200?text=Mosque+Photo+1',
//     'https://via.placeholder.com/600x200?text=Mosque+Photo+2',
//     'https://via.placeholder.com/600x200?text=Mosque+Photo+3',
//     'https://via.placeholder.com/600x200?text=Mosque+Photo+4',
//   ]);
//   const [hijriDate, setHijriDate] = useState('');
//   const prayerKeys = ['Imsak', 'Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

//   useEffect(() => {
//     const fetchData = () => {
//       // Simulated prayer times
//       const simulatedPrayerTimes = {
//         Imsak: '05:00',
//         Fajr: '05:30',
//         Dhuhr: '14:18',
//         Asr: '03:00',
//         Maghrib: '06:00',
//         Isha: '08:00',
//       };
//       setPrayerTimes(simulatedPrayerTimes);

//       const now = new Date();
//       const hijriDay = now.getDate();
//       const hijriMonth = now.toLocaleString('default', { month: 'long' });
//       const hijriYear = now.getFullYear();
//       setHijriDate(`${hijriDay} ${hijriMonth} ${hijriYear}`);
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const prayerAlarm = () => {
//       const now = new Date();
//       const hours = ('0' + now.getHours()).slice(-2); // Add leading zero if single digit
//       const minutes = ('0' + now.getMinutes()).slice(-2); // Add leading zero if single digit
//       const currentTime = `${hours}:${minutes}`;

//       console.log(prayerTimes['Dhuhr']);
//       // console.log(prayerTimes === currentTime);
//       // console.log(now);
//       console.log(currentTime);

//       if (prayerTimes['Dhuhr'] === currentTime) {
//         console.log('masuk');
//         const audio = new Audio('/beep.mp3');
//         audio.play();
//         setTimeout(() => {
//           audio.pause();
//           audio.currentTime = 0;
//         }, 5000); // Stop audio after 5 seconds
//       }
//     };

//     const interval = setInterval(prayerAlarm, 1000); // Check every minute

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <Container
//       fluid
//       className="min-vh-100 p-0 m-0 text-center overflow-hidden position-relative d-flex flex-column"
//     >
//       {/* First Row: Current Date, Mosque Name and Address, Current Time */}
//       <div className="position-absolute top-0 start-0 end-0 bg-light bg-opacity-70 p-2">
//         <Row
//           style={{ height: '15vh' }}
//           className="px-0 mx-0 d-flex align-items-center justify-content-between"
//         >
//           <Col className="d-flex flex-column align-items-center justify-content-center fw-bold font-danger fs-1">
//             <h3 className="fw-bold">
//               {new Date().toLocaleDateString('en-US', {
//                 weekday: 'long',
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric',
//               })}
//             </h3>
//             <h3 className="fw-bold">{hijriDate}</h3>
//           </Col>
//           <Col className="d-flex flex-column align-items-center justify-content-center fw-bold font-danger fs-1">
//             <h1
//               className="text-danger font-sedan fw-bold"
//               style={{ fontSize: '50px' }}
//             >
//               {mosqueName}
//             </h1>
//             <h3>{mosqueLocation}</h3>
//           </Col>
//           <Col>
//             <CurrentTime />
//           </Col>
//         </Row>
//       </div>

//       {/* Second Row: Photos of the Mosque (Slider) */}
//       <div className="flex-grow-1 bg-dark d-flex align-items-center">
//         <Slider photos={mosquePhotos} />
//       </div>

//       {/* Third Row: All Prayer Times */}
//       <div className="position-relative" style={{ minHeight: '15vh' }}>
//         <Container fluid className="h-100">
//           <Row className="d-flex align-items-center h-100">
//             {prayerKeys.map((key) => (
//               <Col key={key}>
//                 <h1 className="font-sedan">{key}</h1>
//                 <h1>{prayerTimes[key] || '-'}</h1>
//               </Col>
//             ))}
//           </Row>
//         </Container>
//       </div>

//       {/* Fourth Row: Running Text */}
//       <div className="mt-auto position-absolute bottom-0 start-0 end-0 bg-secondary bg-opacity-70 p-2">
//         <RunningText
//           mosqueName={mosqueName}
//           mosqueLocation={mosqueLocation}
//           prayerTimes={prayerTimes}
//         />
//       </div>
//     </Container>
//   );
// };

// export default PrayerTimes;
