import React from 'react';
import 'antd/dist/reset.css';
import { notification } from 'antd';

interface NotificationProps {
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  description?: string;
  key?: string;
}

const Notification: React.FC<NotificationProps> = ({ type, title, description, key }) => {
  notification[type]({
    message: title,
    description: description,
    key
  });
  return null;
};

export default Notification;
