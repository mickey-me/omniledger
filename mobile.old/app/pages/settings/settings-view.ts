import {Observable} from "tns-core-modules/data/observable";
import { ServerIdentity } from "~/lib/cothority/network";
import {Data, gData} from "~/lib/dynacred/Data";
import Log from "~/lib/cothority/log";
import {adminView} from "~/pages/settings/settings-page";
import {ObservableArray} from "tns-core-modules/data/observable-array";
import {Defaults} from "~/lib/dynacred/Defaults";

export class AdminViewModel extends Observable {
    nodes:ObservableArray<Node> = new ObservableArray();
    testing:boolean = Defaults.TestButtons;

    constructor(d: Data) {
        super();
        this.admin = new Admin(d.continuousScan);
        this.updateNodes();
    }

    updateNodes(){
        this.nodes.splice(0);
        gData.bc.config.roster.list.forEach(si => this.nodes.push(new Node(si)));
    }

    set admin(value: Admin) {
        this.set("_admin", value);
    }

    get admin(): Admin {
        return this.get("_admin");
    }
}

export class Admin {
    constructor(public continuousScan: boolean) {
    }
}

export class Node {
    address: string;
    status: string;

    constructor(si: ServerIdentity) {
        this.address = si.address;
        this.status = "unknown";

        let s = new WebSocket(si.toWebsocket(""), RequestPath.STATUS);
        s.send(RequestPath.STATUS_REQUEST, DecodeType.STATUS_RESPONSE, {})
            .then(response =>{
                this.status = response.serveridentity.description + ": OK";
                adminView.nodes.splice(0, 0);
            })
            .catch(err =>{
                this.status = "Error: " + err;
                adminView.nodes.splice(0, 0);
            })
    }
}