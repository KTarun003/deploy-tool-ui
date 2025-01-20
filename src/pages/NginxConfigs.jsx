import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
export default () => {
    return <>
        <Result
            icon={<SmileOutlined />}
            title="Coming Soon!"
            extra={<Button href={"/"} type="primary">Home</Button>}
        />
    </>
}