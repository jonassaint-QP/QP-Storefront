// Legal pages get their own layout chrome via LegalLayout — suppress the root shell here.
export default function LegalGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
