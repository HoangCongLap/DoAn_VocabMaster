import { Outlet } from 'react-router-dom';

import { MdChromeReaderMode, MdHome, MdOutlineLogout } from 'react-icons/md';
import { useAuth } from '~/lib/firebase';
import Logo from '../Logo';
import { FaUnlockAlt } from 'react-icons/fa';

export function Layout2() {
  const handleClick = () => {
    const auth = useAuth();
    if (auth) {
      auth.signOut();
    }
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <div className="h-[10vh] p-4 flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <Logo />
        </div>
        <ul className="menu bg-base-200 sm:menu-horizontal rounded-box">
          <li>
            <a href="/">
              <MdHome size={25} />
              Home
              {/* <span className="badge badge-sm">99+</span> */}
            </a>
          </li>
          <li>
            <a href="/vocabs">
              <MdChromeReaderMode size={25} />
              Vocabs
            </a>
          </li>
          <li>
            <a href="/getalluser">
              <FaUnlockAlt size={25} />
              Use management
            </a>
          </li>
          <li>
            <a onClick={handleClick}>
              <MdOutlineLogout size={25} /> Logout
            </a>
          </li>
        </ul>
      </div>
      <div className="h-[90vh] flex flex-col">
        <div className="flex flex-col flex-1">
          <div className="flex-1">
            <div className="text-center hero-content m-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
