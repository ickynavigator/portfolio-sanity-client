import { PortableText } from '@portabletext/react';
import ptCustomComponents from '../lib/portableText';

interface IEnhancedPortableText {
  value: any;
}

const EnhancedPortableText = ({ value }: IEnhancedPortableText) => {
  return <PortableText value={value} components={ptCustomComponents} />;
};

export default EnhancedPortableText;
