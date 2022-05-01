import React, { useEffect, useState } from 'react'

import dark_news_icon from "../../assets/img/icons/news_icons/dark_news_icon.png"


import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Grid, Pagination, Navigation } from 'swiper';
import { Filtered_News_Api } from '../../apis/Api';
import MiniLoading from '../loading/miniLoading';
SwiperCore.use([Grid, Pagination]);

const News = () => {

    const [news, setNews] = useState(null);

    const getData = () => {
        Filtered_News_Api()
            .then(res => {
                setNews(res.data)
            })
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <>
            {news ?
                <div id="news-card-1">
                    <div className="news-title">
                        <div className="title">
                            <img alt='' src={dark_news_icon} />
                            <span>En Güncel</span> Haberler
                        </div>
                        <a href="/#" className="more">
                            <span>Daha fazla haber</span>
                            <i className="fas fa-angle-double-right"></i>
                        </a>
                    </div>
                    <div className='news_card_wrapper'>
                        <Swiper
                            onInit={(main_page_news_swiper) => {
                                main_page_news_swiper.params.navigation.prevEl = "#news-card-1 .swiper-button-prev";
                                main_page_news_swiper.params.navigation.nextEl = "#news-card-1 .swiper-button-next";
                                main_page_news_swiper.navigation.init();
                                main_page_news_swiper.navigation.update();
                            }}

                            modules={[Navigation, Pagination]}
                            slidesPerView={3}
                            grid={{ "rows": 2 }}
                            // spaceBetween={10} 
                            pagination={{ "clickable": true }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                    grid: { "rows": 2 }
                                },
                                768: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                    grid: { "rows": 2 }
                                },
                                900: {
                                    slidesPerView: 2,
                                    spaceBetween: 10,
                                    grid: { "rows": 2 }
                                },
                                1100: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                    grid: { "rows": 2 }
                                },
                                1500: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                    grid: { "rows": 2 }
                                },
                                1700: {
                                    slidesPerView: 3,
                                    spaceBetween: 20,
                                    grid: { "rows": 2 }
                                },
                                2200: {
                                    slidesPerView: 3,
                                    spaceBetween: 30,
                                    grid: { "rows": 2 }
                                }
                            }}
                            freeMode="true"
                            className="swiper mySwiper m-p-news">
                            <div className="swiper-wrapper">

                                {Object.values(news).map((value, index) => {
                                    return (
                                        <SwiperSlide key={index} className={`swiper-slide ` + index}>
                                            <a href="/#">
                                                <img src={value.image} alt="" />
                                                <div className="bg-blur"></div>
                                                <div className="slide-content">
                                                    <div className="category">
                                                        {value.subCategory}
                                                    </div>
                                                    <div className="title">
                                                        {value.title}
                                                    </div>
                                                </div>
                                            </a>
                                        </SwiperSlide>
                                    )
                                })}
                            </div>
                            <div className="swiper-button-prev">
                                <img alt='' className="left-arrow" src="https://img.icons8.com/external-those-icons-fill-those-icons/15/ffffff/external-left-arrows-those-icons-fill-those-icons-5.png" />
                            </div>
                            <div className="swiper-button-next">
                                <img alt='' className="right-arrow" src="https://img.icons8.com/external-those-icons-fill-those-icons/15/ffffff/external-left-arrows-those-icons-fill-those-icons-5.png" />
                            </div>
                            <div className="swiper-pagination"></div>
                        </Swiper>
                    </div>
                </div>
                :
                <MiniLoading />
            }
        </>
    )
}



export default News