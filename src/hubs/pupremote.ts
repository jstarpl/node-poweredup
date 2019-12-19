import { Peripheral } from "@abandonware/noble";

import { IBLEAbstraction } from "../interfaces";

import { LPF2Hub } from "./lpf2hub";

import * as Consts from "../consts";

import Debug = require("debug");
const debug = Debug("pupremote");


/**
 * The PUPRemote is emitted if the discovered device is a Powered UP Remote.
 * @class PUPRemote
 * @extends LPF2Hub
 * @extends Hub
 */
export class PUPRemote extends LPF2Hub {


    public static IsPUPRemote (peripheral: Peripheral) {
        return (
            peripheral.advertisement &&
            peripheral.advertisement.serviceUuids &&
            peripheral.advertisement.serviceUuids.indexOf(Consts.BLEService.LPF2_HUB.replace(/-/g, "")) >= 0 &&
            peripheral.advertisement.manufacturerData &&
            peripheral.advertisement.manufacturerData.length > 3 &&
            peripheral.advertisement.manufacturerData[3] === Consts.BLEManufacturerData.POWERED_UP_REMOTE_ID
        );
    }


    protected _ledPort = 0x34;


    constructor (device: IBLEAbstraction) {
        super(device, PUPRemote.PortMap, Consts.HubType.POWERED_UP_REMOTE);
        debug("Discovered Powered UP Remote");
    }


    public connect () {
        return new Promise(async (resolve, reject) => {
            debug("Connecting to Powered UP Remote");
            await super.connect();
            debug("Connect completed");
            return resolve();
        });
    }


}

export namespace PUPRemote {

    export const PortMap: {[portName: string]: number} = {
        "LEFT": 0,
        "RIGHT": 1
    }

}