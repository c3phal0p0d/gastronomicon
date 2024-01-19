import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'
import useSWR from 'swr'
import dbConnect from '@/app/utils/dbConnect'
import Recipe from "@/app/models/Recipe";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode, Key } from 'react'

export default async function RecipePage({ params }: { params: { slug: string } }) {
    let recipe;
    console.log("slug" + params.slug);

    try {
        await dbConnect();
        const id = params.slug;
        recipe = await Recipe.findById(id);

    } catch (err: any) {
        console.log(err);
    }

    return (
        <main className={styles.main}>
            <div className={styles.recipesLink}>
                <Link href="/">← Back to recipes</Link>
            </div>
            <div className={styles.recipeContainer}>
                <div className={styles.top}>
                    <div className={styles.imageContainer}>
                        <Image className={recipe.imageURL == "" ? styles.defaultImage : styles.image} src={recipe.imageURL == "" ? "/icons/default-image.svg" : recipe.imageURL} alt='Image of recipe' width="300" height="300" />
                    </div>
                    <div className={styles.recipeInfoContainer}>
                        <h2 className={styles.recipeHeading}>{recipe.recipeName}</h2>
                        <div className={styles.infoLineContainer}>
                            <object type="image/svg+xml" data="/icons/clock.svg" className={styles.icon} />
                            <div className={styles.preparationTimeInfo}>Preparation time: {recipe.preparationTime}</div>
                        </div>
                        <div className={styles.infoLineContainer}>
                            <object type="image/svg+xml" data="/icons/serving.svg" className={styles.icon} />
                            <div className={styles.servingsInfo}>Servings: {recipe.servings}</div>
                        </div>
                        <div className={styles.infoLineContainer}>
                            <object type="image/svg+xml" data="/icons/category.svg" className={styles.icon} />
                            <div className={styles.recipeCategory}>Category: {recipe.category}</div>
                        </div>
                        <div className={`${styles.infoLineContainer} ${styles.linkContainer}`}>
                            <object type="image/svg+xml" data="/icons/link.svg" className={styles.icon} />
                            <div className={styles.originalRecipeLink} >Link to original recipe:
                                {recipe.sourceURL != "" ? <Link href={recipe.sourceURL} className={styles.linkURL}> {recipe.sourceURL}</Link> : " N/A"}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.ingredientsContainer}>
                        <h3 className={styles.ingredientsHeading}>Ingredients</h3>
                        {recipe.ingredients.split("\n").map(function (ingredient: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined, i: Key | null | undefined) { return <span key={i}>{ingredient}<br /></span> })}
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
                        {recipe.instructions.split("\n").map(function (instruction: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined, i: Key | null | undefined) { return <span key={i}>{instruction}<br /></span> })}
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