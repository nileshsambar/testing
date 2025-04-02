import { IonBadge, IonChip, IonContent, IonHeader, IonIcon, IonLabel, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import { cashOutline, wallet, wifi } from 'ionicons/icons';
import { useState, useEffect } from 'react';


const Tab3: React.FC = () => {

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
  }, []);

  // Loading 

  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    console.log(loading)
    setLoading(false);
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot='start'>Support Chat</IonTitle>
          <IonChip slot='end'>
            <IonLabel color={isOnline ? 'success' : 'danger'}>{isOnline ? 'Online' : 'Offline'}</IonLabel>
            <IonIcon aria-hidden='true' color={isOnline ? 'success' : 'danger'} icon={wifi}></IonIcon>
          </IonChip>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonLoading isOpen={loading} message={'Loading Chat...'} spinner={'circles'} />
        
        <iframe onLoad={handleLoad} src='https://tawk.to/chat/67062380cec6d0125df3a620/1i9nvlcg1' width={'100%'} height={'100%'} title='everylinks chat'>

        </iframe>

      </IonContent>
    </IonPage>
  );
};

export default Tab3;
