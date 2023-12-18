import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'SEO Title',
  description: 'SEO Title',
};
export default async function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect('/auth/login?redirectTo=/checkout/address');
  }
  return <>{children}</>;
}
