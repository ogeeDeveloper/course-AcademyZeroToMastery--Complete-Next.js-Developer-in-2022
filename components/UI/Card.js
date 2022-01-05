import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/Card.module.css'
const Card = ({title,imageUrl,href}) => {
    return (
        <Link href={href}>
            <a className={styles.cardLink}>
            <div className={classnames('glass',styles.cardContainer)}>
                <div className={styles.cardTittleWrapper}>
                    <h2 className={styles.cardTitle}>{title}</h2>
                </div>
                <div className={styles.cardImageWrapper}>
                    <Image className={styles.cardImage} src={imageUrl} width={260} height={160} alt="Image of restaurats"/>
                </div>
            </div>
            </a>
        </Link>
    )
}

export default Card
