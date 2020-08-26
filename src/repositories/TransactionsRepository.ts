import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.sum('income');
    const outcome = this.sum('outcome');
    const total = income - outcome;
    return { total, income, outcome };
  }

  private sum(type: 'income' | 'outcome'): number {
    const filtered = this.transactions
      .filter(transaction => transaction.type === type);
    if (filtered.length <= 0) return 0.0;
    return filtered
      .map(({ value }) => value)
      .reduce((previous, value) => previous + value);
  }

  public create(data: CreateTransactionDTO): Transaction {
    const transaction = new Transaction(data);
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
