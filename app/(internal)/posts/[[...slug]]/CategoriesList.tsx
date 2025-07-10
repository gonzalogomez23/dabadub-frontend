import AsideLink from "@components/AsideLink";
import { fetchFromApi } from "@/lib/fetchFromApi";
import { PostCategory } from "@app/types";

export default async function PostCategoriesList({ slug = '' }: { slug?: string }) {
    const categoriesRes = await fetchFromApi<{ data: PostCategory[] }>('/categories');
    const categories = categoriesRes.data;

    return (
            <div className="w-full flex flex-col gap-2">
                <AsideLink url="/posts" pageSlug={slug}>
                    All posts
                </AsideLink>
                {categories.map(category => (
                    <AsideLink
                        url={`/posts/${category.slug}`}
                        key={category.id}
                        pageSlug={slug}
                        categorySlug={category.slug}
                    >
                        {category.title}
                    </AsideLink>
                ))}
            </div>
    )
}
