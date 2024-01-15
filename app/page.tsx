import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import RecipeCard from './components/RecipeCard';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import Recipe from "@/app/models/Recipe";
import LogoutButton from "@/app/components/LogoutButton";

import { authOptions } from "./utils/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect("/login");
    }

    let recipesList;

    try {
        const res = await fetch(process.env.APP_URL + "/api/recipe/get-all?email=" + session.user.email, {
            method: "GET",
        });
        recipesList = await res.json();
    } catch (err: any) {
        console.log(err);
    }

    // const recipesList = await Recipe.find();

    return (
        <main className={styles.main}>
            <LogoutButton/>
            <div className={styles.headingContainer}>
                <object type="image/svg+xml" data="/icons/app-icon.svg" className={styles.icon} />
                <h1 className={styles.heading}>Gastronomicon</h1>
            </div>
            <div className={styles.searchFilterBar}>
                <SearchBar />
                {/* <FilterBar/> */}
                <Link href="/recipe/upload" className={styles.addRecipeButton}>+ Add recipe</Link>
            </div>
            <div className={styles.recipeGrid}>
                {/* {recipesList && recipesList.map((recipe: { _id: string, recipeName: string; imageURL: string; }) => (
                    <RecipeCard _id={recipe._id} name={recipe.recipeName} imageURL={recipe.imageURL}/>
                ))} */}
                {recipesList && JSON.parse(JSON.stringify(recipesList.recipesList)).map((recipe: { _id: string, recipeName: string; imageURL: string; }) => (
                    <RecipeCard _id={recipe._id} name={recipe.recipeName} imageURL={recipe.imageURL}/>
                ))}
            </div>
        </main>


    );
}
