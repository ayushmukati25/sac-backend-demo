import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center sm:px-6">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="text-foreground/70">The page you are looking for does not exist.</p>
      <Link href="/" className="text-sm font-medium underline underline-offset-4">
        Back to home
      </Link>
    </section>
  );
}
