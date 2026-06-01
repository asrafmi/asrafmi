import PageClient from '@/components/PageClient';
import Articles from '@/components/sections/Articles';

export default function Home() {
  return (
    <PageClient articles={<Articles />} />
  );
}
