import React from 'react';
import Image from 'next/image';

import styles from './RecipeCard.module.css';
import Link from 'next/link';

type RecipeCardProps = {
    _id: string,
    name: string,
    imageURL: string
}

const RecipeCard = ({ _id, name, imageURL }: RecipeCardProps) => {
    return (
        <div className={styles.recipeCard}>
            <Link href={`/recipe/${_id}`}>
                <div className={imageURL == "" ? styles.defaultImageContainer : styles.imageContainer}>
                    <Image className={imageURL == "" ? styles.defaultImage : styles.image} src={imageURL == "" ? "/icons/default-image.svg" : imageURL} alt='' width="1000" height="250" />
                </div>
                <h3 className={styles.name}>{name}</h3>
            </Link>
        </div>
    );
}

export default RecipeCard;

