import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { setModalDetail, setModalIsOpen } from '../../stores/modalSlice';
import Moment from 'moment';
import 'moment/locale/tr'


import time_icon from '../../assets/img/icons/post_detail_icons/time_icon.png';
import { routes } from '../../routes';
import comment_icon from '../../assets/img/icons/post_detail_icons/comment_icon.png';
import dark_up_vote_icon from '../../assets/img/icons/reactions_card_icons/dark_up_vote_icon.png'
import light_up_vote_icon from '../../assets/img/icons/reactions_card_icons/light_up_vote_icon.png'
import up_unvote from '../../assets/img/icons/post_detail_icons/up_unvote.png';
import Loading from '../loading/loading';
import rank_icon from '../../assets/img/icons/main_icons/rank_icon.png'
import like_icon from '../../assets/img/icons/main_icons/like_icon.png'
import reliablity_icon from '../../assets/img/icons/main_icons/reliablity_icon.png'
import calendar_icon from '../../assets/img/icons/main_icons/calendar_icon.png'
import close_icon from '../../assets/img/icons/main_icons/close_icon.png'
import department_icon from '../../assets/img/icons/department_icons/department_icon.png'
import more_icon from '../../assets/img/icons/post_detail_icons/more_icon.png'
import like_icon_1 from '../../assets/img/icons/post_detail_icons/like_icon_1.png'
import share from '../../assets/img/icons/post_detail_icons/share.png'


function DiscussionDetailModal() {
    console.log("DiscussionDetailModal")
    const modal = useSelector(state => state.modal)
    const user = useSelector(state => state.auth)
    const theme = useSelector(state => state.theme)
    const dispatch = useDispatch()

    const [ isPageReady, setPageReady ] = useState(false)
    const [ media, setMedia ] = useState()


    useEffect(() => {

        if (modal.modalIsOpen) {
            //!! GET Model Detail
            axios.get(`http://127.0.0.1:8000/api/v0/discussions/${modal.modelID}`)
            .then(res => { 
                dispatch(setModalDetail(res.data)); 
                if (modal.modelDetail) {
                    setPageReady(true);
                    var studentUserSocialMedia = res.data.discussion_owner.studentUserSocialMedia
                    setMedia(studentUserSocialMedia.split(", "))
                }
            })
        }
    }, [])
    

    //!! Discussion Like
    const onClickLikeButton = (discussionID) => {
        axios.get(`http://127.0.0.1:8000/api/v0/discussions/${discussionID}`)
        .then(res => {
            let this_discussion_liked_user = res.data.likes

            //!! Giriş yapmış olan kullanıcının id'si bu tartışmayı beğenen kişi id'leri içinde varmı
            if (user.authUser.user_id === this_discussion_liked_user.find(res => res === user.authUser.user_id)) {
                var index = this_discussion_liked_user.indexOf(user.authUser.user_id);
                if (index !== -1)
                    this_discussion_liked_user.splice(index, 1); 
                axios(`http://127.0.0.1:8000/api/v0/discussions/${discussionID}`, {
                    auth: { username: user.authUser.username, password: localStorage.getItem('user_password') },
                    credentials: 'include',
                    method: 'PATCH',
                    headers: {'Content-Type': 'application/json', },
                    data:{'likes':this_discussion_liked_user},
                }).then(result => {
                    forceUpdateHandler()
                })
            }
            else { 
                this_discussion_liked_user.push(user.authUser.user_id);
                axios(`http://127.0.0.1:8000/api/v0/discussions/${discussionID}`, {
                    auth: { username: user.authUser.username, password: localStorage.getItem('user_password') },
                    credentials: 'include',
                    method: 'PATCH',
                    headers: {'Content-Type': 'application/json', },
                    data:{'likes':this_discussion_liked_user},
                }).then(result => {
                    forceUpdateHandler()
                })
            }
        })
        .catch(error => console.log(error))
        
    };

    const forceUpdateHandler = () =>{
         //!! GET Discussions Api  
         axios.get(`http://127.0.0.1:8000/api/v0/discussions/${modal.modelID}`)
         .then(discussions_res => { 
            dispatch(setModalDetail(discussions_res.data)); 
         })
    };



  return (
     <>
        {!modal.modalIsOpen ?
            <></>
            :
            <>
                {!isPageReady ? <><Loading/></> :
                   <>
                        <Modal 
                        id='discussion_detail_modal'
                        className="discussion_detail_modal container"
                        closeTimeoutMS={200}
                        isOpen={modal.modalIsOpen} 
                        aria={{
                            labelledby: "heading",
                            describedby: "full_description"
                        }}
                        data={
                            { background: "green" }
                        /* Additional data attributes (optional). */}
                        onRequestClose={()=> {
                            dispatch(setModalIsOpen(false))
                            document.getElementsByTagName('body')[0].style.overflowY = 'scroll';
                        }} 
                        shouldCloseOnOverlayClick={false}
                        style={
                            {
                                overlay: {
                                    backgroundColor: '#95A5A6'
                                },
                            }
                        }
                     
                       
                        >
                            <div id='close_discussionDetailModal' onClick={()=> {
                                dispatch(setModalIsOpen(false));
                                document.getElementsByTagName('body')[0].style.overflowY = 'scroll';
                                }} >
                                <img src={close_icon} alt='' />
                            </div>
                            <div className='modalContainer'>
                                <div className='left_side'>
                                    <div className="discussion_card">
                                        <div className="discussion_category">

                                            {(()=>{
                                                if (modal.modelDetail.subCategory == 'Soru') {
                                                    return(
                                                        <div className="category_name" style={{ background: 'linear-gradient(90deg, #ffb700, #e2e621)' }} >
                                                        <span>{modal.modelDetail.subCategory}</span>
                                                        </div>
                                                    );
                                                }
                                                else if (modal.modelDetail.subCategory == 'Şikayet') {
                                                    return(
                                                        <div className="category_name" style={{ background: 'linear-gradient(90deg, #E63221, #FC4375)' }}>
                                                        <span>{modal.modelDetail.subCategory}</span>
                                                        </div>
                                                    );
                                                }
                                                else if (modal.modelDetail.subCategory == 'Öneri') {
                                                    return(
                                                        <div className="category_name" style={{ background: 'linear-gradient(90deg, #48e621, #43fcaf)' }}>
                                                        <span>{modal.modelDetail.subCategory}</span>
                                                        </div>
                                                    );
                                                }
                                                else if (modal.modelDetail.subCategory == 'Bilgi') {
                                                    return(
                                                        <div className="category_name" style={{ background: 'linear-gradient(90deg, #7621e6, #a943fc)' }}>
                                                        <span>{modal.modelDetail.subCategory}</span>
                                                        </div>
                                                    );
                                                }

                                            })()}

                                            <div className='about_discussion'>
                                                <div className="header">
                                                    <span>{modal.modelDetail.title}</span>
                                                    <img className='share' src={more_icon} alt='' />
                                                </div>
                                                <div className="text" dangerouslySetInnerHTML={{__html:modal.modelDetail.text}}>
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                        <div className="discussion_content">
                                            <div className="content">
                                                <div className="discussion_about">
                                                    {modal.modelDetail.topic.name}
                                                </div>
                                                <div className="comment">
                                                    <img src={comment_icon} alt="" />
                                                    <span>30</span>
                                                </div>
                                                <div className="time">
                                                    <img src={time_icon} alt="" />
                                                    <span> {Moment(modal.modelDetail.created_date,'YYYYMMDD').fromNow()} </span>
                                                </div>
                                            </div>

                                            <div className='reaction_part'>
                                                {(() => {
                                                            if (modal.modelDetail.likes.find(user_id => user_id === user.authUser.user_id)) {
                                                                return (
                                                                    <div className="up if_post_liked discussion_vote" onClick={()=>onClickLikeButton(modal.modelDetail.id,this)}>
                                                                        <img src={theme.dark ?  dark_up_vote_icon : light_up_vote_icon} alt="" />
                                                                        <span style={{ color:`var(--theme_post_card_interactive_up_vote)` }}>
                                                                            {modal.modelDetail.likes.length}
                                                                        </span>
                                                                    </div>
                                                                )
                                                            } else {
                                                                return(
                                                                    <div className="up discussion_vote" onClick={()=>onClickLikeButton(modal.modelDetail.id,this)}>
                                                                        <img src={theme.dark ?  up_unvote : up_unvote} alt="" />
                                                                        <span style={{ color:`#95A5A6` }}>
                                                                            {modal.modelDetail.likes.length}
                                                                        </span>
                                                                    </div>
                                                                )
                                                            }
                                                })()}
                                                <img className='share' src={share} alt='' />
                                            </div>

                                        </div>
                                    </div>
                                    <div className='discussion_comments'>
                                        <div className='discussion_comment_model'>
                                            <div className='discussion_img'>
                                                <img src={routes.url + '/media/' + modal.modelDetail.discussion_owner.profImage} alt='' />
                                            </div>
                                            <div className='left_arrow'>
                                                {/* <i className="fa-solid fa-chevron-left"></i> */}
                                                <i className="fa-solid fa-caret-left"></i>
                                            </div>
                                            <div className='comment_card'>
                                                <div className='discussion_top'>
                                                    <div className='comment_owner'>
                                                        <span className='name'>{modal.modelDetail.discussion_owner.full_name}</span>
                                                        <div className='divider_circle'></div>
                                                        <span className='date'>{Moment(modal.modelDetail.discussion_owner.created_date).format('LL')}</span>
                                                    </div>
                                                    <div className='comment_more'>
                                                        <img src={more_icon} alt=''/>
                                                    </div>
                                                </div>
                                                <div className='discussion_bottom'>
                                                    Developers trying to do everything with JavaScript, no one bats an eye.
                                                    Someone trying to do everything with CSS, and everyone loses their mind.
                                                </div>
                                                <div className='discussion_footer'>
                                                    <div className="like_icon">
                                                        <img src={like_icon_1} alt="" />
                                                        <span>16 </span>
                                                    </div>
                                                    <div className="comment_icon">
                                                        <img src={comment_icon} alt="" />
                                                        <span>Cevapla</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='discussion_comment_model'>
                                            <div className='discussion_img'>
                                                <img src={routes.url + '/media/' + modal.modelDetail.discussion_owner.profImage} alt='' />
                                            </div>
                                            <div className='left_arrow'>
                                                {/* <i className="fa-solid fa-chevron-left"></i> */}
                                                <i className="fa-solid fa-caret-left"></i>
                                            </div>
                                            <div className='comment_card'>
                                                <div className='discussion_top'>
                                                    <div className='comment_owner'>
                                                        <span className='name'>{modal.modelDetail.discussion_owner.full_name}</span>
                                                        <div className='divider_circle'></div>
                                                        <span className='date'>{Moment(modal.modelDetail.discussion_owner.created_date).format('LL')}</span>
                                                    </div>
                                                    <div className='comment_more'>
                                                        <img src={more_icon} alt=''/>
                                                    </div>
                                                </div>
                                                <div className='discussion_bottom'>
                                                    Developers trying to do everything with JavaScript, no one bats an eye.
                                                    Someone trying to do everything with CSS, and everyone loses their mind.
                                                </div>
                                                <div className='discussion_footer'>
                                                    <div className="like_icon">
                                                        <img src={like_icon_1} alt="" />
                                                        <span>16 </span>
                                                    </div>
                                                    <div className="comment_icon">
                                                        <img src={comment_icon} alt="" />
                                                        <span>Cevapla</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='right_side'>
                                    <div className="about_discussion_user">
                                        <div className="user-info">
                                            <div className='user_img_cover'>
                                                <img className='user_img' src={routes.url + '/media/' + modal.modelDetail.discussion_owner.profImage} alt="" />
                                            </div>
                                            <div className='user_more_info'>
                                                <span className="user-name"> { modal.modelDetail.discussion_owner.full_name} </span>
                                                <div className="info">
                                                    <div className="rank">
                                                        <img alt="" src={rank_icon} />
                                                        <span>140</span>
                                                    </div>
                                                    <div className="follow">
                                                        <img alt="" src={like_icon} />
                                                        <span>12</span>
                                                    </div>
                                                    <div className="reliable">
                                                        <img alt="" src={reliablity_icon} />
                                                        <span>5%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='more_info'>
                                        <div className='joined_date'>
                                            <img alt="" src={calendar_icon} />
                                            <div>Katılma tarihi <span>{Moment(modal.modelDetail.discussion_owner.created_date).format('LL')}</span> </div>
                                        </div>
                                        <div className='department'>
                                            <img alt="" src={department_icon} />
                                            <div> {modal.modelDetail.discussion_owner.departmentName} </div>
                                        </div>

                                    </div>
                                    <div className='social_icons'>
                                        <ul>
                                            {
                                                media != null ?
                                                    Object.values(media).map(val=>{
                                                        if ( val === 'Facebook') {
                                                            return(
                                                                <li className="facebook"><a href="#"><i className="fa fa-facebook " aria-hidden="true"></i></a></li>
                                                            );
                                                        }
                                                        if (val === 'Twitter') {
                                                            return(
                                                                <li className="twitter"><a href="#"><i className="fa fa-twitter " aria-hidden="true"></i></a></li>
                                                            );
                                                        }
                                                        if (val === 'İnstagram') {
                                                            return(
                                                                <li className="instagram"><a href="#"><i className="fa fa-instagram " aria-hidden="true"></i></a></li>
                                                            );
                                                        }
                                                        if (val === 'Github') {
                                                            return(
                                                                <li className="github"><a href="#"><i className="fa fa-github " aria-hidden="true"></i></a></li>
                                                                
                                                            );
                                                        }
                                                        if (val === 'Whatsapp') {
                                                            return(
                                                                <li className="whatsapp"><a href="#"><i className="fa fa-whatsapp " aria-hidden="true"></i></a></li>
                                                            );
                                                        }
                                                        if (val === 'Linkedn') {
                                                            return(
                                                                <li className="linkedin"><a href="#"><i className="fa fa-linkedin " aria-hidden="true"></i></a></li>
                                                            );
                                                        }
                                                        
                                                    })
                                                    :
                                                    <></>
                                            }

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                   </>
                }
            </>

        }
     </>
  )
}
export default DiscussionDetailModal