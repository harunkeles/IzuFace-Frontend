import React, { useEffect, useState, useRef } from 'react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Navbar from '../../../components/navbar/Navbar'
import Ck_Editor from '../../../components/Mh_Editor/Ck_Editor';
import { AllMiniPostTags_Api, PostMiniPost_Api } from '../../../apis/Api';
import Loading from '../../../components/loading/loading';
import PostCard from '../../../components/cards/postCard';
import search_icon from '../../../assets/img/icons/main_icons/search_icon.png'
import Admin_Resim from '../../../assets/img/others/Admin_Resim.jpg'
import login_page_bg from '../../../assets/img/bg_images/log_images/login_page_bg.jpg'
import ali_asaf from '../../../assets/img/others/ali-asaf.jpg'
import ali_asaf2 from '../../../assets/img/others/ali-asaf2.jpg'
import ali_asaf3 from '../../../assets/img/others/ali-asaf3.jpg'
import { useSelector } from 'react-redux';
import { routes } from '../../../routes';
import { DialogContent, DialogContentText } from '@mui/material';
import history from '../../../history';






const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Create_post() {


    const user = useSelector(state => state.auth)



    const [postType, setPostType] = useState('classic');

    const handlePostTypeChange = (event, newpostType) => {
        if (newpostType != null) {
            if (newpostType == 'classic' || articleTitle.length <= 101) {
                setPostType(newpostType);
            }
        }
    };




    const [coverImage, setCoverImage] = useState(null);
    const [imageData, setImageData] = useState(null);

    var onCoverImageChange = async (event) => {
        if (event.target.files && event.target.files[0]) {
            var img = event.target.files[0];
            setCoverImage(URL.createObjectURL(img));
            setImageData(img)
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
        setImageData(null)
    };



    const [articleTitleScrollHeight, setArticleTitleScrollHeight] = useState(160);
    const [articleTitle, setArticleTitle] = useState('');
    const [articleTitleWar, setArticleTitleWar] = useState({ display: 'none' });
    const maxlength = postType == 'classic' ? 1000 : 100;
    const onArticleTitleChange = event => {
        setArticleTitle(event.target.value)
        event.target.style.height = event.target.scrollHeight + 'px'
        setArticleTitleScrollHeight(event.target.scrollHeight + 110)
    }


    
    const handleNewsButton = () => {
        if (articleTitle.length >= 100) {
            setArticleTitleWar({
                display: 'flex',
                color: 'red'
            })
        }
        else {
            setArticleTitleWar({
                display: 'none',
            })
        }
    }



    const setData = async e => {
        const formData = new FormData();

        formData.append('text', articleTitle);
        formData.append('category', 1);
        formData.append('image', imageData);
        formData.append('tag', selectedTagList);


        await PostMiniPost_Api(formData)
        .then(val=>{
            history.push("/std/@"+user.authUser.username)
            history.go()
        })
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        if (imageData == null && articleTitle == "" ) {
            alert("L??tfen resim veya ba??l??k bilgisi giriniz")
        } else {
            setOpen(true);
        }
    };
  
    const handleClose = () => {
      setOpen(false);
    };








    //* Mini Post paylas??m?? i??lemleri
    const [isPageReady, setIsPageReady] = useState(false)

    const emptyList = []
    const [tagList, setTagList] = useState([])
    const [selectedTagList, setSelectedTagList] = useState()
    const [notSelectedItems, setNotSelectedItems] = useState(tagList)
    const [dizim, setDizim] = useState(tagList)
    const [selectedTagProp, setSelectedTagProp] = useState()


    const getApiDatas = async () => {
        await AllMiniPostTags_Api()
            .then(res => {
                setTagList(res.data)
                setNotSelectedItems(res.data)
                setDizim(res.data)
                setIsPageReady(true)
            })
    }


    useEffect(() => {
        getApiDatas()
    }, [])



    let article_media_info_referance = useRef(null)
    let article_title_info_referance = useRef(null)
    let article_tag_info_referance = useRef()


    const [articleMediaInfo, setArticleMediaInfo] = useState({
        "display": "none"
    })
    const handleArticleMediaClick = () => {
        setArticleMediaInfo({
            "display": "flex"
        })
        setArticleTitleInfo({
            "display": "none"
        })
        setArticleTagInfo({
            "display": "none",
        })
    }

    const [articleTitleInfo, setArticleTitleInfo] = useState({
        "display": "none"
    })
    const handleArticleTitleClick = () => {
        setArticleTitleInfo({
            "display": "flex",
            "top": coverImage && 300 + 'px'
        })
        setArticleMediaInfo({
            "display": "none"
        })
        setArticleTagInfo({
            "display": "none",
        })
    }



    const [articleTagInfo, setArticleTagInfo] = useState({
        "display": "none",
        "top": coverImage ? articleTitleScrollHeight + 200 + 'px' : articleTitleScrollHeight + 'px'
    })
    const handleArticleTagClick = () => {
        setArticleTagInfo({
            "display": "flex",
            "top": coverImage ? articleTitleScrollHeight + 200 + 'px' : articleTitleScrollHeight + 'px'
        })
        setArticleMediaInfo({
            "display": "none"
        })
        setArticleTitleInfo({
            "display": "none"
        })
    }


    const [isPreviewActive, setIsPreviewActive] = useState({
        display: "none"
    })
    const handlePreview = () => {
        if (isPreviewActive.display == "none") {
            setIsPreviewActive({
                display: "flex",
            })
        } else {
            setIsPreviewActive({
                display: "none"
            })
        }
    }



    var data = {
        publisher_img: routes.url + user.authUser.more_info.profImage,
        publisher_name: user.authUser.first_name + ' ' + user.authUser.last_name,
        post_tags: selectedTagProp,
        published_time: '',
        card_content: articleTitle,
        content_media: coverImage,
        liked_users: [
            {
                id: 0,
                liked_user_img: Admin_Resim,
                liked_user_name: "Merve Kuru",
            },
            {
                id: 1,
                liked_user_img: ali_asaf,
                liked_user_name: "ali_asaf",
            },
            {
                id: 2,
                liked_user_img: ali_asaf2,
                liked_user_name: "ali_asaf2",
            },
            {
                id: 3,
                liked_user_img: ali_asaf3,
                liked_user_name: "ali_asaf3",
            },
        ],
        liked_users_count: 15,
        comment_count: 1,
        commenters: [
            {
                id: 0,
                commenters_user_img: ali_asaf3,
                commenters_user_name: "Abdulmelik Polat",
                comment_time: "??imdi",
                comment_text: "Merhaba, g??nderini ??ok be??endim =) ",
            },
        ],
    }

    return (
        <>
            {isPageReady ?

                <div id='Create_Post'>
                    <Navbar isPageReady={true} />
                    <div className='container create_post_cover'>
                        <div className='category_type_row'>
                            <div className='label'>
                                <span>G??nderi tipini se??iniz : </span>
                            </div>
                            <ToggleButtonGroup
                                className='toogle_post_type_category'
                                color="primary"
                                value={postType}
                                exclusive
                                onChange={handlePostTypeChange}
                            >
                                <ToggleButton id='toggle_button_classic_post' value="classic">Klasik</ToggleButton>
                                <ToggleButton onClick={handleNewsButton} id='toggle_button_news_type_post' value="news_type">Haber</ToggleButton>
                                <ToggleButton onClick={handleNewsButton} id='toggle_button_activities_type_post' value="activities_type">Etkinlik</ToggleButton>
                            </ToggleButtonGroup>
                            
                        </div>
                        <span style={articleTitleWar}>*Girebilece??iniz en fazla karakter say??s??na ula??t??n??z.</span>
                        <span style={articleTitleWar}>*Haber ve etkinlik g??nderisi payla????m?? yapabilmek i??in ba??l??k k??sm?? en fazla 100 karakter i??ermelidir.</span>
                        <div id='Text_area'>

                            <div style={isPreviewActive.display == "flex" ? { display: 'none' } : { display: 'block' }} className='writing_area'>
                                <img style={coverImage && { height: '200px' }} className='cover_image' src={coverImage} alt='' />
                                <div className='cover_image_row'>
                                    {coverImage ?
                                        <>
                                            <button ref={article_media_info_referance} onClick={handleArticleMediaClick} className='cover_image'>
                                                <span>Medyay?? De??i??tir</span>
                                                <input type='file' accept='image/*' className='cover_image' onChange={onCoverImageChange} />
                                            </button>
                                            <button className='cover_image_delete'>
                                                <span onClick={onCoverImageDialogOpen}>Medyay?? Sil</span>
                                                <Dialog
                                                    open={openDialog}
                                                    TransitionComponent={Transition}
                                                    keepMounted
                                                    onClose={onCoverImageDialogClose}
                                                    aria-describedby="alert-dialog-slide-description"
                                                >
                                                    <DialogTitle>{"Y??klemi?? oldu??unuz medyay?? silmek istiyor musunuz?"}</DialogTitle>
                                                    <DialogActions>
                                                        <Button style={{ marginRight: '10px' }} color="inherit" onClick={onCoverImageDialogClose}>Vazge??</Button>
                                                        <Button variant="contained" color="error" onClick={onCoverImageDelete}>S??l</Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </button>
                                        </>
                                        :
                                        <button ref={article_media_info_referance} onClick={handleArticleMediaClick} className='cover_image'>
                                            <span>Medya Ekle</span>
                                            <input type='file' accept='image/*' className='cover_image' onChange={onCoverImageChange} />
                                        </button>
                                    }
                                </div>
                                <div className='article-form__body'>
                                    <div className='article_base_title' onClick={handleArticleTitleClick}>
                                        <span style={articleTitleWar}>*Girebilece??iniz en fazla karakter say??s??na ula??t??n??z.</span>
                                        <textarea ref={article_title_info_referance} maxLength={maxlength} rows={1} type='text' value={articleTitle} onChange={onArticleTitleChange} placeholder='G??nderinin ba??l?????? burada..' />
                                    </div>
                                    {(() => {
                                        if (postType === 'classic') {
                                            return Classic_post_type(emptyList, dizim, setDizim, notSelectedItems, setNotSelectedItems, tagList, selectedTagList, setSelectedTagList, article_tag_info_referance, handleArticleTagClick, setSelectedTagProp)
                                        }
                                        else if (postType === 'news_type') {
                                            return classic_news_post_type(coverImage, articleTitle)
                                        }
                                        else if (postType === 'activities_type') {
                                            return classic_activities_post_type(coverImage, articleTitle)
                                        }
                                    })()}

                                </div>
                            </div>

                            <div style={isPreviewActive} id='Preview_writing_area'>
                               <PostCard data={data} />
                            </div>

                            <div className='suggestion_area'>
                                {isPreviewActive.display == "none" &&
                                    (
                                        <>
                                            <div style={articleMediaInfo} className='post_media_info animate__animated animate__fadeInDown'>
                                                <div>
                                                    <span> Etkili Resim Se??imi </span>
                                                    <ul>
                                                        <li>
                                                            G??nderiniz tek bir resim ile anlat??lmak istenen ??zetlenebilir olmal??.
                                                        </li>
                                                        <li>
                                                            Se??ilen resimin (geni??lik / y??kseklik) oran?? 2 / 1 olmas??na dikkat ediniz.
                                                        </li>
                                                        <li>
                                                            Payla????m yapmadan ??nce eklenen resmin ??nizleme b??l??m??nden nas??l durdu??una g??z at??n??z.
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div style={articleTitleInfo} className='post_title_info animate__animated animate__fadeInDown'>
                                                <div>
                                                    <span> Harika Bir Yaz?? Ba??l?????? Yazmak</span>
                                                    <ul>
                                                        <li>
                                                            G??nderi ba??l??????n??z?? ??ok k??sa (ama ikna edici!) bir a????klama olarak d??????n??n - tek bir k??sa c??mle ile g??nderiye genel bir bak???? a????s?? kazand??rs??n.
                                                        </li>
                                                        <li>
                                                            ??nsanlar??n g??nderinizi arama yoluyla bulmas??n?? sa??lamak i??in uygun oldu??unda anahtar kelimeler kullan??n.
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div style={articleTagInfo} className='post_tags_info animate__animated animate__fadeInDown'>
                                                <div>
                                                    <span> Etiketleme Y??nergeleri</span>
                                                    <ul>
                                                        <li>
                                                            Etiketler, insanlar??n yay??n??n??z?? bulmas??na yard??mc?? olur.
                                                        </li>
                                                        <li>
                                                            Etiketleri, g??nderinizi en iyi tan??mlayan konular veya kategoriler olarak d??????n??n.
                                                        </li>
                                                        <li>
                                                            G??nderi ba????na en fazla d??rt virg??lle ayr??lm???? etiket ekleyin.
                                                        </li>
                                                        <li>
                                                            M??mk??n oldu??unda mevcut etiketleri kullan??n.
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                                <div className='buttons_group'>
                                    <button className='previewButton' type='button' onClick={handlePreview}>
                                        {isPreviewActive.display == "flex" ? "??nizlemeden ????k" : "??n??zleme"}
                                        
                                    </button>
                                    <button variant="outlined" className='submitButton' type='submit' onClick={handleClickOpen}>Payla??</button>
                                    <Dialog
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">
                                        G??nderi'yi payla??mak istiyor musunuz?
                                        </DialogTitle>
                                        <DialogActions>
                                        <Button className='modalCloseButton' onClick={handleClose}>Kapat</Button>
                                        <Button className='modalPublishButton' onClick={setData} autoFocus>
                                            PAYLA??
                                        </Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            </div>


                        </div>

                    </div>
                </div>
                :
                <Loading />

            }
        </>

    )
}
export default Create_post



function Classic_post_type(emptyList, dizim, setDizim, notSelectedItems, setNotSelectedItems, tagList, selectedTagList, setSelectedTagList, article_tag_info_referance, handleArticleTagClick, setSelectedTagProp) {

    //* Burada benim se??ti??im etiketler 4 adetten b??y??k ise daha fazla se??memi engelliyor
    const handleOnChangeSelectedTag = (event, values) => {
        var tagIdList = []
        var selectedTagPropList = []
        if (values) {
            if (values.length == 4) {
                values.map(val => {
                    tagIdList.push(val.id)
                    selectedTagPropList.push([val.title,val.color])
                })
                setDizim(emptyList)
            } else {
                values.map(val => {
                    tagIdList.push(val.id)
                    if (val in tagList) {
                        var son = dizim.filter(res => res != val)
                        setNotSelectedItems(son)
                    }
                    selectedTagPropList.push([val.title,val.color])
                })
                setDizim(notSelectedItems)
            }
        }
        setSelectedTagList(tagIdList)
        setSelectedTagProp(selectedTagPropList)
    }


    const handleTag = (option) => {
        var data = `<span style="color:${option.color}; font-weight="800">#</span>` + `${option.title} `;
        return <span style={{ backgroundColor: '#F5F5F5', padding: '3px 10px', borderRadius: '5px' }} dangerouslySetInnerHTML={{ __html: data }} key={option.id} />
    }


    return (
        <>
            <Autocomplete
                ref={article_tag_info_referance}
                multiple
                id="tags-standard"
                onFocus={handleArticleTagClick}
                onChange={handleOnChangeSelectedTag}
                options={dizim}
                disableCloseOnSelect
                disabledItemsFocusable
                filterSelectedOptions
                getOptionLabel={(option) => handleTag(option)}
                // 
                renderInput={(params) => {
                    return <TextField
                        {...params}
                        variant="standard"
                        placeholder="En fazla 4 adet etiket ekliyebilirsiniz.."

                    />
                }
                }
            />
        </>
    );
}

function classic_news_post_type(coverImage, articleTitle) {
    if (localStorage.getItem('news_type_editor')) {
        var savedData = JSON.parse(localStorage.getItem('news_type_editor'))
    }
    return (
        <>
            <Ck_Editor data={savedData ? savedData['bodyMarkdown'] : "<p>Haber i??eri??ini yaz??n??z ...</p>"} post_type={"news"} coverImage={coverImage} articleTitle={articleTitle} />
        </>
    );
}

function classic_activities_post_type(coverImage, articleTitle) {
    var savedData = JSON.parse(localStorage.getItem('activity_type_editor'))
    return (
        <>
            {/* <Ck_Editor data={savedData ? savedData['bodyMarkdown'] : "<p>Etkinlik i??eri??ini yaz??n??z ...</p>"} post_type={"activity"} coverImage={coverImage} articleTitle={articleTitle}/> */}
        </>
    );
}

