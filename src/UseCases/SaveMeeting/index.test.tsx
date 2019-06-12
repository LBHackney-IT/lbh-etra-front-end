import { IMeetingGateway } from "../../Gateways/MeetingGateway";
import { SaveMeetingUseCase, SaveMeetingInputModel } from ".";
import { IAttendees } from "../../Components/Attendees";

describe("SaveMeetingUseCase", () => {
  it("successfully saves meeting", async () => {
    const mockGateway: IMeetingGateway = {
      saveMeeting: jest.fn()
    };

    const input = new SaveMeetingInputModel([], "testdata", mockAttendees());

    await new SaveMeetingUseCase(mockGateway).Execute(input);

    expect(mockGateway.saveMeeting).toBeCalledTimes(1);
    expect(mockGateway.saveMeeting).toHaveBeenCalledWith(input);
  });
});

function mockAttendees() : IAttendees {
  return {
      Councillors: "Jim, Bob, Steve",
      HackneyStaff: "Fleb",
      NumberOfAttendees: 10
  }
}
