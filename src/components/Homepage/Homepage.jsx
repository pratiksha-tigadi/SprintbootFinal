// import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';
import { useState } from "react";
import Slider from "react-slick";
import icon1 from '../assets/iconn1.png';
import icon2 from '../assets/iconn2.png';
import icon3 from '../assets/iconn3.png';
import icon4 from '../assets/iconn4.png';
//import { FaArrowRight,FaArrowLeft } from 'react-icons/fa';
import maps from '../assets/map.png';
import Footer from '../Footer/Footer';
import { IoIosArrowDropright,IoIosArrowDropleft} from "react-icons/io";




function Homepage() {
  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <IoIosArrowDropright />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <IoIosArrowDropleft />
      </div>
    );
  };

  const [imageIndex, setImageIndex] = useState(0);

  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: "20%",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
  };

const navigate = useNavigate();

const handleNav=({idx})=>{
  navigate(navtext[idx]);
}

const images = [icon1, icon2, icon4];
const buttons = ["Find your Bus", "Fleet Health Check", "Generate Ticket"];
const navtext = ['/bus-estimation', '/fleet', '/ticketgen'];
const sentences = [
  "Figure out the best bus for your route in no time !",
  "Keep your buses running smoothly with a quick health check !",
  "Easily generate your travel ticket."
];



return (
  <>
    <Slider {...settings} style={{}}>
      {images.map((img, idx) => (
        <div key={idx} className={idx === imageIndex ? "slide activeSlide" : "slide"} style={{ background: '#000' }}>
          <div className='bgslide' style={{ display: 'flex', alignItems: 'center', padding: '20px' }}>
            <img src={img} alt={`icon-${idx}`} style={{ width: '300px', height: '300px', marginRight: '20px', marginLeft:'30px' }} />
            <div style={{ color: '#fff' }}>
              <p style={{ fontSize:'30px'}}>{sentences[idx]}</p>
              <button onClick={() => handleNav({ idx })} className='buttonx' style={{ marginTop: '150px' }}>{buttons[idx]}</button>
            </div>
          </div>
        </div>
      ))}
    </Slider>
 

  <div className="containerss">
    <div className="left">
       {/* <MapComponent /> */}
      <img src={maps} alt="icon1" style={{height:'400px',width:'650px',borderRadius:'20px',boxShadow:'inherit',margin:'20px',fontColor:'#fff'}}/>
    </div>
    <div className="right">
      <h2 style={{marginLeft:'10px',color:'#ffffff'}}>About Us</h2>
      <p className="poppins-regular" style={{
        
        fontSize: '16px',
        lineHeight: '1.9',
        color:'#ffffff'
        
      }}>
        Welcome to MyBus!<br></br>

         MyBus, the Hubballi-Dharwad project, is a Special Purpose Vehicle for the rapid transit system between Hubballi and Dharwad. Our goal is safe, affordable, and sustainable transport for all commuters, focusing on the needs of underserved groups like children, persons with disabilities, and the elderly. Committed to providing fast, reliable, and comfortable travel, Namma Bus estimates daily needs and monitors real-time capacity aiming to make public transport safer and more accessible. Embark on adventures with Namma Bus - where every mile is a memory, your trusted partner for safe journeys.
      </p>
    </div>
  </div>
  <Footer /> 
</>

);
}

export default Homepage;

