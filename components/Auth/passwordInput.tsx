import { TextInput } from 'react-native';
import tw from 'twrnc';

const PasswordInput = ({ value, onChangeText, hasError }: any) => (
  <TextInput
    placeholder="Password"
    placeholderTextColor="#999"
    secureTextEntry
    value={value}
    onChangeText={onChangeText}
    autoCapitalize="none"
    style={[
      tw`bg-[#101010] text-white p-4 rounded-xl mb-5 border border-[#2C2C2C]`,
      hasError ? tw`border-red-500` : null,
    ]}
  />
);
export default PasswordInput;
