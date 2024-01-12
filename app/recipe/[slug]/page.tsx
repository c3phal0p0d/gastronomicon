import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'
import useSWR from 'swr'
import dbConnect from '@/app/utils/dbConnect'
import Recipe from "@/app/models/Recipe";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json())

export default async function RecipePage({ params }: { params: { slug: string } }) {

    // const { data, error } = useSWR("/api/recipe/get?id=" + params.slug, fetcher);
    // const recipe = data;

    let recipe;
    console.log("slug" + params.slug);

    try {
        // console.log(process.env.APP_URL + "/api/recipe/get?id=" + params.slug);
        // const res = await fetch(process.env.APP_URL + "/api/recipe/get?id=" + params.slug, {
        //     method: "GET",
        // });
        // console.log(res.status);
        // if (!res.ok) {
        //     throw new Error(`Failed to fetch data. Status: ${res.status}`);
        // }
        // const responseText = await res.text();
        // recipe = JSON.parse(responseText);
        // console.log("responseText:");
        // console.log(responseText);
        // console.log(res);
        // console.log("recipe:")
        // console.log(recipe);
        // // recipe = await res.json();
        // // console.log("recipe:");
        // // console.log(recipe);


        await dbConnect();
        const id = params.slug;
        recipe = await Recipe.findById(id);
        console.log("try recipe: ");
        console.log(recipe);
    } catch (err: any) {
        console.log(err);
    }

    return (
        <main className={styles.main}>
            <div className={styles.recipesLink}>
                {/* <object type="image/svg+xml" data="/icon4.svg" className={styles.icon} /> */}
                <Link href="/">← Back to recipes</Link>
            </div>
            <div className={styles.recipeContainer}>
                <div className={styles.left}>
                    <Image className={styles.image} src={recipe.imageURL} alt='' width="300" height="300" />
                    <div className={styles.recipeInfoContainer}>
                    <h2 className={styles.recipeHeading}>{recipe.recipeName}</h2>
                        <div className={styles.preparationTimeInfo}>Preparation time: {recipe.preparationTime}</div>
                        <div className={styles.servingsInfo}>Servings: {recipe.servings}</div>
                        <div className={styles.recipeCategory}>Category: {recipe.category}</div>
                        <div className={styles.originalRecipeLink} >Original recipe: <Link href={""}>{recipe.sourceURL}</Link></div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.ingredientsContainer}>
                        <h3 className={styles.ingredientsHeading}>Ingredients</h3>
                        {recipe.ingredients}
                        {/* <ul className={styles.ingredients}>
                        <li>2 to 3 pita bread with pockets</li>
                        <li>Olive oil</li>
                        <li>Salt</li>
                        <li>Pepper</li>
                        <li>Additional seasoning of choice</li>
                    </ul> */}
                    </div>
                    <div className={styles.instructionsContainer}>
                        <h3 className={styles.instructionsHeading}>Instructions</h3>
                        {recipe.instructions}
                        {/* <ol className={styles.instructions}>
                        <li>Heat the oven to 425 degrees F. And prepare a large sheet pan.</li>
                        <li>Split the pita pockets in half to make single rounds of pita. Place each pita flat on your cutting board and split them in half from the seam with a sharp knife or kitchen shears (you should end up with 2 single rounds of pita). Note: If your pitas are the thick, single-layer kind, you can skip this step as you can't split them. </li>
                        <li>Brush with extra virgin olive oil & Season. Brush the pita rounds with extra virgin olive oil and season with kosher salt and za'atar (do this on both sides). </li>
                        <li>Cut into triangles. Using a knife or a pair of kitchen shears again, cut each round of pita into 8 triangles.</li>
                        <li>Bake! Arrange the pita triangles on the prepared sheet pan. Bake anywhere from 5 to 10 minutes, checking occasionally to turn over the pita triangles that have gained color, until you have pita chips that are crispy and golden brown to your liking. </li>
                    </ol> */}
                    </div>
                </div>
            </div>
        </main>


    );
}