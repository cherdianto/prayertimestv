import React from 'react';
import PrayerTimes from '../components/PrayerTimes';
import '../styles/global.css';

const Home = () => {
  return (
    <div>
      <PrayerTimes
        cityName="Sleman"
        countryName="ID"
        mosqueName="Darussalam"
        mosqueLocation="Wedomartani, Sleman"
      />
    </div>
  );
};

export default Home;
