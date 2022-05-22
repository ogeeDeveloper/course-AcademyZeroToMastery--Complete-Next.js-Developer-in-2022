// Hook to read route from the browser URL
import { useRouter } from "next/router";

import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/coffee-store.module.css";
import Image from "next/image";
import cls from "classnames";
import { FetchCoffeeStore } from "../../lib/coffee-stores";

export async function getStaticProps(staticProps) {
  const params = staticProps.params;

  // Retrieve the coffee stores
  const coffeeStore = await FetchCoffeeStore()
  // const data = CoffeeStoreData
  return {
    props: {
      // Find the coffee store based on the ID that was in the URL param
      CoffeeStoredetails: coffeeStore.find((CoffeeStores) => {
        // Returns the first id it gets from thhe dynnamic id in the URL
        return CoffeeStores.id.toString() === params.id;
      }),
    },
  };
}

export async function getStaticPaths() {
  // Retrieve the coffee stores
  const coffeeStore = await FetchCoffeeStore()
  const paths = coffeeStore.map((cofeeStore) => {
    return {
      params: {
        id: cofeeStore.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = ({ CoffeeStoredetails }) => {
  const router = useRouter(); // This is a object that has a lot of values such as the 'id' from query
  const { id } = router.query;

  console.log("store:", CoffeeStoredetails);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { name, address, neighborhood, imgURL } = CoffeeStoredetails;

  const handlUpvoteBtn = () => {
    console.log("Button to handle upvoting");
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>


      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>Back to Home</a>
            </Link>
          </div>
          <div className={styles.storeNameWrapper}>
            <h1 className={styles.storeName}>{name}</h1>
          </div>
          <dic className={styles.storeImgWrapper}>
            <Image
              src={imgURL || "https://images.unsplash.com/photo-1504627298434-2119d6928e93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"}
              width={600}
              height={360}
              alt={name}
              className={styles.storeImage}
            />
          </dic>
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src="/icons/places.svg" width={24} height={24} alt="" />
            <p className={styles.text}>{address}</p>
          </div>
          {neighborhood &&
            <div className={styles.iconWrapper}>
            <Image src="/icons/NearMe.svg" width={24} height={24} alt="" />
            <p className={styles.text}>{neighborhood}</p>
          </div>
          }
          <div className={styles.iconWrapper}>
            <Image src="/icons/star.svg" width={24} height={24} alt="" />
            <p className={styles.text}>10</p>
          </div>

          <button className={styles.upvoteBtn} onClick={handlUpvoteBtn}>
            Up Vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
