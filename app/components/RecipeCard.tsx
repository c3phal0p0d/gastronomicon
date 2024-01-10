import React from 'react';
import Image from 'next/image';

import styles from './RecipeCard.module.css';
import Link from 'next/link';

type RecipeCardProps = {
    name: string,
    imageURL: string
}

const RecipeCard = ({ name, imageURL }: RecipeCardProps) => {
    return (
        <div className={styles.recipeCard}>
            <Link href="/recipe/656ec3a9ef98c1d61a5ef6a6">
                <Image className={styles.image} src={imageURL} alt='' width="1000" height="250" />
                <h3 className={styles.name}>{name}</h3>
            </Link>
        </div>
    );
}

export default RecipeCard;

