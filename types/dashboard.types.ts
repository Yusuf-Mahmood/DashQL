export type Transaction = {
    type: string;
    amount: number;
    path: string;
};
  
export type User = {
    firstName: string;
    login: string;
    email: string;
    auditRatio: number;
    totalDown: number;
    totalUp: number;
    transactions: Transaction[];
    TransactionsFiltered2: Transaction[];
    TransactionsFiltered3: Transaction[];
};