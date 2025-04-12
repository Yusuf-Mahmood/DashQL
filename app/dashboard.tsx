import { View, Text } from 'react-native';
import { useAuth } from '../context/authContext';
import SkillSpeedometer from '../components/Charts/speedometerGauge';
import tw from 'twrnc';
import { colors } from '../constants/colors';

const Dashboard = () => {
  const { data } = useAuth();

  if (!data) {
    return (
      <View>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  const skillsList = [
    'skill_git',
    'skill_algo',
    'skill_tcp',
    'skill_unix',
    'skill_ai',
    'skill_stats',
    'skill_go',
    'skill_c',
    'skill_sql',
    'skill_html',
    'skill_docker',
    'skill_back-end',
    'skill_front-end',
    'skill_sys-admin',
    'skill_c-pp',
    'skill_js',
    'skill_game',
  ];

  const skillAmounts: Record<string, number> = skillsList.reduce((acc, skill) => {
    acc[skill] = 0;
    return acc;
  }, {} as Record<string, number>);

  (data.transactions ?? []).forEach((tx: any) => {
    if (skillsList.includes(tx.type)) {
      skillAmounts[tx.type] += tx.amount;
    }
  });

  const skillData = skillsList.map((skill) => ({
    name: skill.replace('skill_', '').toUpperCase(),
    amount: skillAmounts[skill],
  }));

  skillData.sort((a, b) => a.amount - b.amount);
  console.log(data);
  return (
    <View style={tw`flex-1 bg-[${colors.primaryBackground}] items-center`}>
      <Text style={tw`text-[${colors.textPrimary}] m-10 text-[1rem]`}>Welcome {data[0].firstName} {data[0].lastName}!</Text>
      <SkillSpeedometer skills={skillData} />
    </View>
  );
};

export default Dashboard;
