import { FC, ReactNode } from 'react';
import { Navbar, SideMenu } from '../ui';
interface Props {
  children: ReactNode;
}
export const ShopLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <SideMenu />
      <main
        style={{ margin: '80px auto', maxWidth: '1440px', padding: '0px 30px' }}
      >
        {children}
      </main>
      <footer></footer>
    </>
  );
};
