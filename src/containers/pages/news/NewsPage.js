import React, { useEffect, useState } from 'react'
import { Filtered_News_Api } from '../../../apis/Api';

import Admin_Resim from '../../../assets/img/others/Admin_Resim.jpg'
import bookmark from '../../../assets/img/icons/main_icons/bookmark.png'
import more_menu from '../../../assets/img/icons/main_icons/more_menu.png'
import Moment from 'moment';
import 'moment/locale/tr'
import Loading from '../../../components/loading/loading';
import { routes } from '../../../routes';
import { Navbar } from 'rsuite';
import Menu from '../../../components/menu/menu';

const News = () => {

    const [news, setNews] = useState(null);

    const getData = () => {
        Filtered_News_Api()
            .then(res => {
                setNews(res.data)
            })
    }
    // 

    console.log(news)

    useEffect(() => {
        getData()
    }, [])


    return (
        <>
            { news ?
                <>
                    <Menu/> 
                    <div id='newsPage'>
                        <div className='newsPage__cover'>
                            <section className='section_1'>
                                <div className='left_side'>
                                {Object.values(news).reverse().map((val,index)=> {
                                        if (index == 0) {
                                            return <div key={index}>
                                                    <div className='blur'></div>
                                                    <img src={val.image} alt='' />
                                                    <div className='category'>
                                                        {val.subCategory}
                                                    </div>
                                                    <div className='content'>
                                                        <div className='tags'>
                                                            {
                                                                Object.values(val.tag).map((tag,i)=>{
                                                                    return <div key={i}><span style={{color : `${tag[1]}`}}>#</span>{tag[0]}</div>
                                                                })
                                                            }
                                                        </div>
                                                        <div className='title'>
                                                            {val.title}
                                                        </div>
                                                    </div>
                                            </div>
                                    }
                                    })}
                                </div>
                                <div className='right_side'>
                                    {Object.values(news).reverse().map((val,index)=> {
                                        if (index == 0) return false
                                        if (index < 5) {
                                            return  <div key={index} className='cards'>
                                                        <div className='single_card'>
                                                            <img src={val.image} alt='' />
                                                            <div className='card_content'>
                                                                <div className='top'>
                                                                    {Moment(val.created_date).format('LLL')}
                                                                </div>
                                                                <div className='bottom'>
                                                                    {val.title}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                        }
                                    })}
                                    
                                
                                </div>
                            </section>
                            <section className='section_2'>
                                <div className='section_title'>
                                    En Çok Ziyaret Edilen Haberler
                                </div>
                                <div className='section_content'>
                                    <div className='cards'>

                                        {
                                            Object.values(news).reverse().map((val,index)=>{
                                                if(index < 5)
                                                {
                                                    return <div key={index} className='single_card'>
                                                                <img src={val.image} alt='' />
                                                                <div className='card_content'>
                                                                    <div className='title'>
                                                                        {val.title}
                                                                    </div>
                                                                    <div className='more_info'>
                                                                        <div className='category'>
                                                                            {val.subCategory}
                                                                        </div>
                                                                        <div className='date'>{Moment(val.created_date).format('LL')}</div>
                                                                    </div>
                                                                    <div className='news_owner'>
                                                                        <img src={routes.url + '/media/' + val.post_owner.profImage} alt='' />
                                                                        {val.post_owner.full_name}
                                                                    </div>
                                                                
                                                                </div>
                                                            </div>
                                                }
                                            })
                                        }


                                    </div>
                                </div>
                            </section>
                            <section className='section_3'>
                                <div className='section_3_cover'>
                                    <div className='left_side'>
                                        <div className='title'>
                                            Diğer Haberler
                                        </div>
                                        <div className='cards'>
                                        {
                                            Object.values(news).reverse().map((val,index)=>{
                                                return  <div key={index} className='single_card'>
                                                            <div className='content'>
                                                                <div className='news_owner'>
                                                                    <img src={routes.url + '/media/' + val.post_owner.profImage} alt='' />
                                                                    {val.post_owner.full_name}
                                                                </div>
                                                                <div className='content_title'>
                                                                    {val.title}
                                                                </div>
                                                                <div className='content_text'>
                                                                    {val.subTitle}
                                                                </div>
                                                                <div className='more_info'>
                                                                    <div className='left_infos'>
                                                                        <div className='date'>{Moment(val.created_date).format('LL')}</div>
                                                                        <div className='category'>{val.subCategory}</div>
                                                                    </div>
                                                                    <div className='right_infos'>
                                                                        <img className='bookmark' src={bookmark} alt=''/>
                                                                        <img className='more_menu' src={more_menu} alt=''/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <img className='content_img' src={val.image} alt='' />
                                                        </div>
                                            })
                                        }
                                        </div>
                                    </div>
                                    <div className='right_side'>
                                        <div className='title'>
                                            Sabit Haberler
                                        </div>
                                        <div className='cards'>
                                            {
                                                Object.values(news).map((val,index)=>{
                                                    return  <div key={index} className='single_card'>
                                                                <img src={val.image} alt='' />
                                                                <div className='card_content'>
                                                                    <div className='top'>
                                                                        {Moment(val.created_date).format('LL')}
                                                                    </div>
                                                                    <div className='bottom'>
                                                                        {val.title}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </>
            :
                <Loading/>
            }
        </>
    )
}



export default News