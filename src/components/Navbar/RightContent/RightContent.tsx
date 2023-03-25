import AuthButtons from '@/components/Modal/Auth/AuthButtons';
import AuthModal from '@/components/Modal/Auth/AuthModal';
import { User } from 'firebase/auth';
import React, { useState } from 'react';
import Icons from './Icons';
import UserMenu from './UserMenu';

type RightContentProps = {
  user?: User | null
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  const toggleMenu = () => setMenuOpen(prev => !prev)

  return (
    <div className='flex gap-4'>
      <AuthModal />
      <div className='flex items-center'>
        {user ? <Icons /> : <AuthButtons />}
        <UserMenu user={user} />
      </div>
    </div>
  )
}
export default RightContent;