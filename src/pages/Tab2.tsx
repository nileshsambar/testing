import { IonAlert, IonButton, IonCard, IonChip, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonLoading, IonPage, IonRefresher, IonRefresherContent, IonSearchbar, IonSegment, IonSegmentButton, IonTabButton, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { calendar, cashOutline, eye, link, pencil, refresh, search, trash, wifi } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Clipboard } from '@capacitor/clipboard';
import { AdMob, InterstitialAdPluginEvents, RewardAdOptions } from '@capacitor-community/admob';

const Tab2: React.FC = () => {

  // State to store the selected segment value
  const [selectedSegment, setSelectedSegment] = useState('all');

  // Handler to capture changes in the segment selection
  const handleSegmentChange = (e:any) => {
    setSelectedSegment(e.detail.value); // Get the selected value
  };

  const [allLinks, setAllLinks] = useState([])
  const [delLinks, setDelLinks] = useState([])

  const [err, setErr] = useState(false);

  // get all links and deleted links also
  const fetchJson = async () => {
    SetStLoading(true)
    try {
      const response = await axios.post('https://everybit.space/apis/getLinks.php', {user:localStorage.getItem('userId')});
      const aLinks:any = []
      const dLinks:any = []
      SetStLoading(false)
      if (response.data) {
        const all = response.data.all
        
        all.forEach((l:any) => {
          if(l.del == 0) {
            aLinks.push(l)
          } else {
            dLinks.push(l)
          }
        });
        setAllLinks(aLinks)
        setDelLinks(dLinks)
        console.log(aLinks);
        
        
      } else {
        console.log("Data Not Fount.") 
      }
    } catch (error) {
      setErr(true)
    }
  }

    // check online 
    const [isOnline, setIsOnline] = useState(navigator.onLine);

// Admob Testing

// const [isRewardAdLoaded, setIsRewardAdLoaded] = useState(false);

// const loadRewardedAd = async () => {
//   try {
//     const options: RewardAdOptions = {
//       adId: 'ca-app-pub-3123067468107790/4133932183',  // Test Rewarded Ad ID
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
//       adId: 'ca-app-pub-3123067468107790/8050731125',  // Test Interstitial Ad ID
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

  // loadings here
  const [stLoading, SetStLoading] = useState(false)

  // alert here
  const [openAlert, setOpenAlert] = useState(false)
  const [alertLink, setAlertLink] = useState('')
  const [alertOlink, setAlertOlink] = useState('')
  const [linkValue, setlinkValue] = useState('')

  const handleButtonClick = (link:any, org:any) => {
    setlinkValue('')
    setOpenAlert(true)
    setAlertLink(link)
    setAlertOlink(org)
  }

  const [deleteAlert, setDeleteAlert] = useState(false)
  const [pt, setPt] = useState('')

  const handleDeleteClick = (link:any, org:any, pt:any) => {
    
    switch (pt) {
      case 't':
        setPt('Temporary Delete')
        break;
      case 'p':
        setPt('Permanent Delete')
        break;
      case 'r':
        setPt('Restore Link')
        break;
    
      default:
        break;
    }
    
    setDeleteAlert(true)
    setAlertLink(link)
    setAlertOlink(org)
  }

  // Toast
  
  const [present] = useIonToast()

  const toast = async (copy:any) => {
    await Clipboard.write({
      string: copy
    })
    // navigator.clipboard.writeText(copy)
    present({
      message: 'Copied: '+copy,
      duration: 100
    })
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
          <IonTitle slot='start'>Links</IonTitle>
          <IonChip slot='end'>
            <IonLabel color={isOnline ? 'success' : 'danger'}>{isOnline ? 'Online' : 'Offline'}</IonLabel>
            <IonIcon aria-hidden='true' color={isOnline ? 'success' : 'danger'} icon={wifi}></IonIcon>
          </IonChip>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle>Tab 2</IonTitle>
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
        <IonLoading isOpen={stLoading} message={'Please Wait...'} spinner={'circles'} />
        
      {/* Edit link Alert */}
      <IonAlert
        isOpen={openAlert}
        onDidDismiss={() => setOpenAlert(false)}
        header="Change Original Link"
        buttons={
          [{
            text:'Close',
            handler: (data) => {
              
              setOpenAlert(false)
            }
          },
        {
          text:'Change',
          handler: async (data) => {
            console.log(linkValue)
            // showRewardedAd()
            setOpenAlert(false)
            try {
              const res = await axios.post('https://everybit.space/apis/changeLinks.php', {link:data.link, change:data.change});

              if (res.data) {
                  fetchJson();                
                  
                } else {
                  console.log("Data Not Found.")        
                }
              } catch (error) {
                console.error('Error:', error);
              }
              
          }
          
        }]
        }
        inputs={[
          {
            disabled: true,
            name: 'link',
            value: alertLink
          },
          {
            disabled: true,
            name: 'org',
            value: alertOlink
          },
          {
            placeholder: 'New Link',
            name: 'change',
            value: linkValue
          }
        ]}
      ></IonAlert>

{/* Delete link Alert */}
<IonAlert
        isOpen={deleteAlert}
        onDidDismiss={() => setDeleteAlert(false)}
        header={'Are you sure?'}
        buttons={
          [{
            text:'Cancel',
            role:'cancel',
            handler: () => {
              setDeleteAlert(false)
            }
          },
        {
          text:'Delete',
          handler: async (data) => {
            // showInterstitialAd()
            setDeleteAlert(false)
            try {
              const res = await axios.post('https://everybit.space/apis/deleteLinks.php', {link:data.link, pt: data.pt});

              if (res.data) {
                  
                  fetchJson();                
                  
                } else {
                  console.log("Data Not Found.")        
                }
              } catch (error) {
                console.error('Error:', error);
              }
          }
          
        }]
        }
        inputs={[
          {
            disabled: true,
            name: 'link',
            value: alertLink
          },
          {
            disabled: true,
            name: 'org',
            value: alertOlink
          },
          {
            disabled: true,
            name: 'pt',
            value: pt,
            attributes: {
              style: { color: 'orange', fontWeight: 'bold' }, // Change text color
            }
          }
        ]}
      ></IonAlert>


        <IonSegment color={'success'} value={selectedSegment} onIonChange={handleSegmentChange}>
          <IonSegmentButton value="all">
            <IonLabel>All Links</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="delete">
            <IonLabel>Deleted Links</IonLabel>
          </IonSegmentButton>
        </IonSegment>



        {/* Display different content based on selected segment */}
        {selectedSegment === 'all' &&
          <> {err && <>No links shorted yet. <b>Short Now in Dashboard Tab.</b></>}
            {allLinks.slice().reverse().map((e:any, index:any) => (
              <IonCard  key={'e'+index} className='allCard my-5'>
              <div className='flex items-center justify-around my-1 border-b border-blue-700'>
                <div className='flex items-center text-green-400'>
                  <IonIcon className='mr-1' icon={eye}></IonIcon>
                  <b>{e.views}</b>
                </div>
                <div className='flex items-center text-red-400'>
                  <IonIcon className='mr-0.5' icon={calendar}></IonIcon>
                  {e.dt}
                </div>
                <div className='text-blue-400'>
                  &#8377; {(e.views * 0.4).toFixed(2)}
                </div>
              </div>
              <div>
                {/* Link shoted  */}
                <div className="m-2">
                    <div className="relative">
                        <input value={"https://everybit.space/blog/link/"+e.link} type="url" className="col-span-6 border border-gray-300 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500 font-bold text-sm rounded-lg block w-full p-2.5 " disabled />
                        <button onClick={() => toast("https://everybit.space/blog/link/"+e.link)} className="-translate-y-1/2 absolute bg-indigo-800 hover:bg-indigo-700  inline-flex items-center justify-center p-2 right-2 rounded-lg  top-1.5">
                            <span id="default-icon">
                                <svg className="w-3.5 h-3.5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
                                </svg>
                            </span>
                        </button>
                             
                    </div>
                </div>

                {/* original link  */}
                <div className="m-2">
                    <div className="relative">
                        <input value={e.original} type="url" className="col-span-6 border border-gray-300 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500 font-bold text-sm rounded-lg block w-full p-2.5 " disabled />
                        <button  onClick={() => toast(e.original)} className="-translate-y-1/2 absolute bg-indigo-800 hover:bg-indigo-700  inline-flex items-center justify-center p-2 right-2 rounded-lg  top-1.5">
                            <span id="default-icon">
                                <svg className="w-3.5 h-3.5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
                                </svg>
                            </span>
                        </button>
                             
                    </div>
                </div>

                {/* Action buttons */}
                <div className='flex items-center justify-evenly m-2'>
                  <button onClick={() => handleButtonClick(e.link, e.original)} className='bg-indigo-700 flex items-center px-3 py-1.5 rounded-2xl text-white'>
                    <IonIcon className='mr-1' icon={pencil}></IonIcon>
                    <b>Edit</b>
                  </button>
                  <button onClick={() => handleDeleteClick(e.link, e.original, 't')} className='bg-red-600 flex items-center px-3 py-1.5 rounded-2xl text-white'>
                    <IonIcon className='mr-1' icon={trash}></IonIcon>
                    <b>Delete</b>
                  </button>
                </div>
              </div>
            </IonCard>
            ))}
            
          </>
        }
        {selectedSegment === 'delete' && 
        <> {err && <>No links shorted yet. <b>Short Now in Dashboard Tab.</b></>}
          {delLinks.slice().reverse().map((d:any, index:any) => (
            <IonCard key={'d'+index} className='deletedCard my-5'>
            <div className='flex items-center justify-around my-1 border-b border-purple-400'>
              <div className='flex items-center text-green-400'>
                <IonIcon className='mr-1' icon={eye}></IonIcon>
                <b>{d.views}</b>
              </div>
              <div className='flex items-center text-red-400'>
                <IonIcon className='mr-0.5' icon={calendar}></IonIcon>
                {d.dt}
              </div>
              <div className='text-blue-400'>
                &#8377; {(d.views * 0.4).toFixed(2)}
              </div>
            </div>
            <div>
              {/* Link shoted  */}
              <div className="m-2">
                  <div className="relative">
                      <input value={"https://everybit.space/blog/link/"+d.link} type="url" className="col-span-6 border border-gray-300 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500 font-bold text-sm rounded-lg block w-full p-2.5 " disabled />
                      <button onClick={() => toast("https://everybit.space/blog/link/"+d.link)} className="-translate-y-1/2 absolute bg-indigo-800 hover:bg-indigo-700  inline-flex items-center justify-center p-2 right-2 rounded-lg  top-1.5">
                          <span id="default-icon">
                              <svg className="w-3.5 h-3.5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                  <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
                              </svg>
                          </span>
                      </button>
                           
                  </div>
              </div>

              {/* original link  */}
              <div className="m-2">
                  <div className="relative">
                      <input value={d.original} type="url" className="col-span-6 border border-gray-300 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500 font-bold text-sm rounded-lg block w-full p-2.5 " disabled />
                      <button onClick={() => toast(d.original)} className="-translate-y-1/2 absolute bg-indigo-800 hover:bg-indigo-700  inline-flex items-center justify-center p-2 right-2 rounded-lg  top-1.5">
                          <span id="default-icon">
                              <svg className="w-3.5 h-3.5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                  <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
                              </svg>
                          </span>
                      </button>
                           
                  </div>
              </div>

              {/* Action buttons */}
              <div className='flex items-center justify-evenly m-2'>
                <button onClick={() => handleButtonClick(d.link, d.original)} className='bg-indigo-700 flex items-center px-3 py-1.5 rounded-2xl text-white'>
                  <IonIcon className='mr-1' icon={pencil}></IonIcon>
                  <b>Edit</b>
                </button>
                <button onClick={() => handleDeleteClick(d.link, d.original, 'r')} className='bg-yellow-600 flex items-center px-3 py-1.5 rounded-2xl text-white'>
                  <IonIcon className='mr-1' icon={refresh}></IonIcon>
                  Restore
                </button>
                <button onClick={() => handleDeleteClick(d.link, d.original, 'p')} className='bg-red-600 flex items-center px-3 py-1.5 rounded-2xl text-white'>
                  <IonIcon className='mr-1' icon={trash}></IonIcon>
                  Delete
                </button>
              </div>
            </div>
          </IonCard>
          ))}
          

            
        </>
        }
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
