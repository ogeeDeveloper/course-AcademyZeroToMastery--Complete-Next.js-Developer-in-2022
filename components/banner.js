import style from '../styles/Banner.module.css'
const Banner = ({buttonText,onButtonHandler}) => {
    return (
        <div className={style.container}>
           <h1 className={style.title}><span className={style.title_one}>CofeeShop</span> <span className={style.title_two}>Recon</span></h1>
           <p className={style.sub_title}>Find the best cofee shop in your area</p>
           <button className={style.button} onClick={onButtonHandler}>{buttonText}</button>
        </div>
    )
}

export default Banner
