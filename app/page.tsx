import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'
import RecipeCard from './components/RecipeCard';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';

// import {ReactComponent as Icon} from "../public/icon.svg"

export default function Home() {
    return (
        <main className={styles.main}>
            {/* <Link href="">Logout</Link> */}
            <div className={styles.headingContainer}>
                <object type="image/svg+xml" data="/icon.svg" className={styles.icon} />
                <h1 className={styles.heading}>Gastronomicon</h1>
            </div>
            <SearchBar/>
            {/*<FilterBar/>
            <Link href="">Add recipe</Link> */}
            <div className={styles.recipeGrid}>
                <RecipeCard name='Vegan Tantanmen' image_uri='tantanmen.jpeg' />
                <RecipeCard name='Pita Chips' image_uri='pita-chips.jpg' />
                <RecipeCard name='Hummus' image_uri='hummus.jpg' />
                <RecipeCard name='Lentil Soup' image_uri='lentil-soup.jpg' />
                <RecipeCard name='Peanut Noodles' image_uri='peanut-noodles.jpg' />
            </div>
        </main>


    );
}
