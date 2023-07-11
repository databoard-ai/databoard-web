
import { useState, React } from 'react';

function ResetPasswordScreen() {

  return (

    <div className="flex  justify-center h-screen bg-databoard-blue px-50 py-100">
      <div className="bg-center bg-contain bg-no-repeat w-full h-0.80 my-12 flex-nowrap  bg-reset_password  justify-center flex flex-row  items-center pt-100">
        <div className='hidden md:block basis-1/2'>

        </div>
        <div className='container ml-5 mr-5 mx-auto w-auto md:w-1/2 lg:w-1/4 md:mr-5'>
          <div className='h-full mx-auto bg-white rounded-sm px-10'>
            <div className=" p-6  h-full py-40 ">

              <h2 className="text-5xl md:text-3xl lg:text-5xl mb-2 font-montserrat text-dark-text">Forgot Password?</h2>
              <p className='py-4 font-extralight text-base  text-dark-text'>Let’s help you recover your account.</p>
              <form>
                <div className="mb-4">
                  <label className="block text-dark-text font-light mb-2 font-montserrat" htmlFor="email">Email or Username</label>
                  <input className="appearance-none border h-18 w-full  px-3 text- leading-tight focus:outline-none focus:shadow-outline rounded-md py-4" id="email" type="email" placeholder="Email" />
                </div>

                <button className="bg-databoard-blue w-full hover:bg-blue-700 text-white h-15 font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  Reset password
                </button>

                <p className='py-5 font-extralight text-base text-center text-dark-text'>An email will be sent to reset your password</p>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordScreen;