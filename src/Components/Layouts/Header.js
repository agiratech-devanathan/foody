import { Fragment } from "react"
import mealImage from '../../assests/meals.jpg'
import classes from './Header.module.css'
import HeaderCarButton from "./HeaderCartButton"
const Header = (props) => {
    return <Fragment>
        <header className={classes.header}>
            <h1>React Meals</h1>
            <HeaderCarButton onClick={props.onShowCart}/>
        </header>
        <div className={classes['main-image']}>
            <img src={mealImage} alt=' a table full f delicious food!...' />
        </div>
    </Fragment>
}

export default Header;