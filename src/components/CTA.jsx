import { LiveOrb } from "@/components/ui/live-orb"
import { Button } from "@/components/ui/button"
import { CanvasText } from "@/components/ui/canvas-text"
import { ArrowRightIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import useAuthHomeRedirect from "@/hooks/useAuthHomeRedirect";
import {cn} from "@/lib/utils";

export default function CTA() {

	const isLoading = !useAuthHomeRedirect();
	if(isLoading) {
		return <h1>Loading...</h1>
	}
	return (
		<section className="flex flex-col items-center gap-2 mt-12 md:mt-20">
			<h2
				className={cn(
					"group relative mx-auto text-center leading-20 font-bold tracking-tight text-balance text-neutral-600 dark:text-neutral-700 text-4xl md:text-5xl",
				)}
			>
				<CanvasText
					text="BlogSphere"
					backgroundClassName="bg-blue-600 dark:bg-blue-700 text-center"
					colors={[
						"rgba(46, 134, 171, 1)",
						"rgba(46, 134, 171, 0.9)",
						"rgba(46, 134, 171, 0.8)",
						"rgba(46, 134, 171, 0.7)",
						"rgba(46, 134, 171, 0.6)",
						"rgba(46, 134, 171, 0.5)",
						"rgba(46, 134, 171, 0.4)",
						"rgba(46, 134, 171, 0.3)",
						"rgba(46, 134, 171, 0.2)",
						"rgba(46, 134, 171, 0.1)",
					]}
					lineGap={8}
					animationDuration={10}
				/>

				<span className="block font-semibold text-neutral-500 dark:text-neutral-500 text-xl md:text-2xl">
					where every post finds its orbit
				</span>
			</h2>
			<LiveOrb variant="webgl" colors={["#1A5276", "#2ECC71", "#AED6F1"]} />
			<Link to="/login">
				<Button size="lg">
					Get Started
					<ArrowRightIcon weight="bold" className="size-4" />
				</Button>
			</Link>
		</section>
	);
}
