import React from 'react';
import ImageSlider from '../components/ImageSlider';
import PropertyDetails from '../components/PropertyDetails';
import Description from '../components/Description';
import announcements from '../store/data'; // Импортируем массив объявлений
import "./AnnouncementPage.css"
import Facilities from '../components/Facilities';
import HeadWithText from '../components/HeadWithText';
import BigBlueButton from '../components/BigBlueButton';
import BottomNavigation from '../components/BottomNavigation';
import {useLocation, useNavigate} from "react-router-dom";
import { MapPin } from "lucide-react";


const AnnouncementPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {property} = location.state || {};


    if (!property) {
        return <div>Объявление не найдено</div>;
    }

    const handleBookClick = () => {
        navigate("/booking-form", { state: { property } }); // ← передаём property в booking-form
    };

    return (
        <div className="announcement-page">
            <HeadWithText props="Объявление"/>
            <ImageSlider images={property.imagesDTOs}/>
            <h1>{property.title}</h1>

            <PropertyDetails property={property}/>

            <Description property={property}/>

            <div className="location">
                <h3>Расположение</h3>
                <div className="cont">
                    <MapPin className="icon"/>
                    <span>{property.address}</span>
                </div>
            </div>

            <Facilities facilities={property.facilitiesDTOs}/>
            <BigBlueButton props="Выбрать даты" fix="fixed" onClick={handleBookClick}/>
            <BottomNavigation/>
        </div>
    );
};

export default AnnouncementPage;