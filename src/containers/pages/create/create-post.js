import React, { useState } from 'react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Navbar from '../../../components/navbar/Navbar'
import Ck_Editor from '../../../components/Mh_Editor/Ck_Editor';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function Create_post() {

    const [postType, setPostType] = useState('classic');

    const handlePostTypeChange = (event, newpostType) => {
        setPostType(newpostType);
    };


    const [coverImage, setCoverImage] = useState(null);

    const onCoverImageChange = async(event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setCoverImage(URL.createObjectURL(img));
        }
    };

    const [openDialog, setOpenDialog] = useState(false);
    const onCoverImageDialogOpen = event => {
        setOpenDialog(true);
    };
    const onCoverImageDialogClose = event => {
        setOpenDialog(false);
    };
    const onCoverImageDelete = event => {
        setCoverImage(null);
        setOpenDialog(false);
    };

    const [articleTitle, setArticleTitle] = useState('');
    const [articleTitleWar, setArticleTitleWar] = useState({display:'none'});
    const maxlength = 20;
    const onArticleTitleChange = event => {
        setArticleTitle(event.target.value)
        event.target.style.height = event.target.scrollHeight + 'px'
        let text = event.target.value
        if (text.length === maxlength) {
            event.target.value = text
            console.log("dasdads" , text.length)
            setArticleTitleWar({
                display: 'flex',
                color:'red'
            })
        }
        else{
            setArticleTitleWar({
                display: 'none',
            })
        }
    }
    


    return (
        <div id='Create_Post'>
            <Navbar isPageReady={true}/> 
            <div className='container create_post_cover'>
                <div className='category_type_row'>
                    <div className='label'>
                        <span>Gönderi tipini seçiniz : </span>
                    </div>
                    <ToggleButtonGroup  
                    className='toogle_post_type_category'
                    color="primary"
                    value={postType}
                    exclusive
                    onChange={handlePostTypeChange}
                    >
                        <ToggleButton id='toggle_button_classic_post' value="classic">Klasik</ToggleButton>
                        <ToggleButton id='toggle_button_news_type_post' value="news_type">Haber</ToggleButton>
                        <ToggleButton id='toggle_button_activities_type_post' value="activities_type">Etkinlik</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <div id='Text_area'>
                    <div className='writing_area'>
                        <img className='cover_image' src={coverImage} alt='' />
                        <div className='cover_image_row'>
                            {coverImage ?  
                                <>
                                    <button className='cover_image'>
                                        <span>Medyayı Değiştir</span>
                                        <input type='file' className='cover_image' onChange={onCoverImageChange} />
                                    </button>
                                    <button className='cover_image_delete'>
                                        <span onClick={onCoverImageDialogOpen}>Medyayı Sil</span>
                                        <Dialog
                                            open={openDialog}
                                            TransitionComponent={Transition}
                                            keepMounted
                                            onClose={onCoverImageDialogClose}
                                            aria-describedby="alert-dialog-slide-description"
                                        >
                                            <DialogTitle>{"Yüklemiş olduğunuz medyayı silmek istiyor musunuz?"}</DialogTitle>
                                            <DialogActions>
                                                <Button style={{marginRight:'10px'}} color="inherit" onClick={onCoverImageDialogClose}>Vazgeç</Button>
                                                <Button variant="contained" color="error" onClick={onCoverImageDelete}>Sİl</Button>
                                            </DialogActions>
                                        </Dialog>
                                    </button>
                                </>
                            : 
                                <button className='cover_image'>
                                    <span>Medya Ekle</span>
                                    <input type='file' className='cover_image' onChange={onCoverImageChange} />
                                </button>
                            }
                        </div>
                        <div className='article-form__body'>
                            <div className='article_base_title'>
                                <span style={articleTitleWar}>*Girebileceğiniz en fazla karakter sayısına ulaştınız.</span>
                                <textarea  maxLength={maxlength} rows={1} type='text' value={articleTitle} onChange={onArticleTitleChange} placeholder='Gönderinin başlığı burada..' />
                            </div>
                            {(()=>{
                                console.log(postType)
                                if (postType === 'classic') {
                                    return classic_post_type()
                                }
                                else if (postType === 'news_type') {
                                    return classic_news_post_type(coverImage,articleTitle)
                                }
                                else if (postType === 'activities_type') {
                                    return classic_activities_post_type(coverImage,articleTitle)
                                }
                            })()}
                            
                        </div>
                    </div>
                    <div className='suggestion_area'>
                        s
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Create_post



function classic_post_type (){
    return(
        <>
        </>
    );
}

function classic_news_post_type (coverImage,articleTitle){
    if (localStorage.getItem('news_type_editor')) {
        var savedData = JSON.parse(localStorage.getItem('news_type_editor'))
        console.log("Giden News Data  : " , savedData)
    }
    return(
        <>
            <Ck_Editor data={savedData ? savedData['bodyMarkdown'] : "<p>Haber içeriğini yazınız ...</p>"} post_type={"news"} coverImage={coverImage} articleTitle={articleTitle}/>
        </>
    );
}

function classic_activities_post_type (coverImage,articleTitle){
    var savedData = JSON.parse(localStorage.getItem('activity_type_editor'))
    console.log("Giden Activity Data  : " , savedData)
    return(
        <>
            {/* <Ck_Editor data={savedData ? savedData['bodyMarkdown'] : "<p>Etkinlik içeriğini yazınız ...</p>"} post_type={"activity"} coverImage={coverImage} articleTitle={articleTitle}/> */}
        </>
    );
}