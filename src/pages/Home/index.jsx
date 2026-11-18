import Hero from './Hero';
import SocialLinks from './SocialLinks';
import FeaturedProjects from './FeaturedProjects';
import { getProfile } from '../../services/api';
import { useQuery } from '../../hooks/useQuery';

export default function Home() {
  // While loading, or if the request fails / returns nothing, Hero shows its translated defaults.
  const { data: profile } = useQuery(getProfile);
  return (
    <>
      <Hero profile={profile} />
      <SocialLinks />
      <FeaturedProjects />
    </>
  );
}
