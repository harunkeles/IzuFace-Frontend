import React, { useRef, useState } from 'react'


function Mh_Editor() {

    let boldRef = useRef()
    const [ bold , setBold ] = useState(false) 

    const bold_function = (e) => {
        document.execCommand("bold");
        // var sonuc = document.activeElement
        // var first_text = articleContent 
        // const main_text = articleContent 
        // var selected_obj = window.getSelection();
        // if (bold === false && selected_obj.toString()) {
        //     document.execCommand("bold");
        //     // var start = first_text.indexOf(selected_obj.toString());
        //     // console.log("start : " , start); 
        //     // console.log("start 2 : " , selected_obj.anchorOffset); 
        //     // var end = start + selected_obj.toString().length;
        //     // console.log("end : " , end); 
        //     // console.log("selected_obj.index.toString() : " , selected_obj.anchorOffset); 
            
           

        //     // if (start >= 0 ) {
        //     //     var sonn = first_text.replace(selected_obj.toString(),'<b>'+selected_obj.toString()+'</b>')
                
        //     //     const indexes = [...first_text.matchAll(new RegExp(selected_obj.toString(), 'gi'))].map(a => a.index);
        //     //     console.log(indexes); 
                
        //     //     setArticleContent(sonn)

        //     // }



        //     setBold(false)
        // }
        // else if (bold === true){
        //     console.log("girdi");
        //     console.log("main_text : " , main_text);
        //     var sonn = first_text.replace('<b>'+selected_obj.toString()+'</b>',selected_obj.toString())
        //     setArticleContent(sonn)
        //     setBold(false)
        // }
      




        // let i = 1;
        // var abc = this;
        // document.addEventListener("click", (evt) => {
        //     if (i === 1) {
        //         console.log(evt.target.innerText)
        //         var obj = abc.data('obj');

        //         i++;
        //     }
        // })



        // var cliked = boldRef
        // var selObj = window.getSelection();
        // var real_text = document.getElementById('Mh_Editor_Content_Textarea').innerHTML
        // var deger = real_text.search(selObj.toString())
        // if (deger != -1) {
        //     console.log(cliked)
        //     console.log(real_text)
        //     setBold()
        //     document.getElementById('Mh_Editor_Content_Textarea').innerHTML =""
        //     document.getElementById('Mh_Editor_Content_Textarea').innerHTML = "aaaaaaaaaaaaaaaaaaaaaaaaaaa"
        // }
    }



    // const deneme = (e) => {
    //     // console.log("e : " , e.target.className)

    //     var selObj = window.getSelection();
    //     if (selObj.toString().length > 0 ) {
    //         if (e.target.className === 'Mh_Editor__item setBoldItem') {
    //             // console.log("BOLD")
    //             // console.log("selObj : " ,selObj)
    //             // console.log("selObj.anchorNode.data : " ,selObj.anchorNode.data)
    //             // console.log("selObj.focusNode.parentElement : " , selObj.focusNode.parentElement)
    //             let real_text = selObj.focusNode.parentElement.getElementsByClassName('article_base_content')[0].getElementsByTagName("textarea")[0]
    //             let selected_text = selObj.toString()
                
    //             console.log("real_text : " ,real_text.innerHTML)
    //             console.log("selected_text : " ,selected_text)
    //             let son = real_text.innerHTML.replace(selected_text,'"<strong contentEditable="true">'+selected_text+'</strong>"')
    //             console.log("son: " ,son)
    //             real_text.innerText = son
    //             real_text.innerHTML = son
    //             document.execCommand('underline');
    //             return real_text

    //             // selObj.anchorNode.data = "denennenenene"


    //             // const para = document.createElement("b");
    //             // para.innerText = selObj.toString();



    //             // console.log("first : ", selObj.focusNode.parentElement.getElementsByClassName('article_base_content')[0].getElementsByTagName("textarea")[0].innerHTML)
    //         }
            
    //     }
      
    // }
    




    const demneme_fonk = (e) => {
        var cliked = boldRef
        var real_text = document.getElementById('Mh_Editor_Content_Textarea').innerHTML
        console.log(cliked)
        console.log(real_text)
    }





    const [articleContent, setArticleContent] = useState('');
    const onArticleContentChange = (event) => {
        setArticleContent(event.target.value)
        event.target.style.height = 'auto'
        event.target.style.height = event.target.scrollHeight + 'px'
    }


    return (
        <>
            <div id='Mh_Editor'>
                <div className='Mh_Editor_cover'>
                    <button id='setBoldItem' style={bold ? {border:'1px solid red'}: {}} className='Mh_Editor__item setBoldItem' ref={boldRef} onClick={(e) => bold_function(e)}>
                        <svg className="crayons-icon"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8 11h4.5a2.5 2.5 0 0 0 0-5H8v5Zm10 4.5a4.501 4.501 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.5 4.5 0 0 1 18 15.5ZM8 13v5h5.5a2.5 2.5 0 0 0 0-5H8Z"></path></svg>
                    </button>
                    <button className='Mh_Editor__item setItalicItem'  onClick={demneme_fonk}>
                        <svg className="crayons-icon"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15v2Z"></path></svg>
                    </button>
                </div>
            </div>
            <div id='Mh_Editor_Content' className='article_base_content' >
                <textarea id='Mh_Editor_Content_Textarea' value={articleContent} onChange={onArticleContentChange} placeholder='Herhangi bir içerik giriniz....' />
            </div>
            <div dangerouslySetInnerHTML={{__html: articleContent }}></div>
        </>
    )
}

export default Mh_Editor