const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => res.json({
  service: "CareMate Healthcare Mock API",
  status: "running",
  endpoints: [
    "/getAppointmentDetails?appointmentId=APT45021",
    "/checkInsuranceEligibility?memberId=MEM1001",
    "/getLabReportStatus?labReportId=LAB1001"
  ]
}));

app.get("/getAppointmentDetails", (req, res) => {
  const appointmentId = String(req.query.appointmentId || "").trim().toUpperCase();
  if (!appointmentId) return res.status(400).json({success:false,errorCode:"MISSING_APPOINTMENT_ID",message:"Please provide an appointment ID."});
  if (appointmentId === "APT45021") return res.json({
    success:true, appointmentId, appointmentStatus:"CONFIRMED", appointmentDate:"2026-10-12",
    appointmentTime:"10:30 AM", providerName:"Dr. Sharma", appointmentType:"Consultation",
    rescheduleEligible:true, cancellationEligible:true, scenario:"CONFIRMED"
  });
  if (appointmentId === "APT30003") return res.json({
    success:true, appointmentId, appointmentStatus:"CONFIRMED", appointmentDate:"2026-10-15",
    appointmentTime:"02:00 PM", providerName:"Dr. Rao", appointmentType:"Follow-up",
    rescheduleEligible:false, cancellationEligible:false,
    restrictionReason:"This appointment is restricted from cancellation and rescheduling.", scenario:"RESTRICTED"
  });
  return res.status(404).json({success:false,appointmentId,appointmentStatus:"NOT_FOUND",message:"No appointment was found for that ID."});
});

app.get("/checkInsuranceEligibility", (req, res) => {
  const memberId = String(req.query.memberId || "").trim().toUpperCase();
  if (!memberId) return res.status(400).json({success:false,errorCode:"MISSING_MEMBER_ID",message:"Please provide a member ID."});
  const records = {
    MEM1001: {success:true,memberId,insuranceId:memberId,eligibilityStatus:"ACTIVE",coverageStatus:"ACTIVE",verificationStatus:"VERIFIED",payerName:"CarePlus Health",planName:"Standard Health Plan",effectiveDate:"2026-01-01",expirationDate:"2026-12-31",coverageStartDate:"2026-01-01",coverageEndDate:"2026-12-31",scenario:"ACTIVE_VERIFIED"},
    MEM1002: {success:true,memberId,insuranceId:memberId,eligibilityStatus:"INACTIVE",coverageStatus:"INACTIVE",verificationStatus:"VERIFIED",payerName:"CarePlus Health",planName:"Standard Health Plan",effectiveDate:"2025-01-01",expirationDate:"2025-12-31",coverageStartDate:"2025-01-01",coverageEndDate:"2025-12-31",scenario:"INACTIVE"},
    MEM1003: {success:true,memberId,insuranceId:memberId,eligibilityStatus:"VERIFICATION_REQUIRED",coverageStatus:"UNKNOWN",verificationStatus:"PENDING",payerName:"CarePlus Health",planName:"Standard Health Plan",effectiveDate:"",expirationDate:"",coverageStartDate:"",coverageEndDate:"",message:"Additional verification is required. Please contact a representative.",scenario:"VERIFICATION_REQUIRED"}
  };
  if (records[memberId]) return res.json(records[memberId]);
  return res.status(404).json({success:false,memberId,eligibilityStatus:"NOT_FOUND",coverageStatus:"UNKNOWN",verificationStatus:"NOT_VERIFIED",message:"No insurance record was found for that member ID."});
});

app.get("/getLabReportStatus", (req, res) => {
  const labReportId = String(req.query.labReportId || "").trim().toUpperCase();
  if (!labReportId) return res.status(400).json({success:false,errorCode:"MISSING_LAB_REPORT_ID",message:"Please provide a lab report ID."});
  const records = {
    LAB1001: {success:true,labReportId,reportStatus:"PROCESSING",testName:"Complete Blood Count",collectionDate:"2026-10-08",expectedAvailableDate:"2026-10-14",reportAvailable:false,deliveryMethod:"Patient portal",message:"Your report is still processing. Please check again after the expected availability date.",scenario:"PROCESSING"},
    LAB1002: {success:true,labReportId,reportStatus:"AVAILABLE",testName:"Basic Metabolic Panel",collectionDate:"2026-10-08",expectedAvailableDate:"2026-10-10",reportAvailable:true,deliveryMethod:"Patient portal",message:"Your report is available. Sign in to your secure patient portal to access it.",scenario:"AVAILABLE"},
    LAB1003: {success:true,labReportId,reportStatus:"DELAYED",testName:"Lipid Panel",collectionDate:"2026-10-05",expectedAvailableDate:"2026-10-13",reportAvailable:false,deliveryMethod:"Patient portal",message:"Your report is delayed. A representative can help check the status.",scenario:"DELAYED"}
  };
  if (records[labReportId]) return res.json(records[labReportId]);
  return res.status(404).json({success:false,labReportId,reportStatus:"NOT_FOUND",reportAvailable:false,message:"No lab report was found for that ID."});
});

app.listen(PORT, () => console.log(`CareMate Mock API running on port ${PORT}`));
