
import { useState, React } from 'react';
import { BsCamera } from 'react-icons/bs';
function Setup3() {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };



  return (

    <div className="flex  justify-end h-screen bg-databoard-blue">
      <div className="bg-left bg-no-repeat bg-contain w-full flex-nowrap h-full absolute z-0 bg-setup justify-end flex flex-row  items-center pt-100">
        <div className='hidden md:block basis-1/2'>

        </div>
        <div className='container mx-auto w-auto md:lg:w-1/2 lg:w-1/4'>
          <div className='h-full mx-auto bg-white rounded-sm px-10'>
            <div className=" p-6   h-full py-20 px-30">

              <div className='flex justify-center'>
              <div className="relative">
                <img
                  className="w-55 h-55 rounded-full cursor-pointer"
                  src={image || 'https://via.placeholder.com/150'}
                  alt="Avatar"
                  onClick={() => document.getElementById('imageUpload').click()}
                />
                <input
                  type="file"
                  id="imageUpload"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                {/* <div className="absolute inset-0 flex items-center justify-center">
                  <BsCamera className="w-8 h-8 text-gray-500" />
                </div> */}
              </div>

              </div>

              <p className='py-5 font-extralight text-md  text-dark-text text-center'>Upload an image of your brand’s Identity</p>
              <form>
                <div className="mb-4">
                  <label className="block text-dark-text font-light mb-2 font-montserrat" htmlFor="email">Organization Email</label>
                  <input className="appearance-none border h-18 w-full py-4 px-3 text- leading-tight focus:outline-none focus:shadow-outline rounded-md" id="email" type="email" placeholder="admin@abclightroom.com" />
                </div>
                <div className="mb-6">
                  <label className="block text-dark-text font-light mb-2 font-montserrat" htmlFor="phone">Phone number</label>
                  <input className="appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="text" placeholder="08036322653" />
                </div>
                <div className="mb-6">
                  <label className="block text-dark-text font-light mb-2 font-montserrat" htmlFor="website">Website / social link</label>
                  <input className="appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="website" type="text" placeholder="www.abclightroom.com" />
                </div>

                <button className="bg-databoard-blue w-full hover:bg-blue-700 text-white h-15 font-light py-4 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  Setup databoard
                </button>

              </form>


            </div>
          </div>
        </div>
      </div>




    </div>
  );
}

export default Setup3;