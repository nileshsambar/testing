import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonButton, IonChip, IonHeader, IonIcon, IonLabel, IonTitle, IonToolbar, IonInput, IonList, IonItem } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { wifi } from 'ionicons/icons';
import { App } from '@capacitor/app';

const Jpgpdf: React.FC = () => {
  const history = useHistory();

    // check online 
    const [isOnline, setIsOnline] = useState(navigator.onLine);

  
  
    useEffect(() => {

    const backButtonListener:any = App.addListener('backButton', (event:any) => {
        history.push('/tab1')
    });
  
  
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
        App.removeAllListeners()
        
  
      }
      
    },[])

// 
    const [imageArray, setImageArray]:any = useState([])

// Add images
    const addImages = () => {
        document.getElementById('image-input')?.click()
    }

    const addedImages = (e:any) => {
        e.preventDefault()
        console.log(e.target.files[0]);
        
        setImageArray((p:any) => [...p, ...e.target.files])
        
    }
  
  return (
    <IonPage>

        {/* Jspdf = jpg to pdf */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>


        <IonHeader>
        <IonToolbar className='ion-align-items-center'>
          <IonTitle slot='start'>
              Jpg to Pdf
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
{/* pdf Card  */}
        <div id="pdfCard" className="m-auto text-black text-center p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">JPG TO PDF</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Convert JPG images to PDF, also adjust orientation and Paper Size.</p>
           
            <form encType="multipart/form-data" id="file-form-submit">
                <input onChange={addedImages} hidden type="file" name="image[]" id="image-input" multiple />
            </form>

            <div>
                progress bar here
            </div>
        </div> 
<br />
        <hr className='bg-gray-400' />

{/* buttons to mod  */}
        <div id="pdfButton" className="select-none flex flex-wrap items-center justify-evenly py-3">
            <button onClick={addImages} className="my-2 py-1 bg-gradient-to-br font-medium from-green-500 group group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white inline-flex items-center justify-center p-0.5 relative rounded-lg text-gray-900 text-sm to-blue-500">
                <svg className='h-6 m-1' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>

                <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                    Add Images
                </span>
            </button>

            <button className="my-2 py-1 bg-gradient-to-br font-medium from-pink-500 to-red-500 group group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white inline-flex items-center justify-center p-0.5 relative rounded-lg text-gray-900 text-sm">
                <svg className='h-6 m-1' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                </svg>


                <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                    Remove All
                </span>
            </button>
            
            
            <a className="my-2 py-1 cursor-pointer bg-gradient-to-br font-medium from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 group hover:text-white inline-flex items-center justify-center p-0.5 relative rounded-lg text-gray-900 text-sm">
                <svg className='h-6 m-1' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                
                
                <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                    Download PDF
                </span>
            </a>
        </div>

        <div className='flex flex-row flex-wrap items-center justify-evenly mt-2'>
            {imageArray.map((item:any, index:any) => (

                <div key={'imagearray'+index} draggable="true" className="dragAll bg-white rounded-xl border-2 border-green-600 cursor-move flex h-48 hover:border-black items-center justify-center m-3 relative w-48" id="item1">
                    <img id={'item'+index} className="image-all image-w object-contain transform h-full w-full" draggable="false" alt="File Type Not Supporting" />
                    {/* <!-- delete btn -->  */}
                    <button className="absolute border-2 hover:border-black bg-red-600 cursor-pointer delete-btn right-1 rounded-full top-1 w-1/6 z-10">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="delete-svg text-white">
                            <path className="delete-svg" stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                    {/* <!-- Copy btn -->  */}
                    <button className="absolute p-1 border-2 hover:border-black bg-green-600 cursor-pointer copy-svg right-10 rounded-full top-1 w-1/6 z-10">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="copy-svg text-white">
                            <path className="copy-svg" stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                        </svg>
                    </button>
                    {/* <!-- rotate Right btn --> */}
                    <button className="absolute bg-blue-600 p-1 cursor-pointer rotate-btn left-10 rounded-full top-1 w-1/6 z-10 border-2 hover:border-blue-800">
                        <svg className="rotate-btn text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path className="rotate-btn" stroke-linecap="round" stroke-linejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
                        </svg>
                    </button>
                    {/* <!-- rotate Left btn --> */}
                    <button className="absolute bg-blue-600 p-1 cursor-pointer rotatel-btn left-1 rounded-full top-1 w-1/6 z-10 border-2 hover:border-blue-800">
                        <svg className="rotatel-btn text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path className="rotatel-btn" stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>
                    </button>
                    <b draggable="false" className="absolute bg-white bottom-1 filename opacity-70 pl-1.5 text-black text-center truncate w-full">{item.name}</b>
                </div>
            ))}
        </div>

        <IonList>
            
        </IonList>



        <IonButton onClick={() => history.push('/tab1')}>Back to Grid</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Jpgpdf;
