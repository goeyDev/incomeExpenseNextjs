'use server'
import getTransaction from '@/app/actions/getTransaction'
import { Transaction } from '@/types/Transaction'
import TransactionItem from './TransactionItem'



const TransactionList = async () => {
    const { transactions, error } = await getTransaction()

    if(error){
        return <p className='error'>{error}</p>
    }

    return (
        <>
            <h3>Transactions History</h3>
            <ul className="list">
                {transactions && transactions.map((transaction: Transaction) => (
                    <TransactionItem key={transaction.id} transaction={transaction}/>
                ))}
            </ul>
        </>
    )
}

export default TransactionList
