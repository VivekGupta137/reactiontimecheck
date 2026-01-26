import { nmsTransitionTo } from "@/stores/number-memory/nm-state";
import React, { useEffect } from "react";

const NMStarted = () => {
    useEffect(() => {
        // reset everything and go to seq-disp state
        nmsTransitionTo("seq-disp");
    }, []);
    return <div></div>;
};

export default NMStarted;
