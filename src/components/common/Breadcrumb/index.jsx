import React from "react";
import { ChevronRight } from "react-feather";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

const Breadcrumb = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <div className="p-3 flex items-center gap-2 h-10">
      {breadcrumbs.map(({ breadcrumb }, index) => {
        if (breadcrumb?.props?.children === "Home") {
          return;
        }

        return (
          <div
            key={breadcrumb?.key}
            className="font-medium text-sm flex items-center gap-2 text-secondary"
          >
            <Link to={breadcrumb?.key} className="text-sm">
              {breadcrumb}
            </Link>
            {breadcrumbs.length - 1 > index && (
              <ChevronRight className="w-4 text-secondary" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
