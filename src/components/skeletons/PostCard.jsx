import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

export function PostCardSkeleton() {
    return (
        <Card className="w-full max-w-sm mx-auto">
            <CardHeader>
                <Skeleton className="aspect-video w-full" />
            </CardHeader>

            <CardContent className="flex flex-col gap-2">
                <Skeleton className="h-6 w-4/6" />

                <div className="flex gap-2 items-center">
                    <Skeleton className="size-10 rounded-full" />
                    <Skeleton className="h-6 w-1/3" />
                </div>
            </CardContent>
        </Card>
    )
}


        

