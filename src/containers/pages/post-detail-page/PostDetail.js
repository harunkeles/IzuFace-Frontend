import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../../../components/loading/loading';
import { routes } from '../../../routes';
import { login } from '../../../stores/authSlice';
import { setPosts, setSinglePost } from '../../../stores/postSlice';
import { setDarkMode } from '../../../stores/themeSlice';
import Moment from 'moment';
import 'moment/locale/tr'

import light_logo from '../../../assets/img/icons/logo/light_logo.png';
import dark_logo from '../../../assets/img/icons/logo/dark_logo.png';
import home_page_icon_2 from '../../../assets/img/icons/home_page_icons/home_page_icon_2.png';
import bookmark from '../../../assets/img/icons/post_detail_icons/bookmark.png';
import brightness from '../../../assets/img/icons/post_detail_icons/brightness.png';
import comment_icon from '../../../assets/img/icons/post_detail_icons/comment_icon.png';
import like_icon_1 from '../../../assets/img/icons/post_detail_icons/like_icon_1.png';
import share from '../../../assets/img/icons/post_detail_icons/share.png';
import time_icon from '../../../assets/img/icons/post_detail_icons/time_icon.png';
import update_time_icon from '../../../assets/img/icons/post_detail_icons/update_time_icon.png';
import up_unvote from '../../../assets/img/icons/post_detail_icons/up_unvote.png';
import post_rank_icon from '../../../assets/img/icons/post_detail_icons/post_rank_icon.png';
import more_icon from '../../../assets/img/icons/post_detail_icons/more_icon.png';
import rank_icon from '../../../assets/img/icons/main_icons/rank_icon.png';
import like_icon from '../../../assets/img/icons/main_icons/like_icon.png';
import reliablity_icon from '../../../assets/img/icons/main_icons/reliablity_icon.png';
import department_icon from '../../../assets/img/icons/department_icons/department_icon.png';
import subtitle_icon from '../../../assets/img/icons/post_detail_icons/subtitle_icon.png';
import dark_up_vote_icon from '../../../assets/img/icons/reactions_card_icons/dark_up_vote_icon.png'
import light_up_vote_icon from '../../../assets/img/icons/reactions_card_icons/light_up_vote_icon.png'
import all_posts_icon from "../../../assets/img/icons/post_detail_icons/all_posts_icon.png"
import calendar_icon from '../../../assets/img/icons/main_icons/calendar_icon.png'


import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Grid,Pagination,Navigation, Autoplay} from 'swiper';
import { Filtered_Last_Posts_Api, Follow_Unfollow_Api, Login_Api, Patch_SinglePost_Api, PostDetail_Api, RelatedPosts_Api, SinglePost_Api, UserRank_Api } from '../../../apis/Api';
SwiperCore.use([Grid,Pagination]);

function PostDetail() {
    const { postID } = useParams();

    const theme = useSelector(state => state.theme)
    const user = useSelector(state => state.auth)
    const post = useSelector(state => state.posts.single_post)
    const related_posts = useSelector(state => state.posts.all_posts)
    const dispatch = useDispatch()


    const [ isPageReady, setIsPageReady ] = useState(false);


    const getData = async() => {
        await PostDetail_Api(postID)
        .then(single_post => {
            dispatch(setSinglePost(single_post.data))
            setIsPageReady(true)
        })
        if (post.id)
        await RelatedPosts_Api(post.post_owner.id)
        .then(related_single_post => {
            dispatch(setPosts(related_single_post.data))
        })
    }

  
    useEffect(() => {
        getData()
      }, [isPageReady]);


 
    

    const onClickLikeButton = async (postID) => {

        await SinglePost_Api(postID)
        .then( async (res) => {
            let this_post_liked_user = res.data.likes
            

            //* Giri?? yapm???? olan kullan??c??n??n id'si bu postu be??enen ki??i id'leri i??inde varm??
            if (this_post_liked_user.find(val => val === user.user_id)){
                
                //* ilk ??nce ki??inin listede ki index numaras??n?? bulduk
                var index = this_post_liked_user.indexOf(user.user_id);
                this_post_liked_user.splice(index, 1);
                
                //* Giri?? yapm???? ki??inin id'sini listeden ????kard??k
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
                
                //* Giri?? yapm???? ki??inin id'sini listeye ekledik
                this_post_liked_user.push(user.user_id);

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
    

    const onClickFollowutton = () => {
        console.log("1")
        let following = user.authUser.more_info.following
        following = Object.assign([], following);
        following.push(post.post_owner.id);
        Follow_Unfollow_Api(following)

    };

    const onClickUnFollowutton = () => {
        console.log("2")
        let following = user.authUser.more_info.following
        following = Object.assign([], following);
        var index = following.indexOf(post.post_owner.id);
        if (index !== -1)
            following.splice(index, 1); 
        Follow_Unfollow_Api(following)
    };



  return (
    <>
        {!isPageReady ?
                    <>
                        <div>
                            <Loading/>
                        </div>
                    </>
                : (
                    <>
                        <div className="post_detail_bg_color"></div>
                        <div id="post_detail">
                            <div className="post_detail_cover">
                                <div className="menu_side">
                                    <img className="logo" src={theme.dark ? dark_logo : light_logo} alt="" />
                                    <ul>
                                        <li>
                                            <a href={routes.main.path}>
                                                <img src={home_page_icon_2} alt="" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href={routes.posts.path}>
                                                <img src={all_posts_icon} alt="" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href={routes.posts.path}>
                                                <img src={bookmark} alt="" />
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="user_image">
                                        <img src= {routes.url + user.authUser.more_info.profImage} alt="" />
                                    </div>
                                </div>
                                <div className="page_content">
                                    <div className="left_side">
                                        <div className="top_side">
                                            <div className="about_post_owner">
                                                <img className="post_owner_img" src={routes.url + '/media/' + post.post_owner.profImage} alt="" />
                                                <div className="post_owner_info">
                                                    <div className="user_name">
                                                        {post.post_owner.full_name} 
                                                    </div>
                                                    <div className="info">
                                                        <div className="rank">
                                                            <img alt=""  src={rank_icon} />
                                                            <span>140</span>
                                                        </div>
                                                        <div className="follow">
                                                            <img alt="" src={like_icon} />
                                                            <span>{post.post_owner.followers}</span>
                                                        </div>
                                                        <div className="reliable">
                                                            <img alt="" src={reliablity_icon} />
                                                            <span>5%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="small_info_about_user">
                                                <div className='desc_title'>{post.post_owner.full_name}  Hakk??nda</div>
                                                <div className="user_desc">
                                                    <div className="education_branch">
                                                        <img src={department_icon} alt="" />
                                                        <span> {post.post_owner.departmentName} </span>
                                                    </div>
                                                    <div className='joined_date'>
                                                        <img alt="" src={calendar_icon} />
                                                        <span>Kat??lma tarihi : {Moment(post.post_owner.created_date).format('LL')}</span>
                                                    </div>
                                                    <span className='smallDesc'>{post.post_owner.smallDesc}</span>
                                                </div>
                                            </div>
                                            <div className="related_post">
                                                <div className="title">
                                                    Di??er G??nderileri
                                                </div>
                                                <div className="post_list">
                                                    {Object.values(related_posts).map((related_user) => 
                                                        {
                                                            let list = [...related_user.related_posts_list];
                                                            list = list.sort(function(a, b){return 0.5 - Math.random()});
                                                            return Object.values(list).slice(0, 5).map((related_post,index) => 
                                                            {
                                                                if (related_user.related_posts_list.length >1) {
                                                                    if (String(related_post.id) !== postID) {
                                                                        return(
                                                                            <a href={`/posts/${related_post.id}`} className="card" key={index}>
                                                                                <div className="card_image">
                                                                                    <img src={routes.url + '/media/' + related_post.image} alt="" />
                                                                                </div>
                                                                                <div className="card_content">
                                                                                    {related_post.title}
                                                                                </div>
                                                                            </a> 
                                                                        );
                                                                    }
                                                                }
                                                                else {
                                                                    return (
                                                                        <div className="card" key={1}>
                                                                            <div className="card_content">
                                                                                G??sterilecek ba??ka g??nderi bulunamad??.
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }
                                                            }
                                                            )
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        {(() => {
                                               
                                            if (post.post_owner.id === user.authUser.user_id) {
                                                return (
                                                    <></>
                                                )
                                            } else {
                                                return(
                                                    <div className="bottom_side">
                                                        <div className="reactions_post_owner">
                                                            <div className="like">
                                                                <img src={like_icon_1} alt="" />
                                                            </div>
                                                            <div className="publish">
                                                                <img src={share} alt="" />
                                                            </div>

                                                            {(()=>{
                                                                
                                                                if (post.post_owner.id === user.authUser.more_info.following.find(res => res === post.post_owner.id )) {
                                                                    return(
                                                                        <div className="unfollow" onClick={()=>onClickUnFollowutton()}>
                                                                            <span >
                                                                                Takipi B??rak
                                                                            </span>
                                                                        </div>
                                                                    )
                                                                }
                                                                else if(post.post_owner.id !== user.authUser.more_info.following.find(res => res === post.post_owner.id )){
                                                                    return(
                                                                        <div className="follow" onClick={()=>onClickFollowutton()}>
                                                                            <span >
                                                                                Takip Et
                                                                            </span>
                                                                        </div>
                                                                    )
                                                                }
                                                                else{
                                                                    <></>
                                                                }
                                                            })()}

                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })()}
                                       
                                    </div>
                                    <div className="right_side">
                                        <div className="content_cover">
                                            <div className="post_content">
                                                <div className="post_detail">
                                                    <div className="time">
                                                        <img src={time_icon} alt="" />
                                                        <span>{Moment(post.created_date).format('LLL')}</span>
                                                    </div>
                                                    <div className="br"></div>
                                                    <div className="update_time">
                                                        <img src={update_time_icon} alt="" />
                                                        <span>{Moment(post.modified_date).format('LLL')}</span>
                                                    </div>
                                                    <div className="br"></div>
                                                    <div className="read_time">
                                                        <span>{post.read_time} dakikal??k okuma</span>
                                                    </div>
                                                    <div className="br"></div>
                                                    <div className="post_rank">
                                                        <img src={post_rank_icon} alt="" />
                                                        <span>156 RT</span>
                                                    </div>
                                                    <div className="br"></div>
                                                    <div className="brightness">
                                                        <img src={brightness} alt="" />
                                                        <span>156</span>
                                                    </div>
                                                </div>
                                                <div className="post_category_and_tags">
                                                    <div className="category">
                                                        <span>{post.subCategory}</span>
                                                    </div>
                                                    <div className="br"></div>
                                                    <div className="tags">
                                                        <Swiper 
                                                            onInit={(tags_swipper) => {
                                                                tags_swipper.params.navigation.prevEl = "#post_detail .tags .swiper-button-prev";
                                                                tags_swipper.params.navigation.nextEl = "#post_detail .tags .swiper-button-next";
                                                                tags_swipper.navigation.init();
                                                                tags_swipper.navigation.update();
                                                            }}
                                                            modules={[Autoplay, Navigation, Pagination]}
                                                            slidesPerView={"auto"} 
                                                            grid={{ "rows": 1}} 
                                                            freeMode="true"
                                                            autoplay={{
                                                                delay: 2500,
                                                                disableOnInteraction: true,
                                                              }}
                                                            className="swiper mySwiper tags_swipper">
                                                            <div className="swiper-wrapper">
                                                                {Object.entries(post.tag).map((tag,index) => 
                                                                    {
                                                                        return (
                                                                            <SwiperSlide key={index} className="swiper-slide">
                                                                                    <a href="/#">
                                                                                        <span style={{color: tag[1][1]}}>#</span>
                                                                                            {tag[1][0]}
                                                                                    </a>
                                                                            </SwiperSlide>
                                                                        )
                                                                    }
                                                                )}

                                                            </div>
                                                        </Swiper>
                                                    </div>
                                                </div>
                                                <div className="post_inner">
                                                    <div className="post_title">
                                                        {post.title}
                                                    </div>
                                                    <div className="post_subtitle">
                                                        <img alt='' src={subtitle_icon}/>
                                                        <div className="subtitle"  dangerouslySetInnerHTML={{__html:post.subTitle}} />
                                                    </div>
                                                    <div className="post_desc" dangerouslySetInnerHTML={{__html:post.text}} />
                                                </div>
                                            </div>
                                            <div className="post_reactions">
                                                {(() => {
                                                                                            
                                                    if (post.likes.find(user_id => user_id === user.authUser.user_id)) {
                                                        return (
                                                            <div className="up_vote if_post_liked" onClick={()=>onClickLikeButton(post.id,this)}>
                                                                <img alt="" src={theme.dark ?  dark_up_vote_icon : light_up_vote_icon} />
                                                                <span 
                                                                    style={{ color:`var(--theme_post_card_interactive_up_vote)` }}>
                                                                    {post.likes.length}
                                                                </span>
                                                            </div>
                                                            
                                                        )
                                                    } else {
                                                        return(
                                                            <div className="up_vote" onClick={()=>onClickLikeButton(post.id,this)}>
                                                                <img alt="" src={theme.dark ?  up_unvote : up_unvote} />
                                                                <span style={{ color:"var(--theme_post_detail_up_unvote)" }}>{post.likes.length}</span>
                                                            </div>
                                                        )
                                                    }
                                                            
                                                })()}
                                                <div className="comment">
                                                    <img src={comment_icon} alt="" />
                                                    <span>15</span>
                                                </div>
                                                <div className="bookmark">
                                                    <img src={bookmark} alt="" />
                                                </div>
                                                <div className="share">
                                                    <img src={share} alt="" />
                                                </div>
                                                <div className="more">
                                                    <img src={more_icon} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>    
                    </>
                   )
        }
    </>);
}

export default PostDetail
