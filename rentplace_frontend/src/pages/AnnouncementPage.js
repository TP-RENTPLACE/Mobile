import React from 'react';
import ImageSlider from '../components/ImageSlider';
import PropertyDetails from '../components/PropertyDetails';
import Description from '../components/Description';
import announcements from '../store/data'; // Импортируем массив объявлений
import "./AnnouncementPage.css"
import Conveniences from '../components/Сonveniences';
import HeadWithText from '../components/HeadWithText';
import BigBlueButton from '../components/BigBlueButton';
import BottomNavigation from '../components/BottomNavigation';

const AnnouncementPage = () => {
  const announcement = announcements[0]; 

  if (!announcement) {
    return <div>Объявление не найдено</div>;
  }

  return (
    <div className="announcement-page">
      <HeadWithText props="Объявление"/>
      <ImageSlider/>
      <h1>{announcement.title}</h1>
      
      <PropertyDetails details={announcement.details} />
      <Description description={announcement.description} />
      <Conveniences conveniences={announcement.conveniences}/>
      <BigBlueButton props="Выбрать даты" fix="fixed"/>
      <BottomNavigation/>
    </div>
  );
};

export default AnnouncementPage;