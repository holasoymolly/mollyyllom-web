import { Banner } from './Banner';
import { Marquee } from './Marquee';
import { MediaSection } from './MediaSection';
import { Services } from './Services';
import { PortfolioGrid } from '../../../components/PortfolioGrid/PortfolioGrid';
import { QuoteBanner } from '../../../components/QuoteBanner';
import { HOME_GRID_LIMIT } from '../../../projects';

export const Main = () => {
  return (
    <main className="bg-stone-200">
      <Banner />
      <Marquee />
      <MediaSection />
      <PortfolioGrid limit={HOME_GRID_LIMIT} />
      <Services />
      <QuoteBanner />
    </main>
  );
};