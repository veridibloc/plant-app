import {atom} from "jotai";

export interface RoutingState {
    status: "routingStarted" | "routingEnded"
}
export const routerAtom = atom<RoutingState>({ status: "routingEnded"} )