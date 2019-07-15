import {fromObject} from "tns-core-modules/data/observable";
import {Page} from "tns-core-modules/ui/page";
import {Contact} from "~/lib/dynacred/Contact";
import {topmost} from "tns-core-modules/ui/frame";
import {createQrcode, parseQRCode, scan} from "~/lib/dynacred/Scan";
import {Data, gData} from "~/lib/dynacred/Data";
import {msgFailed} from "~/lib/messages";
import Log from "~/lib/cothority/log";

let user: Contact;
let context = fromObject({qrcode: null});

export async function navigatingTo(args) {
    const page: Page = <Page>args.object;
    user = <Contact>page.navigationContext;
    page.bindingContext = context;
    try {
        let contactScan = await scan("Please scan contact's recovery request");
        let sig = await gData.recoverySignature(contactScan.text, user);
        context.set("qrcode", createQrcode(sig))
    } catch (e){
        Log.catch(e);
        await msgFailed(e.toString(), "Error");
        return goBack();
    }
}

export async function goBack() {
    return topmost().goBack();
}
