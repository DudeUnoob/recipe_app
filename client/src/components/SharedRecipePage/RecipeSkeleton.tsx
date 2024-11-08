// CardHeader, CardTitle
import { Card, CardContent, } from "../../components/ui/card"
import { Skeleton } from "../ui/skeleton"

function RecipeSkeleton() {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="overflow-hidden">
          <Skeleton className="h-64 md:h-96 w-full" />
          <CardContent className="p-6">
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/4 mb-6" />
            <div className="flex flex-wrap gap-4 mb-6">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Skeleton className="h-8 w-1/2 mb-4" />
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-4 w-full" />
                  ))}
                </div>
              </div>
              <div>
                <Skeleton className="h-8 w-1/2 mb-4" />
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-4 w-full" />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  export default RecipeSkeleton