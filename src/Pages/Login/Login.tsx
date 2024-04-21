import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// components
import Notification from '../../components/Notifications/Notifications';
import Input from '../../components/Input';
import AuthLayout from '../../components/AuthLayout/AuthLayout';
import CustomButton from '../../components/Button';

// actions
import { SetAuthState, SignIn } from '../../redux/slices/auth-slice';

// helpers
import { IsEmailValid } from '../../utils/helpers';

// assets
import EmailIcon from '../../assets/email-icon.svg';
import KeyIcon from '../../assets/key-icon.svg';

// css
import './login.css';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, success, message, loading } = useSelector(
    (state: any) => state.auth
  );

  const [signInDetails, setSignInDetails] = useState({
    email: '',
    password: ''
  });
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const { email, password } = signInDetails;
    if (email && IsEmailValid(email) && password) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [signInDetails]);

  const handleSignInDetails = (key: string, value: string) => {
    setSignInDetails({
      ...signInDetails,
      [key]: value,
    });
  };

  const handleSignIn = () => {
    const { email, password } = signInDetails;

    if (!email) {
      dispatch(SetAuthState({ field: 'error', value: 'Enter your email' }));
      return;
    } else if (!password) {
      dispatch(SetAuthState({ field: 'error', value: 'Enter your password' }));
      return;
    } else {
      dispatch(SignIn({ email, password }));
    }
  };

  useEffect(() => {
    if (message && success) {
      dispatch(SetAuthState({ field: 'success', value: false }));
      dispatch(SetAuthState({ field: 'message', value: '' }));

      navigate('/dasboard');
    }
  }, [dispatch, message, navigate, success]);

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

  console.log(signInDetails, '------>', isDisabled);

  return (
    <>
      <AuthLayout
        heading='Sign In'
        description='Sign In to your account to continue the process'
      >
        <>
          <div className='login_divider'>
            <Input
              placeholder='Email'
              icon={EmailIcon}
              onChange={(e) => handleSignInDetails('email', e.target.value)}
            />
            <Input
              placeholder='Password'
              icon={KeyIcon}
              onChange={(e) => handleSignInDetails('password', e.target.value)}
              type='password'
              className='mt-23'
            />
          </div>

          <CustomButton
            onClick={handleSignIn}
            title='Sign In'
            loading={loading}
            isDisabled={isDisabled}
          />
          <div className='create_new_account_wrapper mt-23'>
            <div className='have_account font_style'>
              Don’t have an account?
            </div>
            <Link to='/sign-up' className='singup_link font_style'>
              Create an account
            </Link>
          </div>
        </>
      </AuthLayout>
    </>
  );
};

export default Login;
