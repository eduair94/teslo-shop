'use client';
import { logout } from '@/actions';
import { useUIStore } from '@/store';
import clsx from 'clsx';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';
import { useEffect, useState } from 'react';
import {
  IoBodyOutline,
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoManOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoShirtOutline,
  IoTicketOutline,
  IoWomanOutline,
} from 'react-icons/io5';
import { SearchBar } from '../search-bar/SearchBar';
import { SideBarLink } from './SideBarLink';

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);
  const setLoadingGlobal = useUIStore((state) => state.setLoading);
  const router = useRouter();
  const [isCategoriesOpen, setCategoriesOpen] = useState(false);

  const toggleCategories = () => {
    setCategoriesOpen(!isCategoriesOpen);
  };

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
        NProgress.done();
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
          'fixed p-5 right-0 top-0 w-screen md:w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300 overflow-auto',
          { 'translate-x-full': !isSideMenuOpen },
        )}
      >
        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeMenu}
        />

        <div className="relative mt-14 pt-3">
          <SearchBar />
        </div>

        <div className="relative">
          <button
            onClick={toggleCategories}
            className="flex items-center justify-between w-full nav-link"
          >
            <span className="ml-3 text-xl">Categories</span>
            {isCategoriesOpen ? (
              <IoChevronUpOutline size={30} />
            ) : (
              <IoChevronDownOutline size={30} />
            )}
          </button>
          <div
            className={clsx(
              'flex flex-col transition-all duration-300 transform origin-top overflow-hidden nav-link-menu pl-3',
              {
                'scale-y-100 opacity-100 h-auto': isCategoriesOpen,
                'scale-y-0 opacity-0 pointer-events-none h-0':
                  !isCategoriesOpen,
              },
            )}
          >
            <SideBarLink Icon={IoManOutline} title="Men" href="/gender/men" />
            <SideBarLink
              Icon={IoWomanOutline}
              title="Women"
              href="/gender/women"
            />
            <SideBarLink Icon={IoBodyOutline} title="Kids" href="/gender/kid" />
          </div>
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
