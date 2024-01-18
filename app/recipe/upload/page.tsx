'use client';

import type { PutBlobResult } from '@vercel/blob';
import styles from './page.module.css';
import ImageUploadForm from './components/ImageUploadForm';
import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authOptions } from "@/app/utils/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from 'next/link';
import { getSession, useSession } from 'next-auth/react';

type Inputs = {
    recipeName: string,
    imageURL: string,
    preparationTime: string,
    servings: number,
    category: string,
    ingredients: string,
    instructions: string,
    sourceURL: string,
    addedBy: string | null
};

export default function RecipeUpload() {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [blob, setBlob] = useState<PutBlobResult | null>(null);

    const params = useSearchParams()!;
    const router = useRouter();

    // const session = await getSession(authOptions);
    // if (!session || !session.user) {
    //     redirect("/login");
    // }

    const { data: session, status } = useSession()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        defaultValues: {
            recipeName: "",
            imageURL: "",
            preparationTime: "",
            servings: undefined,
            category: "",
            ingredients: "",
            instructions: "",
            sourceURL: "",
            addedBy: "",
        },
    });

    // const [formData, setFormData] = useState({
    //     recipeName: "",
    //     sourceURL: "",
    //     ingredients: "",
    //     instructions: "",
    // });

    // const [formSuccess, setFormSuccess] = useState(false);
    // const [formSuccessMessage, setFormSuccessMessage] = useState("");

    // const handleInput = (e: React.ChangeEvent<any>) => {
    //     const fieldName = e.target.name;
    //     const fieldValue = e.target.value;

    //     setFormData((prevState) => ({
    //         ...prevState,
    //         [fieldName]: fieldValue
    //     }));
    // }

    // const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     console.log(formData);

    //     const formURL = "";
    //     const data = new FormData();

    //     Object.entries(formData).forEach(([key, value]) => {
    //         data.append(key, value);
    //     });

    //     if (blob) {
    //         data.append("imageURL", blob.url);
    //     } else data.append("imageURL", "");

    //     fetch(formURL, {
    //         method: "POST",
    //         body: data,
    //         headers: {
    //             'accept': 'application/json',
    //         },
    //     }).then((response) => response.json())
    //         .then((data) => {
    //             setFormData({
    //                 recipeName: "",
    //                 sourceURL: "",
    //                 ingredients: "",
    //                 instructions: "",
    //             });

    //             setFormSuccess(true);
    //             setFormSuccessMessage(data.submission_text);
    //         })
    // }

    const [message, setMessage] = useState<null | string>(null);

    const formSubmit: SubmitHandler<Inputs> = async (form) => {
        const { recipeName, preparationTime, servings, category, ingredients, instructions, sourceURL } = form;

        let imageURL;
        if (blob) {
            imageURL = blob.url;
        }
        else {
            imageURL = "";
        }

        let addedBy = "";

        if (session?.user?.email){
            addedBy = session.user.email;
        }

        // console.log("added by: ", addedBy);

        try {
            const res = await fetch("/api/recipe/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    recipeName,
                    imageURL,
                    preparationTime,
                    servings,
                    category,
                    ingredients,
                    instructions,
                    sourceURL,
                    addedBy,
                }),
            });
            res.status === 201 &&
                router.push("/");
        } catch (err: any) {
            setMessage(err);
        }
    };

    return (
        <main className={styles.main}>
            <h2 className={styles.heading}>Add recipe</h2>
            <div className={styles.imageUploadContainer}>
                <form className={styles.imageUploadForm}
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
                    <input name="file" ref={inputFileRef} type="file" required />
                    <button type="submit" className={styles.uploadImageButton}>Upload</button>
                </form>
                {blob && (
                    <div>
                        Image uploaded successfully!
                    </div>
                )}
            </div>
            <form className={styles.addRecipeForm} onSubmit={handleSubmit(formSubmit)}>
                <input
                    className={styles.formField}
                    type="text"
                    placeholder="Recipe name"
                    {...register("recipeName", {
                        required: "Required",
                    })}
                />
                <input
                    className={styles.formField}
                    type="string"
                    placeholder="Preparation time"
                    {...register("preparationTime", {
                        required: "Required",
                    })}
                />
                <input
                    className={styles.formField}
                    type="number"
                    placeholder="Servings"
                    {...register("servings", {
                        required: "Required",
                    })}
                />
                <input
                    className={styles.formField}
                    type="string"
                    placeholder="Category"
                    {...register("category")}
                />
                <textarea
                    className={styles.formTextArea}
                    placeholder="Ingredients"
                    {...register("ingredients", {
                        required: "Required",
                    })}
                />
                <textarea
                    className={styles.formTextArea}
                    placeholder="Instructions"
                    {...register("instructions", {
                        required: "Required",
                    })}
                />
                <input
                    className={styles.formField}
                    type="text"
                    placeholder="Original recipe source (URL)"
                    {...register("sourceURL")}
                />
                <div className="buttonsContainer">
                    <button type="submit" className={styles.submitButton}>Submit</button>
                    <Link href="/" className={styles.cancelButton}>Cancel</Link>
                </div>
            </form>
        </main>
    );

}