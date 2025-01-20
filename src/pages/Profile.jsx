import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Cascader,
    Checkbox,
    ColorPicker,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Slider,
    Switch,
    TreeSelect,
    Upload
} from 'antd';
import BreadCrumb from './../components/BreadCrumb';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
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
    return (
        <>
            <BreadCrumb name={formValues.name}  />
            <Form
                form={form}
                initialValues={formValues}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                style={{
                    maxWidth: 600,
                }}
                onSubmitCapture={(values) => { console.log(form.getFieldsValue()) }}
            >
                <Form.Item label="Profile Name" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="Select">
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="TreeSelect">
                    <TreeSelect
                        treeData={[
                            {
                                title: 'Light',
                                value: 'light',
                                children: [
                                    {
                                        title: 'Bamboo',
                                        value: 'bamboo',
                                    },
                                ],
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item label="Cascader">
                    <Cascader
                        options={[
                            {
                                value: 'zhejiang',
                                label: 'Zhejiang',
                                children: [
                                    {
                                        value: 'hangzhou',
                                        label: 'Hangzhou',
                                    },
                                ],
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item label="DatePicker">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="RangePicker">
                    <RangePicker />
                </Form.Item>
                <Form.Item label="InputNumber">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="TextArea">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item label="Switch" valuePropName="checked">
                    <Switch />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default Profile;