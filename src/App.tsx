import { Redirect, Route } from 'react-router-dom';

import {
  IonApp,
  IonBadge,
  IonButton,
  IonContent,
  IonIcon,
  IonLabel,
  IonModal,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { link, grid, people, wallet, settings, chatbox, chatboxEllipses, wifi, homeOutline, home, search, bag, colorPalette } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Tab4 from './pages/Tab4';
import Tab5 from './pages/Tab5';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Register from './pages/Register';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Mergepdf from './pages/every/mergepdf';
import Jpgpdf from './pages/every/jpgpdf';


setupIonicReact();


const App: React.FC = () => {

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showModal, setShowModal] = useState(!navigator.onLine);

  // Check network status and handle modal visibility
  useEffect(() => {
    const handleNetworkChange = () => {
      setIsOnline(navigator.onLine);
      setShowModal(!navigator.onLine);
      
    };

    // Add event listeners for network changes
    window.addEventListener('online', handleNetworkChange);
    window.addEventListener('offline', handleNetworkChange);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener('online', handleNetworkChange);
      window.removeEventListener('offline', handleNetworkChange);
    };
  }, []);

  // Retry button to recheck network status
  const handleRetry = () => {
    setIsOnline(navigator.onLine);
    setShowModal(!navigator.onLine);
  };
  
return(
  <IonApp>

    <IonReactRouter>

      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tab1" >
            <Tab1 />
          </Route>
          <Route exact path="/tab1/jpgpdf" >
            <Jpgpdf />
          </Route>
          <Route exact path="/tab1/mergepdf" >
            <Mergepdf />
          </Route>

          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route>
          <Route path="/tab4">
            <Tab4 />
          </Route>
          <Route path="/tab5">
            <Tab5 />
          </Route>
          <Route exact path="/">
            <Redirect to="/tab1" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon aria-hidden="true" icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon aria-hidden="true" icon={grid} />
            <IonLabel>Category</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon aria-hidden="true" icon={search} />
            <IonLabel>Search</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab4" href="/tab4">
            <IonIcon aria-hidden="true" icon={colorPalette} />
            <IonLabel>Arts</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab5" href="/tab5">
          <IonBadge color={"success"}>3</IonBadge>
            <IonIcon aria-hidden="true" icon={bag} />
            <IonLabel>Basket</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
    
    
      {/* Internet Status Modal */}
      <IonModal isOpen={showModal}>
        <IonContent className="flex justify-center items-center ion-padding ion-text-center">
          <div  style={{margin:'0',height:'100%'}}>

            <div className='flex justify-center flex-col text-center'>
              <h1 className="no-internet-text text-red-400">
                <IonIcon icon={wifi} className='mr-2' color='danger'></IonIcon>
                  No Internet Connection</h1>
              <p>Please check your internet connection and try again.</p>
              <IonButton className='text-white' expand="block" onClick={handleRetry}>
                Retry
              </IonButton>
            </div>
          </div>
        </IonContent>
      </IonModal>
  </IonApp>
);
}

export default App;
