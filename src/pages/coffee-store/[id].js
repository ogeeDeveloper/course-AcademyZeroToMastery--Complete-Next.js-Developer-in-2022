// Hook to read route from the browser URL
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import CoffeeStoreData from "../../utils/coffeeData.json";
import styles from "../../styles/coffee-store.module.css";
import Image from "next/image";
import cls from "classnames";

export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  // const data = CoffeeStoreData
  return {
    props: {
      CoffeeStoredetails: CoffeeStoreData.find((CoffeeStores) => {
        // Returns the first id it gets from thhe dynnamic id in the URL
        return CoffeeStores.id.toString() === params.id;
      }),
    },
  };
}

export async function getStaticPaths() {
  const paths = CoffeeStoreData.map((cofeeStore) => {
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

  const { name, Address, city, imgURL } = CoffeeStoredetails;

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
              src={imgURL}
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
            <p className={styles.text}>{Address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/icons/NearMe.svg" width={24} height={24} alt="" />
            <p className={styles.text}>{city}</p>
          </div>
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
