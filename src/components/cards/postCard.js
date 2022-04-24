import React from 'react'

import hearth from '../../assets/img/icons/main_icons/hearth.png'
import more_icon from '../../assets/img/icons/post_detail_icons/more_icon.png'
import comment_icon from '../../assets/img/icons/post_detail_icons/comment_icon.png'
import reaction_icon from '../../assets/img/icons/main_icons/reaction_icon.png'
import media_icon from '../../assets/img/icons/main_icons/media_icon.png'


function PostCard({data}) {

  return (
    <div id='PostCard'>
        <div className='publisher_img'>
            <img src={data.publisher_img} alt='' />
        </div>
        <div className='card_inner'>
            <div className='info_about_publisher'>
                <div className='more_publisher_info'>
                    <div className='publisher_name'>
                        <span>{data.publisher_name}</span>
                    </div>
                    <div className='about_post'>
                        <div className='post_category'>
                            {data.post_tags ?
                                Object.values(data.post_tags).map((val,index) =>{
                                    return <div key={index}>
                                        <span className='color' style={{color:val.color}}>#</span>
                                        <span className='tag_title'>{val.title}</span>
                                    </div>
                                })
                                :
                                <div></div>
                            }
                            
             
                        </div>
                        <div className='divider'></div>
                        <div className='published_time'>
                            <span>{data.published_time}</span>
                        </div>
                    </div>
                </div>
                <div className='more_set'>
                    <img src={more_icon} alt='' />
                </div>
            </div>
            <div className='card_content'>
                <p>
                    {data.card_content}
                </p>
                <div className='content_media'>
                    <img src={data.content_media} alt='' />
                </div>
            </div>
            <div className='card_reactions'>
                <div className='liked_users'>
                    {data.liked_users ? 
                        Object.values(data.liked_users).map((val,index) =>{
                            return  <img key={index} src={val.liked_user_img} alt='' />
                        })
                        :
                        <div></div>
                    }
                            
                    <a href='/#'>
                        <span>+{data.liked_users_count}</span>
                    </a>
                </div>
                <div className='reactions'>
                    <div className='comment'>
                        <img src={comment_icon} alt='' />
                        <span>{data.comment_count}</span>
                    </div>
                    <div className='like'>
                        <img src={hearth} alt='' />
                        <span>{data.liked_users_count}</span>
                    </div>
                </div>
            </div>
            <div className='card_comennters'>
                <div className='commenters_users'>

                    {
                        Object.values(data.commenters).map((val,index) =>{
                            return  <div key={index} className='single_commenter'>
                                        <div className='commenters_user_img'>
                                            <img src={val.commenters_user_img} alt='' />
                                        </div>
                                        <div className='comment_info'>
                                            <div className='commenters_user_info'>
                                                <span className='commenters_user_name'>{val.commenters_user_name}</span>
                                                <span className='comment_time'>{val.comment_time}</span>
                                                <img src={more_icon} alt='' />
                                            </div>
                                            <div className='comment_text'>
                                                <p>
                                                    {val.comment_text}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                        })
                    }


                  


                </div>
                <div className='write_comment'>
                    <div className='comment_cover'>
                        <img className='auth_user_img' src={data.publisher_img} alt='' />
                        <input type='search' placeholder='Yorum Yap' />
                        <div className='reaction_icon'>
                            <img src={reaction_icon} alt='' />
                        </div>
                        <div className='media_icon'>
                            <img src={media_icon} alt='' />
                        </div>
                    </div>
                </div>
            </div>
       </div>
    </div>
  )
}

export default PostCard
