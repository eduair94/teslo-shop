'use server';
import { updateUserImage } from '@/actions';
import { auth } from '@/auth.config';
import { Title } from '@/components';
import { redirect } from 'next/navigation';
import {
  IoMailOutline,
  IoMailUnreadOutline,
  IoPersonOutline,
} from 'react-icons/io5';
import { ProfileImage } from './ui/ProfileImage';

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) {
    redirect('/auth/login?returnTo=/profile');
  }

  if (!session.user.image) {
    await updateUserImage(session.user.id);
  }

  return (
    <div>
      <Title title="Profile" />
      <div className="max-w-4xl flex items-center h-auto flex-wrap mx-auto my-24 lg:my-10">
        <div
          id="profile"
          className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
        >
          <div className="p-4 md:p-12 text-center lg:text-left">
            <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center overflow-hidden">
              <ProfileImage
                width={192}
                height={192}
                image={session.user.image}
              />
            </div>

            <h1 className="text-3xl font-bold pt-8 lg:pt-0">
              {session.user.name}
            </h1>
            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start gap-2">
              <IoPersonOutline size={15} />
              <span className="capitalize">{session.user.role}</span>
            </p>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start gap-2">
              <IoMailOutline size={15} />
              <span> {session.user.email}</span>
            </p>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start gap-2">
              <IoMailUnreadOutline size={15} />
              <span>
                {session.user.emailVerified
                  ? 'Email verified'
                  : 'Email not verified'}
              </span>
            </p>
          </div>
        </div>
        <div className="hidden lg:block w-full lg:w-2/5 h-[500px]">
          <ProfileImage
            className="rounded-none lg:rounded-lg shadow-2xl object-cover h-full"
            width={500}
            height={500}
            image={session.user.image}
          />
        </div>
      </div>
    </div>
  );
}
