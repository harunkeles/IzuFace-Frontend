import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import LeftSideMenu from '../../../components/leftSide/LeftSideMenu'
import Loading from '../../../components/loading/loading';
import deneme from '../../../assets/img/others/effect2.png'
import dark_up_unvote_icon from '../../../assets/img/icons/reactions_card_icons/dark_up_unvote_icon.png'
import dark_up_vote_icon from '../../../assets/img/icons/reactions_card_icons/dark_up_vote_icon.png'
import light_up_vote_icon from '../../../assets/img/icons/reactions_card_icons/light_up_vote_icon.png'
import light_up_unvote_icon from '../../../assets/img/icons/reactions_card_icons/light_up_unvote_icon.png'
import Navbar from '../../../components/navbar/Navbar';


import Moment from 'moment';
import 'moment/locale/tr'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Grid, Pagination, Navigation } from 'swiper';
import { Filtered_Last_Posts_Api, Login_Api, MainCategories_Api, Patch_SinglePost_Api, SinglePost_Api, UserRank_Api } from '../../../apis/Api';
import { login } from '../../../stores/authSlice';
SwiperCore.use([Grid, Pagination]);


const All_Posts = () => {

    const dispatch = useDispatch()
    const [posts, setPosts] = useState({});
    const [categories, setcategories] = useState({});
    const [isPageReady, setIsPageReady] = useState(false);
    const authUser = useSelector(state => state.auth.authUser)
    const site_settings = useSelector(state => state.siteSettings.site_settings)


    const getApis = async () => {

        await MainCategories_Api()
            .then(res => {
                setcategories(res.data);
            }).catch(error => { setIsPageReady(false) })

        await Filtered_Last_Posts_Api()
            .then(res => {
                setPosts(res.data);
            }).catch(error => { setIsPageReady(false) })

        setIsPageReady(true)
    }


    useEffect(() => {
        getApis()
    }, []);


    const onClickLikeButton = async (postID) => {

        await SinglePost_Api(postID)
        .then( async (res) => {
            let this_post_liked_user = res.data.likes
            

            //* Giriş yapmış olan kullanıcının id'si bu postu beğenen kişi id'leri içinde varmı
            if (this_post_liked_user.find(val => val === authUser.user_id)){
                
                //* ilk önce kişinin listede ki index numarasını bulduk
                var index = this_post_liked_user.indexOf(authUser.user_id);
                this_post_liked_user.splice(index, 1);
                
                //* Giriş yapmış kişinin id'sini listeden çıkardık
                var data = {
                    'likes': this_post_liked_user 
                }
                await Patch_SinglePost_Api(postID,data)

                await Filtered_Last_Posts_Api()
                .then(val => {
                    setPosts(val.data);
                })
                
                await UserRank_Api()
                var lclStorage = JSON.parse(localStorage.getItem('lclStorage'))
                await Login_Api()
                .then(val => {
                    lclStorage.authUser = val.data;
                    localStorage.setItem('lclStorage' , JSON.stringify(lclStorage))
                    dispatch(login(lclStorage.authUser))
                })


            } else {
                
                //* Giriş yapmış kişinin id'sini listeye ekledik
                this_post_liked_user.push(authUser.user_id);

                var data = {
                    'likes': this_post_liked_user 
                }
                await Patch_SinglePost_Api(postID,data)

                await Filtered_Last_Posts_Api()
                .then(val => {
                    setPosts(val.data);
                })
                
                await UserRank_Api()
                var lclStorage = JSON.parse(localStorage.getItem('lclStorage'))
                await Login_Api()
                .then(val => {
                    lclStorage.authUser = val.data;
                    localStorage.setItem('lclStorage' , JSON.stringify(lclStorage))
                    dispatch(login(lclStorage.authUser))
                })


            }

        })
        .catch(error => console.log(error))

    };



    return (
        <>
            {!isPageReady ?
                <div>
                    <Loading />
                </div>
                : (
                    <>
                        <div id="allPostPage">
                            <Navbar />
                            <div className="allPostPage__cover">
                                <LeftSideMenu />
                                <div className="allPostPage__middle__side__contents">
                                    <div className="middle__side__cover">
                                        {/* <Search/> */}
                                        <div className="slider-part">
                                            <div className="featured_posts">
                                                <div className="featured_posts_cover">
                                                    <div className="featured_post_title">
                                                        <div className="title">
                                                            <img alt="" src="https://img.icons8.com/glyph-neue/40/3A4F7E/line-chart.png" />
                                                            <span>Öne Çıkan</span> Gönderiler
                                                        </div>
                                                        <div className="left-right-buttons">
                                                            <div className="swiper-button-prev">
                                                                <img alt="" src="https://img.icons8.com/ios-glyphs/50/E5433F/circled-left.png" />
                                                            </div>
                                                            <div className="swiper-button-next">
                                                                <img alt="" src="https://img.icons8.com/ios-glyphs/50/233B55/circled-right.png" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Swiper
                                                        onInit={(featured__posts__swipper) => {
                                                            featured__posts__swipper.params.navigation.prevEl = "#allPostPage .featured_posts .swiper-button-prev";
                                                            featured__posts__swipper.params.navigation.nextEl = "#allPostPage .featured_posts .swiper-button-next";
                                                            featured__posts__swipper.navigation.init();
                                                            featured__posts__swipper.navigation.update();
                                                        }}
                                                        breakpoints={{
                                                            640: {
                                                                slidesPerView: 1,
                                                                spaceBetween: 20,
                                                            },
                                                            768: {
                                                                slidesPerView: 1,
                                                                spaceBetween: 20,
                                                            },
                                                            900: {
                                                                slidesPerView: 2,
                                                                spaceBetween: 10,
                                                            },
                                                            1100: {
                                                                slidesPerView: 2,
                                                                spaceBetween: 20,
                                                            },
                                                            1500: {
                                                                slidesPerView: 2,
                                                                spaceBetween: 50,
                                                            },
                                                            1700: {
                                                                slidesPerView: 3,
                                                                spaceBetween: 20,
                                                            },
                                                            2200: {
                                                                slidesPerView: 4,
                                                                spaceBetween: 20,
                                                            }
                                                        }}
                                                        modules={[Navigation, Pagination]}
                                                        slidesPerView={3}
                                                        grid={{ "rows": 1 }}
                                                        spaceBetween={30}
                                                        freeMode="true"
                                                        className="swiper mySwiper featured__posts__swipper">
                                                        <div className="swiper-wrapper">
                                                            {Object.values(posts).map((post, index) => {
                                                                return (
                                                                    <SwiperSlide key={post.id} className="swiper-slide post_card animate__animated animate__flipInX">
                                                                        <div className="card-content">
                                                                            <div className="card-img">
                                                                                <img alt="" src={post.image} />
                                                                            </div>
                                                                            <div className="card-title">
                                                                                <a href={`/posts/${post.id}`} >{post.title}</a>
                                                                            </div>
                                                                            <a href={`/std/@${post.post_owner.username}`} className="card-info">
                                                                                <div className="user-img">
                                                                                    <img src={"http://127.0.0.1:8000/media/" + post.post_owner['profImage']} alt="" />
                                                                                </div>
                                                                                <div className="info">
                                                                                    <div className="user-name">
                                                                                        {post.post_owner['full_name']}
                                                                                    </div>
                                                                                    <div className="small-info">
                                                                                        {Moment(post.created_date, 'YYYYMMDD').fromNow()} &middot; {post.read_time} dk okuma
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                        <div className="card-interactive">

                                                                            {(() => {

                                                                                if (post.likes.find(user_id => user_id === authUser.user_id)) {
                                                                                    return (
                                                                                        <div className="up if_post_liked" onClick={() => onClickLikeButton(post.id, this)}>
                                                                                            <img alt="" src={site_settings.dark_theme ? dark_up_vote_icon : light_up_vote_icon} />
                                                                                            <span
                                                                                                style={{ color: `var(--theme_post_card_interactive_up_vote)` }}>
                                                                                                {post.likes.length}
                                                                                            </span>
                                                                                        </div>
                                                                                    )
                                                                                } else {
                                                                                    return (
                                                                                        <div className="up" onClick={() => onClickLikeButton(post.id, this)}>
                                                                                            <img alt="" src={site_settings.dark_theme ? dark_up_unvote_icon : light_up_unvote_icon} />
                                                                                            <span style={{ color: "var(--theme_post_card_interactive_up_unvote)" }}>{post.likes.length}</span>
                                                                                        </div>
                                                                                    )
                                                                                }

                                                                            })()}

                                                                            <div className="comment">
                                                                                <img alt=""
                                                                                    src={site_settings.dark_theme ? "https://img.icons8.com/fluency-systems-filled/20/A8B3CF/comments--v2.png" : "https://img.icons8.com/fluency-systems-filled/20/233B55/comments--v2.png"} />
                                                                                <span>5</span>
                                                                            </div>
                                                                            <div className="bookmark">
                                                                                <img alt=""
                                                                                    src={site_settings.dark_theme ? "https://img.icons8.com/fluency-systems-filled/21/A8B3CF/bookmark-ribbon.png" : "https://img.icons8.com/fluency-systems-filled/21/233B55/bookmark-ribbon.png"} />
                                                                            </div>
                                                                        </div>
                                                                    </SwiperSlide>
                                                                )
                                                            }
                                                            )}
                                                        </div>
                                                    </Swiper>
                                                </div>
                                            </div>
                                            <div className="trend_posts">
                                                <div className="trend_posts_cover">
                                                    <div className="trend_post_title">
                                                        <div className="title">
                                                            <img alt="" src="https://img.icons8.com/plumpy/40/000000/features-list.png" />
                                                            <span>Trend</span> Gönderiler
                                                        </div>
                                                        <div className="left-right-buttons">
                                                            <div className="swiper-button-prev">
                                                                <img alt="" src="https://img.icons8.com/ios-glyphs/50/E5433F/circled-left.png" />
                                                            </div>
                                                            <div className="swiper-button-next">
                                                                <img alt="" src="https://img.icons8.com/ios-glyphs/50/233B55/circled-right.png" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Swiper
                                                        onInit={(trend__posts__swipper) => {
                                                            trend__posts__swipper.params.navigation.prevEl = "#allPostPage .trend_posts .swiper-button-prev";
                                                            trend__posts__swipper.params.navigation.nextEl = "#allPostPage .trend_posts .swiper-button-next";
                                                            trend__posts__swipper.navigation.init();
                                                            trend__posts__swipper.navigation.update();
                                                        }}
                                                        breakpoints={{
                                                            640: {
                                                                slidesPerView: 1,
                                                                spaceBetween: 20,
                                                            },
                                                            768: {
                                                                slidesPerView: 1,
                                                                spaceBetween: 20,
                                                            },
                                                            900: {
                                                                slidesPerView: 2,
                                                                spaceBetween: 10,
                                                            },
                                                            1100: {
                                                                slidesPerView: 2,
                                                                spaceBetween: 20,
                                                            },
                                                            1500: {
                                                                slidesPerView: 2,
                                                                spaceBetween: 50,
                                                            },
                                                            1700: {
                                                                slidesPerView: 3,
                                                                spaceBetween: 20,
                                                            },
                                                            2200: {
                                                                slidesPerView: 4,
                                                                spaceBetween: 20,
                                                            }
                                                        }}
                                                        modules={[Navigation, Pagination]}
                                                        slidesPerView={3}
                                                        grid={{ "rows": 1 }}
                                                        spaceBetween={30}
                                                        freeMode="true"
                                                        className="swiper mySwiper trend__posts__swipper">
                                                        <div className="swiper-wrapper">
                                                            {Object.values(posts).map((post, index) => {
                                                                return (
                                                                    <SwiperSlide key={post.id} className="swiper-slide post_card animate__animated animate__flipInX">
                                                                        <div className="card-content">
                                                                            <div className="card-img">
                                                                                <img alt="" src={post.image} />
                                                                            </div>
                                                                            <div className="card-title">
                                                                                <a href={`/posts/${post.id}`} >{post.title}</a>
                                                                            </div>
                                                                            <a href={`/std/@${post.post_owner.username}`} className="card-info">
                                                                                <div className="user-img">
                                                                                    <img src={"http://127.0.0.1:8000/media/" + post.post_owner['profImage']} alt="" />
                                                                                </div>
                                                                                <div className="info">
                                                                                    <div className="user-name">
                                                                                        {post.post_owner['full_name']}
                                                                                    </div>
                                                                                    <div className="small-info">
                                                                                        {Moment(post.created_date, 'YYYYMMDD').fromNow()} &middot; {post.read_time} dk okuma
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                        <div className="card-interactive">

                                                                            {(() => {

                                                                                if (post.likes.find(user_id => user_id === authUser.user_id)) {
                                                                                    return (
                                                                                        <div className="up if_post_liked" onClick={() => onClickLikeButton(post.id, this)}>
                                                                                            <img alt="" src={site_settings.dark_theme ? dark_up_vote_icon : light_up_vote_icon} />
                                                                                            <span
                                                                                                style={{ color: `var(--theme_post_card_interactive_up_vote)` }}>
                                                                                                {post.likes.length}
                                                                                            </span>
                                                                                        </div>
                                                                                    )
                                                                                } else {
                                                                                    return (
                                                                                        <div className="up" onClick={() => onClickLikeButton(post.id, this)}>
                                                                                            <img alt="" src={site_settings.dark_theme ? dark_up_unvote_icon : light_up_unvote_icon} />
                                                                                            <span style={{ color: "var(--theme_post_card_interactive_up_unvote)" }}>{post.likes.length}</span>
                                                                                        </div>
                                                                                    )
                                                                                }

                                                                            })()}

                                                                            <div className="comment">
                                                                                <img alt=""
                                                                                    src={site_settings.dark_theme ? "https://img.icons8.com/fluency-systems-filled/20/A8B3CF/comments--v2.png" : "https://img.icons8.com/fluency-systems-filled/20/233B55/comments--v2.png"} />
                                                                                <span>5</span>
                                                                            </div>
                                                                            <div className="bookmark">
                                                                                <img alt=""
                                                                                    src={site_settings.dark_theme ? "https://img.icons8.com/fluency-systems-filled/21/A8B3CF/bookmark-ribbon.png" : "https://img.icons8.com/fluency-systems-filled/21/233B55/bookmark-ribbon.png"} />
                                                                            </div>
                                                                        </div>
                                                                    </SwiperSlide>
                                                                )
                                                            }
                                                            )}
                                                        </div>
                                                    </Swiper>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="all-posts-part">
                                            <div className="all-posts-cover">
                                                <div className='search_and_categories' >
                                                    <div className='search_and_categories_bg' style={{ background: `url(${deneme}) top no-repeat,linear-gradient(0deg, #E5433F 90%, #8B2232)` }}></div>
                                                    <div className="search-bar">
                                                        <form role="search">
                                                            <input id="search" type="search" placeholder="Aramak istadiğiniz birşey yazın..."
                                                                autoFocus />
                                                            <button type="submit">Ara</button>
                                                        </form>
                                                    </div>
                                                    <div className="category-slider">
                                                        <Swiper
                                                            onInit={(main_page_last_posts) => {
                                                                main_page_last_posts.params.navigation.prevEl = "#allPostPage .all-posts-part .swiper-button-prev";
                                                                main_page_last_posts.params.navigation.nextEl = "#allPostPage .all-posts-part .swiper-button-next";
                                                                main_page_last_posts.navigation.init();
                                                                main_page_last_posts.navigation.update();
                                                            }}
                                                            modules={[Navigation, Pagination]}
                                                            slidesPerView={"auto"}
                                                            grid={{ "rows": 1 }}
                                                            spaceBetween={30}
                                                            freeMode="true"
                                                            className="swiper mySwiper all__posts__categories">
                                                            <div className="swiper-wrapper">
                                                                {Object.values(categories).map((category) => {
                                                                    return (
                                                                        <SwiperSlide key={category.id} className="swiper-slide">
                                                                            <a href="/#" className="cover">
                                                                                <span>{category.title}</span>
                                                                            </a>
                                                                        </SwiperSlide>
                                                                    )
                                                                })}
                                                            </div>
                                                        </Swiper>
                                                        <div className="swiper-button-next">
                                                            <i className="fas fa-angle-double-right"></i>
                                                        </div>
                                                        <div className="swiper-button-prev">
                                                            <i className="fas fa-angle-double-left"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="all-posts">
                                                    <div className="all-posts-cover">
                                                        {Object.values(posts).map((post, index) => {
                                                            return (
                                                                <div key={index} className="post_card ">
                                                                    <Swiper
                                                                        slidesPerView={"auto"}
                                                                        spaceBetween={20}
                                                                        freeMode="true"
                                                                        className="swiper mySwiper post_card_tags">
                                                                        <div className="swiper-wrapper">
                                                                            {Object.entries(post.tag).map((tag, index) => {
                                                                                return (
                                                                                    <SwiperSlide key={index} className="swiper-slide">
                                                                                        <div className="swiper-slide">
                                                                                            <a href="/#">
                                                                                                <span style={{ color: tag[1][1] }}>#</span>
                                                                                                {tag[1][0]}
                                                                                            </a>
                                                                                        </div>
                                                                                    </SwiperSlide>
                                                                                )
                                                                            }
                                                                            )}
                                                                        </div>
                                                                    </Swiper>
                                                                    <div className="card-header">
                                                                        <a href={`/std/@${post.post_owner.username}`} className="user-info">
                                                                            <div className="user-img">
                                                                                <img src={"http://127.0.0.1:8000/media/" + Object.values(post.post_owner)[3]} alt="" />
                                                                            </div>
                                                                            <div className="user-name">
                                                                                {
                                                                                    Object.values(post.post_owner)[1]
                                                                                }
                                                                            </div>
                                                                        </a>
                                                                        <div className="more">
                                                                            <i className="fas fa-ellipsis-v"></i>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card-body-content">
                                                                        <a className="card-title" href={`/posts/${post.id}`} >{post.title}</a>
                                                                        <div className="time-info">
                                                                            {Moment(post.created_date, 'YYYYMMDD').fromNow()} &middot; {post.read_time} dk okuma
                                                                        </div>
                                                                    </div>
                                                                    <div className="card-body-img">
                                                                        <div className="bg-blur"></div>
                                                                        <div className="post-category">
                                                                            <a href="/#" className="sub-category">{post.subCategory}</a>
                                                                        </div>
                                                                        <img src={post.image} alt="" />
                                                                    </div>
                                                                    <div className="card-footer">

                                                                        {(() => {

                                                                            if (post.likes.find(user_id => user_id === authUser.user_id)) {
                                                                                return (
                                                                                    <div className="up if_post_liked" onClick={() => onClickLikeButton(post.id, this)}>
                                                                                        <img alt="" src={site_settings.dark_theme ? dark_up_vote_icon : light_up_vote_icon} />
                                                                                        <span
                                                                                            style={{ color: `var(--theme_post_card_interactive_up_vote)` }}>
                                                                                            {post.likes.length}
                                                                                        </span>
                                                                                    </div>
                                                                                )
                                                                            } else {
                                                                                return (
                                                                                    <div className="up" onClick={() => onClickLikeButton(post.id, this)}>
                                                                                        <img alt="" src={site_settings.dark_theme ? dark_up_unvote_icon : light_up_unvote_icon} />
                                                                                        <span style={{ color: "var(--theme_post_card_interactive_up_unvote)" }}>{post.likes.length}</span>
                                                                                    </div>
                                                                                )
                                                                            }

                                                                        })()}

                                                                        <div className="comment">
                                                                            <img alt=""
                                                                                src={site_settings.dark_theme ? "https://img.icons8.com/fluency-systems-filled/20/A8B3CF/comments--v2.png" : "https://img.icons8.com/fluency-systems-filled/20/233B55/comments--v2.png"} />
                                                                            <span>5</span>
                                                                        </div>
                                                                        <div className="bookmark">
                                                                            <img alt=""
                                                                                src={site_settings.dark_theme ? "https://img.icons8.com/fluency-systems-filled/21/A8B3CF/bookmark-ribbon.png" : "https://img.icons8.com/fluency-systems-filled/21/233B55/bookmark-ribbon.png"} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
        </>
    )
}


export default All_Posts





