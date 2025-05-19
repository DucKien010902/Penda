import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const timeSheetSchema = mongoose.Schema(
  {
    users_name: { type: String },
    working_session: { type: String },
    working_verify: { type: String },
    working_date: { type: String },
    working_check_late: { type: String },
    working_check_soon: { type: String },
  },
  { timeStamps: true }
);

const TimeSheet = mongoose.model("TimeSheet", timeSheetSchema);
export default TimeSheet;
