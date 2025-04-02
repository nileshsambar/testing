import { IonBadge, IonChip, IonContent, IonHeader, IonIcon, IonInput, IonInputPasswordToggle, IonLabel, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { useEffect, useState } from 'react';
import { cashOutline } from 'ionicons/icons';
import axios from 'axios';

const Register: React.FC = () => {

  const [datas, setDatas]:any[] = useState([])
  
  
    // Handle the login action

    const [loginData, setLoginData] = useState({
      email: '',
      password: ''
    })

    const handleLoginChange = (e:any) => {
      
      setLoginData({
        ...loginData,
        [e.target.name]: e.target.value
      })
    }

    const handleLogin = async (e:any) => {
      e.preventDefault();
      SetStLoading(true)
      try {
        
        const response = await axios.post('https://everybit.space/apis/login.php', loginData);
        // console.log(response.data);
  
        SetStLoading(false)
        if (response.data.success) {

          console.log(response.data);
          localStorage.setItem('isLoggedIn', 'true'); // Save login status to localStorage
          localStorage.setItem('userId', response.data.user); // Save login id to localStorage
          localStorage.setItem('email', response.data.email); 
          localStorage.setItem('username', response.data.username); 
          localStorage.setItem('name', response.data.name); 
          window.location.href = '/tab1'
        } else {
          errors.email = response.data.message
          setErrors(response.data)
          
        }
      } catch (error) {
        console.error('Error:', error);
      }


    };

    // Handle the Register action
    
    const [registerData, setRegisterData] = useState({
      name:'',
      username:'',
      email: '',
      password: ''
    })

    const handleRegisterChange = (e:any) => {
     
      setRegisterData({
        ...registerData,
        [e.target.name]: e.target.value
      })
    }

    const handleRegister = async (e:any) => {
      
      e.preventDefault();
      // Validate inputs before proceeding
    if (validate()) {
      SetStLoading(true)
      // Add logic to send data to a server
      try {
        
        console.log(registerData);
        const response = await axios.post('https://everybit.space/apis/register.php', registerData);
        console.log(response.data);
        SetStLoading(false)
        
        if (response.data.success) {
          // alert(response.data.message);
          localStorage.setItem('isLoggedIn', 'true'); // Save login status to localStorage
          localStorage.setItem('userId', response.data.user); // Save login id to localStorage
          localStorage.setItem('email', response.data.email); 
          localStorage.setItem('username', response.data.username); 
          localStorage.setItem('name', response.data.name); 
          window.location.href = '/tab1'
          console.log(response.data);
          
        } else {
          setErrors(response.data)
          // alert(response.data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.log("Form has validation errors");
    }


    };

// Validate login, register forms

const [errors, setErrors] = useState({
  email:'',
  password: '',
  message: '',
  already:''
})

const validate = () => {
  let inputErrors:any = {}

  // Email validation
  const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  
  if (!registerData.email) {
    inputErrors.email = "Email is required";
  } else if (!emailPattern.test(registerData.email)) {
    inputErrors.email = "Invalid email format";
  }

  // Password validation
  if (!registerData.password) {
    inputErrors.password = "Password is required";
  } else if (registerData.password.length < 6) {
    inputErrors.password = "Password must be at least 6 characters long";
  }

  setErrors(inputErrors)
   // Return true if no errors
   return Object.keys(inputErrors).length === 0;
}


  
    // // Handle the logout action
    // const handleLogout = () => {
    //   setIsLoggedIn(false);
    //   localStorage.removeItem('isLoggedIn'); // Remove login status from localStorage
    // };

  // State to track the current slide (0 or 1)
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to go to the next slide
    const nextSlide = () => {
      setCurrentSlide((currentSlide + 1) % slides.length);
    };
  
    // Function to go to the previous slide
    const prevSlide = () => {
      setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
    };

  // Slides array
  const slides = [
    {
      id: 0,
      content: (
                  <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-purple-500">
                Register Your Account 
                
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleRegister} className="space-y-6">
                
                <IonInput required onIonInput={handleRegisterChange} fill='outline' name='name' type="text" value={registerData.name} placeholder='Name'></IonInput>
                
                <IonInput required onIonInput={handleRegisterChange} fill='outline' name='username' type="text" value={registerData.username} placeholder='Username'></IonInput>

                <IonInput onIonInput={handleRegisterChange} fill='outline' name='email' type="email" value={registerData.email} placeholder='Email'></IonInput>
                {errors.email && <p style={{ color: "red", margin:'0', fontSize:'small' }}>{errors.email}</p>}
                {errors.already && <p style={{ color: "red", margin:'0', fontSize:'small' }}>{errors.already}</p>}

                <IonInput required onIonInput={handleRegisterChange} fill='outline' name='password' type="password" value={registerData.password} placeholder='Password'>
                  <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                </IonInput>
                {errors.password && <p style={{ color: "red", margin:'0', fontSize:'small' }}>{errors.password}</p>}

                

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Register
                  </button>
                </div>

              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{' '}
                <a onClick={nextSlide} className="cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  Login
                </a>
              </p>
            </div>
          </div>
      ),
    },
    {
      id: 1,
      content: (
        <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-purple-500">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleLogin} className="space-y-6">
                

                <IonInput required onIonInput={handleLoginChange} value={loginData.email} fill='outline' name='email' type="email" placeholder='Email'></IonInput>


                <IonInput required onIonInput={handleLoginChange} value={loginData.password} fill='outline' name='password' type="password" placeholder='Password'>
                  <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                </IonInput>
                {errors.message && <p style={{ color: "red", margin:'0', fontSize:'small' }}>{errors.message}</p>}

                <div className="flex items-center justify-between">
                  
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{' '}
                <a onClick={prevSlide} className="cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  Register
                </a>
              </p>
            </div>
          </div>
      ),
    },
  ];

  // loading

  const [stLoading, SetStLoading] = useState(false)




  return (

    <IonPage>
      <IonHeader>
        <IonToolbar class='ion-align-items-center'>
          <IonTitle slot='start'>
              Everylinks
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class='ion-padding' fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
          <IonLoading isOpen={stLoading} message={'Please Wait...'} spinner={'circles'} />

          {/* <ul>

          {datas.map((u:any) => (
            <li key={u.id}>{u.code}: {u.original_url}</li>
          ))}
          </ ul> */}

          <div className="relative w-full max-w-lg mx-auto">
            <div className="overflow-hidden">
            
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {/* Render each slide */}
                {slides.map((slide) => (
                  <div key={slide.id} className="w-full flex-shrink-0">
                    {slide.content}
                  </div>
                ))}
              </div>
            </div>
            
          </div>
          

      </IonContent>
    </IonPage>
  );
};
  
  // return (
    
  //         <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
  //           <div className="sm:mx-auto sm:w-full sm:max-w-sm">
  //             <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-purple-500">
  //               Register Your Account
  //             </h2>
  //           </div>

  //           <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
  //             <form action="#" method="POST" className="space-y-6">
                

                
  //               <IonInput fill='outline' name='username' type="text" value="" placeholder='Username'></IonInput>

  //               <IonInput fill='outline' name='email' type="email" value="" placeholder='Email'></IonInput>

  //               <IonInput fill='outline' name='password' type="password" value="" placeholder='Password'>
  //                 <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
  //               </IonInput>

                

  //               <div>
  //                 <button
  //                   type="submit"
  //                   className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  //                 >
  //                   Register
  //                 </button>
  //               </div>
  //             </form>

  //             <p className="mt-10 text-center text-sm text-gray-500">
  //               Not a member?{' '}
  //               <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
  //                 Login
  //               </a>
  //             </p>
  //           </div>
  //         </div>

      
  // );
// };

export default Register;
