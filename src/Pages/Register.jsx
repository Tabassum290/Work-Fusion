
import CustomNavbar from '../Components/CustomNavbar';
import Footer from '../Components/Footer';
import { useContext, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { AuthContext } from '../Provider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import UseAxiosPublic from '../Hooks/UseAxiosPublic';
import axios from 'axios';
import { toast } from 'react-toastify';

const imageKey= import.meta.env.VITE_image;


const Register = () => {
    const {setUser,createNewUser,profileUpdate,googleProvider,signInWithGitHub} = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = UseAxiosPublic();

    const handleSignUp = async (e) => {
        e.preventDefault();
      
        const name = e.target.name.value;
        const image = e.target.image.files[0];
        const email = e.target.email.value;
        const password = e.target.password.value;
        const bank = e.target.bank.value;
        const designation = e.target.designation.value;
        const salary = e.target.salary.value;
        const role = e.target.role.value; 

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
         toast.error("Password must contain at least 8 characters, including one letter and one number.");
          return;
        }
      try {
          const formData = new FormData();
          formData.append("image", image);
      
          const imageResponse = await axios.post(
            `https://api.imgbb.com/1/upload?key=${imageKey}`,
            formData,
            { 
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
      
          const imageUrl = imageResponse.data.data.url;
      
          console.log("Uploaded image URL:", imageUrl);
          const result = await createNewUser(email, password);
          console.log("User created:", result.user);
          await profileUpdate(name, imageUrl);
      
          const userInfo = {
            name: name,
            email: email.toLowerCase(),
            bank: bank,
            role: role.toLowerCase(),
            salary: parseInt(salary),
            image: imageUrl,
            isVerified:false,
            designation : designation
          };
          const response = await axiosPublic.post("/users", userInfo);
      
          if (response.data.insertedId) {
            const updatedUser = {
              ...result.user,
              displayName: name,
              photoURL: imageUrl,
            };
      
            console.log("Updated user info:", updatedUser);
            setUser(updatedUser);
            navigate("/");
            Swal.fire("Registration Successful", "Welcome to Work Fusion!", "success");
          }
        } catch (error) {
          console.error("Error during sign-up process:", error);
        }
      };
      

    const handleGoogle =()=>{
        googleProvider()
        .then(result =>{
            const userInfo ={
                email : result.user?.email,
                name: result.user?.displayName,
                bank: 4242424242424242,
                salary: parseInt(20000),
                designation:"Marketer",
                image:result.user?.photoURL,
                role:"employee",
                isVerified:false,
            }
            axiosPublic.post('/users',userInfo)
            .then(res=>{
                console.log(res.data);
                navigate('/')
                Swal.fire("Registration Successful", "Welcome to Work Fusion!", "success");
            })
        })
        }



const handleGithub = () =>{
    signInWithGitHub()
    .then(result =>{
        const userInfo ={
            email : result.user?.email,
            name: result.user?.displayName,
            bank: 4242424242424242,
            role:"employee",
            designation:"Marketer",
            salary: parseInt(20000),
            image:result.user?.photoURL,
            isVerified:false,
        }
        axiosPublic.post('/users',userInfo)
        .then(res=>{
            console.log(res.data);
            navigate('/')
            Swal.fire("Registration Successful", "Welcome to Work Fusion!", "success");
        })
    })
}

    return (
        <div>
            <CustomNavbar/>
            <div className="bg-blue-100">
            <Helmet>REGISTER | WORK FUSION</Helmet>
   
            <section className="max-w-5xl mx-auto flex  md:flex-row lg:flex-row justify-center items-center">
      
<div className="w-full max-w-lg p-8 space-y-3 rounded-xl  mx-auto">
<h1 className="text-2xl font-bold text-center mb-4">Register</h1>
	<form onSubmit={handleSignUp} className="space-y-6">
    <div>
    <label htmlFor="role" className='p-4 text-xl font-semibold'>Register As :</label>
    <select id="role" name="role" required>
      <option value="" selected>
        Choose a Role
      </option>
      <option value="employee">Employee</option>
      <option value="hr">HR</option>
    </select>
  </div>
		<div className="space-y-1 text-sm">
			<label className="block dark:text-gray-600">Name</label>
			<input type="text" name="name" placeholder="Type here" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
		</div>
		<div className="space-y-1 text-sm">
			<label className="block dark:text-gray-600">Bank Account No.</label>
			<input type="text" name="bank" placeholder="Type here" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
		</div>
		<div className="space-y-1 text-sm">
			<label className="block dark:text-gray-600">Designation</label>
			<input type="text" name="designation" placeholder="Type here" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
		</div>
		<div className="space-y-1 text-sm">
			<label className="block dark:text-gray-600">Salary</label>
			<input type="text" name="salary" placeholder="Type here" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
		</div>

		<div className="space-y-1 text-sm">
			<label className="block dark:text-gray-600">Email</label>
			<input type="text" name="email" placeholder="Email" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
		</div>
		<div className="space-y-1 text-sm">
			<label htmlFor="password" className="block dark:text-gray-600">Password</label>
			<input type="password" name="password" 
			 placeholder="Enter Your Password" 
			 className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
		</div>
        <div className="space-y-1 text-sm">
			<label className="block dark:text-gray-600">Photo URL</label>
			<input type="file" name="image" placeholder="Type here" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
		</div>
        <button type="submit" className="btn bg-blue-700 w-full p-3 text-center text-white rounded-sm ">Register</button>
	</form>
    <p className="text-[#4e2fc7] text-lg text-center">Already Registered? Go to <Link to='/login'>Log in</Link></p>
	<div className="flex items-center pt-4 space-x-1">
		<div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
		<p className="px-3 text-sm dark:text-gray-600">Or Sign Up With</p>
		<div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
	</div>
	<div onClick={handleGoogle} className="flex justify-center space-x-4">
		<button aria-label="Log in with Google" className="p-3 rounded-sm">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
				<path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
			</svg>
		</button>
		<button aria-label="Log in with Twitter" className="p-3 rounded-sm">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
				<path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z"></path>
			</svg>
		</button>
		<button onClick={handleGithub} aria-label="Log in with GitHub" className="p-3 rounded-sm">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
				<path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
			</svg>
		</button>
	</div>
</div>
<div className='w-1/2 hidden lg:block'>
<DotLottieReact
      src="https://lottie.host/b2366cc4-c3ab-4c87-8663-8e42bc28acf6/kWSGabV6hK.lottie"
      loop
      autoplay></DotLottieReact>
 </div>
            </section>
  
        </div>
            <Footer/>
        </div>
    );
};

export default Register;