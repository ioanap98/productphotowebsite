import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import UploadForm from './UploadForm';
import UploadFormPortfolio from './UploadFormPortfolio';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAuth = cookieStore.get('admin-auth')?.value;

  if (isAuth !== 'true') {
    redirect('/login');
  }

  return (
    <main className="brand-page-background min-h-screen py-12 md:py-16">
      <div className="mx-auto w-full max-w-7xl px-6">
        <section className="brand-soft-panel mb-8 rounded-3xl p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.18em] text-purple-700/80">Admin Dashboard</p>
          <h1 className="mt-3 text-3xl font-light md:text-5xl">Content Upload Studio</h1>
          <div className="brand-gradient-line mt-5 h-px w-28" />
          <p className="mt-6 max-w-3xl text-gray-600">
            Upload and manage hero visuals and portfolio images in one place. Hero images now support
            separate folders for desktop and mobile.
          </p>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <article className="brand-soft-panel rounded-3xl p-6 md:p-8">
            <h2 className="text-2xl font-light">Homepage Hero Images</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Upload large originals and the server will resize and compress them automatically for desktop or mobile.
            </p>
            <div className="brand-gradient-line my-6 h-px w-24" />
            <UploadForm />
          </article>

          <article className="brand-soft-panel rounded-3xl p-6 md:p-8">
            <h2 className="text-2xl font-light">Portfolio Gallery Images</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Upload large originals and the server will optimize them before adding them to the portfolio grid.
            </p>
            <div className="brand-gradient-line my-6 h-px w-24" />
            <UploadFormPortfolio />
          </article>
        </section>

        <section className="brand-soft-panel mt-8 rounded-3xl p-6 md:p-8">
          <h2 className="text-2xl font-light">Manage Existing Images</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600">
            Open dedicated pages to review current uploads and delete any image you no longer want.
          </p>
          <div className="brand-gradient-line my-6 h-px w-24" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/admin/images/web"
              className="border border-white/80 bg-white/70 p-4 text-sm font-medium text-gray-800 transition-colors hover:bg-white"
            >
              Manage Web Hero Images
            </Link>
            <Link
              href="/admin/images/mobile"
              className="border border-white/80 bg-white/70 p-4 text-sm font-medium text-gray-800 transition-colors hover:bg-white"
            >
              Manage Mobile Hero Images
            </Link>
            <Link
              href="/admin/images/portfolio"
              className="border border-white/80 bg-white/70 p-4 text-sm font-medium text-gray-800 transition-colors hover:bg-white"
            >
              Manage Portfolio Images
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
