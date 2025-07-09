// app/blog/page.tsx
import Link from 'next/link'

export default function BlogPage() {
  const posts = [
    {
      title: "2025 ATS Keywords: What Recruiters Look For",
      slug: "ats-keywords-2025",
      excerpt: "Discover the most important keywords to include in your resume...",
      date: "2025-01-15",
    },
    {
      title: "Why 95% of Resumes Fail ATS Screening",
      slug: "why-resumes-fail-ats",
      excerpt: "Learn the common mistakes that get resumes rejected...",
      date: "2025-01-10",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">ATS Resume Guide</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="border-b pb-8">
            <h2 className="text-2xl font-bold mb-2">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <time className="text-sm text-gray-500">{post.date}</time>
          </article>
        ))}
      </div>
    </div>
  );
}
