import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle, Line, G, Text as SvgText, Path } from 'react-native-svg';
import tw from 'twrnc';
import { colors } from '../../constants/colors';

type Skill = {
    name: string;
    amount: number;
  };
  
  interface Props {
    skills: Skill[];
  }
  
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };
  
  const SkillSpeedometer = ({ skills }: Props) => {
    const sortedSkills = [...skills].sort((a, b) => a.amount - b.amount);
    const radius = 100;
    const center = { x: 150, y: 150 };
    const total = sortedSkills.length;
    const angleStep = 180 / (total - 1);
    const maxAmount = Math.max(...sortedSkills.map(skill => skill.amount), 1);
  
    // Create gradient-colored arcs
    const createArcPath = (startAngle: number, endAngle: number, innerRadius: number, outerRadius: number) => {
      const startOuter = polarToCartesian(center.x, center.y, outerRadius, startAngle);
      const endOuter = polarToCartesian(center.x, center.y, outerRadius, endAngle);
      const startInner = polarToCartesian(center.x, center.y, innerRadius, startAngle);
      const endInner = polarToCartesian(center.x, center.y, innerRadius, endAngle);
  
      return [
        `M ${startOuter.x} ${startOuter.y}`,
        `A ${outerRadius} ${outerRadius} 0 0 1 ${endOuter.x} ${endOuter.y}`,
        `L ${endInner.x} ${endInner.y}`,
        `A ${innerRadius} ${innerRadius} 0 0 0 ${startInner.x} ${startInner.y}`,
        `Z`,
      ].join(' ');
    };
  
    return (
      <View style={tw`items-center my-8`}>
        <Text style={[tw`text-xl mb-4 font-bold`, { color: colors.textPrimary }]}>
          Skills Distribution
        </Text>
        <Svg height="300" width="300">
          {/* Background circle */}
          <Circle
            cx={center.x}
            cy={center.y}
            r={radius + 20}
            fill={colors.secondaryBackground}
            stroke={colors.borderColor}
            strokeWidth={2}
          />
          
          {/* Main gauge circle */}
          <Circle
            cx={center.x}
            cy={center.y}
            r={radius}
            fill={colors.primaryBackground}
            stroke={colors.borderColor}
            strokeWidth={2}
          />
  
          {/* Colored arcs representing skill levels */}
          {sortedSkills.map((skill, index) => {
            const angle = index * angleStep;
            const normalizedAmount = (skill.amount / maxAmount) * radius;
            const startAngle = angle - angleStep * 0.4;
            const endAngle = angle + angleStep * 0.4;
            
            // Color interpolation from dark red to bright red based on skill level
            const colorIntensity = Math.min(0.5 + (skill.amount / maxAmount) * 0.5, 1);
            const r = Math.floor(139 * colorIntensity);
            const g = 0;
            const b = 0;
            const fillColor = `rgb(${r}, ${g}, ${b})`;
  
            return (
              <Path
                key={`arc-${index}`}
                d={createArcPath(startAngle, endAngle, radius - normalizedAmount, radius)}
                fill={fillColor}
                stroke={colors.borderColor}
                strokeWidth={0.5}
              />
            );
          })}
  
          {/* Skill lines and labels */}
          <G>
            {sortedSkills.map((skill, index) => {
              const angle = index * angleStep;
              const end = polarToCartesian(center.x, center.y, radius + 10, angle);
              const labelPos = polarToCartesian(center.x, center.y, radius + 25, angle);
              const label = skill.name;
  
              return (
                <G key={`skill-${index}`}>
                  <Line
                    x1={center.x}
                    y1={center.y}
                    x2={end.x}
                    y2={end.y}
                    stroke={colors.textPrimary}
                    strokeWidth="1"
                    strokeOpacity="0.5"
                  />
                  <SvgText
                    fill={colors.textPrimary}
                    fontSize="10"
                    x={labelPos.x}
                    y={labelPos.y}
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    {label}
                  </SvgText>
                </G>
              );
            })}
          </G>
  
          {/* Center circle */}
          <Circle
            cx={center.x}
            cy={center.y}
            r={15}
            fill={colors.buttonBackground}
            stroke={colors.textPrimary}
            strokeWidth={1}
          />
          <SvgText
            x={center.x}
            y={center.y + 5}
            textAnchor="middle"
            fill={colors.textPrimary}
            fontSize="12"
            fontWeight="bold"
          >
            SKILLS
          </SvgText>
        </Svg>
      </View>
    );
  };
  
  export default SkillSpeedometer;