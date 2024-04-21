import React, { ChangeEvent, useState } from 'react';
import { Input } from 'antd';

// helpers
import { IsEmailValid, IsPasswordValid } from '../utils/helpers';

interface InputProps {
  placeholder: string;
  icon?: string;
  type?: string;
  className?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  isSignUp?: boolean;
}

const InputC: React.FC<InputProps> = ({ placeholder, icon, onChange, type, isSignUp, className, value }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const isPassword = type === 'password';
  const isEmail = type === 'email';

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      const value = e.target.value;
      if (isPassword && !IsPasswordValid(value)) {
        setErrorMessage('Password must contain 1 upper case letter, 1 lowercase letter, 1 special character, and be at least 8 characters long.');
      } else if (isEmail && !IsEmailValid(value)) {
        setErrorMessage('Invalid email format.');
      } else {
        setErrorMessage('');
      }
      onChange(e);
    }
  };

  return (
    <>
      {isPassword ? (
        <>
          <Input.Password
            placeholder={placeholder}
            prefix={icon ? <img src={icon} alt='' style={{ marginRight: '5px' }} /> : null}
            style={{
              height: '40px',
              color: 'rgba(0, 0, 0, 0.7)',
              fontSize: '12px',
              fontWeight: '500',
            }}
            className={className ? className : ''}
            onChange={handleInputChange}
            value={value}
          />
          {(errorMessage && isSignUp) && <p style={{ color: 'red', fontSize: '10px', marginBottom: '0px', marginTop: '5px' }}>{errorMessage}</p>}
        </>
      ) : (
        <>
          <Input
            placeholder={placeholder}
            prefix={icon ? <img src={icon} alt='' style={{ marginRight: '5px' }} /> : null}
            style={{
              height: '40px',
              color: 'rgba(0, 0, 0, 0.7)',
              fontSize: '12px',
              fontWeight: '500',
            }}
            className={className ? className : ''}
            onChange={(e) => {
              if (isEmail) {
                handleInputChange(e);
              } else {
                onChange && onChange(e);
              }
            }}
            value={value}
          />
          {(errorMessage && isEmail) && <p style={{ color: 'red', fontSize: '10px', marginBottom: '0px', marginTop: '5px' }}>{errorMessage}</p>}
        </>
      )}
    </>
  );
};

export default InputC;
