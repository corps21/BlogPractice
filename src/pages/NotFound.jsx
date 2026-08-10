import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";

export default function NotFound() {
	return (
		<section className="flex flex-col items-center p-6 md:mt-26">
			<Card>
				<CardContent className="flex flex-col items-center justify-center h-10/12 md:h-52 lg:h-86 lg:w-lg">
					<Empty>
						<EmptyHeader>
							<EmptyTitle>404 - Not Found</EmptyTitle>
							<EmptyDescription>
								The page you&apos;re looking for doesn&apos;t exist.
								Go back to the <Link href="/">home</Link>
							</EmptyDescription>
						</EmptyHeader>
						<EmptyContent>
							<EmptyDescription>
								Need help? <a href="mailto:majhiswastik21@gmail.com">Contact us</a>
							</EmptyDescription>
						</EmptyContent>
					</Empty>
				</CardContent>
			</Card>
		</section>
	);
}
