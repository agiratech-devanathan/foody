import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';


const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  //here implemeted the state fir loading state and set it default as true
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://react-foody-6dbc8-default-rtdb.firebaseio.com/meals.json');
      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      //Once data has fetched then loading state is false where setting
      setIsLoading(false);
    };

    fetchMeals();
  }, []);

  //if it's fetching may delay this loading statement triggered.
  if (isLoading) {
    return <section className={classes.MealsLoading}>
      <p>Loading...</p>
    </section>
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (<section className={classes.meals}>
    <Card>
      <ul>
        {mealsList}
      </ul>
    </Card>


  </section>)
}

export default AvailableMeals;