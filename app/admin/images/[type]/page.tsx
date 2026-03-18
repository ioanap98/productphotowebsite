import Link from 'next/link';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import ImageManagerClient from './image-manager-client';

type ImageBucket = 'web' | 'mobile' | 'portfolio';

const PAGE_META: Record<ImageBucket, { title: string; subtitle: string }> = {
  web: {
    title: 'Manage Web Hero Images',
    subtitle: 'Desktop hero slider image library',
  },
  mobile: {
    title: 'Manage Mobile Hero Images',
    subtitle: 'Mobile hero slider image library',
  },
  portfolio: {
    title: 'Manage Portfolio Images',
    subtitle: 'Portfolio gallery image library',
  },
};

function isImageBucket(value: string): value is ImageBucket {
  return value === 'web' || value === 'mobile' || value === 'portfolio';
}

export default async function AdminImageManagerPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const cookieStore = await cookies();
  const isAuth = cookieStore.get('admin-auth')?.value;

  if (isAuth !== 'true') {
    redirect('/login');
  }

  const { type } = await params;

  if (!isImageBucket(type)) {
    notFound();
  }

  const meta = PAGE_META[type];

  return (
    <main className="brand-page-background min-h-screen py-12 md:py-16">
      <div className="mx-auto w-full max-w-7xl px-6">
        <section className="brand-soft-panel mb-8 rounded-3xl p-8 md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-purple-700/80">Admin Image Manager</p>
              <h1 className="mt-3 text-3xl font-light md:text-5xl">{meta.title}</h1>
              <p className="mt-2 text-sm text-gray-600">{meta.subtitle}</p>
              <div className="brand-gradient-line mt-5 h-px w-28" />
            </div>
            <Link
              href="/admin"
              className="border border-white/80 bg-white/70 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-white"
            >
              Back to Admin
            </Link>
          </div>
        </section>

        <section className="brand-soft-panel rounded-3xl p-6 md:p-8">
          <ImageManagerClient bucket={type} />
        </section>
      </div>
    </main>
  );
}
