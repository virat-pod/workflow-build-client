const Blog = async ({ params }) => {
  const { blog } = await params;

  const blogs = {
    "building-activities-with-workflow-builder": {
      title:
        "Team Building Activities for Work That Actually Improve Productivity",
      content:
        "Most companies treat team building like a checkbox activity — a random game, a boring workshop, or a once-a-year outing. But the truth is, effective team building activities for work can directly improve productivity, communication, and even employee retention. The key is not what you do, but how you design it. Why Team Building Matters More Than Ever In modern workplaces, especially with remote and hybrid teams, collaboration doesn’t happen naturally. People work in silos, communication gaps increase, and workflows break down.",
    },
    "why-your-business-needs-one": {
      title: "What is a Workflow Builder and Why Your Business Needs One",
      content:
        "If your team relies on manual processes, scattered tools, or constant follow-ups, you’re already losing time and efficiency. This is exactly where a workflow builder comes in. What is a Workflow Builder? A workflow builder is a tool that allows you to design, automate, and manage processes visually. Instead of handling tasks manually, you define steps once and let the system handle execution.",
    },
    "how-an-online-workflow-builder-simplifies": {
      title: "How an Online Workflow Builder Simplifies Business Operations",
      content:
        "As businesses grow, processes become more complicated. Tasks start depending on each other, approvals slow things down, and small errors turn into bigger problems. This is where an online workflow builder can make a noticeable difference. Instead of managing everything manually, you create a structured system where work flows automatically.",
    },
    "the-fifth-discipline": {
      title:
        "The Fifth Discipline and the Idea of a Learning Organization Explained Simply",
      content:
        "Many organizations focus on short-term results — deadlines, targets, and outputs. But the companies that truly grow long-term are those that continuously learn and adapt. This idea is deeply explored in the book The Fifth Discipline. What is a Learning Organization? A learning organization is one where people constantly improve their skills, share knowledge, and adapt to change. Instead of reacting to problems, they anticipate and solve them proactively. This concept is especially important in today’s fast-changing business environment.",
    },
  };

  const post = blogs[blog];

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-gray-900">Post not found</h1>
        <a
          href="/blogs"
          className="text-blue-600 hover:underline mt-4 inline-block"
        >
          ← Back to blogs
        </a>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-22 min-h-screen">
      <article>
        <header className="mb-8">
          <a
            href="/blogs"
            className="text-blue-600 hover:underline text-sm mb-4 inline-block"
          >
            {" "}
            ← Back to blogs
          </a>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{post.author}</span>
            <span>·</span>
            <span>{post.readTime}</span>{" "}
          </div>
        </header>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed">{post.content}</p>
        </div>
      </article>
    </main>
  );
};

export default Blog;
