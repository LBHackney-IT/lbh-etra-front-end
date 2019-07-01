import { IMeetingGateway } from "../../Gateways/MeetingGateway";
import { mockMeeting } from "../../Mocks/MockMeetingFactory";
import { GetMeetingDraftsUseCase } from ".";

describe("GetMeetingDraftsUseCase", () => {
  it("successfully gets meeting drafts", async () => {
    const testData = [
      mockMeeting("Meeting 1"),
      mockMeeting("Meeting 2"),
      mockMeeting("Meeting 3")
    ];

    const mockGateway: IMeetingGateway = {
      baseUrl: "",
      getMeetingDrafts: jest.fn(() => 
        { return new Promise((resolve, reject) => { resolve(testData); }) }
      ),
      saveMeetingDraft: jest.fn(),
      saveMeetingData: jest.fn()
    };

    const result = await new GetMeetingDraftsUseCase(mockGateway).Execute();

    expect(mockGateway.getMeetingDrafts).toBeCalledTimes(1);
    expect(mockGateway.getMeetingDrafts).toHaveReturned();
    expect(result).toBe(testData);
  });
});