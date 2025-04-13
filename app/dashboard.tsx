import { View, Text, ScrollView } from 'react-native';
import { useAuth } from '../context/authContext';
import CarSkillsDashboard from '../components/Charts/speedometerGauge';
import tw from 'twrnc';
import { colors } from '../constants/colors';

const Dashboard: React.FC = () => {
  const { data } = useAuth();

  if (!data) {
    return (
      <View>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-[${colors.primaryBackground}]`}>
      <ScrollView contentContainerStyle={tw`p-4`}>
        <CarSkillsDashboard userData={data} />
      </ScrollView>
    </View>
  );
};

export default Dashboard;