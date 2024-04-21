import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Progress } from 'antd';

// components
import Notification from '../../components/Notifications/Notifications';
import AuthLayout from '../../components/AuthLayout/AuthLayout';
import Input from '../../components/Input';
import CustomButton from '../../components/Button';

// assets
import EmailIcon from '../../assets/email-icon.svg';
import KeyIcon from '../../assets/key-icon.svg';
import PersonIcon from '../../assets/person-icon.svg';

// actions
import { SetAuthState, SignUp } from '../../redux/slices/auth-slice';

// helpers
import { IsEmailValid, IsPasswordValid, GetPasswordStrength } from '../../utils/helpers';

// css
import './SignUp.css';

const Signup: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, success, message, loading } = useSelector(
    (state: any) => state.auth
  );

  const [signUpDetails, setSignUpDetails] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    const { name, email, password } = signUpDetails;
    if (
      name &&
      email &&
      IsEmailValid(email) &&
      password
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [signUpDetails]);

  useEffect(() => {
    const { password } = signUpDetails;
    setStrength(GetPasswordStrength(password));
  }, [signUpDetails.password]);

  const handleSignUpDetails = (key: string, value: string) => {
    setSignUpDetails({
      ...signUpDetails,
      [key]: value,
    });
  };

  const handleSignUp = () => {
    const { name, email, password } = signUpDetails || {};

    if (!name || name === 'N/A') {
      dispatch(
        SetAuthState({ field: 'error', value: 'Name cannot be empty.' })
      );
    } else if (!email) {
      dispatch(
        SetAuthState({ field: 'error', value: 'email cannot be empty.' })
      );
    } else if (!IsEmailValid(email)) {
      dispatch(
        SetAuthState({
          field: 'error',
          value: 'Please Enter a valid email address.',
        })
      );
    } else if (!password) {
      dispatch(
        SetAuthState({ field: 'error', value: 'password cannot be empty.' })
      );
    } else if (!IsPasswordValid(password)) {
      dispatch(
        SetAuthState({
          field: 'error',
          value:
            'Password must contain 1 upper case letter, 1 lowercase letter, 1 special character and minimum 8 characters long.',
        })
      );
    } else {
      dispatch(
        SignUp({
          name,
          email,
          password,
        })
      );
    }
  };

  useEffect(() => {
    if (success && message) {
      Notification({
        type: 'success',
        title: 'Success',
        description: message,
      });

      dispatch(SetAuthState({ field: 'success', value: false }));
      dispatch(SetAuthState({ field: 'message', value: '' }));

      navigate('/dasboard');
    }
  }, [success, message, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      Notification({
        type: 'error',
        title: 'Error',
        description: error,
      });
      dispatch(SetAuthState({ field: 'error', value: '' }));
    }
  }, [dispatch, error]);

  return (
    <AuthLayout
      heading='Create Account'
      description='Please enter credentials that will be used throught the
    registration process.'
    >
      <>
        <Input
          placeholder='Name'
          icon={PersonIcon}
          onChange={(e) => handleSignUpDetails('name', e.target.value)}
          className='mt-57'
        />
        <Input
          placeholder='Email'
          icon={EmailIcon}
          onChange={(e) => handleSignUpDetails('email', e.target.value)}
          type='email'
          className='mt-23'
        />

        <Input
          placeholder='Password'
          icon={KeyIcon}
          onChange={(e) => handleSignUpDetails('password', e.target.value)}
          type='password'
          className='mt-23'
          isSignUp
        />
        <div className='sign_up_password_strength'>
          <span style={{ marginTop: '6px' }}>Strength</span>
          <Progress
            style={{ marginLeft: '4px', width: '156px', height: '14px' }}
            size='small'
            strokeColor={strength <= 4 ? '#F17400' : 'green'}
            percent={strength * 20}
            status={strength === 5 ? 'success' : 'normal'}
            showInfo={false}
          />
        </div>

        <CustomButton
          onClick={handleSignUp}
          title='Create Account'
          loading={loading}
          isDisabled={isDisabled || strength !== 5}
        />

        <div className='login_back_wrapper mt-23'>
          <div className='have_account font_style'>
            Already have an account?
          </div>
          <Link to='/sign-in' className='login_link font_style'>
            Sign in
          </Link>
        </div>
      </>
    </AuthLayout>
  );
};

export default Signup;
