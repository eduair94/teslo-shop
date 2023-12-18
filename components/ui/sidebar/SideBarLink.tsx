import { useUIStore } from '@/store';
import Link from 'next/link';
import { ComponentType, FC } from 'react';
interface Props {
  Icon: ComponentType<{ size: number }>;
  title: string;
  href?: string;
  onClick?: () => void;
}

export const SideBarLink: FC<Props> = ({ Icon, title, href, onClick }) => {
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  const onClickAction = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (onClick) onClick();
    closeMenu();
  };

  return (
    <Link
      onClick={onClick ? onClickAction : closeMenu}
      href={href || '#'}
      className="nav-link"
    >
      <Icon size={30} />
      <span className="ml-3 text-xl">{title}</span>
    </Link>
  );
};
