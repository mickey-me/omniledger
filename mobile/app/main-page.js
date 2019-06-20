"use strict";
/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("tns-core-modules/data/observable");
var frame_1 = require("tns-core-modules/ui/frame");
var Data_1 = require("~/lib/Data");
var Log_1 = require("~/lib/Log");
var Defaults_1 = require("~/lib/Defaults");
var TestStore_1 = require("~/lib/network/TestStore");
// import {navigatingToHome, switchHome} from "~/pages/home/home-page";
var dialogs = require("tns-core-modules/ui/dialogs");
var application = require("tns-core-modules/application");
// import {adminView, switchSettings} from "~/pages/settings/settings-page";
// import {switchLab} from "~/pages/lab/lab-page";
// import {switchIdentity} from "~/pages/identity/identity-page";
var messages_1 = require("~/lib/ui/messages");
var FileIO_1 = require("~/lib/FileIO");
exports.mainView = observable_1.fromObject({ showGroup: 0 });
// Verify if we already have data or not. If it's a new installation, present the project
// and ask for an alias, and set up keys.
function navigatingTo(args) {
    return __awaiter(this, void 0, void 0, function () {
        var page, ts, e_1, again;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 12]);
                    Log_1.Log.lvl2("navigatingTo: main-page");
                    page = args.object;
                    page.bindingContext = exports.mainView;
                    if (Data_1.gData.bc) {
                        return [2 /*return*/, mainViewRegistered(args)];
                    }
                    if (!Defaults_1.Defaults.LoadTestStore) return [3 /*break*/, 2];
                    return [4 /*yield*/, TestStore_1.TestStoreRPC.load(Defaults_1.Defaults.Roster)];
                case 1:
                    ts = _a.sent();
                    Defaults_1.Defaults.ByzCoinID = ts.byzcoinID;
                    Defaults_1.Defaults.SpawnerIID = ts.spawnerIID;
                    _a.label = 2;
                case 2:
                    if (!Defaults_1.Defaults.DataFile) return [3 /*break*/, 4];
                    return [4 /*yield*/, FileIO_1.FileIO.writeFile(Defaults_1.Defaults.DataDir + "/data.json", Defaults_1.Defaults.DataFile)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    Log_1.Log.lvl1("loading");
                    return [4 /*yield*/, Data_1.gData.load()];
                case 5:
                    _a.sent();
                    if (!Data_1.gData.contact.alias || Data_1.gData.contact.alias == "") {
                        return [2 /*return*/, mainViewRegister(args)];
                    }
                    return [2 /*return*/, mainViewRegistered(args)];
                case 6:
                    e_1 = _a.sent();
                    Log_1.Log.catch(e_1);
                    return [4 /*yield*/, messages_1.msgFailed("Error when setting up communication: " + e_1.toString())];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, dialogs.confirm({
                            title: "Network error",
                            message: "Do you want to try again?",
                            okButtonText: "Try again",
                            cancelButtonText: "Quit",
                        })];
                case 8:
                    again = _a.sent();
                    if (!again) return [3 /*break*/, 10];
                    return [4 /*yield*/, navigatingTo(args)];
                case 9:
                    _a.sent();
                    return [3 /*break*/, 11];
                case 10:
                    if (application.android) {
                        application.android.foregroundActivity.finish();
                    }
                    else {
                        exit(0);
                    }
                    _a.label = 11;
                case 11: return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    });
}
exports.navigatingTo = navigatingTo;
function mainViewRegistered(args) {
    Log_1.Log.lvl1("mainViewRegistered");
    exports.mainView.set("showGroup", 2);
    var tv = frame_1.getFrameById("app-root").getViewById("mainTabView");
    tv.selectedIndex = 0;
    // return switchHome(args);
}
exports.mainViewRegistered = mainViewRegistered;
function mainViewRegister(args) {
    Log_1.Log.lvl1("mainViewRegister");
    exports.mainView.set("showGroup", 1);
    return frame_1.getFrameById("setup").navigate("pages/setup/1-present");
}
exports.mainViewRegister = mainViewRegister;
function onChangeTab(args) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            Log_1.Log.lvl2("onchangetab", args.newIndex);
            return [2 /*return*/];
        });
    });
}
exports.onChangeTab = onChangeTab;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztFQUlFOztBQUVGLCtEQUFtRjtBQUNuRixtREFBbUY7QUFDbkYsbUNBQWlDO0FBQ2pDLGlDQUE4QjtBQUM5QiwyQ0FBd0M7QUFDeEMscURBQXFEO0FBQ3JELHVFQUF1RTtBQUN2RSxxREFBdUQ7QUFDdkQsMERBQTREO0FBRTVELDRFQUE0RTtBQUM1RSxrREFBa0Q7QUFDbEQsaUVBQWlFO0FBQ2pFLDhDQUE0QztBQUk1Qyx1Q0FBb0M7QUFJekIsUUFBQSxRQUFRLEdBQUcsdUJBQVUsQ0FBQyxFQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO0FBRWpELHlGQUF5RjtBQUN6Rix5Q0FBeUM7QUFDekMsU0FBc0IsWUFBWSxDQUFDLElBQWU7Ozs7Ozs7b0JBRTFDLFNBQUcsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQztvQkFDaEMsSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7b0JBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsZ0JBQVEsQ0FBQztvQkFFL0IsSUFBSSxZQUFLLENBQUMsRUFBRSxFQUFDO3dCQUNULHNCQUFPLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFDO3FCQUNuQzt5QkFFRyxtQkFBUSxDQUFDLGFBQWEsRUFBdEIsd0JBQXNCO29CQUNiLHFCQUFNLHdCQUFZLENBQUMsSUFBSSxDQUFDLG1CQUFRLENBQUMsTUFBTSxDQUFDLEVBQUE7O29CQUE3QyxFQUFFLEdBQUcsU0FBd0M7b0JBQ2pELG1CQUFRLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUM7b0JBQ2xDLG1CQUFRLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7Ozt5QkFFcEMsbUJBQVEsQ0FBQyxRQUFRLEVBQWpCLHdCQUFpQjtvQkFDakIscUJBQU0sZUFBTSxDQUFDLFNBQVMsQ0FBQyxtQkFBUSxDQUFDLE9BQU8sR0FBRyxZQUFZLEVBQUUsbUJBQVEsQ0FBQyxRQUFRLENBQUMsRUFBQTs7b0JBQTFFLFNBQTBFLENBQUM7OztvQkFFL0UsU0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDcEIscUJBQU0sWUFBSyxDQUFDLElBQUksRUFBRSxFQUFBOztvQkFBbEIsU0FBa0IsQ0FBQztvQkFDbkIsSUFBSSxDQUFDLFlBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLFlBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsRUFBRTt3QkFDbkQsc0JBQU8sZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUM7cUJBQ2pDO29CQUNELHNCQUFPLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFDOzs7b0JBRWhDLFNBQUcsQ0FBQyxLQUFLLENBQUMsR0FBQyxDQUFDLENBQUM7b0JBQ2IscUJBQU0sb0JBQVMsQ0FBQyx1Q0FBdUMsR0FBRyxHQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBQTs7b0JBQXZFLFNBQXVFLENBQUM7b0JBQzVELHFCQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUM7NEJBQzlCLEtBQUssRUFBRSxlQUFlOzRCQUN0QixPQUFPLEVBQUUsMkJBQTJCOzRCQUNwQyxZQUFZLEVBQUUsV0FBVzs0QkFDekIsZ0JBQWdCLEVBQUUsTUFBTTt5QkFDM0IsQ0FBQyxFQUFBOztvQkFMRSxLQUFLLEdBQUcsU0FLVjt5QkFDRSxLQUFLLEVBQUwseUJBQUs7b0JBQ0wscUJBQU0sWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFBOztvQkFBeEIsU0FBd0IsQ0FBQzs7O29CQUV6QixJQUFJLFdBQVcsQ0FBQyxPQUFPLEVBQUU7d0JBQ3JCLFdBQVcsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLENBQUM7cUJBQ25EO3lCQUFNO3dCQUNILElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDWDs7Ozs7OztDQUdaO0FBM0NELG9DQTJDQztBQUVELFNBQWdCLGtCQUFrQixDQUFDLElBQVM7SUFDeEMsU0FBRyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQy9CLGdCQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM3QixJQUFJLEVBQUUsR0FBWSxvQkFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN0RSxFQUFFLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztJQUNyQiwyQkFBMkI7QUFDL0IsQ0FBQztBQU5ELGdEQU1DO0FBRUQsU0FBZ0IsZ0JBQWdCLENBQUMsSUFBUztJQUN0QyxTQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDN0IsZ0JBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzdCLE9BQU8sb0JBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQUNuRSxDQUFDO0FBSkQsNENBSUM7QUFFRCxTQUFzQixXQUFXLENBQUMsSUFBbUM7OztZQUNqRSxTQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7Q0FlMUM7QUFoQkQsa0NBZ0JDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbkluIE5hdGl2ZVNjcmlwdCwgYSBmaWxlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBhbiBYTUwgZmlsZSBpcyBrbm93biBhc1xuYSBjb2RlLWJlaGluZCBmaWxlLiBUaGUgY29kZS1iZWhpbmQgaXMgYSBncmVhdCBwbGFjZSB0byBwbGFjZSB5b3VyIHZpZXdcbmxvZ2ljLCBhbmQgdG8gc2V0IHVwIHlvdXIgcGFnZeKAmXMgZGF0YSBiaW5kaW5nLlxuKi9cblxuaW1wb3J0IHtFdmVudERhdGEsIGZyb21PYmplY3QsIE9ic2VydmFibGV9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHtnZXRGcmFtZUJ5SWQsIGdldFZpZXdCeUlkLCBQYWdlLCB0b3Btb3N0fSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9mcmFtZVwiO1xuaW1wb3J0IHtnRGF0YX0gZnJvbSBcIn4vbGliL0RhdGFcIjtcbmltcG9ydCB7TG9nfSBmcm9tIFwifi9saWIvTG9nXCI7XG5pbXBvcnQge0RlZmF1bHRzfSBmcm9tIFwifi9saWIvRGVmYXVsdHNcIjtcbmltcG9ydCB7VGVzdFN0b3JlUlBDfSBmcm9tIFwifi9saWIvbmV0d29yay9UZXN0U3RvcmVcIjtcbi8vIGltcG9ydCB7bmF2aWdhdGluZ1RvSG9tZSwgc3dpdGNoSG9tZX0gZnJvbSBcIn4vcGFnZXMvaG9tZS9ob21lLXBhZ2VcIjtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9nc1wiO1xuaW1wb3J0ICogYXMgYXBwbGljYXRpb24gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcbmltcG9ydCB7U2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEsIFRhYlZpZXd9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RhYi12aWV3XCI7XG4vLyBpbXBvcnQge2FkbWluVmlldywgc3dpdGNoU2V0dGluZ3N9IGZyb20gXCJ+L3BhZ2VzL3NldHRpbmdzL3NldHRpbmdzLXBhZ2VcIjtcbi8vIGltcG9ydCB7c3dpdGNoTGFifSBmcm9tIFwifi9wYWdlcy9sYWIvbGFiLXBhZ2VcIjtcbi8vIGltcG9ydCB7c3dpdGNoSWRlbnRpdHl9IGZyb20gXCJ+L3BhZ2VzL2lkZW50aXR5L2lkZW50aXR5LXBhZ2VcIjtcbmltcG9ydCB7bXNnRmFpbGVkfSBmcm9tIFwifi9saWIvdWkvbWVzc2FnZXNcIjtcbi8vIGltcG9ydCB7QWRtaW5WaWV3TW9kZWx9IGZyb20gXCJ+L3BhZ2VzL3NldHRpbmdzL3NldHRpbmdzLXZpZXdcIjtcbmltcG9ydCB7YWR9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3V0aWxzL3V0aWxzXCI7XG5pbXBvcnQgZ2V0SWQgPSBhZC5yZXNvdXJjZXMuZ2V0SWQ7XG5pbXBvcnQge0ZpbGVJT30gZnJvbSBcIn4vbGliL0ZpbGVJT1wiO1xuXG5kZWNsYXJlIGNvbnN0IGV4aXQ6IChjb2RlOiBudW1iZXIpID0+IHZvaWQ7XG5cbmV4cG9ydCBsZXQgbWFpblZpZXcgPSBmcm9tT2JqZWN0KHtzaG93R3JvdXA6IDB9KTtcblxuLy8gVmVyaWZ5IGlmIHdlIGFscmVhZHkgaGF2ZSBkYXRhIG9yIG5vdC4gSWYgaXQncyBhIG5ldyBpbnN0YWxsYXRpb24sIHByZXNlbnQgdGhlIHByb2plY3Rcbi8vIGFuZCBhc2sgZm9yIGFuIGFsaWFzLCBhbmQgc2V0IHVwIGtleXMuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbmF2aWdhdGluZ1RvKGFyZ3M6IEV2ZW50RGF0YSkge1xuICAgIHRyeSB7XG4gICAgICAgIExvZy5sdmwyKFwibmF2aWdhdGluZ1RvOiBtYWluLXBhZ2VcIik7XG4gICAgICAgIGxldCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XG4gICAgICAgIHBhZ2UuYmluZGluZ0NvbnRleHQgPSBtYWluVmlldztcblxuICAgICAgICBpZiAoZ0RhdGEuYmMpe1xuICAgICAgICAgICAgcmV0dXJuIG1haW5WaWV3UmVnaXN0ZXJlZChhcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChEZWZhdWx0cy5Mb2FkVGVzdFN0b3JlKSB7XG4gICAgICAgICAgICBsZXQgdHMgPSBhd2FpdCBUZXN0U3RvcmVSUEMubG9hZChEZWZhdWx0cy5Sb3N0ZXIpO1xuICAgICAgICAgICAgRGVmYXVsdHMuQnl6Q29pbklEID0gdHMuYnl6Y29pbklEO1xuICAgICAgICAgICAgRGVmYXVsdHMuU3Bhd25lcklJRCA9IHRzLnNwYXduZXJJSUQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKERlZmF1bHRzLkRhdGFGaWxlKSB7XG4gICAgICAgICAgICBhd2FpdCBGaWxlSU8ud3JpdGVGaWxlKERlZmF1bHRzLkRhdGFEaXIgKyBcIi9kYXRhLmpzb25cIiwgRGVmYXVsdHMuRGF0YUZpbGUpO1xuICAgICAgICB9XG4gICAgICAgIExvZy5sdmwxKFwibG9hZGluZ1wiKTtcbiAgICAgICAgYXdhaXQgZ0RhdGEubG9hZCgpO1xuICAgICAgICBpZiAoIWdEYXRhLmNvbnRhY3QuYWxpYXMgfHwgZ0RhdGEuY29udGFjdC5hbGlhcyA9PSBcIlwiKSB7XG4gICAgICAgICAgICByZXR1cm4gbWFpblZpZXdSZWdpc3RlcihhcmdzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFpblZpZXdSZWdpc3RlcmVkKGFyZ3MpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgTG9nLmNhdGNoKGUpO1xuICAgICAgICBhd2FpdCBtc2dGYWlsZWQoXCJFcnJvciB3aGVuIHNldHRpbmcgdXAgY29tbXVuaWNhdGlvbjogXCIgKyBlLnRvU3RyaW5nKCkpO1xuICAgICAgICBsZXQgYWdhaW4gPSBhd2FpdCBkaWFsb2dzLmNvbmZpcm0oe1xuICAgICAgICAgICAgdGl0bGU6IFwiTmV0d29yayBlcnJvclwiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJEbyB5b3Ugd2FudCB0byB0cnkgYWdhaW4/XCIsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiVHJ5IGFnYWluXCIsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIlF1aXRcIixcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChhZ2Fpbikge1xuICAgICAgICAgICAgYXdhaXQgbmF2aWdhdGluZ1RvKGFyZ3MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGFwcGxpY2F0aW9uLmFuZHJvaWQpIHtcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbi5hbmRyb2lkLmZvcmVncm91bmRBY3Rpdml0eS5maW5pc2goKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXhpdCgwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1haW5WaWV3UmVnaXN0ZXJlZChhcmdzOiBhbnkpIHtcbiAgICBMb2cubHZsMShcIm1haW5WaWV3UmVnaXN0ZXJlZFwiKTtcbiAgICBtYWluVmlldy5zZXQoXCJzaG93R3JvdXBcIiwgMik7XG4gICAgbGV0IHR2ID0gPFRhYlZpZXc+Z2V0RnJhbWVCeUlkKFwiYXBwLXJvb3RcIikuZ2V0Vmlld0J5SWQoXCJtYWluVGFiVmlld1wiKTtcbiAgICB0di5zZWxlY3RlZEluZGV4ID0gMDtcbiAgICAvLyByZXR1cm4gc3dpdGNoSG9tZShhcmdzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1haW5WaWV3UmVnaXN0ZXIoYXJnczogYW55KSB7XG4gICAgTG9nLmx2bDEoXCJtYWluVmlld1JlZ2lzdGVyXCIpO1xuICAgIG1haW5WaWV3LnNldChcInNob3dHcm91cFwiLCAxKTtcbiAgICByZXR1cm4gZ2V0RnJhbWVCeUlkKFwic2V0dXBcIikubmF2aWdhdGUoXCJwYWdlcy9zZXR1cC8xLXByZXNlbnRcIik7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBvbkNoYW5nZVRhYihhcmdzOiBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSkge1xuICAgIExvZy5sdmwyKFwib25jaGFuZ2V0YWJcIiwgYXJncy5uZXdJbmRleCk7XG4gICAgLy8gc3dpdGNoIChhcmdzLm5ld0luZGV4KSB7XG4gICAgLy8gICAgIGNhc2UgMDpcbiAgICAvLyAgICAgICAgIGF3YWl0IHN3aXRjaEhvbWUoYXJncyk7XG4gICAgLy8gICAgICAgICBicmVhaztcbiAgICAvLyAgICAgY2FzZSAxOlxuICAgIC8vICAgICAgICAgYXdhaXQgc3dpdGNoSWRlbnRpdHkoYXJncyk7XG4gICAgLy8gICAgICAgICBicmVhaztcbiAgICAvLyAgICAgY2FzZSAyOlxuICAgIC8vICAgICAgICAgYXdhaXQgc3dpdGNoTGFiKGFyZ3MpO1xuICAgIC8vICAgICAgICAgYnJlYWs7XG4gICAgLy8gICAgIGNhc2UgMzpcbiAgICAvLyAgICAgICAgIGF3YWl0IHN3aXRjaFNldHRpbmdzKGFyZ3MpO1xuICAgIC8vICAgICAgICAgYnJlYWs7XG4gICAgLy8gfVxufVxuIl19