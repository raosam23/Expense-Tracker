export type TransactionCategory = "INCOME" | "EXPENSE"

export type TransactionInputType = {
    title: string,
    amount: string | number,
    note: string,
    type: TransactionCategory,
}

export type TransactionType = TransactionInputType & {
    id?: string,
    userId: number,
    createAt: string,
}