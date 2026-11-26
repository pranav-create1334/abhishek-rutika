import { Countdown } from './Countdown';
import { Events } from './Events';
import { Families } from './Families';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { Invitation } from './Invitation';
import { PhotoMoment } from './PhotoMoment';
import { Venue } from './Venue';

/**
 * The full invitation is loaded only after the opening seal is tapped, so the
 * first paint on a phone only has to render the cover.
 */
export function InvitationContent() {
  return (
    <div className="min-h-[100svh] bg-[#23060d]">
      <div className="invite-card paper">
        <Hero />
        <Invitation />
        <PhotoMoment />
        <Countdown />
        <Events />
        <Venue />
        <Families />
        <Footer />
      </div>
    </div>
  );
}

