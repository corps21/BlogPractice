import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useEffect, useState, Fragment } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function BreadcrumbsWrapper() {
  let location = useLocation();
  const [routes, setRoutes] = useState("");

  useEffect(() => {
    setRoutes(location.pathname);
  }, [location]);

  function parsePathIntoBreadCrumbs(path) {
    let result = [];
    let isPost = false;
    path.split("/").reduce((acc, curr, idx, arr) => {
      if (idx === 0) {
        result.push({ name: "Home", path: "/" });
        return "";
      } 
      else if (!curr) return "";
      else {
        let name = curr;
        let path = acc + "/" + curr;
        
        if (curr === "edit-post" || curr === "post") {
          isPost = true;
          if (curr === "post") return path
          else path = "#"
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
    <>
      <Breadcrumb>
        <BreadcrumbList>
          {parsePathIntoBreadCrumbs(routes).map(({ name, path }, idx, arr) => {
            return (
              <Fragment key={idx}>
                {idx !== 0 ? <BreadcrumbSeparator /> : <></>}
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
    </>
  );
}
