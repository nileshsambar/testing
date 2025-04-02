import { IonBadge, IonButton, IonChip, IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab5.css';
import { cashOutline, information, informationCircle, logOut, wallet, wifi } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import Register from './Register';
import axios from 'axios';

const Tab3: React.FC = () => {

    // check online 
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
  
      const updateOnlineStatus = () => {
        setIsOnline(navigator.onLine);
      };
  
      // Add event listeners
      window.addEventListener("online", updateOnlineStatus);
      window.addEventListener("offline", updateOnlineStatus);
  
      
      // Cleanup function to remove event listeners
      return () => {
        window.removeEventListener("online", updateOnlineStatus);
        window.removeEventListener("offline", updateOnlineStatus);
      }
      
    },[])

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/'
  }

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [stLoading, SetStLoading] = useState(false)

  const handlePasswordChange = async () => {
    const { currentPassword, newPassword, confirmPassword } = password;
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    if (currentPassword && newPassword && confirmPassword) {
      SetStLoading(true)
      try {
        const response = await axios.post('https://everybit.space/apis/changePass.php', {user:localStorage.getItem('userId'),pass:currentPassword, new:newPassword});
        SetStLoading(false)
        if (response.data) {
          console.log("Change requested.");
          alert(response.data.message)       
          
        } else {
          console.log("Change request error.")        
        }
      } catch (error) {
        console.error('Error:', error);
      }
  
      
      // alert("Password changed successfully!");
    } else {
      alert("Please fill in all the fields.");
    }
  };
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot='start'>Settings</IonTitle>
          <IonChip slot='end'>
            <IonLabel color={isOnline ? 'success' : 'danger'}>{isOnline ? 'Online' : 'Offline'}</IonLabel>
            <IonIcon aria-hidden='true' color={isOnline ? 'success' : 'danger'} icon={wifi}></IonIcon>
          </IonChip>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 5</IonTitle>
          </IonToolbar>
        </IonHeader>
        
    <div className="bg-gray-200 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4 mt-1 text-gray-800">Account Settings</h2>
          <p className="text-blue-700">Update your account details and security settings.</p>
        </div>

        {/* Profile Information */}
        <div className="bg-white mt-6 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Profile Information</h3>

          <div className="space-y-4">
            {/* Display User Name */}
            <div className="flex border-b items-center justify-between">
              <div>
                <label className="text-blue-700">Username</label>
                <p className="text-gray-800 font-medium">{localStorage.getItem('username')}</p>
              </div>
            </div>

            {/* Display Name */}
            <div className="flex border-b items-center justify-between">
              <div>
                <label className="text-blue-700">Name</label>
                <p className="text-gray-800 font-medium">{localStorage.getItem('name')}</p>
              </div>
            </div>

            {/* Display Email */}
            <div className="flex border-b items-center justify-between">
              <div>
                <label className="text-blue-700">Email</label>
                <p className="text-gray-800 font-medium">{localStorage.getItem('email')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Password Change Section */}
        <div className="bg-white mt-6 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Change Password</h3>

          <div className="space-y-4">
            {/* Current Password */}
            <div className="w-full">
              <label className="text-blue-700">Current Password</label>
              <input
                type="password"
                value={password.currentPassword}
                onChange={(e) => setPassword({ ...password, currentPassword: e.target.value })}
                className="text-black rounded-md border-2 border-black bg-gray-50 px-3 py-2 mt-2 text-sm w-full"
                
              />
            </div>

            {/* New Password */}
            <div className="w-full">
              <label className="text-blue-700">New Password</label>
              <input
                type="password"
                value={password.newPassword}
                onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
                className="text-black border-2 border-black bg-gray-50 rounded-md px-3 py-2 mt-2 text-sm w-full"
              />
            </div>

            {/* Confirm New Password */}
            <div className="w-full">
              <label className="text-blue-700">Confirm New Password</label>
              <input
                type="password"
                value={password.confirmPassword}
                onChange={(e) => setPassword({ ...password, confirmPassword: e.target.value })}
                className="text-black border-2 border-black bg-gray-50 rounded-md px-3 py-2 mt-2 text-sm w-full"
              />
            </div>

            {/* Change Password Button */}
            <div className="flex justify-end mt-4">
              <button
                className=" bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                onClick={handlePasswordChange}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="bg-white w-full mt-6 p-2 rounded-lg shadow-lg flex justify-center">
          <a
            href='https://www.termsfeed.com/live/3640a02e-330f-4d86-86ec-cd3fe2fb0a94'
            className="flex text-sm items-center bg-gray-400 text-white px-2 py-3 rounded-lg hover:bg-blue-700"
            >
            <IonIcon icon={informationCircle} className="mr-3" />
            About Us, Contact Us & Privacy Policy
          </a>
        </div>

        {/* Logout Button */}
        <div className="bg-white mt-6 p-6 rounded-lg shadow-lg flex justify-center">
          <button
            className="flex items-center bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600"
            onClick={logout}
          >
            <IonIcon icon={logOut} className="mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
    
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
