import { NotFound } from '@/components/ui';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Not found',
  description: 'Page has not been found',
};

export default async function NotFoundPage() {
  return <NotFound />;
}
