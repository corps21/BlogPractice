import { cva } from "class-variance-authority";

const spinnerVariants = cva(
	"flex-col items-center justify-center absolute top-[35%]",
	{
		variants: {
			show: {
				true: "flex",
				false: "hidden",
			},
		},
		defaultVariants: {
			show: true,
		},
	},
);



export function Loader({ size, show, children, className }) {
	return (
		<span className={spinnerVariants({ show })}>
			<></>
			{children}
		</span>
	);
}
