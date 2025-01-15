export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <div
        className="fixed inset-0 w-full h-full animate-gradient"
        style={{
          backgroundSize: "200% 200%",
          backgroundImage: `
                        linear-gradient(
                            45deg,
                            rgba(15,23,42,0.98),   /* slate-900 */
                            rgba(15,23,42,0.95),   /* slate-900 */
                            rgba(15,23,42,0.95),   /* slate-900 */
                            rgba(30,41,59,0.98)    /* slate-800 */
                        )
                    `,
        }}
      >
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `
                            radial-gradient(circle at 15% 15%, rgba(51,65,85,0.2) 0%, transparent 35%),
                            radial-gradient(circle at 85% 85%, rgba(71,85,105,0.2) 0%, transparent 35%)
                        `,
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(15,23,42,0.2))]" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
