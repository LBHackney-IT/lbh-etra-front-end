import { Selector } from "testcafe";

fixture `Getting Started`
    .page `http://devexpress.github.io/testcafe/example`;

test('Given developer name of John Smith, when I click submit, correct thank you message is displayed', async t => {
    const developerName = "John Smith";
    await t
    .typeText("#developer-name", developerName)
    .click("#submit-button")
    .expect(Selector("#article-header").innerText)
    .eql(ExpectedThankYouMessage(developerName));
});

function ExpectedThankYouMessage(developerName: string) : string {
    return `Thank you, ${developerName}!`;
}