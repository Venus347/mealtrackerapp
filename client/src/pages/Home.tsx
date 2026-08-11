import {
  IonButton,
  IonCard,
  IonCardContent,
  IonText,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Home.css';
import healthyFood from '../assets/healthy-food.jpg';

const Home: React.FC = () => {
  const history = useHistory();

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

            <IonButton expand="block" color="success" onClick={() => history.push('/intake')}>
              Start Assessment
            </IonButton>

            <IonButton expand="block" color="success" onClick={() => history.push('/day-meals')}>
              My Day Meals
            </IonButton>

          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
