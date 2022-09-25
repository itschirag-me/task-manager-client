import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { Edit } from "react-feather";
import { Link } from "react-router-dom";

export default function MenuComp({
  children,
  MenuLink = [],
  MenuItems = [],
  className,
  classNameElement,
  ...props
}) {
  return (
    <Menu as="div" className="relative inline-block text-left z-30">
      <Menu.Button>{children}</Menu.Button>
      {MenuLink.length > 0 && (
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={[
              "absolute right-2.5 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded bg-white shadow ring-1 ring-black ring-opacity-5 focus:outline-none",
              className,
            ].join(" ")}
          >
            <Menu.Items>
              {MenuLink.map((Item) => (
                <Menu.Item
                  as={Link}
                  key={Item?.id}
                  to={Item?.href}
                  className="flex items-center p-3 gap-2 text-gray-400"
                >
                  {Item?.icon}
                  {Item?.label}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu.Items>
        </Transition>
      )}

      {MenuItems.length > 0 && (
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={[
              "absolute -right-20 md:right-2 lg:right-2 xl:right-2 mt-2 origin-top-right divide-y divide-gray-100 rounded bg-white shadow ring-1 ring-black ring-opacity-5 focus:outline-none",
              className,
            ].join(" ")}
          >
            <h2 className="text-gray-500 p-2 px-4 bg-gray-50 font-medium">
              Notification
            </h2>
            <Menu.Items>
              {MenuItems.map((Item, index) => {
                return (
                  <Menu.Item
                    as={"div"}
                    key={Item?.id}
                    className={classNameElement}
                  >
                    {Item.element}
                  </Menu.Item>
                );
              })}
            </Menu.Items>
          </Menu.Items>
        </Transition>
      )}
    </Menu>
  );
}
