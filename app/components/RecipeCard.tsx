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
    console.log("id: " + _id);
    return (
        <div className={styles.recipeCard}>
            <Link href={`/recipe/${_id}`}>
                <Image className={styles.image} src={imageURL} alt='' width="1000" height="250" />
                <h3 className={styles.name}>{name}</h3>
            </Link>
        </div>
    );
}

export default RecipeCard;

