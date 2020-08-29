import Transaction from '../models/Transaction';
import CreateTransactionService from '../services/CreateTransactionService';

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
  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalIncomeReduce: number = this.transactions.reduce((totalIncome: number, transaction: Transaction) => {
      if (transaction.type === 'income') {
        totalIncome += transaction.value;
      }
      return totalIncome;
    },0);

    const totalOutComeReduce = this.transactions.reduce((totalOutcome: number , transaction: Transaction) => {
      if (transaction.type === 'outcome') {
        totalOutcome += transaction.value;
      }
      return totalOutcome;
    },0);

    this.balance = {
      income: totalIncomeReduce,
      outcome: totalOutComeReduce,
      total: totalIncomeReduce - totalOutComeReduce,
    }

    return this.balance;
  }

  public create({ title, value, type}: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({title, type, value});
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
