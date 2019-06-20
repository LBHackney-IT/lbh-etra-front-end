import { Selector } from "testcafe";
import getBaseUrl from '../url-helper';
import { ReactSelector, waitForReact } from 'testcafe-react-selectors';

const councillorText = "Councillor 1, Councillor 2";
const staffText = "Staff Member 1";
const numberOfAttendeesInput = 3;

fixture `Getting Started`
    .page(`${getBaseUrl()}/meeting`)
    .beforeEach(async () => {
        await waitForReact();
    });

test("Can create a new meeting, review now and save"
, async t => {
    await GivenInputInAttendees(t);

    await WhenIClickTheAddIssueButton(t);

    await GivenSelectedTheFirstOptionOfDropdown(t, "#issue-dropdown");
    await GivenSelectedTheFirstOptionOfDropdown(t, "#location-dropdown");
    await GivenIssueNote(t, "This is a test issue note to make sure that everything is working.")

    await GivenSelectedChairRadioButton(t);

    await WhenIClickTheSaveButton(t);
    await ConfirmationScreenIsDisplayed(t);
});

test("Can create a new meeting and review later"
, async t => {
    await GivenInputInAttendees(t);

    await WhenIClickTheAddIssueButton(t);

    await GivenSelectedTheFirstOptionOfDropdown(t, "#issue-dropdown");
    await GivenSelectedTheFirstOptionOfDropdown(t, "#location-dropdown");
    await GivenIssueNote(t, "This is a test issue note to make sure that everything is working.")

    await GivenSelectedChairRadioButton(t);

    await WhenIClickTheReviewLaterButton(t)
    await ReviewLaterScreenIsDisplayed(t);
});


async function GivenInputInAttendees(t: TestController){
    await GivenCouncillorsNames(t, councillorText);
    await GivenHackneyStaff(t, staffText)
    await GivenNumberOfAttendees(t, numberOfAttendeesInput);
}

async function GivenCouncillorsNames(t : TestController, councillorNames : string) {
    await t.typeText("#councillors", councillorNames);
}

async function GivenHackneyStaff(t : TestController, hackneyStaff : string) {
    await t.typeText("#hackney-staff", hackneyStaff);
}

async function GivenNumberOfAttendees(t: TestController, numberOfAttendees: number){
    const textField = Selector("#number-of-attendees");

    await t
        .selectText(textField)
        .pressKey('delete')
        .typeText(textField, numberOfAttendees.toString())
}

async function WhenIClickTheAddIssueButton(t: TestController){
    await t.click("#add-issue")
}

async function GivenSelectedTheFirstOptionOfDropdown(t: TestController, dropdownId: string) {
    const dropdown = Selector(dropdownId);
    const option = dropdown.find('option');

    await t .click(dropdown) .click(option.nth(1));
}

async function GivenIssueNote(t: TestController, issueNote: string){
    await t.typeText("#issue-note", issueNote)
}

async function GivenSelectedChairRadioButton(t: TestController){
    await t.click("#chair")
}

async function WhenIClickTheSaveButton(t: TestController){
    await t.click("#save-meeting")
}

async function WhenIClickTheReviewLaterButton(t: TestController){
    await t.click("#review-later")
}

async function ConfirmationScreenIsDisplayed(t: TestController){ 
    await t.expect(Selector("#councillors-text").innerText).eql(councillorText)
    await t.expect(Selector("#staff-text").innerText).eql(staffText)
    await t.expect(Selector("#number-of-attendees-text").innerText).eql(numberOfAttendeesInput.toString())

    await t.expect(Selector("#signature-image").exists).eql(true);
}

async function ReviewLaterScreenIsDisplayed(t: TestController){ 
    await t.expect(Selector("#councillors-text").innerText).eql(councillorText)
    await t.expect(Selector("#staff-text").innerText).eql(staffText)
    await t.expect(Selector("#number-of-attendees-text").innerText).eql(numberOfAttendeesInput.toString())

    await t.expect(Selector("#review-later-one").exists).eql(true);
    await t.expect(Selector("#review-later-two").exists).eql(true);
}