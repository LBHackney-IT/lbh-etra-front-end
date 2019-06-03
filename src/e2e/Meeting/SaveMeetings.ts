import { Selector } from "testcafe";

fixture `Getting Started`
    .page `http://devexpress.github.io/testcafe/example`;

test("Given a new meeting, When I click the save button, And I am online ,Then the meeting is saved"
, async t => {
    const traName = "John Smith";
    const datetime = new Date();
    await WhenIClickTheSaveButton(t);
    Date.now().toLocaleString()
    await ConfirmationScreenIsDisplayed(t, traName, datetime);
});

async function GivenTraName(t : TestController, traName : string) {
    await t.typeText("#tra-name", traName);
}

async function WhenIClickTheSaveButton(t: TestController){
    await t.click("#submit-button");
}

async function ConfirmationScreenIsDisplayed(t : TestController, traName : string, date : Date){
    const dateString = date.toLocaleDateString('en-GB');

    await t.expect(Selector("#confirmation-header").innerText)
        .eql(`${traName} ETRA meeting DD/MM/YYYY!`);
}