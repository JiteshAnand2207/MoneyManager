interface AppLogoProps {
  className?: string;
  size?: 'sm' | 'lg';
}

export function AppLogo({ className = '', size = 'sm' }: AppLogoProps) {
  return (
    <img
      src="/luckycoin.png"
      alt="LuckyDragon logo"
      className={`app-logo app-logo-${size} ${className}`.trim()}
    />
  );
}
