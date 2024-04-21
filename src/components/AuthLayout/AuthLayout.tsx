import React, { ReactNode } from 'react';
import { Col, Row } from 'antd';

// components
import Planning from '../../components/Planning/Planning';

// css
import './AuthLayout.css';

interface AuthLayoutProps {
  heading: string;
  description: string;
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, heading, description }) => {
  return (
    <div className='auth_layout_container'>
      <Row className='full_width'>
        <Col span={12} className=''>
          <div className='heading_title'></div>
          <div className='auth_layout_left_container'>
            <div className='al_left_container_wrapper'>
              <div className='font_style lc_heading'>{heading}</div>
              <div className='font_style lc_description'>{description}</div>
              {children}
            </div>
          </div>
        </Col>
        <Planning />
      </Row>
    </div>
  );
};

export default AuthLayout;
