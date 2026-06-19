import React from "react";
import { ArrowLeft } from "lucide-react";
import Logo from "./Logo.jsx";
import StepIndicator from "./StepIndicator.jsx";

export default function HeaderBar({ onBack, steps, current }) {
  return (
    <div
      className="fade-up"
      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "26px 0" }}
    >
      <button className="btn btn-ghost" style={{ padding: "9px 16px", fontSize: 13.5 }} onClick={onBack}>
        <ArrowLeft size={14} /> Back
      </button>
      <Logo size={18} />
      <StepIndicator steps={steps} current={current} />
    </div>
  );
}
