import Link from "next/link";

const Blogs = [
  {
    id: 1,
    slug: "building-activities-with-workflow-builder",
    title: "Team Building Activities for Work That Actually Improve Productivity",
    excerpt:
      "Learn how to build online activities with the help of tool",
  },
  {
    id: 2,
    slug: "why-your-business-needs-one",
    title: "What is a Workflow Builder and Why Your Business Needs One",
    excerpt:
      "What is a Workflow Builder?",
  },
  {
    id: 3,
    slug: "how-an-online-workflow-builder-simplifies",
    title: "How an Online Workflow Builder Simplifies Business Operations",
    excerpt:
      "As businesses grow, processes become more complicated. Tasks start depending on each other, approvals slow things down, and small errors turn into bigger problems. This is where an online workflow builder can make a noticeable difference.",
  },
  {
    id: 4,
    slug: "the-fifth-discipline",
    title: "The Fifth Discipline and the Idea of a Learning Organization Explained Simply",
    excerpt:
      "Many organizations focus on short-term results — deadlines, targets, and outputs. But the companies that truly grow long-term are those that continuously learn and adapt. This idea is deeply explored in the book The Fifth Discipline.",
  },
];

const BlogsPage = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 py-20">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog</h1>
        <p className="text-gray-600">Latest articles and insights</p>
      </header>

      <section>
        <ul className="space-y-8">
          {Blogs.map((post) => (
            <li key={post.id}>
              <article className="border-b border-gray-200 pb-8">
                <Link href={`/blogs/${post.slug}`}>
                  <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 mb-2">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-600 mb-3">{post.excerpt}</p>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default BlogsPage;
