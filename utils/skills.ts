import { Transaction } from '@/app/dashboard.types';

const skillsList = [
  'skill_git', 'skill_algo', 'skill_tcp', 'skill_unix', 'skill_ai',
  'skill_stats', 'skill_go', 'skill_c', 'skill_sql', 'skill_html',
  'skill_docker', 'skill_back-end', 'skill_front-end', 'skill_sys-admin',
  'skill_c-pp', 'skill_js', 'skill_game'
];

export const getSkills = (transactions: Transaction[]) => {
  const skillAmounts = skillsList.reduce((acc, skill) => {
    acc[skill] = 0;
    return acc;
  }, {} as Record<string, number>);

  transactions.forEach((tx) => {
    if (skillsList.includes(tx.type)) {
      skillAmounts[tx.type] += tx.amount;
    }
  });

  return skillsList
    .map(skill => ({
      name: skill.replace('skill_', '').replace('-', ' ').toUpperCase(),
      amount: skillAmounts[skill],
      key: skill,
    }))
    .filter(skill => skill.amount > 0)
    .sort((a, b) => b.amount - a.amount);
};

export const getMaxSkillAmount = (skills: { amount: number }[]) =>
  Math.max(...skills.map(skill => skill.amount), 1);
