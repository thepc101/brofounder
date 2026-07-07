export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, hsl(222, 30%, 5%) 0%, hsl(222, 25%, 8%) 50%, hsl(220, 30%, 6%) 100%)" }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,140,255,0.04),transparent_70%)]" />
      <div className="relative w-full max-w-sm">{children}</div>
    </div>
  );
}
