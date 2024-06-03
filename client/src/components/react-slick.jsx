import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import {Container,Row, Col, Image} from "react-bootstrap"
import React, { Component } from "react";
import Slider from "react-slick";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        arrows:false,
     
      };
    return (
     
        
      <Container fluid>
              <Slider {...settings}>
        <Image src="../src/assets/images/banner-1.jpeg" alt=""/>
        <Image src="../src/assets/images/banner-2.jpeg" alt=""/>
        <Image src="../src/assets/images/banner-3.jpeg" alt=""/>
        <Image src="../src/assets/images/banner-4.jpeg" alt=""/>
        
        </Slider>
      </Container>
     
    );
  }
}