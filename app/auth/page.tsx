import { redirect } from 'next/navigation';

export default function RedirectLogin() {
  redirect('/auth/login');
  return <></>;
}
