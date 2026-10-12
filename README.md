# CareMate Healthcare Mock API

Mock-only backend for the Kore.ai XO healthcare chatbot assignment. It does not access real patient records or modify real appointments.

## Run locally
1. Install Node.js.
2. Open a terminal in this folder.
3. Run `npm install`.
4. Run `npm start`.
5. Open `http://localhost:3000/` to verify it is running.

## Scenario IDs
- Appointment `APT45021`: CONFIRMED; cancellation and rescheduling allowed (TC01/TC02).
- Appointment `APT30003`: CONFIRMED; cancellation and rescheduling restricted (TC03).
- Any other appointment ID: NOT_FOUND (TC04).
- Insurance `MEM1001`: ACTIVE + VERIFIED (TC05).
- Insurance `MEM1002`: INACTIVE (TC06).
- Insurance `MEM1003`: VERIFICATION_REQUIRED (TC07).
- Lab `LAB1001`: PROCESSING (TC08).
- Lab `LAB1002`: AVAILABLE (TC09).
- Lab `LAB1003`: DELAYED (TC10).
- Unknown insurance or lab ID: NOT_FOUND.

## Kore.ai URLs
After deployment to a public host, replace BASE_URL with your deployed base URL (without a trailing slash):
- `BASE_URL/getAppointmentDetails?appointmentId={{context.appointmentId}}`
- `BASE_URL/checkInsuranceEligibility?memberId={{context.memberId}}`
- `BASE_URL/getLabReportStatus?labReportId={{context.labReportId}}`

Kore.ai cloud cannot call your computer's `localhost`. Test locally first, then deploy to a public host and use that public URL in Kore.ai.

## Assignment mapping
TC01–TC04 appointment; TC05–TC07 insurance; TC08–TC10 lab. TC11 representative request and TC12 context retention are implemented in the Kore.ai conversation flow, not by these read-only mock endpoints.
