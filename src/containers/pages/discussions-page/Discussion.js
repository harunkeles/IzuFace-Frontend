import React, { Component, useEffect, useState } from 'react'
import Menu from '../../../components/menu/menu';
import Search from '../../../components/search/Search';


import comment_icon from '../../../assets/img/icons/post_detail_icons/comment_icon.png';
import time_icon from '../../../assets/img/icons/post_detail_icons/time_icon.png';
import up_unvote from '../../../assets/img/icons/post_detail_icons/up_unvote.png';
import dark_up_vote_icon from '../../../assets/img/icons/reactions_card_icons/dark_up_vote_icon.png'
import light_up_vote_icon from '../../../assets/img/icons/reactions_card_icons/light_up_vote_icon.png'
import close_icon from "../../../assets/img/icons/main_icons/close_icon.png"

import Moment from 'moment';
import 'moment/locale/tr'
import { connect, useDispatch, useSelector } from 'react-redux';
import { login } from '../../../stores/authSlice';
import { setPosts } from '../../../stores/postSlice';
import { setDarkMode } from '../../../stores/themeSlice';
import { routes } from '../../../routes';
import Loading from '../../../components/loading/loading';
import { setDiscussions } from '../../../stores/discussionSlice';
import { setModalID, setModalIsOpen } from '../../../stores/modalSlice';
import DiscussionDetailModal from '../../../components/modal/DiscussionDetailModal';
import { DiscussionsTopics_Api, Discussions_Api, Login_Api, PatchDiscussionData_Api, SingleDiscussions_Api } from '../../../apis/Api';



function Discussion() {
    // const mapStateToProps = state => ({
    //     theme: state.theme,
    //     user: state.auth,
    //     posts: state.posts,
    //     discussions: state.discussions,
    //     modal: state.modal,
    // })

    // const mapDispatchToProps = (dispatch) => {
    //     return {
    //         login: (val) => dispatch(login(val)),
    //         setPosts: (val) => dispatch(setPosts(val)),
    //         setDarkTheme: (val) => dispatch(setDarkMode(val)),
    //         setDiscussions: (val) => dispatch(setDiscussions(val)),
    //         setModalIsOpen: (val) => dispatch(setModalIsOpen(val)),
    //         setModelID: (val) => dispatch(setModalID(val))
    //     }
    // };


    const modal = useSelector(state => state.modal)
    const user = useSelector(state => state.auth)
    const theme = useSelector(state => state.theme)
    const discussions = useSelector(state => state.discussions)
    const posts = useSelector(state => state.posts)
    const dispatch = useDispatch()

    const [isPageReady, setPageReady] = useState(false)
    const [isDataReady, setDataReady] = useState(false)
    const [media, setMedia] = useState()
    const [topics, setTopics] = useState({})
    const [filtered, setFiltered] = useState([])
    const [searchValue, setSearchValue] = useState("")
    // const [cardHoverColor, setCardHoverColor] = useState("transparent")
    const [cardHoverStyle, setCardHoverStyle] = useState()
    const [cardHoverIndex, setCardHoverIndex] = useState(0)

    const onMouseOver = (val, e) => {
        if (e.target.offsetParent.className === 'discussion_card') {

            if (val.subCategory === 'Soru') {
                e.target.offsetParent.style.background = 'linear-gradient(135deg, transparent, transparent, transparent, transparent, transparent, transparent, transparent, #ffb700, #e2e621)'
            }
            if (val.subCategory === 'Şikayet') {
                e.target.offsetParent.style.background = 'linear-gradient(135deg, transparent, transparent, transparent, transparent, transparent, transparent, transparent, #E63221, #FC4375)'
            }
            if (val.subCategory === 'Öneri') {
                e.target.offsetParent.style.background = 'linear-gradient(135deg, transparent, transparent, transparent, transparent, transparent, transparent, transparent, #48e621, #43fcaf)'
            }
            if (val.subCategory === 'Bilgi') {
                e.target.offsetParent.style.background = 'linear-gradient(135deg, transparent, transparent, transparent, transparent, transparent, transparent, transparent, #7621e6, #a943fc)'
            }
        }
    }
    const onMouseOut = ( e) => {
        e.target.offsetParent.style.background = 'transparent'
    }




    const getApis = async () => {
        await Login_Api()
        await Discussions_Api()
            .then(res => {
                dispatch(setDiscussions(res.data));
            })
        await DiscussionsTopics_Api()
            .then(res => {
                setTopics(res.data)
                setPageReady(true)
            })
            .catch(error => { setPageReady(false) })
    }


    useEffect(() => {
        getApis();
    }, [])



    //* Filter With Category Type
    const selectFilterHandler = (e) => {
        if (!filtered.find(val => val === e.target.className) && e.target.localName === 'span') {
            document.getElementsByClassName(e.target.className)[0].classList.add('selected')

            filtered.push(document.getElementsByClassName(e.target.className)[0].classList.value)

            if (filtered.length != 0) {
                document.getElementsByClassName("all")[0].classList.remove('selected')
            }

            var data = isDataReady
            if (data == true)
                data = false
            else
                data = true
            setDataReady(data)

        }

    }

    const closeFilterHandler = (e) => {
        if (e.target.localName === 'img') {
            document.getElementsByClassName(e.target.parentElement.className)[0].classList.remove('selected')

            var index = filtered.indexOf(e.target.parentElement.className + ' selected')
            if (index !== -1) {
                filtered.splice(index, 1);
            }
            if (filtered.length === 0) {
                document.getElementsByClassName("all")[0].classList.add('selected')
            }


            var data = isDataReady
            if (data == true)
                data = false
            else
                data = true
            setDataReady(data)

        }
    }



    //* List Func
    const listFunction = () => {
        return Object.values(discussions)[0].filter(val => val.title.toLowerCase().startsWith(searchValue)).map(((discussion, index) => {

            if (filtered.length != 0) {
                return filtered.map((val) => {
                    if (val === discussion.subCategory.toLowerCase() + ' selected') {
                        return (
                            <div className="discussion_card" key={index} style={cardHoverStyle}>
                        <div className='hover_set'  onClick={() => onClickModel(discussion.id, this)}   onMouseOver={(e) => onMouseOver(discussion, e)} onMouseOut={onMouseOut}></div>
                                <div className="discussion_category">

                                    {(() => {
                                        if (discussion.subCategory == 'Soru') {
                                            return (
                                                <div className="category_name" style={{ background: 'linear-gradient(90deg, #ffb700, #e2e621)' }}>
                                                    <span>{discussion.subCategory}</span>
                                                </div>
                                            );
                                        }
                                        else if (discussion.subCategory == 'Şikayet') {
                                            return (
                                                <div className="category_name" style={{ background: 'linear-gradient(90deg, #E63221, #FC4375)' }}>
                                                    <span>{discussion.subCategory}</span>
                                                </div>
                                            );
                                        }
                                        else if (discussion.subCategory == 'Öneri') {
                                            return (
                                                <div className="category_name" style={{ background: 'linear-gradient(90deg, #48e621, #43fcaf)' }}>
                                                    <span>{discussion.subCategory}</span>
                                                </div>
                                            );
                                        }
                                        else if (discussion.subCategory == 'Bilgi') {
                                            return (
                                                <div className="category_name" style={{ background: 'linear-gradient(90deg, #7621e6, #a943fc)' }}>
                                                    <span>{discussion.subCategory}</span>
                                                </div>
                                            );
                                        }

                                    })()}

                                    {(() => {
                                        if (discussion.likes.find(user_id => user_id === user.authUser.user_id)) {
                                            return (
                                                <div className="up if_post_liked discussion_vote" onClick={() => onClickLikeButton(discussion.id, this)}>
                                                    <img src={theme.dark ? dark_up_vote_icon : light_up_vote_icon} alt="" />
                                                    <span style={{ color: `var(--theme_post_card_interactive_up_vote)` }}>
                                                        {discussion.likes.length}
                                                    </span>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div className="up discussion_vote" onClick={() => onClickLikeButton(discussion.id, this)}>
                                                    <img src={theme.dark ? up_unvote : up_unvote} alt="" />
                                                    <span style={{ color: `#95A5A6` }}>
                                                        {discussion.likes.length}
                                                    </span>
                                                </div>
                                            )
                                        }
                                    })()}
                                </div>
                                <img className='post_user_img' src={routes.url + '/media/' + discussion.discussion_owner.profImage} alt="" />
                                <div className="discussion_content">
                                    <div className="header" onClick={() => onClickModel(discussion.id, this)} >
                                        <span>{discussion.title}</span>
                                    </div>
                                    <div className="content">
                                        <div className="discussion_about">
                                            {discussion.topic.name}
                                        </div>
                                        <div className="comment">
                                            <img src={comment_icon} alt="" />
                                            <span>30</span>
                                        </div>
                                        <div className="time">
                                            <img src={time_icon} alt="" />
                                            <span> {Moment(discussion.created_date, 'YYYYMMDD').fromNow()} </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                })
            } else {
                return (
                    <div className="discussion_card" key={index} style={cardHoverStyle}>
                        <div className='hover_set'  onClick={() => onClickModel(discussion.id, this)}   onMouseOver={(e) => onMouseOver(discussion, e)} onMouseOut={onMouseOut}></div>
                        <div className="discussion_category">
                            {(() => {
                                if (discussion.subCategory == 'Soru') {
                                    return (
                                        <div className="category_name" style={{ background: 'linear-gradient(90deg, #ffb700, #e2e621)' }}>
                                            <span>{discussion.subCategory}</span>
                                        </div>
                                    );
                                }
                                else if (discussion.subCategory == 'Şikayet') {
                                    return (
                                        <div className="category_name" style={{ background: 'linear-gradient(90deg, #E63221, #FC4375)' }}>
                                            <span>{discussion.subCategory}</span>
                                        </div>
                                    );
                                }
                                else if (discussion.subCategory == 'Öneri') {
                                    return (
                                        <div className="category_name" style={{ background: 'linear-gradient(90deg, #48e621, #43fcaf)' }}>
                                            <span>{discussion.subCategory}</span>
                                        </div>
                                    );
                                }
                                else if (discussion.subCategory == 'Bilgi') {
                                    return (
                                        <div className="category_name" style={{ background: 'linear-gradient(90deg, #7621e6, #a943fc)' }}>
                                            <span>{discussion.subCategory}</span>
                                        </div>
                                    );
                                }

                            })()}


                            {(() => {

                                if (discussion.likes.find(user_id => user_id === user.authUser.user_id)) {
                                    return (
                                        <div className="up if_post_liked discussion_vote" onClick={() => onClickLikeButton(discussion.id, this)}>
                                            <img src={theme.dark ? dark_up_vote_icon : light_up_vote_icon} alt="" />
                                            <span style={{ color: `var(--theme_post_card_interactive_up_vote)` }}>
                                                {discussion.likes.length}
                                            </span>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className="up discussion_vote" onClick={() => onClickLikeButton(discussion.id, this)}>
                                            <img src={theme.dark ? up_unvote : up_unvote} alt="" />
                                            <span style={{ color: `#95A5A6` }}>
                                                {discussion.likes.length}
                                            </span>
                                        </div>
                                    )
                                }
                            })()}


                        </div>
                        <img className='post_user_img' src={routes.url + '/media/' + discussion.discussion_owner.profImage} alt="" />
                        <div className="discussion_content">
                            <div className="header">
                                <span>{discussion.title}</span>
                            </div>
                            <div className="content">
                                <div className="discussion_about">
                                    {discussion.topic.name}
                                </div>
                                <div className="comment">
                                    <img src={comment_icon} alt="" />
                                    <span>30</span>
                                </div>
                                <div className="time">
                                    <img src={time_icon} alt="" />
                                    <span> {Moment(discussion.created_date, 'YYYYMMDD').fromNow()} </span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
        ))
    }




    //* Discussion Like
    const onClickLikeButton = async (discussionID) => {

        await SingleDiscussions_Api(discussionID)
            .then(async (res) => {
                let this_discussion_liked_user = res.data.likes

                //* Giriş yapmış olan kullanıcının id'si bu tartışmayı beğenen kişi id'leri içinde varmı
                if (this_discussion_liked_user.find(res => res === user.authUser.user_id)) {

                    //* ilk önce kişinin listede ki index numarasını bulduk
                    var index = this_discussion_liked_user.indexOf(user.authUser.user_id);
                    this_discussion_liked_user.splice(index, 1);

                    //* Giriş yapmış kişinin id'sini listeden çıkardık
                    var data = {
                        'likes': this_discussion_liked_user
                    }

                    await PatchDiscussionData_Api(discussionID, data).then(result => getApis())
                }
                else {

                    //* Giriş yapmış kişinin id'sini listeye ekledik
                    this_discussion_liked_user.push(user.authUser.user_id);

                    var data = {
                        'likes': this_discussion_liked_user
                    }

                    await PatchDiscussionData_Api(discussionID, data).then(result => getApis())
                }
            })
            .catch(error => console.log("error : ", error))

    };




    //* Modal 
    const onClickModel = (discussionID) => {
        dispatch(setModalIsOpen(true))
        dispatch(setModalID(discussionID))
        document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
    }




    //* Search Value 
    var setSearchValueFunc = (e) => {
        setSearchValue(e.toLowerCase());
    }


    return (
        <>
            {!isPageReady ?
                <div>
                    <Loading />
                </div>
                : (
                    <>
                        {!modal.modalIsOpen ? <></> : <DiscussionDetailModal />}
                        <Menu />
                        <div id="discussions_page">
                            <Search />
                            <div className="container discussions_page_cover">
                                <div className="left_side">
                                    <div className="filter_part">
                                        <div className="filter">
                                            <span className='all selected' >Hepsi</span>
                                            <span className='populer' >Popüler</span>
                                            <div className='space'></div>
                                            <span onClick={(e) => selectFilterHandler(e)} className="soru" >Soru  <img onClick={(e) => closeFilterHandler(e)} className='close' src={close_icon} alt=''></img></span>
                                            <span onClick={(e) => selectFilterHandler(e)} className="bilgi" >Bilgi  <img onClick={(e) => closeFilterHandler(e)} className='close' src={close_icon} alt=''></img></span>
                                            <span onClick={(e) => selectFilterHandler(e)} className="öneri" >Öneri  <img onClick={(e) => closeFilterHandler(e)} className='close' src={close_icon} alt=''></img></span>
                                            <span onClick={(e) => selectFilterHandler(e)} className="şikayet" >Şikayet  <img onClick={(e) => closeFilterHandler(e)} className='close' src={close_icon} alt=''></img></span>
                                        </div>
                                        <div className="search">
                                            <i className="fas fa-question"></i>
                                            <input type='search' placeholder='Tartışma Ara' onChange={(e) => setSearchValueFunc(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="discussions_part">

                                        {listFunction()}

                                    </div>
                                </div>
                                <div className="right_side">
                                    <div className='right_side_cover'>
                                        <div className='header'>
                                            <span>Topikler</span>
                                        </div>
                                        <div className='all_topics'>
                                            {
                                                Object.values(topics).map(((topic, index) => {
                                                    return (
                                                        <div className='single_topic' key={index}>
                                                            <img src={topic.image} alt='' />
                                                            <span>{topic.title}</span>
                                                        </div>
                                                    );
                                                }))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}



export default Discussion
