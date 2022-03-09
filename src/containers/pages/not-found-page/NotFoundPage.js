import React from 'react'
import Navbar from '../../../components/navbar/Navbar';
import error from '../../../assets/img/others/error.png';


const NotFoundPage = () => {
    return (
       <>
            <div id='not_found_page'>
                <Navbar isPageReady={true}/>
                <div className='container'>
                    <div className='error_content'>
                        <h2>Sayfa Bulunamadı </h2>
                        <h5>Olmayan bir sayfaya gitmeye çalıştınız. Lütfen gitmek istediğiniz sayfanın doğruluğunu kontrol ediniz.</h5>
                        <a href='/'>Ana Sayfaya Dön</a>
                    </div>
                    <div className='error_img'>
                        <img alt='404' src={error} />
                    </div>
                </div>
            </div>
       </>
    )
}

export default NotFoundPage;