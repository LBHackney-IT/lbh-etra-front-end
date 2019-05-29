import getBaseUrl from './url-helper';
import { Selector } from "testcafe";

fixture `Application Loads`
    .page(getBaseUrl())

test("Displays react welcome message", async t => {
    await t.expect(Selector("#react-body").innerText)
    .eql("Edit src/App.tsx and save to reload.");
});