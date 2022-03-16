import React, { Component } from 'react'
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
import { connect } from 'react-redux';
import { login } from '../../../stores/authSlice';
import { setPosts } from '../../../stores/postSlice';
import { setDarkMode } from '../../../stores/themeSlice';
import { routes } from '../../../routes';
import axios from 'axios';
import Loading from '../../../components/loading/loading';
import { discussions, setDiscussions } from '../../../stores/discussionSlice';
import { modal, setModalID, setModalIsOpen } from '../../../stores/modalSlice';
import DiscussionDetailModal from '../../../components/modal/DiscussionDetailModal';



class Discussion extends Component {

    constructor(props) {
        console.log("Discussion")
        super(props);
        this.state = {
            isPageReady: false,
            topics:{},
            filtered:[],
            searchValue: '',
        };
    }

    componentDidMount(){
    
        //!! Sadece ilk girişte çalışması için kullandık
        axios.get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/all-endpoints/auth-user-info/${localStorage.getItem("_user_id")}-${localStorage.getItem("_authToken")}`)
            .then(res => {
                this.props.login(res.data);})
            .then(res_2=>{
                //!! GET Site Settings  
                axios.get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/all-endpoints/auth-user-site-settings/${localStorage.getItem("_user_id")}`)
                .then(theme_res => { this.props.setDarkTheme(theme_res.data.dark_theme)})
                .catch(error => console.log(error))
            })
            .then(res_3=>{
                //!! GET Discussions Api  
                axios.get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/discussions/`)
                .then(discussions_res => { 
                    this.props.setDiscussions(discussions_res.data); 
                    if (this.props.discussions != null) {
                        axios.get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/discussions/topics`)
                        .then(topics=>this.setState({ topics: topics.data, isPageReady:true }))
                    }
                })
            })
            .catch(function (error) {
                if (error.response) 
                  // Request made and server responded
                  console.log(error.response.status);
                else if (error.request) 
                  // The request was made but no response was received
                  console.log(error.request);
                else 
                  // Something happened in setting up the request that triggered an Error
                  console.log('Error', error.message);
                
            })
            
    }



    //!! Filter With Category Type
    selectFilterHandler = (e) => {
        if (!this.state.filtered.find(val=> val === e.target.className) && e.target.localName === 'span') {
            
            document.getElementsByClassName(e.target.className)[0].classList.add('selected')
            this.state.filtered.push(document.getElementsByClassName(e.target.className)[0].classList.value)
            this.setState({})
            if (this.state.filtered.length != 0) {
                document.getElementsByClassName("all")[0].classList.remove('selected')
                console.log("this.state.filtered.length : " , this.state.filtered.length)
            }
        }
    }

    closeFilterHandler = (e) => {
        if (e.target.localName === 'img') {
            document.getElementsByClassName(e.target.parentElement.className)[0].classList.remove('selected')

            var index = this.state.filtered.indexOf(e.target.parentElement.className + ' selected')
            if (index !== -1) {
                this.state.filtered.splice(index, 1);
                this.setState({})
            }
            if (this.state.filtered.length === 0) {
                document.getElementsByClassName("all")[0].classList.add('selected')
                console.log("this.state.filtered.length : " , this.state.filtered.length)
            }
        }
    }



    //!! Discussion Like
    onClickLikeButton = (discussionID) => {
        axios.get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/discussions/${discussionID}`)
        .then(res => {
            let this_discussion_liked_user = res.data.likes

            //!! Giriş yapmış olan kullanıcının id'si bu tartışmayı beğenen kişi id'leri içinde varmı
            if (this.props.user.authUser.user_id === this_discussion_liked_user.find(res => res === this.props.user.authUser.user_id)) {
                var index = this_discussion_liked_user.indexOf(this.props.user.authUser.user_id);
                if (index !== -1)
                    this_discussion_liked_user.splice(index, 1); 
                axios(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/discussions/${discussionID}`, {
                    auth: { username: this.props.user.authUser.username, password: localStorage.getItem('user_password') },
                    credentials: 'include',
                    method: 'PATCH',
                    headers: {'Content-Type': 'application/json', },
                    data:{'likes':this_discussion_liked_user},
                }).then(result => {
                    this.forceUpdateHandler()
                })
            }
            else { 
                this_discussion_liked_user.push(this.props.user.authUser.user_id);
                axios(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/discussions/${discussionID}`, {
                    auth: { username: this.props.user.authUser.username, password: localStorage.getItem('user_password') },
                    credentials: 'include',
                    method: 'PATCH',
                    headers: {'Content-Type': 'application/json', },
                    data:{'likes':this_discussion_liked_user},
                }).then(result => {
                    this.forceUpdateHandler()
                })
            }
        })
        .catch(error => console.log(error))
        
    };

    forceUpdateHandler = () =>{
         //!! GET Discussions Api  
         axios.get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/discussions/`)
         .then(discussions_res => { 
             this.props.setDiscussions(discussions_res.data); 
             if (this.props.discussions != null) {
                 axios.get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/discussions/topics`)
                 .then(topics=>this.setState({ topics: topics.data }))
             }
         })
    };


    //!! Model 
    onClickModel = (discussionID) => {
        this.props.setModalIsOpen(true)
        this.props.setModelID(discussionID)
        document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
    }



    //!! Search Value 
    setSearchValue = (e) => {
        this.setState({searchValue: e.toLowerCase()})
    }


  render() {
    const { isPageReady, topics, filtered, searchValue } = this.state
    return (
      <>
        {!isPageReady ?
                <div>
                    <Loading/>
                </div>
            : (
                <>
                    {!this.props.modal.modalIsOpen ? <></> : <DiscussionDetailModal/>}
                    <Menu/>
                    <div id="discussions_page">
                        <Search/>
                        <div className="container discussions_page_cover">
                            <div className="left_side">
                                <div className="filter_part">
                                    <div className="filter">
                                        <span className='all selected' >Hepsi</span>
                                        <span className='populer' >Popüler</span>
                                        <div className='space'></div>
                                        <span onClick={(e) => this.selectFilterHandler(e)} className="soru" >Soru  <img onClick={(e) => this.closeFilterHandler(e)} className='close' src={close_icon} alt=''></img></span>
                                        <span onClick={(e) => this.selectFilterHandler(e)} className="bilgi" >Bilgi  <img onClick={(e) => this.closeFilterHandler(e)} className='close' src={close_icon} alt=''></img></span>
                                        <span onClick={(e) => this.selectFilterHandler(e)} className="öneri" >Öneri  <img onClick={(e) => this.closeFilterHandler(e)} className='close' src={close_icon} alt=''></img></span>
                                        <span onClick={(e) => this.selectFilterHandler(e)} className="şikayet" >Şikayet  <img onClick={(e) => this.closeFilterHandler(e)} className='close' src={close_icon} alt=''></img></span>
                                    </div>
                                    <div className="search">
                                        <i className="fas fa-question"></i>
                                        <input type='search' placeholder='Tartışma Ara' onChange={(e) => this.setSearchValue(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="discussions_part">
                                {/* .filter(val => val.title.toLowerCase()) */}


                                
                                    { filtered.length != 0 ?
                                            Object.values(this.props.discussions)[0].filter(val => val.title.toLowerCase().startsWith(searchValue)).map(((discussion, index) =>filtered.map(val => {
                                                    if (val === discussion.subCategory.toLowerCase() + ' selected') {
                                                        return(
                                                            <div className="discussion_card" key={index}>
                                                                <div className="discussion_category">
            
                                                                        {(()=>{
                                                                            if (discussion.subCategory == 'Soru') {
                                                                                return(
                                                                                    <div className="category_name" style={{ background: 'linear-gradient(90deg, #ffb700, #e2e621)' }}>
                                                                                    <span>{discussion.subCategory}</span>
                                                                                    </div>
                                                                                );
                                                                            }
                                                                            else if (discussion.subCategory == 'Şikayet') {
                                                                                return(
                                                                                    <div className="category_name" style={{ background: 'linear-gradient(90deg, #E63221, #FC4375)' }}>
                                                                                    <span>{discussion.subCategory}</span>
                                                                                    </div>
                                                                                );
                                                                            }
                                                                            else if (discussion.subCategory == 'Öneri') {
                                                                                return(
                                                                                    <div className="category_name" style={{ background: 'linear-gradient(90deg, #48e621, #43fcaf)' }}>
                                                                                    <span>{discussion.subCategory}</span>
                                                                                    </div>
                                                                                );
                                                                            }
                                                                            else if (discussion.subCategory == 'Bilgi') {
                                                                                return(
                                                                                    <div className="category_name" style={{ background: 'linear-gradient(90deg, #7621e6, #a943fc)' }}>
                                                                                    <span>{discussion.subCategory}</span>
                                                                                    </div>
                                                                                );
                                                                            }
            
                                                                        })()}
                                                                        
                                                                        {(() => {
                                                                                if (discussion.likes.find(user_id => user_id === this.props.user.authUser.user_id)) {
                                                                                    return (
                                                                                        <div className="up if_post_liked discussion_vote" onClick={()=>this.onClickLikeButton(discussion.id,this)}>
                                                                                            <img src={this.props.theme.dark ?  dark_up_vote_icon : light_up_vote_icon} alt="" />
                                                                                            <span style={{ color:`var(--theme_post_card_interactive_up_vote)` }}>
                                                                                                {discussion.likes.length}
                                                                                            </span>
                                                                                        </div>
                                                                                    )
                                                                                } else {
                                                                                    return(
                                                                                        <div className="up discussion_vote" onClick={()=>this.onClickLikeButton(discussion.id,this)}>
                                                                                            <img src={this.props.theme.dark ?  up_unvote : up_unvote} alt="" />
                                                                                            <span style={{ color:`#95A5A6` }}>
                                                                                                {discussion.likes.length}
                                                                                            </span>
                                                                                        </div>
                                                                                    )
                                                                                }
                                                                        })()}
                                                                </div>
                                                                <img className='post_user_img' src={routes.url + '/media/' + discussion.discussion_owner.profImage} alt="" />
                                                                <div className="discussion_content">
                                                                    <div className="header" onClick={()=>  this.onClickModel(discussion.id,this) } >
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
                                                                            <span> {Moment(discussion.created_date,'YYYYMMDD').fromNow()} </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                })
                                            ))
                                        :
                                            Object.values(this.props.discussions)[0].filter(val => val.title.toLowerCase().startsWith(searchValue)).map(((discussion, index) =>{
                                                    return(
                                                        <div className="discussion_card" key={index} >
                                                            <div className="discussion_category">
        
                                                                    {(()=>{
                                                                        if (discussion.subCategory == 'Soru') {
                                                                            return(
                                                                                <div className="category_name" style={{ background: 'linear-gradient(90deg, #ffb700, #e2e621)' }}>
                                                                                <span>{discussion.subCategory}</span>
                                                                                </div>
                                                                            );
                                                                        }
                                                                        else if (discussion.subCategory == 'Şikayet') {
                                                                            return(
                                                                                <div className="category_name" style={{ background: 'linear-gradient(90deg, #E63221, #FC4375)' }}>
                                                                                <span>{discussion.subCategory}</span>
                                                                                </div>
                                                                            );
                                                                        }
                                                                        else if (discussion.subCategory == 'Öneri') {
                                                                            return(
                                                                                <div className="category_name" style={{ background: 'linear-gradient(90deg, #48e621, #43fcaf)' }}>
                                                                                <span>{discussion.subCategory}</span>
                                                                                </div>
                                                                            );
                                                                        }
                                                                        else if (discussion.subCategory == 'Bilgi') {
                                                                            return(
                                                                                <div className="category_name" style={{ background: 'linear-gradient(90deg, #7621e6, #a943fc)' }}>
                                                                                <span>{discussion.subCategory}</span>
                                                                                </div>
                                                                            );
                                                                        }
        
                                                                    })()}


                                                                    {(() => {
                                                                                if (discussion.likes.find(user_id => user_id === this.props.user.authUser.user_id)) {
                                                                                    return (
                                                                                        <div className="up if_post_liked discussion_vote" onClick={()=>this.onClickLikeButton(discussion.id,this)}>
                                                                                            <img src={this.props.theme.dark ?  dark_up_vote_icon : light_up_vote_icon} alt="" />
                                                                                            <span style={{ color:`var(--theme_post_card_interactive_up_vote)` }}>
                                                                                                {discussion.likes.length}
                                                                                            </span>
                                                                                        </div>
                                                                                    )
                                                                                } else {
                                                                                    return(
                                                                                        <div className="up discussion_vote" onClick={()=>this.onClickLikeButton(discussion.id,this)}>
                                                                                            <img src={this.props.theme.dark ?  up_unvote : up_unvote} alt="" />
                                                                                            <span style={{ color:`#95A5A6` }}>
                                                                                                {discussion.likes.length}
                                                                                            </span>
                                                                                        </div>
                                                                                    )
                                                                                }
                                                                    })()}
                                                                    
                                                                
                                                            </div>
                                                            <img className='post_user_img' src={routes.url + '/media/' + discussion.discussion_owner.profImage} alt="" />
                                                            <div className="discussion_content">
                                                                <div className="header" onClick={()=> this.onClickModel(discussion.id,this)} >
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
                                                                        <span> {Moment(discussion.created_date,'YYYYMMDD').fromNow()} </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );

                                                }
                                            ))
                                    }

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
                                                return(
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
}

const mapStateToProps = state => ({
    theme: state.theme,
    user: state.auth,
    posts: state.posts,
    discussions: state.discussions,
    modal: state.modal,
})

const mapDispatchToProps = (dispatch) => {
    return {
        login: (val) => dispatch(login(val)),
        setPosts: (val) => dispatch(setPosts(val)),
        setDarkTheme: (val) => dispatch(setDarkMode(val)),
        setDiscussions: (val) => dispatch(setDiscussions(val)),
        setModalIsOpen: (val) => dispatch(setModalIsOpen(val)),
        setModelID: (val) => dispatch(setModalID(val))
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(Discussion)
