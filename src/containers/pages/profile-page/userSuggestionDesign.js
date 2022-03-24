import React, { useEffect, useState } from 'react'


import rank_icon from '../../../assets/img/icons/main_icons/rank_icon.png'
import like_icon from '../../../assets/img/icons/main_icons/like_icon.png'
import reliablity_icon from '../../../assets/img/icons/main_icons/reliablity_icon.png'
import { routes } from '../../../routes'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { StudentUserDepartment_Api } from '../../../apis/Api'


function UserSuggestionDesign({ profileUser }) {

    const authUser = useSelector(state => state.auth.authUser)
    const [ sameDepartment, setSameDepartment ] = useState();


    useEffect(()=>{
        getApis()
    },[])


    const getApis = async () => {
        
        // Profiline girmiş olduğumuz kişi ile aynı departmente ait olan kişileri buluyoruz
        var department = profileUser.profile_detail.more_info.departmentName
        await StudentUserDepartment_Api(department)
            .then(res => {
                setSameDepartment(res.data.users)
            }).catch(error => { console.log(error) })

    }


    
  return (
    <>
        <div id='userSuggestionDesign'>
            <div className='section_1'>
                <div className='section_title'>
                    Aynı Bölümden Kişiler
                </div>
                <div className='section_list'>
                   
                    { sameDepartment ?
                        Object.values(sameDepartment).map(( departmentUser, index ) => {
                            return(
                                <div key={index}>
                                    { departmentUser.id != authUser.user_id ?
                                            <a href={`/std/@${departmentUser.user_name}`}>
                                                <div className='user_img'>
                                                    <img src={routes.url + '/media/' + departmentUser.prof_img} alt="" />
                                                </div>
                                                <div className='user_more_info'>
                                                    <span className='name'> {departmentUser.full_name} </span>
                                                    <div className="info">
                                                        <div className="rank">
                                                            <img alt="" src={rank_icon} />
                                                            <span>{departmentUser.user_rank}</span>
                                                        </div>
                                                        <div className="follow">
                                                            <img alt="" src={like_icon} />
                                                            <span>{departmentUser.followers}</span>
                                                        </div>
                                                        <div className="reliable">
                                                            <img alt="" src={reliablity_icon} />
                                                            <span>5%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a> 
                                        : <></>
                                    }
                                </div>
                            );
                        })
                        : <></>
                    }
                   
                </div>
            </div>
        </div>
    </>
  )
}

export default UserSuggestionDesign
