export interface Category {
    _id: string
    category: string
  }

  export interface Expense {
    _id: string
    category: string
    item:string
    amount:Number
    expenseDate:string
    imageUrl:string
  }