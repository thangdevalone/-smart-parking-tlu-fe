import HeroSection from '@/views/landing-page/components/hero-section.tsx';
import ClientSection from '@/views/landing-page/components/client-section.tsx';
import { SphereMask } from '@/components/ui/sphere-mask.tsx';
import PricingSection from '@/views/landing-page/components/pricing-section.tsx';
import CallToActionSection from '@/views/landing-page/components/cta-section.tsx';
import { Particles } from '@/components/ui/particles.tsx';
import { SiteHeader } from '@/views/landing-page/components/site-header.tsx';
import { useTheme } from '@/components/providers/theme-provider.tsx';

export default function LandingPage() {
  const { theme } = useTheme();
  return (<>
    <SiteHeader />
    <HeroSection />
    <ClientSection />
    <SphereMask />
    <PricingSection />
    <CallToActionSection />
    <Particles
      className="absolute inset-0 -z-10"
      quantity={300}
      ease={70}
      size={0.1}
      staticity={30}
      color={theme === 'dark' ? '#ffffff' : '#000000'}
    />
  </>);
}
