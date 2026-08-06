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
        <IonToolbar>
          <IonTitle>NutriBloom</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding"> 
        <IonCard>
          <IonCardContent>

            <img
            src={healthyFood}
            alt="Healthy Food"
            className="hero-image"
            />

            <h1>NutriBloom</h1>

            <h2>Eat Smarter, Not Less</h2>
            
            <IonText>
              <p>
                Calculate your BMI, track your nutrition, 
                and receive personalized diet 
                recommendations to support a healthier lifestyle.
              </p>
            </IonText>

            <IonButton expand="block" color="success">
              Start Assesment 
            </IonButton>

            <IonButton expand="block" color="success">
              My Health Dashboard
            </IonButton>

          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
