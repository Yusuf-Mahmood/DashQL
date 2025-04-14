import { View, Text } from 'react-native';
import Svg, { Rect, Defs, LinearGradient, Stop, Text as SvgText } from 'react-native-svg';
import tw from 'twrnc';
import { colors } from '@/constants/colors';
import { AuditRatioProps } from './auditRatio.types';
import { formatSize } from '@/utils/formatSize';

const AuditRatioGauge: React.FC<AuditRatioProps> = ({ totalDown, totalUp, maxAuditSize }) => {
  const auditScale = maxAuditSize > 0 ? maxAuditSize : 1000000;
  return (
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
        <Rect 
          x="10" 
          y={150 - Math.min(totalDown / auditScale * 140, 140)} 
          width="40" 
          height={Math.min(totalDown / auditScale * 140, 140)} 
          rx="5" 
          fill="url(#auditGradient)"
        />
        <Rect 
          x="60" 
          y={150 - Math.min(totalUp / auditScale * 140, 140)} 
          width="40" 
          height={Math.min(totalUp / auditScale * 140, 140)} 
          rx="5" 
          fill="url(#auditGradient)"
        />
        <SvgText x="30" y="165" fill={colors.textPrimary} fontSize="10" textAnchor="middle">
          Received
        </SvgText>
        <SvgText x="80" y="165" fill={colors.textPrimary} fontSize="10" textAnchor="middle">
          Done
        </SvgText>
        <SvgText x="30" y="180" fill={colors.textPrimary} fontSize="12" fontWeight="bold" textAnchor="middle">
          {formatSize(totalDown)}
        </SvgText>
        <SvgText x="80" y="180" fill={colors.textPrimary} fontSize="12" fontWeight="bold" textAnchor="middle">
          {formatSize(totalUp)}
        </SvgText>
      </Svg>
    </View>
  );
};

export default AuditRatioGauge;