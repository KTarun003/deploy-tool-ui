import React from 'react';
import { Breadcrumb, Button, Flex} from 'antd';
import { useNavigate} from "react-router-dom";
import { ArrowLeftOutlined } from '@ant-design/icons';

export default function BreadCrumb({page,href,name}) {
    const navigate = useNavigate();

  return (
    <Flex align="center">
        <Button onClick={() => navigate(-1)} type="button" ><ArrowLeftOutlined /></Button>
        <Breadcrumb                
            items={[
                {
                    title: <a href={href}>{page}</a>,
                },
                {
                    title: name,
                },
            ]}
        />
    </Flex>
  )
}
