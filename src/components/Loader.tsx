import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

interface LoaderProps {
  color?: string;
  fontSize?: string;
  justifyContent?: string;
}

const Loader: React.FC<LoaderProps> = ({ color, fontSize = '20px', justifyContent }) => (
  <div
    style={{
      top: '15%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: justifyContent || 'center',
      position: 'absolute',
      left: '48%',
    }}
  >
    <Spin
      indicator={
        <LoadingOutlined
          style={{
            fontSize: fontSize,
            color: color || 'rgba(255, 255, 255, 0.5)',
            justifyContent,
          }}
          spin
        />
      }
    />
  </div>
);

export default Loader;
