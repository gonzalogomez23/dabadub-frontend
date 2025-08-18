import Image from 'next/image';
import Link from 'next/link';

interface PostItemProps {
  post: {
    slug: string;
    title: string;
    description: string;
    image?: string;
    category?: {
      title: string;
    };
  };
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <Link
        href={`/post/${post.slug}`}
        className="flex group overflow-hidden h-fit border-b-2 border-primary/15 last:border-none gap-3 lg:px-4 py-4 lg:py-6 px-2"
    >
        <div className="flex flex-col grow max-h-80 gap-3">
            {post.category && (
                <div className="flex">
                    <span className="flex w-fit rounded-full items-center justify-center text-primary text-sm font-headings bg-secondary/10 px-3 py-1">
                    {post.category.title}
                    </span>
                </div>
            )}
            <h5 className="text-2xl font-semibold font-headings tracking-tight text-gray-900">
            {post.title}
            </h5>
            <p className="text-gray-700">{post.description}</p>
        </div>
        {post.image && (
            <Image
              src={post.image}
              alt={post.title}
              className="h-40 aspect-[4/3] object-cover rounded-lg"
              width={0}
              height={0}
            />
        )}
    </Link>
  );
};

export default PostItem;
