import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import time_icon from '../../../../assets/img/icons/post_detail_icons/time_icon.png'
import Menu from '../../../../components/menu/menu'
import { routes } from '../../../../routes'
import { AllAppointments_Api, AppointmentDelete_Api, AppointmentPost_Api } from '../../../../apis/Api';
import MiniLoading from '../../../../components/loading/miniLoading';


const Football_Appointment = () => {

    var selected_box_ref = useRef();
    const user = useSelector(state => state.auth.authUser)
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [selectedIndexList, setSelectedIndexList] = useState([])
    const [selected_e_, setSelected_e_] = useState(null)
    const [selectedHour, setSelectedHour] = useState(null)


    //* Modal Açıldığında Çalışır
    const onClickHandler = async (index, e, hour) => {

        //* Modal açıldığında seçilen kutunun index'i ve özelliklerinin ataması yapılır.
        setSelectedIndex(index)
        setSelected_e_(e)
        setSelectedHour(hour)

    }



    // selected_box_ref.current.classList[1]


    //* Seçilmiş olan box'ı siliyor
    const onModalDeleteSelectedBox = async() => {
        await AppointmentDelete_Api(selectedIndex)

        var selected_index = selectedIndexList.indexOf(selectedIndex);

        selectedIndexList.splice(selected_index, 1);
        setSelectedIndexList(selectedIndexList)

        document.getElementsByClassName(selected_e_.target.className)[0].classList.remove('selected_hour')
        setSelectedIndex(null)
        setSelected_e_(null)

    }


    //* Modal kabul edilirse çalışır
    const onModalAcceptButton = async () => {

        //* Modal açıldığında seçilen kutu şekillenir
        document.getElementsByClassName(selected_e_.target.className)[0].classList.add('selected_hour')

        //* Seçilen box'ın index numarasını daha önceden index'i eklemiş olduğumuz listeye tekrar ekliyoruz.
        var list = selectedIndexList
        list.push(selectedIndex)
        setSelectedIndexList(list)

        setSelectedIndex(null)
        setSelected_e_(null)

        var thisDateInfo = selectedIndexList.reverse()[0]
        var new_data = {
            "appointment_owner": user.user_id,
            "day": thisDateInfo.toString().substring(0, 2),
            "month": thisDateInfo.toString().substring(2, 4),
            "hour": selectedHour
        }

        AppointmentPost_Api(new_data)
            .then(val => {
                getData()
            })

    }


    //* Bugünün tarih değerlerini aldık
    var dt = new Date();
    var day = dt.getDate();
    var month = dt.getMonth();
    var year = dt.getFullYear();
    var dateList = {}

    //* Alacağımız yılların şuanki tarihini belirledik
    var startedDate = new Date(year, month, dt.getDate())

    //* Yılları. İlk elemana bugünün yılını ekledik
    var dateYearList = [year.toString()]

    //* Ayları aldık. İlk elemana bugünün ayını ekledik
    var dateMonthList = [month.toString()]

    //* Günlerin numarasını aldık. İlk elemana bugünün numarasını ekledik
    var dateNumList = [day.toString()]

    //* Günlerin adını aldık. İlk elemana bugünün adını ekledik
    var dateNameList = [new Date(startedDate).toLocaleDateString('tr-TR', { weekday: 'long' })]

    //* Günlerin numaralarını ve adlarını her gün bir bir arttırarak aldık.
    const calcDateNumAndName = () => {
        while (startedDate.getFullYear() === year) {
            startedDate.setDate(startedDate.getDate() + 1);
            var newDateYear = new Date(startedDate).getFullYear().toString()
            var newDateMonth = new Date(startedDate).getMonth().toString()
            var newDateNum = new Date(startedDate).getDate().toString()
            var newDateName = new Date(startedDate).toLocaleDateString('tr-TR', { weekday: 'long' })
            dateYearList.push(newDateYear)
            dateMonthList.push(newDateMonth)
            dateNumList.push(newDateNum)
            dateNameList.push(newDateName)
        }
        dateList = {
            dateNumList: dateNumList,
            dateNameList: dateNameList,
            dateMonthList: dateMonthList,
            dateYearList: dateYearList
        }
        return dateList
    }



    const [gettingAppointmentData, setGettingAppointmentData] = useState(null)
    const getData = async () => {
        await AllAppointments_Api()
            .then(res => {
                setGettingAppointmentData(res.data)
                var liste = []
                for (let index = 0; index < res.data.length; index++) {
                    var day = res.data[index].day
                    var month = res.data[index].month
                    var hour = res.data[index].hour
                    var concat = day + month + hour
                    liste.push(concat)
                    document.getElementsByClassName(`draw_row ${concat}`)[0].classList.add('selected_hour')
                }
                setSelectedIndexList(liste)
            })
    }
 

    useEffect(() => {

        calcDateNumAndName()
        getData()

    }, [])



    return (
        <>
            <Menu />
            <div id='Football_Appointment_bg_cover'></div>
            <div id='Football_Appointment'>
                <div className='Football_Appointment_cover'>
                    <div className='filter_part'>
                        <div className='text'>
                            <p> **Randevular en geç <span>30 dakika</span> önceden alınabilir.</p>
                            <p> **Alacak olduğunuz randevunun onaylanması halinde okul mailinize <span>sporbirimi@izu.edu.tr</span> adresi tarafından bildirim gelecektir.</p>
                            <p> Daha fazla bilgi için <span>sks@izu.edu.tr</span> mail adresi ile iletişime geçiniz.</p>
                        </div>
                        <ul>
                            <li>
                                <a href="#"><i className="fa-solid fa-angle-left"></i></a>
                            </li>
                            <li>
                                <a href="#"><i className="fa-solid fa-angle-right"></i></a>
                            </li>
                        </ul>
                    </div>

                    <div className='bottom_schdule_side'>
                        <div className='single_row row_main'>
                            <div className='row_icon'>
                                <img className='date_icon' src={time_icon} alt='' />
                            </div>
                            <div className='day_row'>

                                {[...Array(calcDateNumAndName()['dateNameList'].length)].map((e, index) => {
                                    if (index <= 6) {

                                        return (
                                            <div className='single_day' key={index}>
                                                <span className='day_num'>{calcDateNumAndName()['dateNumList'][index]}</span>
                                                <span className='day_name'>{calcDateNumAndName()['dateNameList'][index]}</span>
                                            </div>
                                        );

                                    }
                                })}

                            </div>
                        </div>

                        {[...Array(10)].map((e, index) => {
                            return <div key={index} className={`single_row row_${index + 1}`}>
                                <div className='single_hour'>
                                    <span>{(index + 8).toString().length == 1 ? "0" + (index + 8) : index + 8}:00</span>
                                </div>
                                <div className='schdule_side'>
                                    {[...Array(7)].map((e, i) => {
                                        var hour = (index + 8).toString().length == 1 ? "0" + (index + 8) : index + 8
                                        var day = (calcDateNumAndName()['dateNumList'][i]).toString().length == 1 ? "0" + (calcDateNumAndName()['dateNumList'][i]) : calcDateNumAndName()['dateNumList'][i]
                                        var month = (calcDateNumAndName()['dateMonthList'][i]).toString().length == 1 ? "0" + (parseInt(calcDateNumAndName()['dateMonthList'][i]) + 1) : parseInt(calcDateNumAndName()['dateMonthList'][i]) + 1
                                        return <div
                                            ref={selected_box_ref}
                                            data-mdb-toggle="modal"
                                            data-mdb-target="#selectedDateSettings"
                                            className={`draw_row ${day}${month}${hour}`}
                                            key={i}
                                            onClick={(e) => onClickHandler(day + month + hour, e, hour)}
                                        >
                                            {selectedIndexList.map((res, i) => {
                                                var thisAppointment = Object.values(gettingAppointmentData).filter(val => val.appointment_ref == res)
                                                if (res == day + month + hour) {
                                                    if (thisAppointment.length == 0)
                                                        return <MiniLoading key={i} />
                                                    else
                                                        return (
                                                            <div key={i}>
                                                                <div className='owner_img_of_selected_date'>
                                                                    <img src={routes.url + '/media/' + thisAppointment[0].appointment_owner.prof_img} alt='' />
                                                                </div>
                                                                <div className='owner_name_of_selected_date'>
                                                                    <span>{thisAppointment[0].appointment_owner.full_name}</span>
                                                                </div>
                                                            </div>
                                                        );
                                                }
                                            })
                                            }


                                        </div>
                                    })}
                                </div>
                            </div>
                        })}



                    </div>

                </div>
            </div>
            <div
                id="selectedDateSettings"
                className="modal fade"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                data-mdb-backdrop="static"
                data-mdb-keyboard="false">

                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">

                                {selectedIndex &&
                                    <>
                                        Saat : {selectedHour + ":00"} &nbsp; <br />
                                        Tarih : {selectedIndex.toString().substring(0, 2) + "/" + selectedIndex.toString().substring(2, 4) + "/" + dt.getFullYear()} &nbsp;
                                    </>
                                }
                            </h5>
                        </div>


                        {selectedIndexList.length === 0 ?
                            <>
                                <div className="modal-body">
                                    Seçtiğiniz tarihe randevu almak istiyor musunuz?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" data-mdb-dismiss="modal">Hayır</button>
                                    <button type="button" className="btn btn-primary" data-mdb-dismiss="modal" onClick={() => onModalAcceptButton()}>Evet, Onaylıyorum</button>
                                </div>
                            </>
                            :
                            <>
                                {
                                    selectedIndexList.map((res,i) => {
                                        var thisAppointment = Object.values(gettingAppointmentData).filter(val => val.appointment_ref == res)

                                        if (res === selectedIndex) {
                                            if (thisAppointment[0].appointment_owner.id === user.user_id) {
                                                return (
                                                    <div key={i}>
                                                        <div className="modal-body">
                                                            Seçtiğiniz tarihili halı saha randevunuzu silmek istiyor musunuz?
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-light" data-mdb-dismiss="modal">Hayır</button>
                                                            <button type="button" className="btn btn-danger" data-mdb-dismiss="modal" onClick={() => onModalDeleteSelectedBox()}>Evet, Sil</button>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            else {
                                                return (
                                                    <div key={i}>
                                                        <div className="modal-body">
                                                            Seçtiğiniz tarihde halı saha doludur. Lütfen başka bir tarih seçiniz.
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-light" data-mdb-dismiss="modal">Tamam</button>
                                                        </div>
                                                    </div>
                                                );

                                            }
                                        }
                                    })
                                }

                            </>
                        }

                        {!selectedIndexList.find(res => res === selectedIndex) && selectedIndexList.length > 0 ?
                            <>
                                <div className="modal-body">
                                    Seçtiğiniz tarihe randevu almak istiyor musunuz?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" data-mdb-dismiss="modal" >Hayır</button>
                                    <button type="button" className="btn btn-primary" data-mdb-dismiss="modal" onClick={() => onModalAcceptButton()}>Evet, Onaylıyorum</button>
                                </div>
                            </>
                            :
                            <></>

                        }

                    </div>

                </div>
            </div>
        </>
    )
}


export default Football_Appointment
