import { Selector } from "testcafe";
import getBaseUrl from '../url-helper';
import { ReactSelector, waitForReact } from 'testcafe-react-selectors';

fixture `Getting Started`
    .page(`${getBaseUrl()}/meeting`)
    .beforeEach(async () => {
        await waitForReact();
    });

test("Can create a new meeting, review now and save"
, async t => {
    await WhenIClickTheReviewNowButton(t);
    await WhenIClickTheSaveButton(t);
    await ConfirmationScreenIsDisplayed(t);
});

async function WhenIClickTheReviewNowButton(t: TestController){
    await t.click("#review-now");
}

async function WhenIClickTheSaveButton(t: TestController){
    await t.click("#save-meeting")
}

async function ConfirmationScreenIsDisplayed(t: TestController){
    await t.expect(Selector("#signature-image").exists)
        .eql(true);
}