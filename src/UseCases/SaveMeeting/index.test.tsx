import { IMeetingGateway } from "../../Gateways/MeetingGateway";
import { SaveMeetingUseCase, SaveMeetingInputModel } from ".";

describe("SaveMeetingUseCase", () => {
  it("successfully saves meeting", async () => {
    const mockGateway: IMeetingGateway = {
      saveMeeting: jest.fn()
    };

    const input = new SaveMeetingInputModel([], "testdata");

    await new SaveMeetingUseCase(mockGateway).Execute(input);

    expect(mockGateway.saveMeeting).toBeCalledTimes(1);
    expect(mockGateway.saveMeeting).toHaveBeenCalledWith(input);
  });
});