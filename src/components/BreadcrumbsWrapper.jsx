import { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BreadcrumbsWrapper() {
	const location = useLocation();
	const [routes, setRoutes] = useState("");

	useEffect(() => {
		setRoutes(location.pathname);
	}, [location]);

	function parsePathIntoBreadCrumbs(path) {
		const result = [];
		let isPost = false;
		path.split("/").reduce((acc, curr, idx, arr) => {
			if (idx === 0) {
				result.push({ name: "Home", path: "/" });
				return "";
			} else if (!curr) return "";
			else {
				let name = curr;
				let path = `${acc}/${curr}`;

				if (curr === "edit-post" || curr === "post") {
					isPost = true;
					if (curr === "post") return path;
					else path = "#";
				}

				if (idx !== arr.length - 1 || !isPost) {
					name = name
						.split("-")
						.map((str) => str[0].toUpperCase() + str.slice(1))
						.join(" ");
				}

				result.push({ name, path });
				return path;
			}
		}, "");
		return result;
	}

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{parsePathIntoBreadCrumbs(routes).map(({ name, path }, idx, arr) => {
					return (
						<Fragment key={name}>
							{idx !== 0 ? <BreadcrumbSeparator /> : null}
							<BreadcrumbItem>
								{idx < arr.length - 1 ? (
									<BreadcrumbLink asChild={true}>
										<Link to={path}>{name}</Link>
									</BreadcrumbLink>
								) : (
									<BreadcrumbPage asChild={true}>
										<Link to={path}>{name}</Link>
									</BreadcrumbPage>
								)}
							</BreadcrumbItem>
						</Fragment>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
