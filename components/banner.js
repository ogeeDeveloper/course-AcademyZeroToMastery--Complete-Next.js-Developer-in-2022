import classes from '../styles/Banner.module.css'
const Banner = ({buttonText,onButtonHandler}) => {
    return (
        <div className={classes.container}>
           <h1 className={classes.title}><span className={classes.title_one}>CofeeShop</span> <span className={classes.title_two}>Recon</span></h1>
           <p className={classes.subtitle}>Find the best cofee shop in your area</p>
           <div className={classes.buttonWrapper}>
            <button className={classes.button} onClick={onButtonHandler}>{buttonText}</button>
           </div>
           
        </div>
    )
}

export default Banner
