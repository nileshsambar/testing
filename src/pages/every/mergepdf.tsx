import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonButton, IonChip, IonHeader, IonIcon, IonLabel, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { wifi } from 'ionicons/icons';

const Mergepdf: React.FC = () => {
  const history = useHistory();

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
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className='ion-align-items-center'>
          <IonTitle slot='start'>
              Merge Pdf
          </IonTitle>

          <IonChip slot='end'>
            <IonLabel color={isOnline ? 'success' : 'danger'}>{isOnline ? 'Online' : 'Offline'}</IonLabel>
            <IonIcon aria-hidden='true' color={isOnline ? 'success' : 'danger'} icon={wifi}></IonIcon>
          </IonChip>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding' fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>

        <h1>Details of Card 1</h1>
        <p>This is the content for Card 1.</p>
        <IonButton onClick={() => history.push('/tab1')}>Back to Grid</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Mergepdf;
