import { View, Text, ScrollView } from 'react-native';
import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
import tw from 'twrnc';
import { colors } from '@/constants/colors';
import { SkillsListProps } from './skillsList.types';

const SkillsList: React.FC<SkillsListProps> = ({ skills, maxAmount }) => {
  return (
    <View style={tw`mb-4 mt-4`}>
      <Text style={[tw`text-center text-lg font-bold mb-2`, { color: colors.textPrimary }]}>
        Highest Skills
      </Text>
      <View style={tw`h-64 ml-2`}>
        <ScrollView style={tw`pr-3`}>
          {skills.map((skill) => (
            <View key={skill.key} style={tw`mb-3`}>
              <View style={tw`flex-row justify-between mb-1`}>
                <Text 
                  style={[tw`text-xs`, { color: colors.textPrimary, maxWidth: '50%' }]} 
                  numberOfLines={1}
                >
                  {skill.name}
                </Text>
                <Text style={[tw`text-xs`, { color: colors.textPrimary }]}>
                  {skill.amount}
                </Text>
              </View>
              <View style={tw`h-1.5 rounded-full`}>
                <Svg height="100%" width="100%">
                  <Defs>
                    <LinearGradient id="skillGradient" x1="0" y1="0" x2="1" y2="0">
                      <Stop offset="0" stopColor="#8B0000" />
                      <Stop offset="1" stopColor="#FF0000" />
                    </LinearGradient>
                  </Defs>
                  <Rect 
                    width={`${(skill.amount / maxAmount) * 100}%`} 
                    height="100%" 
                    fill="url(#skillGradient)" 
                    rx="3"
                  />
                </Svg>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default SkillsList;