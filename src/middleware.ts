import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
export default createMiddleware({
  ...routing,
  // Disable automatic locale detection to always default to Catalan
  localeDetection: false,
  // Alternative: you could also force specific behavior
  defaultLocale: 'ca'
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ca|es)/:path*']
};
