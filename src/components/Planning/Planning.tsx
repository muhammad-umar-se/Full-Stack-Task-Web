import React from 'react';
import { Col } from 'antd';

// assets
import EdgePic from '../../assets/edge.png';
import PlanningPic from '../../assets/planning.png';

// css
import './Planning.css';

const Planning: React.FC = () => {
  return (
    <Col span={12} className='right_container'>
      <img src={EdgePic} alt='' className='edge_pic' />
      <div className='planning_wrapper'>
        <div style={{ width: '85%' }}>
          <div className='planning_pic_wrapper'>
            <img src={PlanningPic} alt='' className='full_width' />
          </div>
          <div className='signup_info'>
            <h2 className='hello_text font_style'>
              Welcome here !
            </h2>
            <p className='register_detail font_style'>
              Join our community and enjoy the benefits of our platform.
              <br />
              Whether you&apos;re a new user or returning, we&apos;re glad to have you here!
            </p>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default Planning;
