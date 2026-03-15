export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-8"
      style={{
        backgroundColor: "var(--bg-page)",
        color: "var(--text-primary)",
      }}
    >
      <h1 className="font-mono text-2xl font-semibold" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
        $ paste your code. get roasted.
      </h1>
      <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
        // drop your code below and we&apos;ll rate it — brutally honest or full roast mode
      </p>
    </main>
  );
}
