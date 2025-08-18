import CategoriesList from "./CategoriesList";
import CategoriesListSkeleton from "../components/CategoriesListSkeleton";
import { Suspense } from "react";
import { PostCategory } from "@app/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import PrimaryButton from "@/app/components/PrimaryButton";
import { Bars3Icon } from "@heroicons/react/24/outline";

const CategoriesMenu = async ({slug, categories}: {slug: string, categories: PostCategory[]}) => {
  return (
    <>
        <div className="lg:hidden">
            <Dialog>
                <DialogTrigger asChild>
                    <PrimaryButton variant="secondary">
                        <Bars3Icon className="w-6 h-6" />
                        Categories
                    </PrimaryButton>
                </DialogTrigger>
                <DialogContent className="px-2">
                    <DialogHeader>
                        <DialogTitle className="font-sans text-center">Categories</DialogTitle>
                    </DialogHeader>
                    <CategoriesList slug={slug} categories={categories} />
                </DialogContent>
            </Dialog>
        </div>
        <aside className="w-full lg:w-80 max-w-full hidden lg:block">
            <div className="w-full flex flex-col gap-6 rounded-xl bg-zinc-50 border border-primary/15 p-2">
                <Suspense fallback={<CategoriesListSkeleton />}>
                    <CategoriesList slug={slug} categories={categories} />
                </Suspense>
            </div>
        </aside>
    </>
  )
}

export default CategoriesMenu
