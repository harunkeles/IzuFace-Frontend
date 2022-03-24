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
import { StudentUserProfileDetail_Api } from '../../../../apis/Api';
import history from '../../../../history';
import { routes } from '../../../../routes';



function StudentUserProfile() {

    let { username } = useParams();

    const profileUser = useSelector(state => state.profileDetail)
    const dispatch = useDispatch()

    const [ isPageReady, setIsPageReady ] = useState(false);


    const getApis = async () => {

        if (username){
            await StudentUserProfileDetail_Api(username)
                .then(profileDetail => {
                    dispatch(setProfileDetail(profileDetail.data))
                    setIsPageReady(true)
                })
        }

    }


    useEffect(() => {
        getApis()
    }, []);



    return (
        <>
            {!isPageReady ? 
                <Loading/> : 
                <>
                  <div id='studentUserProfile'>
                    <ProfileDetailMenu />
                    <UserSmallInfoDesign profileUser={profileUser} />
                    <UserMiddleSectionDesign profileUser={profileUser}/>
                    <UserSuggestionDesign profileUser={profileUser} />
                  </div>
                </>    
            }
        </>
    );
  }



export default StudentUserProfile