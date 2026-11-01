import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.scss';
import './social.scss';
import './discovery.scss';
import './identity.scss';
import './projects.scss';
import './circles.scss';
import { SocialProvider } from '../components/SocialProvider';
export const metadata = { title: 'YOUVERSE — A little more you.', description: 'Your people. Your possibilities. A space to become.' };
export default function RootLayout({ children }) { return <html lang="en" suppressHydrationWarning><body><SocialProvider>{children}</SocialProvider></body></html>; }
