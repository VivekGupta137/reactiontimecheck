import { $nmState } from "@/stores/number-memory/nm-state";
import { useStore } from "@nanostores/react";
import React from "react";
import NMIdle from "./state-cards/NMIdle";
import NMStarted from "./state-cards/NMStarted";
import NMSeqDisp from "./state-cards/NMSeqDisp";
import NMSeqInp from "./state-cards/NMSeqInp";
import NMComplete from "./state-cards/NMComplete";

const NMActiveState = () => {
    const nmState = useStore($nmState);
    // const nmState = "complete";
    return (
        <>
            {nmState === "idle" && <NMIdle />}
            {nmState === "started" && <NMStarted />}
            {nmState === "seq-disp" && <NMSeqDisp />}
            {nmState === "seq-inp" && <NMSeqInp />}
            {nmState === "complete" && <NMComplete />}
        </>
    );
};

export default NMActiveState;
