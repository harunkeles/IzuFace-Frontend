import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React, { useEffect, useState } from 'react'

import search_icon from '../../../assets/img/icons/main_icons/search_icon.png'
import PostCard from '../../../components/cards/postCard';

function UserMiddleSectionDesign({theme,profileUser,user,setIsPageReady,isPageReady}) {

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };


  return (
    <>
        <div id='userMiddleSectionDesign'>
            <div className='userMiddleSectionDesign_cover'>
                <div className='search_section'>
                    <img src={search_icon} alt='' />
                    <input type='search' placeholder='Arama Yap' />
                </div>
                <div className='content_section'>
                    <TabContext value={value}>
                        <Box>
                            <TabList onChange={handleChange} aria-label="lab API tabs example"  className='tab_menu'>
                                <Tab className='all_posts' label="GÖNDERİLER" value="1" />
                                <Tab className='photos-videos' label="MEDYA" value="2" />
                                <Tab className='more_info' label="HAKKINDA" value="3" />
                            </TabList>
                        </Box>
                        <TabPanel className='tab_menu_content content_1' value="1">{content_1()}</TabPanel>
                        <TabPanel className='tab_menu_content content_2' value="2">Item Two</TabPanel>
                        <TabPanel className='tab_menu_content content_3' value="3">Item Three</TabPanel>
                    </TabContext>
                </div>
            </div>
        </div>
    </>
  )
}

export default UserMiddleSectionDesign


function content_1(){
    return (
        <>
            <PostCard abc="sssssssssssssssssss"/>
            <PostCard abc="sssssssssssssssssss"/>
            <PostCard abc="sssssssssssssssssss"/>
        </>
    )
}
