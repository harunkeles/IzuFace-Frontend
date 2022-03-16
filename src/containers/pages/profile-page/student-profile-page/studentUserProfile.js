import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../../components/loading/loading';
import { setDarkMode } from '../../../../stores/themeSlice';
import { login } from '../../../../stores/authSlice';
import { setProfileDetail } from '../../../../stores/profileDetailSlice';
import axios from 'axios';
import ProfileDetailMenu from '../../../../components/menu/profileDetailMenu';
import UserSmallInfoDesign from '../userSmallInfoDesign';
import UserMiddleSectionDesign from '../userMiddleSectionDesign';
import UserSuggestionDesign from '../userSuggestionDesign';



function StudentUserProfile() {

    let { username } = useParams();

    const theme = useSelector(state => state.theme)
    const user = useSelector(state => state.auth)
    const profileUser = useSelector(state => state.profileDetail)
    const dispatch = useDispatch()


    const [ isPageReady, setIsPageReady ] = useState(false);

  
    useEffect(() => {
        
        if (username) {
            //!! GET Auth User Informations
            axios
            .get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/all-endpoints/auth-user-info/${localStorage.getItem("_user_id")}-${localStorage.getItem("_authToken")}`)
            .then(res => {
                dispatch(login(res.data))
                //!! GET Site Settings  
                axios.get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/all-endpoints/auth-user-site-settings/${localStorage.getItem("_user_id")}`)
                .then(theme_res => {
                    dispatch(setDarkMode(theme_res.data.dark_theme))
                })
                .then(() => {
                    //!! GET Profile Detail  
                    axios.get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/all-endpoints/std/${username}`)
                    .then(profileDetail => {
                        dispatch(setProfileDetail(profileDetail.data))
                        //!! Post Rank
                        axios.get(`${process.env.REACT_APP_UNSPLASH_URL}api/v0/all-endpoints/user-rank/${profileDetail.data.user_id}`)
                        setIsPageReady(true)
                    })
                })
            })
            .catch(error => console.log(error))
        }

      }, [isPageReady]);


    return (
        <>
            {!isPageReady ? 
                <Loading/> : 
                <>
                  <div id='studentUserProfile'>
                    <ProfileDetailMenu theme={theme} profileUser={profileUser} user={user} />
                    <UserSmallInfoDesign theme={theme} profileUser={profileUser} user={user} setIsPageReady={setIsPageReady} isPageReady={isPageReady} />
                    <UserMiddleSectionDesign theme={theme} profileUser={profileUser} user={user} setIsPageReady={setIsPageReady} isPageReady={isPageReady} />
                    <UserSuggestionDesign theme={theme} profileUser={profileUser} user={user} setIsPageReady={setIsPageReady} isPageReady={isPageReady} />
                  </div>
                </>    
            }
        </>
    );
  }



export default StudentUserProfile