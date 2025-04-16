import { useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import tw from 'twrnc';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import EmailInput from '@/components/Auth/emailInput';
import PasswordInput from '@/components/Auth/passwordInput';
import SubmitButton from '@/components/Auth/submitButton';
import { colors } from '@/constants/colors'; 
import { useLogin } from '@/context/authContext';

const { height } = Dimensions.get('window');

const Login = () => {
  const translateY = useSharedValue(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin, error } = useLogin();

  const handleSubmit = () => handleLogin(email, password);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <KeyboardAvoidingView
      style={tw`flex-1 bg-[${colors.primaryBackground}]`}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={tw`flex-grow`}
        keyboardShouldPersistTaps="handled"
      >
        <View style={tw`h-[30%] bg-[${colors.primaryBackground}] items-center justify-center`}>
          <Text style={tw`text-[${colors.textPrimary}] text-[3rem] font-bold text-center`}>
            DashQL
          </Text>
          <Text style={tw`text-[${colors.textSecondary}] text-sm tracking-widest mt-2`}>
            DATA ON DISPLAY
          </Text>
        </View>

        <Animated.View
          style={[
            tw`bg-[${colors.secondaryBackground}] p-6 rounded-tl-[4rem] rounded-tr-[4rem] mt-10`,
            { height: height / 1.5 },
            animatedStyle,
          ]}
        >
          <Text style={tw`text-[${colors.textPrimary}] text-[1.5rem] text-center mb-8 font-bold tracking-wider`}>
            Login
          </Text>

          <EmailInput
            value={email}
            onChangeText={setEmail}
            hasError={!!error}
          />

          <PasswordInput
            value={password}
            onChangeText={setPassword}
            hasError={!!error}
          />

          {error.length > 0 && (
            <Text style={tw`text-[${colors.errorText}] text-sm text-center`}>
              {error}
            </Text>
          )}

          <SubmitButton onPress={handleSubmit} />
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
