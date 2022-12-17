import { useContext, useEffect, useState } from "react"
import CartContext from "../../Store/cart-context"
import CartIcon from "../Cart/CartIcon"
import classes from "./HeaderCartButton.module.css"

const HeaderCarButton = (props) => {

    const [btnHighLighted, setBtnIsHighLighted]=useState(false);
    const cartCtx=useContext(CartContext);

    console.log(cartCtx)
    const {items}=cartCtx;
    const numberOfCartItems=items.reduce((curNumber,item)=>{
        return curNumber+item.amount;
    },0);

const btnClasses=`${classes.button} ${btnHighLighted? classes.bump:''}`;

useEffect(()=>{
    if(items.length===0){
        return;
    }
    setBtnIsHighLighted(true);

   const timer= setTimeout(() => {
        setBtnIsHighLighted(false);
    }, 300);

    return()=>{
        clearTimeout(timer);
    }
},[items]);

    console.log(numberOfCartItems)
    
    return (<button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}><CartIcon /></span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>)
}
export default HeaderCarButton;