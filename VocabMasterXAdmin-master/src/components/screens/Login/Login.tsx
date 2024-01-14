import './index.css';
import { Flex, FormControl, FormLabel, Input, Stack, Button, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { useState } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import { signInWithEmailAndPassword } from 'firebase/auth/cordova';
import { useAuth } from '~/lib/firebase';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useAuth();
  const handleOnclickLearn = () => {
    if (!email || !password) {
      setError('Vui lòng nhập email và mật khẩu.');
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          navigate('/');
          console.log('user:', user);
          setError('Đăng nhập thành công.');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === 'auth/invalid-email') {
            setError('Email không đúng định dạng. Vui lòng nhập lại.');
          } else if (errorCode === 'auth/wrong-password') {
            setError('Mật khẩu không đúng. Vui lòng nhập lại.');
          } else if (errorCode === 'auth/user-not-found') {
            setError('Tài khoản không tồn tại. Vui lòng nhập lại.');
          } else {
            setError(`Đã xảy ra lỗi: ${errorCode}`);
          }

          console.log(errorCode, errorMessage);
        });
    }
  };
  return (
    <Stack minH="100vh" direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align="center" justify="center">
        <div className="container">
          <div className="card">
            <a className="login">Log in</a>
            <div className="inputBox">
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input autoFocus type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
            </div>

            <div className="inputBox">
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
            </div>
            {error && <div className="error-message">{error}</div>}
            <Button className="enter" onClick={handleOnclickLearn}>
              Sign in
            </Button>
          </div>
        </div>
      </Flex>
      <Flex flex={1}>
        <Image
          alt="Login Image"
          objectFit="cover"
          src="https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg"
        />
      </Flex>
    </Stack>
  );
}
// function setError(arg0: string) {
//   throw new Error('Function not implemented.');
// }
