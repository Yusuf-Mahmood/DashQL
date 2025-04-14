import { View, ScrollView, Text } from 'react-native';
import { useAuth } from '@/context/authContext';
import tw from 'twrnc';
import { colors } from '@/constants/colors';
import Header from '@/components/Dashboard/header';
import AuditRatioGauge from '@/components/Dashboard/Charts/auditRatio';
import ProjectGauge from '@/components/Dashboard/Charts/projectGauge';
import SkillsList from '@/components/Dashboard/Charts/skillsList';
import { User } from '@/app/dashboard.types';
import { getSkills, getMaxSkillAmount } from '@/utils/skills';
import { calculateProjects } from '@/utils/projects';

const Dashboard: React.FC = () => {
  const { data } = useAuth();
  const user = data?.[0] as User | undefined;

  if (!user) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={{ color: colors.textPrimary }}>No user data available</Text>
      </View>
    );
  }

  const skills = getSkills(user.transactions || []);
  const maxAmount = getMaxSkillAmount(skills);
  const projects = calculateProjects(user.TransactionsFiltered2 || []);
  const maxAuditSize = Math.max(user?.totalDown || 0, user?.totalUp || 0);

  return (
    <View style={tw`flex-1 bg-[${colors.primaryBackground}] mt-10`}>
      <ScrollView contentContainerStyle={tw`p-4`}>
        <Header
          firstName={user.firstName}
          level={user.TransactionsFiltered3?.[0]?.amount ?? 'N/A'}
          login={user.login}
          email={user.email}
          audits={user.auditRatio}
        />

        <View style={tw`flex-row justify-between mb-6`}>
          <AuditRatioGauge 
            totalDown={user?.totalDown || 0}
            totalUp={user?.totalUp || 0}
            maxAuditSize={maxAuditSize}
          />
          <ProjectGauge projects={projects} />
        </View>

        <SkillsList skills={skills} maxAmount={maxAmount} />
      </ScrollView>
    </View>
  );
};

export default Dashboard;
