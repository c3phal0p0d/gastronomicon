import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
    return (
        <main className={styles.main}>
            <div className={styles.recipesLink}>
                {/* <object type="image/svg+xml" data="/icon4.svg" className={styles.icon} /> */}
                <Link href="/">← Back to recipes</Link>
            </div>
            <div className={styles.recipeContainer}>
            <div className={styles.left}>
                <Image className={styles.image} src={"/recipe-photos/pita-chips.jpg"} alt='' width="300" height="300" />
                <h2 className={styles.recipeHeading}>Pita chips</h2>
                <div className={styles.recipeInfoContainer}>
                    <div className={styles.preparationTimeInfo}>Preparation time: 0 h 10 min</div>
                    <div className={styles.cookTimeInfo}>Cook time: 0 h 5 min</div>
                    <div className={styles.servingsInfo}>Servings: 8</div>
                    <div className={styles.recipeCategory}>Category: Snack</div>
                    <div className={styles.originalRecipeLink} >Original recipe: <Link href="https://www.themediterraneandish.com/homemade-pita-chips/">https://www.themediterraneandish.com/homemade-pita-chips/</Link></div>
                </div>
            </div>
            <div className={styles.right}>
            <div className={styles.ingredientsContainer}>
                    <h3 className={styles.ingredientsHeading}>Ingredients</h3>
                    <ul className={styles.ingredients}>
                        <li>2 to 3 pita bread with pockets</li>
                        <li>Olive oil</li>
                        <li>Salt</li>
                        <li>Pepper</li>
                        <li>Additional seasoning of choice</li>
                    </ul>
                </div>
                <div className={styles.instructionsContainer}>
                    <h3 className={styles.instructionsHeading}>Instructions</h3>
                    <ol className={styles.instructions}>
                        <li>Heat the oven to 425 degrees F. And prepare a large sheet pan.</li>
                        <li>Split the pita pockets in half to make single rounds of pita. Place each pita flat on your cutting board and split them in half from the seam with a sharp knife or kitchen shears (you should end up with 2 single rounds of pita). Note: If your pitas are the thick, single-layer kind, you can skip this step as you can't split them. </li>
                        <li>Brush with extra virgin olive oil & Season. Brush the pita rounds with extra virgin olive oil and season with kosher salt and za'atar (do this on both sides). </li>
                        <li>Cut into triangles. Using a knife or a pair of kitchen shears again, cut each round of pita into 8 triangles.</li>
                        <li>Bake! Arrange the pita triangles on the prepared sheet pan. Bake anywhere from 5 to 10 minutes, checking occasionally to turn over the pita triangles that have gained color, until you have pita chips that are crispy and golden brown to your liking. </li>
                    </ol>
                </div>
            </div>
            </div>
        </main>


    );
}