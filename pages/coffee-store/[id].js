// Hook to read route from the browser URL
import {useRouter} from 'next/router'

const CoffeeStore = () => {
    const router = useRouter() // This is a object that has a lot of values such as the 'id' from query
    const {id} = router.query

    return (
        <div>
            <p>Coffee Store: {id}</p>
        </div>
    )
}

export default CoffeeStore
