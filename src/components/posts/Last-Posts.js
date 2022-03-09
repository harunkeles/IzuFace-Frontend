import React, { Component} from 'react'
import { connect } from 'react-redux';

import dark_all_post_icon from "../../assets/img/icons/all_post_icons/dark_all_post_icon.png"
import light_all_post_icon from "../../assets/img/icons/all_post_icons/light_all_post_icon.png"


import Moment from 'moment';
import 'moment/locale/tr'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Grid,Pagination,Navigation} from 'swiper';
SwiperCore.use([Grid,Pagination]);


class LastPosts extends Component {


    render() {
        const {posts} = this.props;
        Moment.locale('tr') //For Turkey
        return (
            <>
                <div id='main_page_last_posts' className="last__post__summary__row">
                    <div className="all_post_cover">
                        <div className="all_post_title">
                            <div className="title">
                                <img alt='' src={this.props.theme.dark ? dark_all_post_icon : light_all_post_icon} />
                                <span>Dumanı Üstünde</span> Gönderiler
                            </div>
                            <div className="left-right-buttons">
                                <div className="swiper-button-prev">
                                    <img alt='' src="https://img.icons8.com/ios-glyphs/50/E5433F/circled-left.png" />
                                </div>
                                <div className="swiper-button-next">
                                    <img alt='' src="https://img.icons8.com/ios-glyphs/50/233B55/circled-right.png" />
                                </div>
                            </div>
                        </div>

                        <Swiper 
                            onInit={(main_page_last_posts) => {
                                main_page_last_posts.params.navigation.prevEl = "#main_page_last_posts.last__post__summary__row .left-right-buttons .swiper-button-prev";
                                main_page_last_posts.params.navigation.nextEl = "#main_page_last_posts.last__post__summary__row .left-right-buttons .swiper-button-next";
                                main_page_last_posts.navigation.init();
                                main_page_last_posts.navigation.update();
                            }}
                            modules={[Navigation, Pagination]}
                            slidesPerView={3} 
                            grid={{ "rows": 1}} 
                            spaceBetween={30} 
                            id="last__posts__swipper" 
                            className="swiper mySwiper all_post_content">

                                <div className="swiper-wrapper">
                                    {Object.values(posts).map((value, index) => {
                                        return (
                                                <SwiperSlide key={index} className="swiper-slide">
                                                    <div className="swiper-slide post_card">
                                                        <div className="card-content">
                                                            <div className="card-img">
                                                                <img src={value.image} alt="" />
                                                            </div>
                                                            <div className="card-title">
                                                                <a href="/#">{value.title}</a>
                                                            </div>
                                                            <div className="card-desc">
                                                                {value.subTitle}
                                                            </div>
                                                        </div>
                                                        <div className="card-info">
                                                            <div className="user-img">
                                                                <img src={value.image} alt="" />
                                                            </div>
                                                            <div className="info">
                                                                <div className="user-name">
                                                                    {Object.values(value.post_owner)[1]}
                                                                </div>
                                                                <div className="small-info">
                                                                {Moment(value.created_date,'YYYYMMDD').fromNow()} &middot; 6 dk okuma
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide> 
                                        )
                                    })}
                                </div>
                        </Swiper>

                    </div>
                </div>
            </>
        )
    }
}


const mapStateToProps = state => ({
    theme: state.theme,
    user: state.auth
})


export default connect(mapStateToProps)(LastPosts)