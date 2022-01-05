import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/banner'
import Card from '../components/UI/card'
import CoffeeStore from '../utils/coffeeData.json'
import styles from '../styles/Home.module.css'

export default function Home() {
  const HadleOnBanerButtonHandler = event=>{
    console.log('Button Clicked')
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffe Shop Finder</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner buttonText="View Stores nearby" onButtonHandler={HadleOnBanerButtonHandler}/>
        <div className={styles.heroImage}>
          <Image src="/static/Header-Image.png" width={700} height={400} alt='The Header image'/>
        </div>
        <div className={styles.cardLayout}>
          {CoffeeStore.map(coffeeData=>{
            <Card 
              className={styles.card} 
              title={coffeeData.name} 
              imageUrl={coffeeData.imgURL} 
              href={`/coffee-store/${coffeeData.id}`}/>
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        
      </footer>
    </div>
  )
}