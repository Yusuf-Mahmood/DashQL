import { View, Text } from 'react-native';
import Svg, { Circle, Path, G, Text as SvgText, Defs, LinearGradient, Stop, Line } from 'react-native-svg';
import tw from 'twrnc';
import { colors } from '@/constants/colors';

export type ProjectGaugeProps = {
  projects: {
    name: string;
    amount: number;
  }[];
}
const ProjectGauge: React.FC<ProjectGaugeProps> = ({ projects }) => {
  return (
    <View style={tw`items-center`}>
      <Text style={[tw`text-lg font-bold mb-2`, { color: colors.textPrimary }]}>
        Top Projects
      </Text>
      <Svg height="200" width="200">
        <Defs>
          <LinearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="#f8f8f8" />
            <Stop offset="1" stopColor="#f8f8f8" />
          </LinearGradient>
        </Defs>
        <Path
          d="M40 150 A60 60 0 0 1 160 150"
          fill="none"
          stroke="#f0f0f0"
          strokeWidth="2"
        />
        {projects.slice().reverse().map((project, index) => {
          const position = index / 4;
          const angle = 180 * position;
          const x = 100 + 77 * Math.cos(angle * Math.PI / 180);
          const y = 150 - 77 * Math.sin(angle * Math.PI / 180);
          const isHighest = index === 4;
          
          return (
            <G key={`project-${index}`}>
              <SvgText
                x={x}
                y={y - (isHighest ? 25 : 20)}
                fill={isHighest ? "#FF0000" : colors.textPrimary}
                fontSize= {projects.length > 10 ? "6" : '8'} 
                textAnchor="middle"
              >
                {project.name.split(' ')[0]}
              </SvgText>
              <Circle
                cx={x}
                cy={y}
                r={isHighest ? 6 : 4}
                fill={isHighest ? "#FF0000" : "#A0A0A0"}
              />
            </G>
          );
        })}
        {projects.length > 0 && (
          <G>
            <Line
              x1="100"
              y1="150"
              x2={100 + 60 * Math.cos(Math.PI)}
              y2={150 - 60 * Math.sin(Math.PI)}
              stroke="#FF0000"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <Circle cx="100" cy="150" r="5" fill="#FF0000" />
          </G>
        )}
        <SvgText x="100" y="170" fill={colors.textPrimary} fontSize="10" fontWeight="bold" textAnchor="middle">
          HIGHEST XP
        </SvgText>
      </Svg>
    </View>
  );
};

export default ProjectGauge;