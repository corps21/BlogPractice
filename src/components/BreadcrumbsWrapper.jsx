import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
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

    path.split("/").reduce((acc, curr, idx) => {
      
      if (idx === 0) {
        result.push({ name: "Home", path: "/" });
        return "";
      } 
      
      else if (!curr) return "";
      
      else {
        let name = curr
          .split("-")
          .map((str) => str[0].toUpperCase() + str.slice(1))
          .join(" ");
        let path = acc + "/" + curr;
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
              <>
                {idx !== 0 ? <BreadcrumbSeparator /> : <></>}
                <BreadcrumbItem>
                  {idx < arr.length - 1 ? (
                    <BreadcrumbLink asChild>
                      <Link to={path}>{name}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage asChild>
                      <Link to={path}>{name}</Link>
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}
