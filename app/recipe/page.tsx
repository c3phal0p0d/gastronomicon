import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
    return (
        <main className={styles.main}>
            {/* <Link href="">Logout</Link> */}
            <h1 className={styles.heading}>Recipe</h1>
            {/* <SearchBar/>
            <FilterBar/>
            <Link href="">Add recipe</Link> */}
            <div className={styles.recipeGrid}>

            </div>
        </main>

        
    );
}