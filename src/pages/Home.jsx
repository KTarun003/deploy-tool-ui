import React, {useEffect, useState} from 'react';
import ProfileCard from './../components/ProfileCard.jsx'
import {Flex, FloatButton, Empty } from "antd";
import {PlusOutlined} from "@ant-design/icons";
import { invoke } from '@tauri-apps/api/tauri';

const Home = () =>{

    const [profiles,setProfiles] = useState([]);

    useEffect(() => {
        async function getData() {
            const data = await invoke("get_profiles");
            console.log(data)
            setProfiles(data);
        }
        getData();
    },[]);


    return (
        <>
            <h1>Profiles</h1>
            <FloatButton tooltip={<div>Add New Profile</div>} icon={<PlusOutlined />} href='/profile' type="primary" />
            {
                profiles.length > 0 ? <Flex wrap gap="middle" justify="center" align="center">
                    {profiles.map(x => <ProfileCard key={x.id} {...x} />)}
                </Flex> : <Empty/>
            }

        </>
    );
}

export default Home;