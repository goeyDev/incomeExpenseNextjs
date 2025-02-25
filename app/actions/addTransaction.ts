'use server'

import { auth } from "@clerk/nextjs/server";
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

interface TransactionData {
    text: string;
    amount: number;
}

interface TransactionResult {
    data?: TransactionData;
    error?: string
}

const addTransaction = async (formData: FormData): Promise<TransactionResult> => {
    // const textValue = formData.get("text") as string
    // const amountValue = Number(formData.get("amount"))
    const textValue = formData.get("text")
    const amountValue = formData.get("amount")

    //check for the input value
    if (!textValue || textValue === '' || !amountValue) {
        return { error: "Text or amount cant blank" }
    }
    const text: string = textValue.toString();//ensure text is a string
    const amount: number = parseFloat(amountValue.toString()) //parse amount as number


    //check logged in user
    const { userId } = await auth()
    console.log("userId", userId)

    //check for user
    if (!userId) {
        return { error: "User not found!" }
    }

    try {

        const transactionData: TransactionData = await db.transaction.create({
            data: {
                text, amount, userId
            }
        })
        revalidatePath('/')
        return { data: transactionData }
    } catch (error) {
        return { error: "Transaction not added." }
    }

}

export default addTransaction

// from chatgpt
// 'use server'

// interface TransactionData {
//     text: string;
//     amount: number;
// }

// interface TransactionResult {
//     data?: TransactionData;
//     error?: string;
// }

// const addTransaction = async (formData: FormData): Promise<TransactionResult> => {
//     const text = formData.get("text")?.toString().trim(); // Ensure it's a string and trim spaces
//     const amount = Number(formData.get("amount")); // Convert directly to a number

//     if (!text) {
//         return { error: "Text cannot be blank" };
//     }
//     if (isNaN(amount)) {
//         return { error: "Amount must be a valid number" };
//     }

//     return { data: { text, amount } };
// };
