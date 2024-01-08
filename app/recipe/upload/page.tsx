'use client';

import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef } from 'react';
import styles from './page.module.css';
import ImageUploadForm from './components/ImageUploadForm';

export default function RecipeUpload() {
    return (
        <main className={styles.main}>
            <ImageUploadForm />
            <form className={styles.addRecipeForm}>
                <input className={styles.formField} type="text" placeholder="Recipe title" />
                <input className={styles.formField} type="text" placeholder="Original recipe source (URL)" />
                <textarea className={styles.formTextArea} placeholder="Ingredients" />
                <textarea className={styles.formTextArea} placeholder="Instructions" />
                <button type="submit" className={styles.submitButton}>Submit</button>
            </form>
        </main>
    );

}