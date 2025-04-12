import { TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';

const SubmitButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity
    style={tw`bg-[#8B0000] p-4 rounded-full items-center shadow-lg shadow-black m-5`}
    onPress={onPress}
  >
    <Text style={tw`text-white font-bold text-base uppercase`}>Start Engine</Text>
  </TouchableOpacity>
);
export default SubmitButton;
