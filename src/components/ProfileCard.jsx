import {Avatar, Card} from "antd";
import {DeleteTwoTone, CopyOutlined, SettingOutlined} from "@ant-design/icons";
import React from "react";
import {useNavigate} from "react-router-dom";

const ProfileCard = ({id,name,App , Server, color}) => {
    const navigate = useNavigate();

    const avatar = <Avatar
        style={{
            backgroundColor: color,
            verticalAlign: 'middle',
        }}
        size="large"
    >
        {name.charAt(0)}
    </Avatar>

    const settingsAction = () => {
        console.log("Settings Clicked for ID : "+ id);
        navigate("/settings",{state:{id,name,color,App,Server}});
    }

    const copyAction = () => {
        console.log("Copy Clicked for ID : "+ id);
        navigate("/profile?id="+id,{state:{id,name,color,App,Server}});
    }

    const deleteAction = () => {
        console.log("Delete Clicked for ID : "+ id,{state:{id,name,color,App,Server}});
    }

    return (
        <Card
            actions={[
                <div onClick={() => settingsAction()}><SettingOutlined key="setting"  /></div>,
                <div onClick={() => copyAction()}><CopyOutlined key="clone" /> Copy</div>,
                <div onClick={() => deleteAction()}><DeleteTwoTone key="delete" twoToneColor="#ff6464" /></div>,
            ]}
        >
            <Card.Meta
                avatar={avatar}
                title={name}
                description={`App Name :  ${App.Name}`}
            />
        </Card>
    );
}

export default ProfileCard;
