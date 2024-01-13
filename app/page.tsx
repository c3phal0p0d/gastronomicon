import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import RecipeCard from './components/RecipeCard';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import Recipe from "@/app/models/Recipe";

import { authOptions } from "./utils/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/login");
    }

    let recipesList;

    try {
        const res = await fetch(process.env.APP_URL + "/api/recipe/get-all", {
            method: "GET",
        });
        recipesList = await res.json();
    } catch (err: any) {
        console.log(err);
    }

    // const recipesList = await Recipe.find();

    return (
        <main className={styles.main}>
            <button className={styles.logoutButton}>
                <object type="image/svg+xml" data="/logout.svg" className={styles.icon} />
            </button>
            <div className={styles.headingContainer}>
                <object type="image/svg+xml" data="/icon.svg" className={styles.icon} />
                <h1 className={styles.heading}>Gastronomicon</h1>
            </div>
            <div className={styles.searchFilterBar}>
                <SearchBar />
                {/* <FilterBar/> */}
                <Link href="/recipe/upload" className={styles.addRecipeButton}>+</Link>
            </div>
            <div className={styles.recipeGrid}>
                {/* {recipesList && recipesList.map((recipe: { _id: string, recipeName: string; imageURL: string; }) => (
                    <RecipeCard _id={recipe._id} name={recipe.recipeName} imageURL={recipe.imageURL}/>
                ))} */}
                {recipesList && JSON.parse(JSON.stringify(recipesList.recipesList)).map((recipe: { _id: string, recipeName: string; imageURL: string; }) => (
                    <RecipeCard _id={recipe._id} name={recipe.recipeName} imageURL={recipe.imageURL}/>
                ))}
                {/* <RecipeCard name='Vegan Tantanmen' imageURL='tantanmen.jpeg' />
                <Link href="/recipe/656ec3a9ef98c1d61a5ef6a6">
                    <RecipeCard name='Pita Chips' image_uri='pita-chips.jpg' />
                </Link>
                <RecipeCard name='Hummus' image_uri='hummus.jpg' />
                <RecipeCard name='Lentil Soup' image_uri='lentil-soup.jpg' />
                <RecipeCard name='Peanut Noodles' image_uri='peanut-noodles.jpg' /> */}
            </div>
        </main>


    );
}
