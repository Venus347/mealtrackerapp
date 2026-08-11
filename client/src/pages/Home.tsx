import {
  IonButton,
  IonCard,
  IonCardContent,
  IonText,
   IonContent, 
   IonHeader,
    IonPage, 
    IonTitle, 
    IonToolbar }
     from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import healthyFood from "../assets/healthy-food.jpg";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success"> 
          <IonTitle>NutriBloom</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding"> 
        <IonCard>
          <IonCardContent>

            {/* Healthy Food Image */}

            <img
            src={healthyFood}
            alt="Healthy Food"
            className="hero-image"
            />

            {/*Dashbord Title */}

            <h1>Today's Nutrion</h1>

            <h2>Track Your Meal</h2>
            
            <IonText>
              <p>
                Keep track of your meals and monitor 
                your daily nutrition in one place.
              </p>
            </IonText>
            /*Nutrition Summary */
              <div className="nutrition-summary">

              <div className="nutrition-item">
                <h3>1,250</h3>
                <p>Calories</p>
              </div>

               <div className="nutrition-item">
                <h3>65g</h3>
                <p>Protein</p>
               </div>

                <div className="nutrition-item">
                  <h3>140g</h3>
                  <p>Carbs</p>
                </div>

                 <div className="nutrition-item">
                  <h3>40g</h3>
                  <p>Fat</p>

                 </div>

            </div>

            {/*Buttons */}
            <IonButton
            expand="block"
            color="success"
            routerLink="/add-meal"
            >
              + Add Meal
            
            </IonButton>

            <IonButton
             expand="block" 
                      
             color="success"
              fill="outline"
              routerLink="/meal.history"
              >
                View Meal History
            </IonButton>

          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
