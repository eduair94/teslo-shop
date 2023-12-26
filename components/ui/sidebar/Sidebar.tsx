'use client';
import { logout } from '@/actions';
import { useUIStore } from '@/store';
import clsx from 'clsx';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from 'react-icons/io5';
import { SideBarLink } from './SideBarLink';

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);
  const setLoadingGlobal = useUIStore((state) => state.setLoading);
  const router = useRouter();

  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';
  const isAdmin = session?.user.role === 'admin';

  const sessionUpdate = async () => {
    await getSession();
  };

  useEffect(() => {
    sessionUpdate();
  }, []);

  const onClickLogout = () => {
    setLoadingGlobal(true);
    logout().then(() => {
      sessionUpdate().then(() => {
        router.refresh();
        setLoadingGlobal(false);
      });
    });
  };

  return (
    <>
      {/* Background black */}
      {isSideMenuOpen && (
        <>
          <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"></div>
          <div
            onClick={closeMenu}
            className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
          ></div>
        </>
      )}

      <nav
        className={clsx(
          'fixed p-5 right-0 top-0 w-screen md:w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
          { 'translate-x-full': !isSideMenuOpen },
        )}
      >
        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeMenu}
        />

        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {isAuthenticated ? (
          <>
            <SideBarLink
              Icon={IoPersonOutline}
              title="Profile"
              href="/profile"
            />
            <SideBarLink Icon={IoTicketOutline} title="Orders" href="/orders" />
            <SideBarLink
              onClick={onClickLogout}
              Icon={IoLogOutOutline}
              title="Logout"
            />
          </>
        ) : (
          !isLoading && (
            <SideBarLink
              Icon={IoLogInOutline}
              title="Login"
              href="/auth/login"
            />
          )
        )}

        {isAdmin && (
          <>
            <div className="w-full h-px bg-gray-200 my-10"></div>
            <SideBarLink
              Icon={IoShirtOutline}
              title="Products"
              href="/admin/products"
            />
            <SideBarLink
              Icon={IoTicketOutline}
              title="Orders"
              href="/admin/orders"
            />
            <SideBarLink
              Icon={IoPeopleOutline}
              title="Users"
              href="/admin/users"
            />
          </>
        )}
      </nav>
    </>
  );
};
