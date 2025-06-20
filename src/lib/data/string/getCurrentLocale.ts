export function getCurrentLocale(pathname: string) {
  const segments = pathname.split('/');
  return segments[1] || 'en';
}