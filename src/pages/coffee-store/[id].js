import { useContext, useEffect, useState } from "react";
// Hook to read route from the browser URL
import { useRouter } from "next/router";
import useSWR from "swr"

import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/coffee-store.module.css";
import Image from "next/image";
import cls from "classnames";
import { FetchCoffeeStore } from "../../lib/coffee-stores";
import { StoreContext } from "../../store/store-context";
import { isEmpty } from "../../utils";

export const fetcher = (url) => fetch(url).then((res) => res.json());

export async function getStaticProps(staticProps) {
  const params = staticProps.params;

  // Retrieve the coffee stores
  const coffeeStore = await FetchCoffeeStore()
  // const data = CoffeeStoreData
  const findCoffeeStoreByID = coffeeStore.find((CoffeeStores) => {
    // Returns the first id it gets from thhe dynnamic id in the URL
    return CoffeeStores.id.toString() === params.id;
  })
  return {
    props: {
      // Find the coffee store based on the ID that was in the URL param
      // Set of IDs to be pre-rendered
      CoffeeStoredetails: findCoffeeStoreByID ? findCoffeeStoreByID : {},
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

// Its a great convention to call anythings that is get called from getStaticProps as "initialProps"
const CoffeeStore = (initialProps) => {
  const router = useRouter(); // This is a object that has a lot of values such as the 'id' from query
  // const { id } = router.query;


  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  console.log("Coffee store from initial props:", initialProps.CoffeeStoredetails);

  const [newCoffeeStore, setNewCoffeeStore] = useState(initialProps.CoffeeStoredetails)

  // Get the ID from the URL
  const id = router.query.id

  // Fetch the coffee stores that is stored in the Store Context
  const {
    state: {
      coffeeStores
    },
  } = useContext(StoreContext)

  // Fetch coffee store and store the data
  const handleCreateCoffeeStore = async(coffeeStore)=>{
    try{
      // Pass in the data
      const {ID,name,address,neighborhood,voting,imageURL} = coffeeStore 

      // Fetch the API
      const response = await fetch("/api/createCoffeeStore",{
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({ID: `${id}`,name,address: address || "",neighborhood: neighborhood || "",voting:0, imageURL})
      })
      const dbCoffeeStore = response.json()
      console.log({dbCoffeeStore})
    }catch(err){
      console.error("Error while creating coffee store", err)
    }
  }

  useEffect(()=>{
    if(isEmpty(initialProps.CoffeeStoredetails)){
      if(coffeeStores.length > 0){
        const findCoffeeStoreByID = coffeeStores.find((coffeeStore) => {
          // Returns the first id it gets from thhe dynnamic id in the URL
          return coffeeStore.id.toString() === id;
        })

        if(findCoffeeStoreByID){
          setNewCoffeeStore(findCoffeeStoreByID)
          handleCreateCoffeeStore(findCoffeeStoreByID)
        }
      }
    }else{
      // Get te data from SSG
      handleCreateCoffeeStore(initialProps.CoffeeStoredetails)
    }
  }, [id, initialProps, initialProps.CoffeeStoredetails])

  const { name, address, neighborhood, imageURL } = newCoffeeStore;

  // Takes in theID from the browser URL
  // We will get the data and set the data
  const { data, error } = useSWR(`/api/getCoffeeStoreById/?id=${id}`, fetcher)

  // Get the count for the voting for the specifioc coffee store by Id
  useEffect(()=>{
    // Set the data in the coffeeStore state
    if(data && data.length > 0){
      console.log('Data from SWR', data)
      setNewCoffeeStore(data[0])
      setVotingCount(data[0].voting)
    }
  },[data])

  // Create state to store the values for votes
  const [votingCount, setVotingCount] = useState(0)

  const handlUpvoteBtn = async() => {
    console.log("Button to handle upvoting");

    try{
      // Fetch the API
      const response = await fetch("/api/upvoteCoffeeStoreById",{
        method: 'PUT',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          id,
        })
      })
      const dbCoffeeStore = response.json()
      // console.log({dbCoffeeStore})

      // check to see if the dbCoffeeStore was not empty
      if(dbCoffeeStore && dbCoffeeStore.length > 0){
        // Set the voting count on client side
        let count = votingCount + 1
        setVotingCount(count)
      }
    }catch(err){
      console.error("Error upvoting specofoc coffeestore", err)
    }
  };

  // Set error if there was an error retrieving the coffee store
  if(error){
    return <div>Error retrieving that coffee store</div>
  }

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>


      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>← Back to Home</a>
            </Link>
          </div>
          <div className={styles.storeNameWrapper}>
            <h1 className={styles.storeName}>{name}</h1>
          </div>
          <div className={styles.storeImgWrapper}>
            <Image
              src={imageURL || "https://images.unsplash.com/photo-1504627298434-2119d6928e93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"}
              width={600}
              height={360}
              alt={name}
              className={styles.storeImage}
            />
          </div>
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
            <p className={styles.text}>{votingCount}</p>
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
