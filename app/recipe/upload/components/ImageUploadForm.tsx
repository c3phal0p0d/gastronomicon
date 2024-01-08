'use client';

import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef } from 'react';
import styles from '../page.module.css';

export default function ImageUploadForm() {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [blob, setBlob] = useState<PutBlobResult | null>(null);
    return (
        <div className={styles.imageUploadContainer}>
            <h2 className={styles.heading}>Add recipe</h2>

            <form className={styles.addRecipeForm}
                onSubmit={async (event) => {
                    event.preventDefault();

                    if (!inputFileRef.current?.files) {
                        throw new Error('No file selected');
                    }

                    const file = inputFileRef.current.files[0];

                    const response = await fetch(
                        `/api/recipe/upload/image?filename=${file.name}`,
                        {
                            method: 'POST',
                            body: file,
                        },
                    );

                    const newBlob = (await response.json()) as PutBlobResult;

                    setBlob(newBlob);
                }}
            >
                <label>Recipe photo</label>
                <input name="file" ref={inputFileRef} type="file" required />
                <button type="submit" className={styles.uploadImageButton}>Upload</button>
            </form>
            {blob && (
                <div>
                    Blob url: <a href={blob.url}>{blob.url}</a>
                </div>
            )}
        </div>
    );
}