import { ProfileInfo } from '@/src/features/profile/profile-info';
import Image from 'next/image';
import React from 'react';

export const ProfileWidget = () => {
  return (
    <div className='container m-auto flex flex-col justify-center items-center gap-5'>
      <Image src='/user.png' width={200} height={200} alt='user' />
      <ProfileInfo />
    </div>
  );
};
