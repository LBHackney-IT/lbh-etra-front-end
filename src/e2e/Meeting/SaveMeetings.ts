import { Selector } from "testcafe";

fixture `Getting Started`
    .page `http://devexpress.github.io/testcafe/example`;

test("Given a new meeting, When I click the save button, And I am online ,Then the meeting is saved"
, async t => {
    const traName = "Bob Jones"
    const datetime = new Date();
    await WhenIClickTheSaveButton(t);
    Date.now().toLocaleString()
    await ConfirmationScreenIsDisplayed(t, traName,  datetime);
});

async function WhenIClickTheSaveButton(t: TestController){
    await t.click("#review-now");
}

async function ConfirmationScreenIsDisplayed(t : TestController, traName : string, date : Date){
    const dateString = date.toLocaleDateString('en-GB');

    await t.expect(Selector("#confirmation-header").innerText)
        .eql(`${traName} ETRA meeting ${dateString}`);
}