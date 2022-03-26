import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import time_icon from '../../../../assets/img/icons/post_detail_icons/time_icon.png'
import Menu from '../../../../components/menu/menu'
import { routes } from '../../../../routes'


const Football_Appointment = () => {

    const user = useSelector(state => state.auth.authUser)
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [selected_e_, setSelected_e_] = useState(null)
    const [modalSelectedDate, setModalSelectedDate] = useState(null)
    const [selectedDate, setSelectedDate] = useState(null)

    // var innerhtml = `<img src=${routes.url + user.more_info.profImage} alt=''/>`


    const onModalSelectedDate = (selectedIndex) => {
        console.log("girdi")
        console.log(selectedIndex)
        var hour = null
        var date = null
        if (selectedIndex % 7 === 0) {
            console.log(selectedIndex)
            date = {
                'year': calcDateNumAndName()['dateYearList'][0],
                'month': calcDateNumAndName()['dateMonthList'][0],
                'day': calcDateNumAndName()['dateNumList'][0],
                'dayName': calcDateNumAndName()['dateNameList'][0]
            }
        }
        else if (selectedIndex % 7 === 1) {
            console.log(selectedIndex)
            date = {
                'year': calcDateNumAndName()['dateYearList'][1],
                'month': calcDateNumAndName()['dateMonthList'][1],
                'day': calcDateNumAndName()['dateNumList'][1],
                'dayName': calcDateNumAndName()['dateNameList'][1]
            }
        }
        else if (selectedIndex % 7 === 2) {
            console.log(selectedIndex)
            date = {
                'year': calcDateNumAndName()['dateYearList'][2],
                'month': calcDateNumAndName()['dateMonthList'][2],
                'day': calcDateNumAndName()['dateNumList'][2],
                'dayName': calcDateNumAndName()['dateNameList'][2]
            }
        }
        else if (selectedIndex % 7 === 3) {
            console.log(selectedIndex)
            date = {
                'year': calcDateNumAndName()['dateYearList'][3],
                'month': calcDateNumAndName()['dateMonthList'][3],
                'day': calcDateNumAndName()['dateNumList'][3],
                'dayName': calcDateNumAndName()['dateNameList'][3]
            }
        }
        else if (selectedIndex % 7 === 4) {
            console.log(selectedIndex)
            date = {
                'year': calcDateNumAndName()['dateYearList'][4],
                'month': calcDateNumAndName()['dateMonthList'][4],
                'day': calcDateNumAndName()['dateNumList'][4],
                'dayName': calcDateNumAndName()['dateNameList'][4]
            }
        }
        else if (selectedIndex % 7 === 5) {
            console.log(selectedIndex)
            date = {
                'year': calcDateNumAndName()['dateYearList'][5],
                'month': calcDateNumAndName()['dateMonthList'][5],
                'day': calcDateNumAndName()['dateNumList'][5],
                'dayName': calcDateNumAndName()['dateNameList'][5]
            }
        }
        else if (selectedIndex % 7 === 6) {
            console.log(selectedIndex)
            date = {
                'year': calcDateNumAndName()['dateYearList'][6],
                'month': calcDateNumAndName()['dateMonthList'][6],
                'day': calcDateNumAndName()['dateNumList'][6],
                'dayName': calcDateNumAndName()['dateNameList'][6]
            }
        }
        switch (selectedIndex >= 0) {
            case selectedIndex <= 6:
                hour = '09:00'
                console.log(hour)
                break;
            case selectedIndex > 6 && selectedIndex <= 13:
                hour = '10:00'
                console.log(hour)
                break;
            case selectedIndex > 13 && selectedIndex <= 20:
                hour = '11:00'
                console.log(hour)
                break;
            case selectedIndex > 20 && selectedIndex <= 27:
                hour = '12:00'
                console.log(hour)
                break;
            case selectedIndex > 27 && selectedIndex <= 34:
                hour = '13:00'
                break;
            case selectedIndex > 34 && selectedIndex <= 41:
                hour = '14:00'
                break;
            case selectedIndex > 41 && selectedIndex <= 48:
                hour = '15:00'
                break;
            case selectedIndex > 48 && selectedIndex <= 55:
                hour = '16:00'
                break;
            case selectedIndex > 55 && selectedIndex <= 62:
                hour = '17:00'
                break;
            case selectedIndex > 62 && selectedIndex <= 69:
                hour = '18:00'
                break;
            case selectedIndex > 69 && selectedIndex <= 76:
                hour = '19:00'
                break;
            case selectedIndex > 76 && selectedIndex <= 83:
                hour = '20:00'
                break;

            default:
                break;
        }
        var newDate = {
            'hour': hour,
            'date': date
        }

        setSelectedDate(newDate)

        return newDate

    }


    const onClickHandler = async (index, e) => {
        document.getElementsByClassName(e.target.className)[0].classList.add('selected_hour')
        console.log("first : ", document.getElementsByClassName(e.target.className)[0].classList)
        setSelectedIndex(index)
        setSelected_e_(e)
        await onModalSelectedDate(index)
        console.log("onModalSelectedDate : ", onModalSelectedDate)
    }

    const onModalClose = () => {
        document.getElementsByClassName(selected_e_.target.className)[0].classList.remove('selected_hour')
        setSelectedIndex(null)
        setSelected_e_(null)
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


    useEffect(() => {
        calcDateNumAndName()
    }, [])


    return (
        <>
            <Menu />
            <div id='Football_Appointment'>
                <div className='Football_Appointment_cover'>
                    <div className='filter_part'>
                        <div className='text'>
                            <span>İstediğiniz saat ve günü seçerek halı saha randevusu alabilirsiniz.</span>
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
                    <div className='date_row'>
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
                    <div className='bottom_schdule_side'>
                        <div className='hours_side'>
                            <div className='single_hour'>
                                <span>09:00</span>
                            </div>
                            <div className='single_hour'>
                                <span>10:00</span>
                            </div>
                            <div className='single_hour'>
                                <span>11:00</span>
                            </div>
                            <div className='single_hour'>
                                <span>12:00</span>
                            </div>
                            <div className='single_hour'>
                                <span>13:00</span>
                            </div>
                            <div className='single_hour'>
                                <span>14:00</span>
                            </div>
                            <div className='single_hour'>
                                <span>15:00</span>
                            </div>
                            <div className='single_hour'>
                                <span>16:00</span>
                            </div>
                            <div className='single_hour'>
                                <span>17:00</span>
                            </div>
                            <div className='single_hour'>
                                <span>18:00</span>
                            </div>
                            <div className='single_hour'>
                                <span>19:00</span>
                            </div>
                            <div className='single_hour'>
                                <span>20:00</span>
                            </div>

                        </div>
                        <div className='schdule_side'>

                            {[...Array(84)].map((e, index) => {
                                return (
                                    <div
                                        data-mdb-toggle="modal"
                                        data-mdb-target="#selectedDateSettings"
                                        className={`draw_row this_hour_key_${index}`}
                                        key={index}
                                        onClick={(e) => onClickHandler(index, e)}
                                    // dangerouslySetInnerHTML={{__html: innerhtml}} 
                                    >
                                        {index === 15 ?
                                            <>
                                                <div className='owner_img_of_selected_date'>
                                                    <img src={routes.url + user.more_info.profImage} alt='' />
                                                </div>
                                                <div className='owner_name_of_selected_date'>
                                                    <span>Muhammet Harun Keleş</span>
                                                </div>
                                            </>
                                            :
                                            <></>

                                        }

                                    </div>
                                );
                            })}

                        </div>

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
                                
                                {selectedDate ?
                                                <>
                                                    Saat : {selectedDate['hour']} &nbsp; <br/>
                                                    Tarih : {selectedDate['date']['dayName'] } &nbsp;
                                                    {selectedDate['date']['day'] } / {parseInt(selectedDate['date']['month'])+1} / {selectedDate['date']['year']}
                                                </>
                                                :
                                                <></>
                                            }
                            </h5>
                        </div>
                        <div className="modal-body">
                        Seçtiğiniz tarihe randevu almak istiyor musunuz?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-mdb-dismiss="modal" onClick={onModalClose}>Hayır</button>
                            <button type="button" className="btn btn-primary">Evet, Onaylıyorum</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Football_Appointment
