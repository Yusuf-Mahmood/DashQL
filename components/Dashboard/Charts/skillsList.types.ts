export type Skill = {
    name: string;
    amount: number;
    key: string;
}
  
export type SkillsListProps = {
    skills: Skill[];
    maxAmount: number;
}
  