import React from 'react'
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade'
import foto from "../../assets/volta as aulas.jpg"
import "./style.css"

const Carousel = () => {
  return (
    <div className='ct-swiper'>
        <Swiper
      // install Swiper modules
      modules={[Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      effect="fade" // Adicione o efeito de fade
        fadeEffect={{ crossFade: true }} // Opção para melhorar o fade em alguns casos
        speed={1000} // Duração da transição em milissegundos
      autoplay={{delay: 6000, disableOnInteraction: false}}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide><img src={foto} alt="" srcset="" />
        <div className='text-swiper'>
            <h3>Volta às aulas!</h3>
            <p>sim muito legal</p>
        </div>  
      </SwiperSlide>
      <SwiperSlide><img src={foto} alt="" srcset="" /></SwiperSlide>
      <SwiperSlide><img src={foto} alt="" srcset="" /></SwiperSlide>
      <SwiperSlide><img src={foto} alt="" srcset="" /></SwiperSlide>
    </Swiper>
    </div>
  )
}

export {Carousel}
