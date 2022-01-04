// Hook to read route from the browser URL
import {useRouter} from 'next/router'
import Link from 'next/link'

const CoffeeStore = () => {
    const router = useRouter() // This is a object that has a lot of values such as the 'id' from query
    const {id} = router.query

    return (
        <div>
            <p>Coffee Store: {id}</p>
            <Link href="/">
                <a>Back to Home</a>
            </Link>
        </div>
    )
}

export default CoffeeStore
