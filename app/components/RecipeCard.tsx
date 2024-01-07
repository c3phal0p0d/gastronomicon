import React from 'react';
import styles from './RecipeCard.module.css';

type RecipeCardProps = {
    name: string,
    image_uri: string
}

const RecipeCard = ({name, image_uri}: RecipeCardProps) => {
    return ( 
        <div className={styles.recipeCard}>
            <img className={styles.image} src={image_uri}></img>
            <h3 className={styles.name}>{name}</h3>
        </div> 
    );
}

export default RecipeCard;

