import React, { useEffect, useState } from 'react'
import { routes } from '../../../routes'


import rank_icon from '../../../assets/img/icons/main_icons/rank_icon.png'
import like_icon from '../../../assets/img/icons/main_icons/like_icon.png'
import reliablity_icon from '../../../assets/img/icons/main_icons/reliablity_icon.png'
import mail_icon from '../../../assets/img/icons/main_icons/mail_icon.png'
import social_address from '../../../assets/img/icons/main_icons/social_address.png'
import like_icon_1 from '../../../assets/img/icons/post_detail_icons/like_icon_1.png';
import share from '../../../assets/img/icons/post_detail_icons/share.png';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { CustomUserRank_Api, Follow_Unfollow_Api, Login_Api, UserRank_Api } from '../../../apis/Api'
import { login } from '../../../stores/authSlice'
import MiniLoading from '../../../components/loading/miniLoading'


function UserSmallInfoDesign({ profileUser }) {

    const authUser = useSelector(state => state.auth.authUser)
    const [profile_user_rank, setProfile_user_rank] = useState()
    const [isFollowButtonReady, setisFollowButtonReady] = useState(false)
    const [media, setMedia] = useState()
    const dispatch = useDispatch();

    const setLoginInfoToLclStorage = async () => {

        // Auth olan kişinin profiline girilen kişiyi takip etmesi durumunda LclStorage güncellenecek
        await Login_Api()
            .then(res => {
                dispatch(login(res.data))
            })
        
        // Güncellenen LclStorage ile profiline girilen kişinin rank bilgileri alınıyor
        await CustomUserRank_Api(profileUser.profile_detail.user_id)
        .then(res=>{
            setProfile_user_rank(res.data.user_rank)
        })

        // Bu kodu eğer sayfa yüklendiği halde Follow butonu yüklenmediyse bir loading gösterilecek
        if (authUser.more_info.following) {
            setisFollowButtonReady(true)
        }
    }

    // Bu kod sadece authUser veya profile_user_rank değişmesi durumunda kullanılacak
    useEffect(() => {
        setLoginInfoToLclStorage()
    }, [authUser], [profile_user_rank])


    // ComponentDidMounth tarzında sayfa Dom'a ilk render edildikten sonra bu kod çalışıcak
    useEffect(() => {
        checkSocialMedia()
    }, [])


    // Profiline girilen kişinin görünmesini istediği sosyal ağları alıyoruz
    const checkSocialMedia = () => {
        if (profileUser) {
            var studentUserSocialMedia = profileUser.profile_detail.more_info.studentUserSocialMedia
            setMedia(studentUserSocialMedia)
        }
    }


    // Follow Butonu
    const onClickFollowutton = async () => {

        //Auth olmuş kişinin TAKİP ETTİKLERİ kişilerin id listesini aldık
        var followList = authUser.more_info.following

        // Bu listenin bir kopyasını aldık referansı değişti
        followList = Object.assign([], followList);

        // Profiline girdiğimiz kişinin index numarasını bizim listeye ekledik 
        followList.push(profileUser.profile_detail.user_id);

        await Follow_Unfollow_Api(followList)

    };

    // UnFollow Butonu
    const onClickUnFollowutton = async () => {

        //Auth olmuş kişinin TAKİP ETTİKLERİ kişilerin id listesini aldık
        var followList = authUser.more_info.following

        // Bu listenin bir kopyasını aldık referansı değişti
        followList = Object.assign([], followList);

        // Profiline girdiğimiz kişinin index numarası bizim listede var mı 
        var index = followList.indexOf(profileUser.profile_detail.user_id);

        // Eğer varsa o index'i listeden çıkardık
        if (index !== -1)
            followList.splice(index, 1);

        await Follow_Unfollow_Api(followList)
    };


    return (
        <>
            <div id='userSmallInfoDesign'>
                <div className='profile_detail_user_img'>
                    <div className='img_blur'></div>
                    <img src={routes.url + profileUser.profile_detail.more_info.profImage} alt="" />
                </div>
                <div className='profile_detail_content'>
                    <div className='name'>
                        <span> {profileUser.profile_detail.first_name} {profileUser.profile_detail.last_name} </span>
                        <div> ({profileUser.profile_detail.more_info.departmentName})  </div>
                    </div>
                    <div className="info">
                        <div className="rank">
                            <div>
                                <img alt="" src={rank_icon} />
                                <span>{profile_user_rank}</span>
                            </div>
                            <span className='text'>Rütbe</span>
                        </div>
                        <div className="follow">
                            <div>
                                <img alt="" src={like_icon} />
                                <span>{profileUser.profile_detail.more_info.followers}</span>
                            </div>
                            <span className='text'>Takipçi</span>
                        </div>
                        <div className="reliable">
                            <div>
                                <img alt="" src={reliablity_icon} />
                                <span>5<span>/100</span></span>

                            </div>
                            <span className='text'>Güvenilirlik</span>
                        </div>
                    </div>
                    <div className='small_desc'>
                        {profileUser.profile_detail.more_info.smallDesc}
                    </div>
                    <div className='mail'>
                        <div>
                            <img src={mail_icon} alt="" />
                            <span> Mail </span>
                        </div>
                        <span className='mail_adress'>
                            {profileUser.profile_detail.email}
                        </span>
                    </div>
                    <div className='social_icons'>
                        {media != null ?
                            <>
                                <div className='header'>
                                    <img src={social_address} alt="" />
                                    <span> Sosyal Adresler </span>
                                </div>
                            </> : <></>
                        }
                        <ul>
                            {
                                media != null ?
                                    Object.values(media).map(val => {
                                        if (val === 'Facebook') {
                                            return (
                                                <li key='Facebook' className="facebook"><a href="#"><i className="fa fa-facebook " aria-hidden="true"></i></a></li>
                                            );
                                        }
                                        if (val === 'Twitter') {
                                            return (
                                                <li key='Twitter' className="twitter"><a href="#"><i className="fa fa-twitter " aria-hidden="true"></i></a></li>
                                            );
                                        }
                                        if (val === 'İnstagram') {
                                            return (
                                                <li key='İnstagram' className="instagram"><a href="#"><i className="fa fa-instagram " aria-hidden="true"></i></a></li>
                                            );
                                        }
                                        if (val === 'Github') {
                                            return (
                                                <li key='Github' className="github"><a href="#"><i className="fa fa-github " aria-hidden="true"></i></a></li>
                                            );
                                        }
                                        if (val === 'Whatsapp') {
                                            return (
                                                <li key='Whatsapp' className="whatsapp"><a href="#"><i className="fa fa-whatsapp " aria-hidden="true"></i></a></li>
                                            );
                                        }
                                        if (val === 'Linkedn') {
                                            return (
                                                <li key='Linkedn' className="linkedin"><a href="#"><i className="fa fa-linkedin " aria-hidden="true"></i></a></li>
                                            );
                                        }

                                    })
                                    :
                                    <></>
                            }

                        </ul>
                    </div>
                </div>
                <div className='follow'>
                    {(() => {

                        if (profileUser.profile_detail.user_id === authUser.user_id) {
                            return (
                                <></>
                            )
                        } else {
                            return (
                                <div className="reactions_post_owner">
                                    <div className="publish">
                                        <img src={share} alt="" />
                                    </div>

                                    { isFollowButtonReady ?
                                        
                                        <>
                                            {(() => {

                                                if (profileUser.profile_detail.user_id === authUser.more_info.following.find(res => res === profileUser.profile_detail.user_id)) {
                                                    return (
                                                        <div className="unfollow" onClick={() => onClickUnFollowutton()}>
                                                            <span >
                                                                Takipi Bırak
                                                            </span>
                                                        </div>
                                                    )
                                                }
                                                else if (profileUser.profile_detail.user_id !== authUser.more_info.following.find(res => res === profileUser.profile_detail.user_id)) {
                                                    return (
                                                        <div className="follow" onClick={() => onClickFollowutton()}>
                                                            <span >
                                                                Takip Et
                                                            </span>
                                                        </div>
                                                    )
                                                }
                                                
                                            })()}
                                        </>
                                        
                                        :

                                        <>
                                            <MiniLoading/>
                                        </>
                                    }

                                  

                                </div>
                            )
                        }
                    })()}
                </div>
            </div>
        </>
    )
}

export default UserSmallInfoDesign
