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
    // var innerhtml = `<img src=${routes.url + user.more_info.profImage} alt=''/>`

    const onClickHandler = (index, e) => {
        if (index > 6) {
            document.getElementsByClassName(e.target.className)[0].classList.add('selected_hour')
            console.log("first : ", document.getElementsByClassName(e.target.className)[0].classList)
            setSelectedIndex(index)
            setSelected_e_(e)
        }
    }

    const onModalOpen = () => {

    }

    const onModalClose = () => {
        document.getElementsByClassName(selected_e_.target.className)[0].classList.remove('selected_hour')
        setSelectedIndex(null)
        setSelected_e_(null)
    }


    function renderDay(props, currentDate, selectedDate) {
        // Adds 0 to the days in the days view
        return <td {...props}>{currentDate.date()}</td>;
    }
    function renderMonth(props, month, year, selectedDate) {
        // Display the month index in the months view
        return <td {...props}>{month}</td>;
    }
    function renderYear(props, year, selectedDate) {
        // Just display the last 2 digits of the year in the years view
        return <td {...props}>{year % 100}</td>;
    }

    var dt = new Date();
    var day = dt.getDate();
    var month = dt.getMonth();
    var year = dt.getFullYear();
    var startedDay = new Date(2022, 4, 22).getDate();

    var son = new Date(2022, 4, 22)
    
    var list = []
    const deneme = () => {
        
        while (son.getFullYear() === 2022) {
            console.log("first")
            son.setDate(son.getDate() + 1);
            list.push(new Date(son).getDate().toString())
        }
        console.log(list)

        return list

    }
    useEffect(()=>{
        deneme()
    },[])

    var newDay = new Date(year, month + 1, 0).getDate();
    var newMonth = new Date(year, month + 1, 0).getMonth();
    var newYear = new Date(year, month + 1, 0).getFullYear();

    return (
        <>
            <Menu />
            <div id='Football_Appointment'>
                <div className='Football_Appointment_cover'>
                    <div className='filter_part'>
                        <div className='date-settings'>
                            <span>Bir tarih aralığı seçiniz.</span>
                            <Datetime
                                renderDay={renderDay}
                                renderMonth={renderMonth}
                                renderYear={renderYear}
                                dateFormat="DD-MM-YYYY" timeFormat={false}
                            />
                            {day} - {month} - {year} ------
                            {newDay} - {newMonth} - {newYear}

                        </div>
                    </div>
                    <div className='date_row'>
                        <div className='single_day row_icon'>
                            <img className='date_icon' src={time_icon} alt='' />
                        </div>

                            {
                                deneme().map((day,index)=>{
                                    if (index <= 7){ 
                                        
                                        return (
                                            <div className='single_day'>
                                                <span className='day_num'>{day}</span>
                                                <span className='day_name'>/ Paz</span>
                                            </div>
                                        );
                                    }
                                })
                            }

                        {/* <div className='single_day'>
                        <span className='day_num'>{startedDay}</span>
                        <span className='day_name'>/ Paz</span>
                    </div>
                    <div className='single_day'>
                        <span className='day_num'>{son}</span>
                        <span className='day_name'>/ Sal</span>
                    </div> */}
                        {/* <div className='single_day'>
                        <span className='day_num'>26</span>
                        <span className='day_name'>/ Çar</span>
                    </div>
                    <div className='single_day'>
                        <span className='day_num'>27</span>
                        <span className='day_name'>/ Per</span>
                    </div>
                    <div className='single_day'>
                        <span className='day_num'>28</span>
                        <span className='day_name'>/ Cum</span>
                    </div>
                    <div className='single_day'>
                        <span className='day_num'>29</span>
                        <span className='day_name'>/ Cmt</span>
                    </div>
                    <div className='single_day'>
                        <span className='day_num'>30</span>
                        <span className='day_name'>/ Pzr</span>
                    </div> */}
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

                            {[...Array(91)].map((e, index) => {
                                return (
                                    <div
                                        data-mdb-toggle="modal"
                                        data-mdb-target={index > 6 ? `#exampleModal` : ``}
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

                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">{selectedIndex}</h5>
                                    </div>
                                    <div className="modal-body">...</div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal" onClick={selectedIndex > 6 ? onModalClose : null}>Close</button>
                                        <button type="button" className="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Football_Appointment
