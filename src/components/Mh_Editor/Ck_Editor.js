import React, { useState } from 'react'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Ck_Editor({data,post_type,coverImage,articleTitle}) {
    console.log("post_type : " ,post_type)
   
    const [ articleData , setArticleData ] = useState(data);
    // const [ articleData2 , setArticleData2 ] = useState("<p>Etkinlik içeriğini yazınız ...</p>");

    console.log("articleData : " ,articleData)
    // console.log("articleData2 : " ,articleData2)


  return (
        <>
            <CKEditor
                editor={ ClassicEditor }
                data= { articleData }
                onReady={ editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log( 'Editor is ready to use!', editor );
                    
                } }
                onChange={ ( event, editor ) => {
                    const new_data = editor.getData();
                    let newDate = new Date()
                    let date = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate() + '-' + newDate.getTime();
                    var lcs_data = {
                        bodyMarkdown: new_data,
                        mainImage : coverImage,
                        title : articleTitle,
                        updatedAt : date
                    }
                    console.log("post_type : " , post_type)
                    localStorage.setItem(post_type + "_type_editor", JSON.stringify(lcs_data))
                    console.log( { event, editor, new_data } );
                } }
                onBlur={ ( event, editor ) => {
                    console.log( 'Blur.', editor );
                } }
                onFocus={ ( event, editor ) => {
                    console.log( 'Focus.', editor );
                } }
            />
    </>
  )
}

export default Ck_Editor
