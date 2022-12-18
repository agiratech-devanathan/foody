import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';


const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);

  //here implemeted the state fir loading state and set it default as true
  const [isLoading, setIsLoading] = useState(true);

  //Another state for display error
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://react-foody-6dbc8-default-rtdb.firebaseio.com/meals.json');

      //here we checking response it is ok or not not means shoing the error
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

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

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });

    fetchMeals();
  }, []);

  //if it's fetching may delay this loading statement triggered.
  if (isLoading) {
    return <section className={classes.MealsLoading}>
      <p>Loading...</p>
    </section>
  }

  //to display http error message
  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
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