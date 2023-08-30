import { useState, React,useSelector } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@chakra-ui/react';
import { useToast, HStack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {loginUser,saveUserCredentials} from '../redux/reducers/authSlice';




function LoginScreen() {
  const dispatch = useDispatch();
  const [rememberMe, setRememberMe] = useState(false);

  function handleRememberMeToggle() {
    setRememberMe(!rememberMe);
  }


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast()
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);

  const login = (e) => {
    e.preventDefault();
    if (email.trim() !== '' && password.trim() !== '') {
      const credentials = new URLSearchParams();
      credentials.append('username', email);
      credentials.append('password', password);

      dispatch(loginUser(credentials))
        .then((response) => {
          const statusCode = response.meta.status;
          const responseData = response.payload.data;
          if (statusCode === 200) {
            const accessToken = responseData.access_token;
            const userEmail = responseData.user.email;
            const orgName = responseData.user.org_name;

            // Dispatch the action to save the credentials
            dispatch(saveUserCredentials({ accessToken, userEmail, orgName }));
            navigate('/taglist');

          } else {
            toast({
              position: 'top-right',
              render: () => (
                <Box color='white' p={3} bg='red.500' borderRadius="md">
                  <Text>Invalid credentials</Text>
                </Box>
              ),
            })
          }
          // ... other logic
        }).catch((error) => {
          toast({
            position: 'top-right',
            render: () => (
              <Box color='white' p={3} bg='red.500' borderRadius="md">
                <Text>Something went wrong: {error}</Text>
              </Box>
            ),
          })
        });
    } else {
      toast({
        position: 'top-right',
        render: () => (
          <Box color='white' p={3} bg='red.500' borderRadius="md">
            All fields are required
          </Box>
        ),
      })
    }
  };


  return (

    <div className="flex  justify-end h-screen bg-databoard-blue ">
      <div className="bg-center bg-no-repeat bg-contain w-full flex-nowrap h-full absolute z-0 bg-signin  justify-end flex flex-row  items-center pt-100">
        <div className='hidden md:block basis-1/2'>

        </div>
        <div className='container mx-auto w-auto md:lg:w-1/2 lg:w-1/4'>
          <div className='h-full mx-auto bg-white rounded-sm px-10'>
            <div className=" p-6   h-full py-40 px-30">

              <h2 className="text-5xl mb-2 font-montserrat text-dark-text">Sign in</h2>
              <p className='py-5 font-extralight text-xl  text-dark-text'>Enter your Provezone Databoard</p>
              <form>
                <div className="mb-4">
                  <label className="block text-dark-text font-light mb-2 font-montserrat" htmlFor="email">Email or Username</label>
                  <input className="appearance-none border h-18 w-full py-4 px-3 text- leading-tight focus:outline-none focus:shadow-outline rounded-md" id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-6">
                  <label className="block text-dark-text font-light mb-2 font-montserrat" htmlFor="password">Password</label>
                  <input className="appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="flex items-center my-5">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 databoard-blue"
                      checked={rememberMe}
                      onChange={handleRememberMeToggle}
                    />
                    <span className="ml-2 text-gray-700 font-extralight">Remember me</span>
                  </label>

                  <a
                    className="inline-block align-baseline font-extralight text-sm text-blue-500 hover:text-blue-800 ml-auto"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="flex items-start my-5">
                  <a
                    className="inline-block align-baseline font-extralight text-sm text-blue-500 hover:text-blue-800 ml-auto"
                    href="#" onClick={() => navigate('/register')}
                  >
                    <HStack><Text color="black">Don't have an account?</Text> <Text fontWeight="bold">Register</Text></HStack>
                  </a>


                </div>
                <button className="bg-databoard-blue w-full hover:bg-blue-700 text-white h-15 font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline" disabled={loading} type="button" onClick={login}>
                  {loading ? (
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    </div>
                  ) : (
                    'Login'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;