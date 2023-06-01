import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.css'

function PrevButton(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "block",
                width: "30px",
                height: "30px",
                position: "absolute",
                top: "50%",
                left: "15px",
                transform: "translateY(-50%)",
                zIndex: 1,
                cursor: "pointer"
            }}
            onClick={onClick}
        >

        </div>
    );
}

function NextButton(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                border: "none",
                width: "30px",
                height: "30px",
                position: "absolute",
                top: "50%",
                right: "15px",
                transform: "translateY(-50%)",
                zIndex: 1,
                cursor: "pointer"
            }}
            onClick={onClick}
        >
        </div>
    );
}


const slides = [
    {
        id: 1,
        imageUrl: '/images/slide2.png',
        title: 'Slide 1'
    },
    {
        id: 2,
        imageUrl: './images/slide1.png',
        title: 'Slide 2'
    },
    {
        id: 3,
        imageUrl: './images/slide3.png',
        title: 'Slide 3'
    },
    {
        id: 4,
        imageUrl: './images/slide4.png',
        title: 'Slide 4'
    },
    {
        id: 5,
        imageUrl: './images/slide5.png',
        title: 'Slide 5'
    }
];

const SlideLayout = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <Slider
            prevArrow={<PrevButton />}
            nextArrow={<NextButton />}
            {...settings}>
            {slides.map(slide => (
                <div key={slide.id} className='MySlide'>
                    <img src={slide.imageUrl} alt={slide.title} />
                </div>
            ))}
        </Slider>
    );
};

export default SlideLayout;
