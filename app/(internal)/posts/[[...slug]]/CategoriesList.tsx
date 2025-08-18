import AsideLink from "@components/AsideLink";
import { PostCategory } from "@app/types";

export default  function CategoriesList({slug, categories}: {slug: string, categories: PostCategory[]}) {

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
