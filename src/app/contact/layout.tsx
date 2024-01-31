import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Contact Me`,
};

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return children;
};

export default Layout;
