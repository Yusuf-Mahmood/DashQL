import { Transaction } from '@/app/dashboard.types';

export const calculateProjects = (transactions: Transaction[]) => {
  return transactions
    .map((tx: Transaction) => {
      const pathParts = tx.path.split('/').filter(part => 
        part && !part.includes('bh-module') && !part.includes('checkpoint')
      );
      const projectName = pathParts[pathParts.length - 1] || 'Project';
      return {
        name: projectName.replace(/-/g, ' ').toUpperCase(),
        amount: tx.amount
      };
    })
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);
};
