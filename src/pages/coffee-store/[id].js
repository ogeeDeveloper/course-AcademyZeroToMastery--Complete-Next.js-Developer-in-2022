// Hook to read route from the browser URL
import {useRouter} from 'next/router'
import Link from 'next/link'
import CoffeeStoreData from '../../utils/coffeeData.json'

export async function getStaticProps(staticProps){
    const params = staticProps.params
    // const data = CoffeeStoreData
    return{
        props:{
            CoffeeStore: CoffeeStoreData.find(CoffeeStores=>{
                // Returns the first id it gets from thhe dynnamic id in the URL
                return CoffeeStores.id.toString() === params.id
            }),
        },
            
    }
}

export async function getStaticPaths(){
    return {
        paths:[
            {params: {id:"0",id:"1"}}
        ],
        fallback: true
    }
}

const CoffeeStore = (props) => {
    const router = useRouter() // This is a object that has a lot of values such as the 'id' from query
    const {id} = router.query

    return (
        <div>
            <p>Coffee Store: {id}</p>
            <Link href="/">
                <a>Back to Home</a>
            </Link>
            <p>{props.CoffeeStore.name}</p>
            <p>{props.CoffeeStore.city}</p>
        </div>
    )
}

export default CoffeeStore
