//This file contains an example of how we might best structure our e2e tests for readability

import { Selector } from "testcafe";

fixture `Getting Started`
    .page `http://devexpress.github.io/testcafe/example`;

test("Given developer name of John Smith, when I click submit, correct thank you message is displayed", async t => {
    const developerName = "John Smith";
    await GivenDeveloperName(t, developerName);
    await WhenISubmit(t);
    await ThankYouMessageIsDisplayed(t, developerName);
});

async function GivenDeveloperName(t : TestController, developerName : string) {
    await t.typeText("#developer-name", developerName);
}

async function WhenISubmit(t: TestController){
    await t.click("#submit-button");
}

async function ThankYouMessageIsDisplayed(t : TestController, developerName : string){
    await t.expect(Selector("#article-header").innerText)
        .eql(`Thank you, ${developerName}!`);
}