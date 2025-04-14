import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { colors } from '@/constants/colors';
import { HeaderProps } from './header.types';
import { useAuth } from '@/context/authContext';
import { AlignLeft, LogOut } from 'lucide-react-native'; 

const Header: React.FC<HeaderProps> = ({ firstName, level, login, email, audits }) => {
  const { logout } = useAuth();

  return (
    <View style={tw`mb-6`}>
      <View style={tw`flex-row`}>
        <TouchableOpacity 
          onPress={logout} 
          style={tw`p-2 absolute mt-[-2.5]`}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <LogOut 
            color={colors.textSecondary} 
            size={23} 
            style={{ transform: [{ rotate: '180deg' }] }} 
          />
        </TouchableOpacity>
        <Text style={[
          tw`text-2xl font-bold flex-1 text-center ml-18`, 
          { color: colors.textPrimary }
        ]}>
          {firstName}'s Dashboard
        </Text>
        <View style={tw`w-16`} />
      </View>
      <ScrollView 
        horizontal={true} 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`flex-grow justify-center`}
      >
        <Text style={[tw`text-sm text-center mt-1`, { color: 'darkgray' }]}>
          Level {level} • Ratio {audits.toFixed(1)} • {login} • {email}
        </Text>
      </ScrollView>
    </View>
  );
};

export default Header;