import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import {
    Button,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
} from 'antd';
import BreadCrumb from './../components/BreadCrumb';

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

    if (state === undefined || state === null)
        state = {
            id: 0,
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

    return (
        <>
            <BreadCrumb name={formValues.name} page="Profiles" href="/"  />
            <Form
                form={form}
                initialValues={formValues}
                layout="horizontal"
                style={{padding:"2rem"}}
                onSubmitCapture={(values) => { console.log(form.getFieldsValue()) }}
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