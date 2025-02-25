"use server"
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'


// type getUserBalanceProps = {
//     balance?:number,
//     error?:string
// }
//     const getUserBalance = async ({balance,error}:getUserBalanceProps) => {

const getUserBalance = async (): Promise<{
    balance?: number,
    error?: string
}> => {
    const { userId } = await auth()
    if (!userId) {
        return { error: "User not found" }
    }
    try {
        const transaction = await db.transaction.findMany({
            where: { userId },
        })
        const balance = transaction.reduce((sum, transaction) => sum + transaction.amount, 0)
        return { balance }

    } catch (error) {
        return { error: "Database error." }
    }
}

export default getUserBalance

