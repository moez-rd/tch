'use client';

interface Props {
  children: React.ReactNode;
}

export default function Providers(props: Props) {
  const { children } = props;

  return <>{children}</>;
}
