import React, { useState } from 'react';
import Loading from '../../../../components/loading/loading';
import football_page_main_img from '../../../../assets/img/bg_images/sports_page_images/football_page_main_img.png';
import rank_icon from '../../../../assets/img/icons/main_icons/rank_icon.png';
import calendar_icon from '../../../../assets/img/icons/main_icons/calendar_icon.png';
import Admin_Resim from '../../../../assets/img/others/Admin_Resim.jpg';
import upvote_icon from '../../../../assets/img/icons/main_icons/upvote_icon.png'
import read_more from '../../../../assets/img/icons/main_icons/read_more.png'
import izuspor from '../../../../assets/img/aaa.png'
import { routes } from '../../../../routes';


import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Grid, Pagination, Navigation } from 'swiper';
import Menu from '../../../../components/menu/menu';
SwiperCore.use([Grid, Pagination]);



function Football() {

  const [isPageReady, setIsPageReady] = useState(true);


  return <>
    {
      !isPageReady ?
        <Loading />
        :
        <>
          <Menu/> 
          <div id='sport_football'>
            <div className='sport_football_cover'>
              <div className='football_image_part'>
                <div className='image_part'>
                  <div className='bg_blur'></div>
                  <img alt='football' src={football_page_main_img} className='football_image' />
                </div>
                <div className='content'>
                  <div className='header'>
                    İzü’de Spor Birimi
                  </div>
                  <div className='small_desc'>
                    Üniversitenin etkinliklerinden yararlanmak için randevu alabilirsiniz.
                  </div>
                  <a href={routes.sports.football_appointment.path} className='btn'>
                    Halı saha randevusu al
                  </a>
                  <a href={routes.sports.healt.path} className='btn right' >
                    Sağlıklı yaşam randevusu al
                  </a>
                </div>
              </div>
              <div className='announcement_part'>
                <div className='title'>Duyurular</div>
                <div className='announcement_part_wrapper'>
                  <Swiper
                    onInit={(sport_football_announcement_part) => {
                      sport_football_announcement_part.params.navigation.prevEl = "#sport_football .swiper-button-prev";
                      sport_football_announcement_part.params.navigation.nextEl = "#sport_football .swiper-button-next";
                      sport_football_announcement_part.navigation.init();
                      sport_football_announcement_part.navigation.update();
                    }}

                    modules={[Navigation, Pagination]}
                    slidesPerView={2}
                    grid={{ "rows": 2 }}
                    // spaceBetween={10} 
                    pagination={{ "clickable": true }}
                    freeMode="true"
                    className="swiper mySwiper sport_football_announcement_part">
                    <div className="swiper-wrapper">

                      <SwiperSlide>
                        <a href={routes.sports.football.path}>
                          <div className="slide-content">
                            <div className="date">
                              15<br />Şubat
                            </div>
                            <div className="content">
                              İzu futbol turnuvası için son başvuruları alıyoruz.
                            </div>
                          </div>
                        </a>
                      </SwiperSlide>
                      <SwiperSlide>
                        <a href={routes.sports.football.path}>
                          <div className="slide-content">
                            <div className="date">
                              15<br />Şubat
                            </div>
                            <div className="content">
                              İzu futbol turnuvası için son başvur...
                            </div>
                          </div>
                        </a>
                      </SwiperSlide>
                      <SwiperSlide>
                        <a href={routes.sports.football.path}>
                          <div className="slide-content">
                            <div className="date">
                              15<br />Şubat
                            </div>
                            <div className="content">
                              İzu futbol turnuvası için son başvur...
                            </div>
                          </div>
                        </a>
                      </SwiperSlide>
                      <SwiperSlide>
                        <a href={routes.sports.football.path}>
                          <div className="slide-content">
                            <div className="date">
                              15<br />Şubat
                            </div>
                            <div className="content">
                              İzu futbol turnuvası için son başvur...
                            </div>
                          </div>
                        </a>
                      </SwiperSlide>
                      <SwiperSlide>
                        <a href={routes.sports.football.path}>
                          <div className="slide-content">
                            <div className="date">
                              15<br />Şubat
                            </div>
                            <div className="content">
                              İzu futbol turnuvası için son başvur...
                            </div>
                          </div>
                        </a>
                      </SwiperSlide>
                      <SwiperSlide>
                        <a href={routes.sports.football.path}>
                          <div className="slide-content">
                            <div className="date">
                              15<br />Şubat
                            </div>
                            <div className="content">
                              İzu futbol turnuvası için son başvur...
                            </div>
                          </div>
                        </a>
                      </SwiperSlide>
                      <SwiperSlide>
                        <a href={routes.sports.football.path}>
                          <div className="slide-content">
                            <div className="date">
                              15<br />Şubat
                            </div>
                            <div className="content">
                              İzu futbol turnuvası için son başvur...
                            </div>
                          </div>
                        </a>
                      </SwiperSlide>

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
              <div className='football_posts'>
                <div className='title'>İzü Futbol Gönderileri</div>
                <div className='football_posts_wrapper'>
                  <div className='post_card'>
                    <div className='content'>
                      <div className='left_side'>
                        <img alt='' src={football_page_main_img} />
                      </div>
                      <div className='right_side'>
                        <div className='header'>
                          İzu futbol turnuvası için son başvurları nasıl yapılabilir ?
                        </div>
                        <div className='desc'>
                          İzu futbol turnuvası için son başvurları nasıl yapılacağı hakkında bilgi vermek istiyoruz. İlk önce izu.com sitesinden ziyaret edip giriş yapmanız gerekmektedi. Sonrasında verilen adımaları tek tek izleyerek yapabilirsin ama bilgilerini girerken dikkat et tek izleyerek yapabilirsin ama bilgilerini girerken dikkat et</div>
                      </div>
                    </div>
                    <div className='post_info'>
                      <div className='category'>
                        Futbol
                      </div>
                      <div className='post_rank'>
                        <img alt='' src={rank_icon} />
                        <span> 135 RT </span>
                      </div>
                      <div className='post_vote'>
                        <img alt='' src={upvote_icon} />
                        <span> 158 </span>
                      </div>
                      <div className='post_date'>
                        <img alt='' src={calendar_icon} />
                        <span> 12 Şubat 2022 </span>
                      </div>
                    </div>
                    <div className='post_footer'>
                      <div className='post_user'>
                        <div className='user_img'>
                          <img alt='' src={Admin_Resim} />
                        </div>
                        <div className='user_info'>
                          <div className='user_name'>
                            Merve Kuru
                          </div>
                          <div className='more'>
                            6 dakikalık okuma
                          </div>
                        </div>
                      </div>
                      <a href={routes.sports.football.path} className='post_button'>
                        <span> DETAY </span>
                        <img alt='' src={read_more} />
                        <img alt='' src={read_more} />
                        <img alt='' src={read_more} />
                      </a>
                    </div>
                  </div>
                  <div className='post_card'>
                    <div className='content'>
                      <div className='left_side'>
                        <img alt='' src={football_page_main_img} />
                      </div>
                      <div className='right_side'>
                        <div className='header'>
                          İzu futbol turnuvası için son başvurları nasıl yapılabilir ?
                        </div>
                        <div className='desc'>
                          İzu futbol turnuvası için son başvurları nasıl yapılacağı hakkında bilgi vermek istiyoruz. İlk önce izu.com sitesinden ziyaret edip giriş yapmanız gerekmektedi. Sonrasında verilen adımaları tek tek izleyerek yapabilirsin ama bilgilerini girerken dikkat et tek izleyerek yapabilirsin ama bilgilerini girerken dikkat et</div>
                      </div>
                    </div>
                    <div className='post_info'>
                      <div className='category'>
                        Futbol
                      </div>
                      <div className='post_rank'>
                        <img alt='' src={rank_icon} />
                        <span> 135 RT </span>
                      </div>
                      <div className='post_vote'>
                        <img alt='' src={upvote_icon} />
                        <span> 158 </span>
                      </div>
                      <div className='post_date'>
                        <img alt='' src={calendar_icon} />
                        <span> 12 Şubat 2022 </span>
                      </div>
                    </div>
                    <div className='post_footer'>
                      <div className='post_user'>
                        <div className='user_img'>
                          <img alt='' src={Admin_Resim} />
                        </div>
                        <div className='user_info'>
                          <div className='user_name'>
                            Merve Kuru
                          </div>
                          <div className='more'>
                            6 dakikalık okuma
                          </div>
                        </div>
                      </div>
                      <a href={routes.sports.football.path} className='post_button'>
                        <span> DETAY </span>
                        <img alt='' src={read_more} />
                        <img alt='' src={read_more} />
                        <img alt='' src={read_more} />
                      </a>
                    </div>
                  </div>
                  <div className='post_card'>
                    <div className='content'>
                      <div className='left_side'>
                        <img alt='' src={football_page_main_img} />
                      </div>
                      <div className='right_side'>
                        <div className='header'>
                          İzu futbol turnuvası için son başvurları nasıl yapılabilir ?
                        </div>
                        <div className='desc'>
                          İzu futbol turnuvası için son başvurları nasıl yapılacağı hakkında bilgi vermek istiyoruz. İlk önce izu.com sitesinden ziyaret edip giriş yapmanız gerekmektedi. Sonrasında verilen adımaları tek tek izleyerek yapabilirsin ama bilgilerini girerken dikkat et tek izleyerek yapabilirsin ama bilgilerini girerken dikkat et</div>
                      </div>
                    </div>
                    <div className='post_info'>
                      <div className='category'>
                        Futbol
                      </div>
                      <div className='post_rank'>
                        <img alt='' src={rank_icon} />
                        <span> 135 RT </span>
                      </div>
                      <div className='post_vote'>
                        <img alt='' src={upvote_icon} />
                        <span> 158 </span>
                      </div>
                      <div className='post_date'>
                        <img alt='' src={calendar_icon} />
                        <span> 12 Şubat 2022 </span>
                      </div>
                    </div>
                    <div className='post_footer'>
                      <div className='post_user'>
                        <div className='user_img'>
                          <img alt='' src={Admin_Resim} />
                        </div>
                        <div className='user_info'>
                          <div className='user_name'>
                            Merve Kuru
                          </div>
                          <div className='more'>
                            6 dakikalık okuma
                          </div>
                        </div>
                      </div>
                      <a href={routes.sports.football.path} className='post_button'>
                        <span> DETAY </span>
                        <img alt='' src={read_more} />
                        <img alt='' src={read_more} />
                        <img alt='' src={read_more} />
                      </a>
                    </div>
                  </div>
                  <div className='post_card'>
                    <div className='content'>
                      <div className='left_side'>
                        <img alt='' src={football_page_main_img} />
                      </div>
                      <div className='right_side'>
                        <div className='header'>
                          İzu futbol turnuvası için son başvurları nasıl yapılabilir ?
                        </div>
                        <div className='desc'>
                          İzu futbol turnuvası için son başvurları nasıl yapılacağı hakkında bilgi vermek istiyoruz. İlk önce izu.com sitesinden ziyaret edip giriş yapmanız gerekmektedi. Sonrasında verilen adımaları tek tek izleyerek yapabilirsin ama bilgilerini girerken dikkat et tek izleyerek yapabilirsin ama bilgilerini girerken dikkat et</div>
                      </div>
                    </div>
                    <div className='post_info'>
                      <div className='category'>
                        Futbol
                      </div>
                      <div className='post_rank'>
                        <img alt='' src={rank_icon} />
                        <span> 135 RT </span>
                      </div>
                      <div className='post_vote'>
                        <img alt='' src={upvote_icon} />
                        <span> 158 </span>
                      </div>
                      <div className='post_date'>
                        <img alt='' src={calendar_icon} />
                        <span> 12 Şubat 2022 </span>
                      </div>
                    </div>
                    <div className='post_footer'>
                      <div className='post_user'>
                        <div className='user_img'>
                          <img alt='' src={Admin_Resim} />
                        </div>
                        <div className='user_info'>
                          <div className='user_name'>
                            Merve Kuru
                          </div>
                          <div className='more'>
                            6 dakikalık okuma
                          </div>
                        </div>
                      </div>
                      <a href={routes.sports.football.path} className='post_button'>
                        <span> DETAY </span>
                        <img alt='' src={read_more} />
                        <img alt='' src={read_more} />
                        <img alt='' src={read_more} />
                      </a>
                    </div>
                  </div>
                  <div className='post_card'>
                    <div className='content'>
                      <div className='left_side'>
                        <img alt='' src={football_page_main_img} />
                      </div>
                      <div className='right_side'>
                        <div className='header'>
                          İzu futbol turnuvası için son başvurları nasıl yapılabilir ?
                        </div>
                        <div className='desc'>
                          İzu futbol turnuvası için son başvurları nasıl yapılacağı hakkında bilgi vermek istiyoruz. İlk önce izu.com sitesinden ziyaret edip giriş yapmanız gerekmektedi. Sonrasında verilen adımaları tek tek izleyerek yapabilirsin ama bilgilerini girerken dikkat et tek izleyerek yapabilirsin ama bilgilerini girerken dikkat et</div>
                      </div>
                    </div>
                    <div className='post_info'>
                      <div className='category'>
                        Futbol
                      </div>
                      <div className='post_rank'>
                        <img alt='' src={rank_icon} />
                        <span> 135 RT </span>
                      </div>
                      <div className='post_vote'>
                        <img alt='' src={upvote_icon} />
                        <span> 158 </span>
                      </div>
                      <div className='post_date'>
                        <img alt='' src={calendar_icon} />
                        <span> 12 Şubat 2022 </span>
                      </div>
                    </div>
                    <div className='post_footer'>
                      <div className='post_user'>
                        <div className='user_img'>
                          <img alt='' src={Admin_Resim} />
                        </div>
                        <div className='user_info'>
                          <div className='user_name'>
                            Merve Kuru
                          </div>
                          <div className='more'>
                            6 dakikalık okuma
                          </div>
                        </div>
                      </div>
                      <a href={routes.sports.football.path} className='post_button'>
                        <span> DETAY </span>
                        <img alt='' src={read_more} />
                        <img alt='' src={read_more} />
                        <img alt='' src={read_more} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </>
    }
  </>;
}

export default Football
