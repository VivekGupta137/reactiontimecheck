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

const HeaderNav = () => {
    return (
        <Navbar>
            <NavbarBrand className="gap-2">
                <ClockCheck />
                <p className="font-bold text-inherit">ReactionTimeCheck</p>
            </NavbarBrand>
        </Navbar>
    );
};

export default HeaderNav;
