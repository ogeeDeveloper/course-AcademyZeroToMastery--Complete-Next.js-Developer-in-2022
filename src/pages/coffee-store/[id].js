// Hook to read route from the browser URL
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import CoffeeStoreData from "../../utils/coffeeData.json";

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

  const { name, Address, city } = CoffeeStoredetails;

  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>

      <Link href="/">
        <a>Back to Home</a>
      </Link>
      <p>{Address}</p>
      <p>{name}</p>
      <p>{city}</p>
    </div>
  );
};

export default CoffeeStore;
