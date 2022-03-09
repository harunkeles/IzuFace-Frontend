import React, { useEffect, useState } from 'react'


import rank_icon from '../../../assets/img/icons/main_icons/rank_icon.png'
import like_icon from '../../../assets/img/icons/main_icons/like_icon.png'
import reliablity_icon from '../../../assets/img/icons/main_icons/reliablity_icon.png'
import { routes } from '../../../routes'
import axios from 'axios'


function UserSuggestionDesign({theme,profileUser,user,setIsPageReady,isPageReady}) {
    console.log(user.authUser.user_id)

    const [ sameDepartment, setSameDepartment ] = useState();

    useEffect(()=>{
        var department = profileUser.profile_detail.more_info.departmentName
        axios.get(`http://localhost:8000/api/v0/all-endpoints/std/department/${department}`)
        .then(res => { setSameDepartment(res.data.users) })
    },[])
    
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
                                <>
                                    { departmentUser.id != user.authUser.user_id ?
                                            <a key={index} href={`/std/@${departmentUser.user_name}`}>
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
                                </>
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
