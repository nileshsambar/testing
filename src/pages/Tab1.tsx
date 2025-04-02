import { IonAlert, IonBadge, IonButton, IonCard, IonCardHeader, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonLoading, IonPage, IonProgressBar, IonRefresher, IonRefresherContent, IonRouterOutlet, IonRow, IonSelect, IonSelectOption, IonTitle, IonToast, IonToolbar, useIonToast } from '@ionic/react';
import './Tab1.css';
import { addOutline, cashOutline, closeCircleOutline, eye, gitMerge, heartOutline, home, images, link, removeOutline, repeat, wifi} from 'ionicons/icons';
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import { AdMob, BannerAdSize, InterstitialAdPluginEvents, RewardAdOptions } from '@capacitor-community/admob';
import { App } from '@capacitor/app';

import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';
import * as monaco from 'monaco-editor';

const Tab1: React.FC = () => {

  const [quantity, setQuantity] = useState<number>(0);


  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    kiwi: 0,
    apple: 0,
  });

  const updateQuantity = (key: string, change: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [key]: Math.max(0, (prevQuantities[key] || 0) + change),
    }));
  };

  const products = [
    { id: 'kiwi', name: 'Thumbs Up', price: 50, img: 'https://www.jiomart.com/images/product/original/491297310/thums-up-250-ml-product-images-o491297310-p491297310-0-202412121933.jpg' },
    { id: 'apple', name: 'Sprite', price: 40, img: 'https://gharstuff.com/wp-content/uploads/2018/03/Sprite3.jpg' },
    { id: 'banana', name: 'Uncle Chipps', price: 5, img: 'https://gharstuff.com/wp-content/uploads/2020/06/Uncle-Chipps-Spicy-Treat-Chips-55g.jpg' },
    { id: 'mango', name: 'Lays chips', price: 10, img: 'https://www.jiomart.com/images/product/original/490000331/lay-s-india-s-magic-masala-potato-chips-40-g-product-images-o490000331-p490000331-0-202410251815.jpg?im=Resize=(420,420)' },
  ];


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className='ion-align-items-center'>
          <IonTitle slot='start'>
              YJ Shops
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>



        <IonGrid className='ion-no-padding'>
          <IonRow>
            {products.map((product) => (
              <IonCol size="6" sizeSm="6" sizeMd="4" sizeLg="3" key={product.id}>
                <IonCard style={{ padding: '5px', position: 'relative' }}>
                  
                  <img
                    src={product.img}
                    alt={product.name}
                    style={{ width: '100%', borderRadius: '10px' }}
                  />
                  <h6>{product.name}</h6>
                  <p>₹{product.price}</p>
                  <IonButton expand="block" color="warning">
                    ADD
                  </IonButton>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>





<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          {/* Card 1 */}
          <IonCard style={{ width: '45%', padding: '10px', position: 'relative' }}>
            <IonIcon icon={heartOutline} style={{ position: 'absolute', top: '10px', right: '10px', color: 'gray' }} />
            <img
              src="https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg" // Replace with the Kiwi image URL
              alt="Kiwi"
              style={{ width: '100%', borderRadius: '10px' }}
            />
            <h3>Kiwi Fruit</h3>
            <p>₹160</p>
            <IonButton expand="block" color="warning">
              ADD
            </IonButton>
          </IonCard>

          {/* Card 2 */}
          <IonCard style={{ width: '45%', padding: '10px', position: 'relative' }}>
            <IonIcon icon={heartOutline} style={{ position: 'absolute', top: '10px', right: '10px', color: 'gray' }} />
            <img
              src="https://via.placeholder.com/150" // Replace with the Apple image URL
              alt="Apple"
              style={{ width: '100%', borderRadius: '10px' }}
            />
            <h3>Apple</h3>
            <p>₹75</p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
              <IonButton size="small" onClick={() => setQuantity(quantity > 0 ? quantity - 1 : 0)}>
                <IonIcon icon={removeOutline} />
              </IonButton>
              <p style={{ margin: '0', fontWeight: 'bold' }}>{quantity}</p>
              <IonButton size="small" onClick={() => setQuantity(quantity + 1)}>
                <IonIcon icon={addOutline} />
              </IonButton>
            </div>
          </IonCard>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Tab1;
