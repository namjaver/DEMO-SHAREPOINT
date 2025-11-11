import React from "react";

export default function CompanyInfoCard() {
  return (
    <div className="bg-base-200 rounded-xl shadow-md p-6">
      <p className="text-sm leading-relaxed mb-2">
        <span className="font-semibold text-primary">FPT Telecom</span> là 1 trong 3
        nhà cung cấp dịch vụ internet hàng đầu tại Việt Nam. Theo số liệu từ
        Cục Viễn thông, năm 2015 FPT Telecom chiếm 25,4% thị phần thuê bao
        internet cáp quang trên toàn quốc...
      </p>

      <div className="mt-2 text-sm">
        <span className="text-neutral font-medium">Ngành:</span>{" "}
        <span className="text-primary">Viễn thông</span> &gt;{" "}
        <span className="text-secondary">Nhà cung cấp dịch vụ viễn thông</span>
      </div>
    </div>
  );
}
