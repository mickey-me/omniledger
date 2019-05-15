import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogModule, MatSnackBar } from "@angular/material";
import { Log } from "@c4dt/cothority/log";
import { SkipchainRPC } from "@c4dt/cothority/skipchain";
import { Data, gData } from "../../../lib/Data";
import { showDialogOKC, showSnack } from "../../../lib/ui/Ui";
import { BCBlock, BcviewerComponent, BcviewerService, ShowBlockComponent } from "../../bcviewer/bcviewer.component";

@Component({
  selector: "app-yourself",
  styleUrls: ["./yourself.component.css"],
  templateUrl: "./yourself.component.html",
})
export class YourselfComponent implements OnInit {
  gData: Data;
  contactForm: FormGroup;

  constructor(private snack: MatSnackBar,
              private dialog: MatDialog,
              private bcs: BcviewerService) {
    this.gData = gData;
  }

  async ngOnInit() {
    this.updateContactForm();
    Log.print("Credential-size is:", gData.contact.credential.toBytes().length);
    if (gData.bc) {
      const scRPC = new SkipchainRPC(gData.bc.getConfig().roster);
      const sbBlocks = await scRPC.getUpdateChain(gData.bc.genesisID);
      const blocks = sbBlocks.map((sb) => new BCBlock(scRPC, sb));
      if (blocks.length > 4) {
        blocks.splice(0, blocks.length - 4);
      }
    }
  }

  updateContactForm() {
    this.contactForm = new FormGroup({
      alias: new FormControl(gData.contact.alias),
      email: new FormControl(gData.contact.email, Validators.email),
      phone: new FormControl(gData.contact.phone),
    });
  }

  async updateContact() {
    await showSnack(this.snack, "Updating User Data", async () => {
      gData.contact.alias = this.contactForm.controls.alias.value;
      gData.contact.email = this.contactForm.controls.email.value;
      gData.contact.phone = this.contactForm.controls.phone.value;
      await gData.contact.sendUpdate();
      this.bcs.updateBlocks();
    });
  }
}
