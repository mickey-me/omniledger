import {Observable} from "tns-core-modules/data/observable";
import {Data, gData} from "~/lib/dynacred/Data";
import {ImageSource} from "tns-core-modules/image-source";
import {topmost} from "tns-core-modules/ui/frame";

export class AttributesViewModel extends Observable {

    constructor(d: Data) {
        super();
        this.userId = new Identity(d.alias, d.contact.email, d.contact.phone, d.contact.url, d.personhoodPublished);
    }

    set userId(value: Identity) {
        this.set("_admin", value);
    }

    get userId(): Identity {
        return this.get("_admin");
    }

    get qrcode(): ImageSource {
        return gData.contact.qrcodeIdentity();
    }

    get hasCoins(): boolean {
        return gData.coinInstance != null;
    }

    setProgress(text: string = "", width: number = 0) {
        if (width == 0) {
            this.set("networkStatus", null);
        } else {
            let color = "#308080;";
            if (width < 0) {
                color = "#a04040";
            }
            let pb = topmost().getViewById("progress_bar");
            if (pb) {
                pb.setInlineStyle("width:" + Math.abs(width) + "%; background-color: " + color);
            }
            this.set("networkStatus", text);
        }
    }
}

export class Identity {
    constructor(public alias: string, public email: string, public phone: string,
                public url: string,
                public publishPersonhood: boolean) {
    }
}
