import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
} from "@heroui/react";
import { Clock1, ClockCheck } from "lucide-react";
import Brand from "./Brand";

const HeaderNav = () => {
    return (
        <Navbar>
            <NavbarBrand className="gap-2">
                <Brand />
            </NavbarBrand>
        </Navbar>
    );
};

export default HeaderNav;
