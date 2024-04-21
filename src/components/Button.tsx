import React from 'react';
import { Button } from 'antd';

// loader
import Loader from './Loader';

interface ButtonProps {
  onClick?: () => void;
  title: string;
  loading?: boolean;
  isDisabled?: boolean;
}

const CustomButton: React.FC<ButtonProps> = ({ onClick, title, loading, isDisabled = false }) => {
  return (
    <Button
      type='primary'
      style={{
        height: '32px',
        width: '100%',
        fontSize: '14px',
        fontWeight: '600',
        marginTop: '25px',
      }}
      className='font_style'
      onClick={onClick}
      disabled={isDisabled}
    >
      {loading ? <Loader color='white' /> : title}
    </Button>
  );
};

export default CustomButton;
