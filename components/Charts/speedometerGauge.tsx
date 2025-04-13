import { View, Text, ScrollView } from 'react-native';
import Svg, { Circle, Rect, Path, G, Text as SvgText, LinearGradient, Defs, Stop, Line } from 'react-native-svg';
import tw from 'twrnc';
import { colors } from '../../constants/colors';
interface CarSkillsDashboardProps {
  userData: any;
}
interface Project {
  name: string;
  amount: number;
}

const formatSize = (bytes: number): string => {
  if (bytes >= 1000000000) return `${(bytes / 1000000000).toFixed(1)} GB`;
  if (bytes >= 1000000) return `${(bytes / 1000000).toFixed(1)} MB`;
  return `${(bytes / 1000).toFixed(1)} KB`;
};

const CarSkillsDashboard: React.FC<CarSkillsDashboardProps> = ({ userData }) => {
  const user = userData?.[0];
  const skillsList = [
    'skill_git', 'skill_algo', 'skill_tcp', 'skill_unix', 'skill_ai',
    'skill_stats', 'skill_go', 'skill_c', 'skill_sql', 'skill_html',
    'skill_docker', 'skill_back-end', 'skill_front-end', 'skill_sys-admin',
    'skill_c-pp', 'skill_js', 'skill_game'
  ];

  // Calculate skill amounts
  const skillAmounts = skillsList.reduce((acc, skill) => {
    acc[skill] = 0;
    return acc;
  }, {} as Record<string, number>);

  const transactions = user?.transactions || [];
  transactions.forEach((tx: any) => {
    if (skillsList.includes(tx.type)) {
      skillAmounts[tx.type] += tx.amount;
    }
  });

  const skills = skillsList
    .map(skill => ({
      name: skill.replace('skill_', '').replace('-', ' ').toUpperCase(),
      amount: skillAmounts[skill],
      key: skill
    }))
    .filter(skill => skill.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  const maxAmount = Math.max(...skills.map(skill => skill.amount), 1);
  const moduleLevel = 
  user.TransactionsFiltered3.length > 0 
  ? user.TransactionsFiltered3[0].amount
    : "N/A";
  const totalUp = user?.totalDown || 0;
  const totalDown = user?.totalUp || 0;
  const auditRatio = user?.auditRatio || 0;

  const totalXP = user?.TransactionsFiltered1?.reduce((sum: number, tx: any) => sum + tx.amount, 0) || 0;

  const calculateXPForLevel = (level: number) => Math.pow(level, 2) * 500;
  const currentLevelXP = calculateXPForLevel(moduleLevel);
  const nextLevelXP = calculateXPForLevel(moduleLevel + 1);
  const xpProgress = (totalXP - currentLevelXP) / (nextLevelXP - currentLevelXP);

  const normalizedProgress = Math.max(0, Math.min(1, xpProgress));

  const maxAuditSize = Math.max(totalUp, totalDown);
  const auditScale = maxAuditSize > 0 ? maxAuditSize : 1000000;

  const projects: Project[] = (user?.TransactionsFiltered2 || [])
    .map((tx: any) => {
      const pathParts = tx.path.split('/').filter(part => 
        part && 
        !part.includes('bh-module') && 
        !part.includes('checkpoint')
      );
      const projectName = pathParts[pathParts.length - 1] || 'Project';
      return {
        name: projectName.replace(/-/g, ' ').toUpperCase(),
        amount: tx.amount
      };
    })
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  const maxProjectXP = projects.length > 0 ? Math.max(...projects.map(p => p.amount)) : 1;

  if (!user) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={{ color: colors.textPrimary }}>No user data available</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-[${colors.primaryBackground}] p-4`}>
      {/* Header */}
      <View style={tw`mb-6`}>
        <Text style={[tw`text-2xl font-bold text-center`, { color: colors.textPrimary }]}>
          {user.firstName}'s Dashboard
        </Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <Text style={[tw`text-sm text-center mt-1`, { color: colors.textSecondary }]}>
            Level {moduleLevel} • {user.login} • {user.email}
          </Text>
        </ScrollView>
      </View>

      {/* Dashboard Gauges */}
      <View style={tw`flex-row justify-between mb-6`}>
        {/* Audit Ratio - Vertical Bar Graph */}
        <View style={tw`w-2/5 items-center`}>
          <Text style={[tw`text-lg font-bold mb-2`, { color: colors.textPrimary }]}>
            Audits Ratio
          </Text>
          <Svg height="180" width="120">
            <Defs>
              <LinearGradient id="auditGradient" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="1" stopColor="#8B0000" />
                <Stop offset="0" stopColor="#FF0000" />
              </LinearGradient>
            </Defs>
            {/* Done (Total Down) */}
            <Rect 
              x="10" 
              y={150 - Math.min(totalDown / auditScale * 140, 140)} 
              width="40" 
              height={Math.min(totalDown / auditScale * 140, 140)} 
              rx="5" 
              fill="url(#auditGradient)"
            />
            
            {/* Received (Total Up) */}
            <Rect 
              x="60" 
              y={150 - Math.min(totalUp / auditScale * 140, 140)} 
              width="40" 
              height={Math.min(totalUp / auditScale * 140, 140)} 
              rx="5" 
              fill="url(#auditGradient)"
            />
            <SvgText
              x="30"
              y="165"
              fill={colors.textPrimary}
              fontSize="10"
              textAnchor="middle"
            >
              Done
            </SvgText>
            <SvgText
              x="80"
              y="165"
              fill={colors.textPrimary}
              fontSize="10"
              textAnchor="middle"
            >
              Received
            </SvgText>
            
            <SvgText
              x="30"
              y="180"
              fill={colors.textPrimary}
              fontSize="12"
              fontWeight="bold"
              textAnchor="middle"
            >
              {formatSize(totalDown)}
            </SvgText>
            <SvgText
              x="80"
              y="180"
              fill={colors.textPrimary}
              fontSize="12"
              fontWeight="bold"
              textAnchor="middle"
            >
              {formatSize(totalUp)}
            </SvgText>
          </Svg>
        </View>

{/* Project Gauge - Clean Red Design */}
<View style={tw`items-center `}>
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

    {/* Base arc - very subtle */}
    <Path
      d="M40 150 A60 60 0 0 1 160 150"
      fill="none"
      stroke="#f0f0f0"
      strokeWidth="2"
    />

    {/* Project markers */}
    {projects.slice().reverse().map((project, index) => {
       const position = index / 4; // 0, 0.25, 0.5, 0.75, 1.0
       const angle = 180 * position; // Convert to 0-180° range
       
       // Calculate positions along a semicircle
       const x = 100 + 77 * Math.cos(angle * Math.PI / 180);
       const y = 150 - 77 * Math.sin(angle * Math.PI / 180);
       
       const isHighest = index === 4;
       
       return (
         <G key={`project-${index}`}>
           <SvgText
             x={x}
             y={y - (isHighest ? 25 : 20)}
             fill={isHighest ? "#FF0000" : colors.textPrimary}
             fontSize="8"
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
          x2={100 + 60 * Math.cos((180) * Math.PI / 180)}
          y2={150 - 60 * Math.sin((180) * Math.PI / 180)}
          stroke="#FF0000"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <Circle
          cx="100"
          cy="150"
          r="5"
          fill="#FF0000"
        />
      </G>
    )}
    <SvgText
      x="100"
      y="170"
      fill={colors.textPrimary}
      fontSize="10"
      fontWeight="bold"
      textAnchor="middle"
    >
      HIGHEST
    </SvgText>
  </Svg>
</View>
      </View>

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
    </View>
  );
};

export default CarSkillsDashboard;