import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import RecipeCard from './components/RecipeCard';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';

import { authOptions } from "./utils/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/login");
    }
    return (
        <main className={styles.main}>
            <button className={styles.logoutButton}>
                <object type="image/svg+xml" data="/logout.svg" className={styles.icon} />
            </button>
            <div className={styles.headingContainer}>
                <object type="image/svg+xml" data="/icon.svg" className={styles.icon} />
                <h1 className={styles.heading}>Gastronomicon</h1>
            </div>
            <SearchBar />
            {/*<FilterBar/>
            <Link href="">Add recipe</Link> */}
            <div className={styles.recipeGrid}>
                <RecipeCard name='Vegan Tantanmen' image_uri='tantanmen.jpeg' />
                <Link href="/recipe/656ec3a9ef98c1d61a5ef6a6">
                    <RecipeCard name='Pita Chips' image_uri='pita-chips.jpg' />
                </Link>
                <RecipeCard name='Hummus' image_uri='hummus.jpg' />
                <RecipeCard name='Lentil Soup' image_uri='lentil-soup.jpg' />
                <RecipeCard name='Peanut Noodles' image_uri='peanut-noodles.jpg' />
            </div>
        </main>


    );
}
