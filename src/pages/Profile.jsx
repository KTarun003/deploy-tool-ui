import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import {v4 as uuid} from "uuid"
import {
    Button,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    notification
} from 'antd';
import BreadCrumb from './../components/BreadCrumb';
import { invoke } from '@tauri-apps/api/tauri';

const schemes = [
    {"label": "HTTPS",value:"https"},
    {"label": "HTTP",value:"http"},
]

const apptypes = [
    {label:"Web App", value:"Web App"},
    {label:"Background Worker", value: "Background Worker"}
]

const Profile = () => {
    let state = useLocation().state;
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, msg, desc) => {
        api[type]({
            message: msg,
            description:desc,
        });
    };

    if (state === undefined || state === null)
        state = {
            id: uuid(),
            name: 'New Profile',
            color: '',
            App: {
                Name: "",
                Domain: "",
                DllName: "",
                PubPath: "",
                DesPath: "",
                AppType: "",
                ServiceName: "",
                Scheme: "",
                Port: 0
            },
            Server: {
                Host: "",
                User: "",
                Password: "",
                DotnetPath: "",
                NginxPath: ""
            }
        }

    const [formValues, setForm] = useState(state);
    const [form] = Form.useForm();

    const [appType, setAppType] = useState(state.App.AppType);

    const onSubmit = async (values) => {
        let color = formValues.color
        if(color === ''){
           color = await invoke("get_random_color");
        }
        const data = {
            color,...values,
        }
        data.id = formValues.id;
        data.Server.DotnetPath = formValues.Server.DotnetPath;
        data.Server.NginxPath = formValues.Server.NginxPath;
        if(values.App.AppType === "Background Worker")
        {
            data.App.Scheme = "";
            data.App.Port = 0;
        }
        console.log({data});
        const res = await invoke("save_profile", {data:JSON.stringify(data, undefined, 2), profileName:data.name})
        if(res === "Success")
            openNotificationWithIcon('success', "Success", "Profile is saved Successfully");
        else
            openNotificationWithIcon('error',"Error", "Something Went Wrong");
    }

    return (
        <>
            {contextHolder}
            <BreadCrumb name={formValues.name} page="Profiles" href="/"  />
            <Form
                form={form}
                onFinish={onSubmit}
                initialValues={formValues}
                layout="horizontal"
                style={{padding:"2rem"}}
            >
                <Row gutter={8}>
                    <Col xl={{ span: 12 }} lg={12} md={24} sm={24} xs={24}>
                        <Form.Item label="Profile Name" name="name">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={8}>
                    <Col  xl={{ span: 8 }} lg={8} md={24} sm={24} xs={24}>
                        <Form.Item label="Server IP" name={['Server', 'Host']}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xl={{ span: 8 }} lg={8} md={24} sm={24} xs={24}>
                        <Form.Item label="User" name={['Server', 'User']}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xl={{ span: 8 }} lg={8} md={24} sm={24} xs={24}>
                        <Form.Item label="Password" name={['Server', 'Password']}>
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={8}>
                    <Col  xl={{ span: 12 }} lg={12} md={24} sm={24} xs={24}>
                        <Form.Item label="Application Name" name={['App', 'Name']}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xl={{ span: 12 }} lg={12} md={24} sm={24} xs={24}>
                        <Form.Item label="Application Type" name={['App', 'AppType']}>
                            <Select options={apptypes} onChange={(value) => setAppType(value)} />
                        </Form.Item>
                    </Col>
                </Row>
                {appType === "Web App" && <Row gutter={8}>
                    <Col  xl={{ span: 12 }} lg={12} md={24} sm={24} xs={24}>
                        <Form.Item label="Application Port" name={['App', 'Port']}>
                            <InputNumber style={{width:"100%"}} />
                        </Form.Item>
                    </Col>
                    <Col  xl={{ span: 12 }} lg={12} md={24} sm={24} xs={24}>
                        <Form.Item label="Application Scheme" name={['App', 'Scheme']}>
                            <Select options={schemes} />
                        </Form.Item>
                    </Col>
                </Row>}


                <Row gutter={8}>
                    <Col xl={{ span: 8 }} lg={8} md={24} sm={24} xs={24}>
                        <Form.Item label="Application Domain" name={['App', 'Domain']}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xl={{ span: 8 }} lg={8} md={24} sm={24} xs={24}>
                        <Form.Item label="Service Name" name={['App', 'ServiceName']}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xl={{ span: 8 }} lg={8} md={24} sm={24} xs={24}>
                        <Form.Item label="DLL Name" name={['App', 'DllName']}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>



                <Row gutter={8}>
                    <Col  xl={{ span: 12 }} lg={12} md={24} sm={24} xs={24}>
                        <Form.Item label="Source Path" name={['App', 'PubPath']}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xl={{ span: 12 }} lg={12} md={24} sm={24} xs={24}>
                        <Form.Item label="Destination Path" name={['App', 'DesPath']}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default Profile;