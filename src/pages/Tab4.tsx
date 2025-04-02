import { IonBadge, IonButton, IonChip, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonLoading, IonPage, IonRefresher, IonRefresherContent, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab4.css';
import { cashOutline, enter, enterOutline, pencil, wallet, wifi } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AdMob, InterstitialAdPluginEvents, RewardAdOptions } from '@capacitor-community/admob';

const Tab3: React.FC = () => {

  const [withAmount, setWithAmount] = useState('500')
  const withItems = ['500', '1000', '2000', '5000', '10000', '20000']

  const handleWithAmount = (v:any) => {
    setWithAmount(v)
    // showInterstitialAd()
  }

  const [stLoading, SetStLoading] = useState(false)

  const [allTrans, setAllTrans] = useState([])
  const [totalEarn, setTotalEarn]:any = useState(0) 
  const [yesData, setYesData] = useState(false)


  // get all Withdraws
  const fetchJson = async () => {
    SetStLoading(true)
    try {
      const response = await axios.post('https://everybit.space/apis/getWithdraws.php', {user:localStorage.getItem('userId')});
      SetStLoading(false)
      if (response.data) {
        setYesData(true)
        
        setAllTrans(response.data.all)
        setWmd(response.data.users[0])
        setTotalEarn((response.data.users[0].earn*0.4).toFixed(2))
        // console.log();
        console.log("Data Found.");
              
        
      } else {
        setYesData(false)      
        console.log("Data Not Found.");

      }
    } catch (error) {
      setYesData(false)      
    }
  }

  const [isOnline, setIsOnline] = useState(navigator.onLine);

    // Admob Testing

    // const [isRewardAdLoaded, setIsRewardAdLoaded] = useState(false);

    // const loadRewardedAd = async () => {
    //   try {
    //     const options: RewardAdOptions = {
    //       adId: 'ca-app-pub-3123067468107790/8621678391',  // Test Rewarded Ad ID
    //       isTesting: false,  // Set to false for production
    //     };
  
    //     await AdMob.prepareRewardVideoAd(options);
    //     setIsRewardAdLoaded(true);
    //     console.log('Rewarded ad loaded');
    //   } catch (err) {
    //     console.error('Failed to load rewarded ad', err);
    //   }
    // };
  
    // // Function to show the rewarded ad
    // const showRewardedAd = async () => {
    //   if (isRewardAdLoaded) {
    //     try {
    //       await AdMob.showRewardVideoAd();
    //       console.log('Rewarded ad shown');
    //       setIsRewardAdLoaded(false);  // Reset ad loaded status
  
    //       // Delay the next ad load by 10 seconds (10000 ms)
    //       setTimeout(() => {
    //         loadRewardedAd();  // Reload the ad after showing it
    //         console.log('Interstitial ad reloaded after delay');
    //       }, 100000);
          
    //     } catch (err) {
    //       console.error('Failed to show rewarded ad', err);
    //     }
    //   } else {
    //     console.log('Rewarded ad not loaded yet');
    //   }
    // };  
  
  
  
    //  const [isInterstitialAdLoaded, setIsInterstitialAdLoaded] = useState(false);
   
    //  // Function to load the interstitial ad
    // const loadInterstitialAd = async () => {
    //   try {
    //     const options: any | InterstitialAdPluginEvents = {
    //       adId: 'ca-app-pub-3123067468107790/6600313425',  // Test Interstitial Ad ID
    //       isTesting: false,  // Set to false for production
    //     };
  
    //     await AdMob.prepareInterstitial(options);
    //     setIsInterstitialAdLoaded(true);
    //     console.log('Interstitial ad loaded');
    //   } catch (err) {
    //     console.error('Failed to load interstitial ad', err);
    //   }
    // };
  
    // // Function to show the interstitial ad
    // const showInterstitialAd = async () => {
    //   if (isInterstitialAdLoaded) {
    //     try {
    //       await AdMob.showInterstitial();
    //       console.log('Interstitial ad shown');
    //       setIsInterstitialAdLoaded(false);  // Reset ad loaded status
  
    //       // Delay the next ad load by 10 seconds (10000 ms)
    //       setTimeout(() => {
    //         loadInterstitialAd();  // Reload the ad after showing it
    //         console.log('Interstitial ad reloaded after delay');
    //       }, 100000);
    //     } catch (err) {
    //       console.error('Failed to show interstitial ad', err);
    //     }
    //   } else {
    //     console.log('Interstitial ad not loaded yet');
    //   }
    // };
  

  useEffect(() => {
    // // For Ads 
    // // Load the ad for the first time when the component mounts
    // loadRewardedAd();

    // // Add an event listener to reload the ad after the user earns a reward
    // const onRewardedAdComplete = () => {
    //   console.log('User watched ad and earned reward');
    //   // Reload the ad after reward
    // };

    // AdMob.addListener('onRewarded', onRewardedAdComplete);

    // // Load the interstitial ad when the component mounts
    // loadInterstitialAd();

    // // Optionally, you can set an event listener for the ad close event if you want
    // const onAdClosed = () => {
    //   console.log('Interstitial ad closed');
    //   // Optionally load a new ad when the current one is closed
    // };

    // AdMob.addListener('onAdClosed', onAdClosed);


    

    // const initAdMob = async () => {
    //   // Initialize AdMob with the app ID (replace with your AdMob app ID)
    //   await AdMob.initialize({
    //     appId: 'ca-app-pub-3123067468107790~8789199353',  // Example App ID
    //   });
    // };

    // initAdMob();

    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    // Add event listeners
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
    
    fetchJson();
    // Cleanup function to remove event listeners
    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
      // AdMob.removeAllListeners(); 

    }
    
  },[])

  
  // alert form for withdrawal method

  const [isOpen, setIsOpen] = useState(false)
  const [changeMethod, setChangeMethod] = useState('UPI')

  const onClose = () => {
    setIsOpen(false)
  }

  const handleMethodChange = (e:any) => {
  
    // console.log(e.target.value);
    setChangeMethod(e.target.value)
    
  }

  const handleChangeMethod = async (e:any) => {
    // showRewardedAd()
    e.preventDefault();
    
    try {
      const response = await axios.post('https://everybit.space/apis/changeWithdraws.php', {
        method: wmd.method,
        address: wmd.address,
        bank: wmd.bank,
        ifsc: wmd.ifsc,
        user: localStorage.getItem('userId')
      } );
      
      onClose()
      SetStLoading(false)
      if (response.data) {
        fetchJson()
        
        
      } else {
        console.log("Data Not Found.")        
      }
    } catch (error) {
      console.error('Error:', error);
    }
  
    
  }

  // on changes and submit
  const [wmd, setWmd] = useState({
    method: '',
    bank: '',
    ifsc: '',
    address: ''
  })
  const handleChangeForm = (e:any) => {
    
    if(e.target.name == 'method') {
      handleMethodChange(e)
    }
    
    setWmd({
      ...wmd,
      [e.target.name]: e.target.value
    })
  }

  // Withdraw 
  const [withWarning, setWithWarning] = useState(false)

  const withdraw = async () => {
    // showRewardedAd()
    if(wmd.address != '') {

    if(Number(withAmount) - 1 >= Number(totalEarn)) {
      setWithWarning(true)
      
    } else {
      setWithWarning(false)
      SetStLoading(true)
      
      const dt = new Date()
      let y = dt.getFullYear().toString().slice(2,4)
      let m = dt.getMonth() + 1
      let d = dt.getDate()
      let hours:any = dt.getHours()
      let s:any = dt.getMinutes()
      
      let period = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // If hour is 0, set to 12
      hours = String(hours).padStart(2, '0');
      s = String(s).padStart(2, '0');
      
      let date = d+'/'+m+'/'+y+' '+hours+':'+s+' '+period
      // console.log();
      
      
      try {
        const response = await axios.post('https://everybit.space/apis/setWithdraws.php', {
          amount:withAmount,
          method: wmd.method,
          address: wmd.address,
          bank: wmd.bank,
          ifsc: wmd.ifsc,
          user: localStorage.getItem('userId'),
          dt: date
        } );
        
        
        SetStLoading(false)
        if (response.data) {
          fetchJson()
          console.log("Data Found.");
          
        } else {
          console.log("Data Not Found")        
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    
    } else {
      alert('Edit withdraw Method and Information.');
      
    }
  }

  // Function to handle refresh event when pulling down
  const handleRefresh = (event:any) => {
    // Simulate a network request or other async actions
    setTimeout(() => {
      fetchJson()
      event.detail.complete();
    }, 100); // Simulating a 2-second delay for the refresh action
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot='start'>Wallet</IonTitle>
          <IonChip slot='end'>
            <IonLabel color={isOnline ? 'success' : 'danger'}>{isOnline ? 'Online' : 'Offline'}</IonLabel>
            <IonIcon aria-hidden='true' color={isOnline ? 'success' : 'danger'} icon={wifi}></IonIcon>
          </IonChip>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 4</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* Refresh  */}
        <IonRefresher slot="fixed" className='z-50' onIonRefresh={handleRefresh}>
          <IonRefresherContent
            pullingText="Pull to refresh"
            refreshingSpinner="circles"
            refreshingText="Refreshing..."
          />
        </IonRefresher>
        <IonLoading isOpen={stLoading} message={'Loading Data...'} spinner={'circles'} />


        {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg m-3 p-3 max-w-md w-full transition-transform transform">
            <h3 className="text-xl font-semibold mb-4 text-black text-center">Change Withdraw Method</h3>
            <form onSubmit={handleChangeMethod} className="space-y-4 text-black">
              <IonItem color={'medium'}>

                <IonSelect name='method' interface='popover' onIonChange={handleChangeForm} className='text-md' placeholder='Select Method'>
                  <IonSelectOption value={'UPI'}>UPI</IonSelectOption>
                  <IonSelectOption value={'BANK'}>BANK</IonSelectOption>
                  <IonSelectOption value={'PAYPAL'}>PAYPAL</IonSelectOption>
                </IonSelect>
              </IonItem>
              <div>
                {changeMethod == 'BANK' && 
                <>
                  <input required
                      type="text"
                      name='bank'
                      className="w-full mb-2 bg-gray-700 text-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
                      placeholder="Bank Name"
                      onChange={handleChangeForm}
                      />
                  <input required
                      type="text"
                      name='ifsc'
                      className="w-full mb-2 bg-gray-700 text-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
                      placeholder="IFSC Code"
                      onChange={handleChangeForm}
                      />

                  </>
                  }
                  <input required
                    type="text"
                    name='address'
                    onChange={handleChangeForm}
                    className="w-full bg-gray-700 text-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
                    placeholder={changeMethod === 'UPI' ? 'UPI Id or Mobile Number' : (changeMethod == 'BANK' ? 'Account Number' : (changeMethod == 'PAYPAL' ? 'Email Id' : 'Method Address'))}
                    />
              </div>

              <div className='flex justify-evenly'>
                  <button type='button'
                    onClick={onClose}
                    className="bg-red-600 text-white py-2 px-3 rounded-lg hover:bg-red-700 transition"
                  >
                    Close
                  </button>
                  <button type="submit"
                    className="bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition"
                    >
                    Change
                  </button>
                  </div>
            </form>
          </div>
        </div>
      )}
        
        <div className="container mx-auto p-2">
    {/* <!-- Responsive Wallet Component --> */}
    <div className="rounded-lg shadow-lg p-1 max-w-5xl mx-auto">
      
      {/* <!-- Responsive Layout for Large Screens --> */}
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* <!-- Left Section: Total Earnings and Withdraw Options --> */}
        <div>
          {/* <!-- Total Earnings Card --> */}
          <div className="bg-gradient-to-tr from-green-600 to-yellow-400 px-6 py-3 rounded-lg mb-5 shadow-md text-white">
            <h2 className="text-2xl my-1 font-bold">Total Earnings</h2>
            <p className="text-5xl mt-2 font-semibold">&#8377; {totalEarn}</p>
          </div>

          {/* <!-- Withdraw Amount Options --> */}
          <div className="bg-gray-200 p-4 rounded-lg shadow-md">
            <h3 className="text-lg mt-0 font-semibold text-gray-700 mb-4">Select Withdrawal Amount</h3>
            <div className="grid grid-cols-2 gap-4">
              {withItems.map((item:any, index:any) => (
                <button key={'wab'+index} onClick={() => handleWithAmount(item)} className={` bg-gray-500 text-white py-3 rounded-lg text-center font-semibold hover:bg-blue-600 ${withAmount === item ? ' bg-blue-600 rounded-xl ' : ''}`}>&#8377; {item}</button>

              ))}
              {/* <button  onClick={() => handleWithAmount('1000')} className="bg-gray-500 text-white py-3 rounded-lg text-center font-semibold hover:bg-blue-600">&#8377; 1,000</button>
              <button  onClick={() => handleWithAmount('2000')} className="bg-gray-500 text-white py-3 rounded-lg text-center font-semibold hover:bg-blue-600">&#8377; 2,000</button>
              <button  onClick={() => handleWithAmount('5000')} className="bg-gray-500 text-white py-3 rounded-lg text-center font-semibold hover:bg-blue-600">&#8377; 5,000</button>
              <button  onClick={() => handleWithAmount('10000')} className="bg-gray-500 text-white py-3 rounded-lg text-center font-semibold hover:bg-blue-600">&#8377; 10,000</button>
              <button  onClick={() => handleWithAmount('50000')} className="bg-gray-500 text-white py-3 rounded-lg text-center font-semibold hover:bg-blue-600">&#8377; 50,000</button> */}
            </div>
          </div>
        </div>

        {/* <!-- Right Section: Withdraw Button, Information, and Transaction History --> */}
        <div>
          {/* <!-- Withdraw Section --> */}
          <div className="flex flex-col items-start items-center justify-between mb-8">
            

            {/* <!-- Withdraw Information --> */}
            <div className="bg-purple-600 p-3 rounded-lg shadow-md w-full">
              <div className="">
                <div>
                  <h3 className="text-lg text-white mt-2 mb-1 font-semibold ">Withdrawal Method</h3>
                  <p className="text-yellow-200 my-1">{wmd.method}: {wmd.address}</p>
                </div>
              </div>
              <div className='flex justify-end mt-2'>

                <button onClick={() => {setIsOpen(true)}} className='bg-yellow-400 flex items-center px-3 py-1.5 rounded-2xl text-white'>
                  <IonIcon className='mr-1' icon={pencil}></IonIcon>
                  <b>Edit</b>
                </button>
              </div>
            </div>

            {/* <!-- Withdraw Button --> */}
            <button type='button' onClick={withdraw} className="bg-gradient-to-tr from-yellow-400  to-red-300 text-white flex font-bold font-semibold hover:from-green-400 items-center mt-4 px-8 py-3 rounded-lg text-2xl hover:text-purple-900 hover:to-yellow-600 hover:via-blue-100">
              <IonIcon icon={enterOutline} className='mr-2'></IonIcon>
              Withdraw
            </button>
            {withWarning && <p className='mt-2 text-xs text-red-600'>Withdraw amount should be less than Total Balance!</p>}
          </div>


          {/* <!-- Transaction History --> */}
          <div style={{borderTop:'2px solid orange'}}>
            <h3 className="text-xl font-bold mb-4">Transaction History</h3>
            <ul className="space-y-4">
              {yesData && allTrans.slice().reverse().map((item:any,index:any) => (
                  <li key={'wdata'+index} className="bg-green-100 p-3 rounded-lg shadow-sm">
                    <div className='flex justify-between items-center'>
                      <p className="text-gray-700 font-semibold">Withdraw (ID:{item.id})</p>
                      <span className={`px-3 py-1 my-1 text-sm text-white font-semibold rounded-lg ${item.status == 'Approved' ? ' bg-green-400 ' : (item.status == 'Pending' ? ' bg-yellow-400 ' : ' bg-red-400 ')}} `}>{item.status}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-green-600 text-sm">{item.method}: {item.address}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-600 text-sm">{item.dt}</p>
                      <p className="text-green-700 font-bold mr-4">&#8377;{item.amount}</p>
                    </div>
                  </li>    
              ))}
              
            </ul>
          </div>
        </div>

      </div>
    </div>
  </div>


      </IonContent>
    </IonPage>
  );
};

export default Tab3;
