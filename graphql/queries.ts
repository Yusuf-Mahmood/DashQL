export const USER_QUERY = { query: `
{
  user {
    id
    auditRatio
    email
    firstName
    lastName
    login
    totalDown
    totalUp
    transactions {
      type
      amount
      createdAt
    }
    TransactionsFiltered2: transactions(
      where: {
        type: {_eq: "level"},
        path: {
          _like: "%bh-module%",
          _nregex: "^.*(piscine-js/|piscine-rust/|piscine-ui/|piscine-ux/).*$"
        }
      },
      order_by: {amount: desc},
      limit: 1
    ) {
      amount
      type
      path
    }
  }
}
`
};
