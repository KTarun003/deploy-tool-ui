import React from 'react';
import {Descriptions, Button, Flex} from 'antd';
import {useLocation, useNavigate} from "react-router-dom";
import BreadCrumb from './../components/BreadCrumb';

const Settings = () =>{
    const {id,name,color,App,Server} = useLocation().state;
    const navigate = useNavigate();
    const editAction = () => {
        navigate("/profile?id="+id,{state:{id,name,color,App,Server}});
    };

    const serveritems = [
        {
            label: 'Host',
            children: Server.Host,
        },
        {
            label: 'User',
            children: Server.User,
        },
        {
            label: 'Nginx Path',
            children: Server.NginxPath,
        },
        {
            label: 'Dotnet Path',
            children: Server.DotnetPath,
        },
    ];

    const appitems = [
        {
            label: 'Name',
            children: App.Name,
        },
        {
            label: 'Type',
            children: App.AppType,
        },
        {
            label: 'Domain',
            children: App.Domain,
        },
        {
            label: 'Service Name',
            children: App.ServiceName,
        },
        {
            label: 'Scheme',
            children: App.Scheme,
        },
        {
            label: 'Port',
            children: App.Port,
        },
        {
            label: 'Dll Name',
            children: App.DllName,
            span: {
                sm: 2,
                md: 3,
                lg: 2,
                xl: 2,
                xxl: 2,
            },
            
        },
        {
            label: 'Publish Path',
            children: App.PubPath,
            span: {
                sm: 2,
                md: 3,
                lg: 2,
                xl: 2,
                xxl: 2,
            },
        },
        {
            label: 'Destination Path',
            children: App.DesPath,
            span: {
                sm: 2,
                md: 3,
                lg: 2,
                xl: 2,
                xxl: 2,
            },
        },
    ];
    return (
        <>
            <BreadCrumb name={name} />
            <Descriptions
                title={name}
                bordered
                column={{
                    xs: 2,
                    sm: 2,
                    md: 2,
                    lg: 2,
                    xl: 2,
                    xxl:2,
                }}
                items={serveritems}
                extra={<Flex gap="middle" ><Button type='primary' onClick={editAction}>Edit</Button><Button>Deploy</Button></Flex>}
            />
            <Descriptions
                title="App Configuration"
                bordered
                column={{
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 4,
                    xl: 4,
                    xxl: 4,
                }}
                items={appitems}
            />
        </>

    );
}

export default Settings;