// data.js
// store/data.js
import { AirVent, Refrigerator , Microwave, WashingMachine, Tv, Wifi } from 'lucide-react';



const announcements = [
  {
    id: '1',
    title: 'Вилла с панорамным видом',
    images: [
      './images/property1.png',
      'https://source.unsplash.com/random/800x600/?beach',
      'https://source.unsplash.com/random/800x600/?pool',
    ],
    details: {
      area: '360 м²',
      rooms: '5 комнат',
      guests: '6 гостей',
      bedrooms: '3 спальни',
      beds: '3 кровати',
    },
    description:
      'Приглашаем на отдых в шикарную белоснежную виллу на Черноморском побережье. Новый современный ремонт, лаконичный дизайн, удобная мебель, современная бытовая техника сделают Ваш отдых незабываемым.',
     conveniences : [
      [AirVent, "Кондиционер"],
      [Refrigerator , "Холодильник"],
      [Microwave, "Микроволновка"],
      [WashingMachine, "Стиральная машина"],
      [Tv, "Телевизор"],
      [Wifi, "Wi-Fi"],
    ],
    location:"Лоо. Таллинская улица, 93"
  },
  {
    id: '2',
    title: 'Квартира в центре города',
    images: [
      'https://source.unsplash.com/random/800x600/?apartment',
      'https://source.unsplash.com/random/800x600/?city',
      'https://source.unsplash.com/random/800x600/?interior',
    ],
    details: {
      area: '90 м²',
      rooms: '3 комнаты',
      guests: '4 гостя',
      bedrooms: '2 спальни',
      beds: '2 кровати',
    },
    description:
      'Уютная квартира в самом сердце города. Рядом все необходимые магазины, рестораны и достопримечательности.',
      
    location:"Лоо. Таллинская улица, 93"

  },
];

export default announcements;