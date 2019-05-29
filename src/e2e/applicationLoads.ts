import getBaseUrl from './url-helper';
import { ReactSelector, waitForReact } from 'testcafe-react-selectors';

fixture `Application Loads`
    .page(getBaseUrl())
    .beforeEach(async () => {
        await waitForReact();
    });

test("App is rendered", async t => {
    await t.expect(ReactSelector("App").exists)
    .eql(true);
});