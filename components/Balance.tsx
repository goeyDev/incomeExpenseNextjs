import getUserBalance from '@/app/actions/getUserBalance'
import { addCommas } from '@/lib/utils'
import React from 'react'

const Balance = async() => {
    const {balance} = await getUserBalance()
  return (
    <>
    <h2>Your Balance</h2>
    <h2>${addCommas(Number(balance?.toFixed(2) ?? 0))}</h2>
    </>
  )
}

export default Balance
