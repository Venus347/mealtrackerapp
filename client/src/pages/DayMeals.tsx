import React from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

const meals = [
  { title: 'Breakfast', description: 'Greek yogurt, berries, and granola' },
  { title: 'Lunch', description: 'Grilled chicken wrap with mixed greens' },
  { title: 'Dinner', description: 'Salmon, quinoa, and roasted vegetables' },
  { title: 'Snack', description: 'Apple slices with almond butter' },
];

const DayMeals: React.FC = () => {
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
            <h1>Today's Meals</h1>
            <p>Plan your meals for the day and stay on track with your goals.</p>

            <IonList>
              {meals.map((meal) => (
                <IonItem key={meal.title} lines="full">
                  <IonLabel>
                    <h2>{meal.title}</h2>
                    <p>{meal.description}</p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>

            <IonButton expand="block" color="success">
              Save Day Plan
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default DayMeals;
