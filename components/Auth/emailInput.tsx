import { TextInput } from 'react-native';
import tw from 'twrnc';

const EmailInput = ({ value, onChangeText, hasError }: any) => (
  <TextInput
    placeholder="Email"
    placeholderTextColor="#999"
    keyboardType="email-address"
    value={value}
    onChangeText={onChangeText}
    autoCapitalize="none"
    style={[
      tw`bg-[#101010] text-white p-4 rounded-xl mb-4 border border-[#2C2C2C]`,
      hasError ? tw`border-red-500` : null,
    ]}
  />
);
export default EmailInput;
