import mongoose from "mongoose";

const filterSchema = mongoose.Schema(
  {
    satisfied: {
        type: Boolean,
        required: true,
    },
    notSatisfied: {
        type: Boolean,
        required: true,
    },
    give: {
        type: Boolean,
        required: true,
    },
    receive: {
        type: Boolean,
        required: true,
    },
  },
  { timestamps: true }
);

const Filter = mongoose.model("Filter", filterSchema);

export default Filter;
