import React from 'react';
import Image from 'next/image';

import styles from './RecipeCard.module.css';

type RecipeCardProps = {
    name: string,
    image_uri: string
}

const RecipeCard = ({name, image_uri}: RecipeCardProps) => {
    return ( 
        <div className={styles.recipeCard}>
            <Image className={styles.image} src={"/recipe-photos/"+ image_uri} alt='' width="1000" height="250"/>
            <h3 className={styles.name}>{name}</h3>
        </div> 
    );
}

export default RecipeCard;

