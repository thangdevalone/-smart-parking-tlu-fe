import './not-found.scss';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils.ts';
import { buttonVariants } from '@/components/ui/button.tsx';

const Stars = () => (
  <div className="container-nf container-star">
    {[...Array(30)].map((_, i) => (
      <div key={i} className={`star star-1 ${i >= 20 ? 'star-2' : ''}`}></div>
    ))}
  </div>
);

const Birds = () => (
  <div className="container-nf container-bird">
    {[...Array(10)].map((_, i) => (
      <div key={i} className="bird bird-anim">
        <div className="bird-container">
          <div className="wing wing-left">
            <div className="wing-left-top"></div>
          </div>
          <div className="wing wing-right">
            <div className="wing-right-top"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const Title = () => (
    <div className="container-title">
      <div className="title">
        <div className="number">4</div>
        <div className="moon">
          <div className="face">
            <div className="mouth"></div>
            <div className="eyes">
              <div className="eye-left"></div>
              <div className="eye-right"></div>
            </div>
          </div>
        </div>
        <div className="number">4</div>
      </div>
      <div className="subtitle">Oops. Looks like you took a wrong turn.</div>
      <Link to="/" replace={true} className={cn('mt-5 !bg-white border-none !text-black', buttonVariants({ variant: 'outline' }))}>Go home</Link>
    </div>
  )
;

const App = () => (
  <>
    <Stars />
    <Birds />
    <Title />
  </>
);

export default App;
