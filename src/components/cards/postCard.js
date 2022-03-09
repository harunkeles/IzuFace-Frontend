import React from 'react'


import hearth from '../../assets/img/icons/main_icons/hearth.png'
import like_icon_1 from '../../assets/img/icons/post_detail_icons/like_icon_1.png'
import liked_icon from '../../assets/img/icons/post_detail_icons/liked_icon.png'
import Admin_Resim from '../../assets/img/others/Admin_Resim.jpg'
import ali_asaf from '../../assets/img/others/ali-asaf.jpg'
import ali_asaf2 from '../../assets/img/others/ali-asaf2.jpg'
import ali_asaf3 from '../../assets/img/others/ali-asaf3.jpg'
import more_icon from '../../assets/img/icons/post_detail_icons/more_icon.png'
import comment_icon from '../../assets/img/icons/post_detail_icons/comment_icon.png'
import login_page_bg from '../../assets/img/bg_images/log_images/login_page_bg.jpg'
import search_icon from '../../assets/img/icons/main_icons/search_icon.png'
import reaction_icon from '../../assets/img/icons/main_icons/reaction_icon.png'
import media_icon from '../../assets/img/icons/main_icons/media_icon.png'

function PostCard({abc}) {
  return (
    <div id='PostCard'>
        <div className='publisher_img'>
            <img src={Admin_Resim} alt='' />
        </div>
        <div className='card_inner'>
            <div className='info_about_publisher'>
                <div className='more_publisher_info'>
                    <div className='publisher_name'>
                        <span>Muhammet Harun Keleş</span>
                    </div>
                    <div className='about_post'>
                        <div className='post_category'>
                            <span>Gündem</span>
                        </div>
                        <div className='divider'></div>
                        <div className='published_time'>
                            <span>23 Aralık 2020</span>
                        </div>
                    </div>
                </div>
                <div className='more_set'>
                    <img src={more_icon} alt='' />
                </div>
            </div>
            <div className='card_content'>
                <p>
                    İstanbul Sabahattin Zaim Üniversitesi öğrencisiyim. Okuduğum üniversiteden çok memnunum.
                </p>
                <div className='content_media'>
                    <img src={login_page_bg} alt='' />
                </div>
            </div>
            <div className='card_reactions'>
                <div className='liked_users'>
                    <img src={Admin_Resim} alt='' />
                    <img src={ali_asaf} alt='' />
                    <img src={ali_asaf2} alt='' />
                    <img src={ali_asaf3} alt='' />
                    <a href='/#'>
                        <span>+15</span>
                    </a>
                </div>
                <div className='reactions'>
                    <div className='comment'>
                        <img src={comment_icon} alt='' />
                        <span>3</span>
                    </div>
                    <div className='like'>
                        <img src={hearth} alt='' />
                        <span>15</span>
                    </div>
                </div>
            </div>
            <div className='card_comennters'>
                <div className='commenters_users'>
                    <div className='single_commenter'>
                        <div className='commenters_user_img'>
                            <img src={Admin_Resim} alt='' />
                        </div>
                        <div className='comment_info'>
                            <div className='commenters_user_info'>
                                <span className='commenters_user_name'>Merve Kuru</span>
                                <span className='comment_time'>10 saat önce</span>
                                <img src={more_icon} alt='' />
                            </div>
                            <div className='comment_text'>
                                <p>
                                    Okuduğum üniversiteden çok memnunum. Bu yüzdene de okulumuzun blog sitesini yapma
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='single_commenter'>
                        <div className='commenters_user_img'>
                            <img src={ali_asaf} alt='' />
                        </div>
                        <div className='comment_info'>
                            <div className='commenters_user_info'>
                                <span className='commenters_user_name'>Merve Kuru</span>
                                <span className='comment_time'>10 saat önce</span>
                                <img src={more_icon} alt='' />
                            </div>
                            <div className='comment_text'>
                                <p>
                                    This package hosts the incubator components that are not yet ready to move to core.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='single_commenter'>
                        <div className='commenters_user_img'>
                            <img src={ali_asaf3} alt='' />
                        </div>
                        <div className='comment_info'>
                            <div className='commenters_user_info'>
                                <span className='commenters_user_name'>Merve Kuru</span>
                                <span className='comment_time'>10 saat önce</span>
                                <img src={more_icon} alt='' />
                            </div>
                            <div className='comment_text'>
                                <p>
                                    Bu yüzdene de okuluini yapma  u yüzdene de a  Bu yüzdene de oumuzun blog sitesini yapma  Bu yüzdene de okulumuzun blog sitesini yapma  Bu yüzdene de okulumuzun blog sitesini yapma  Bu yüzdene de okulumuzun blog sie de okulumuzun blog sitesini yapma  Bu lumuzun blog sitesini yapma
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='write_comment'>
                    <div className='comment_cover'>
                        <img className='auth_user_img' src={Admin_Resim} alt='' />
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
