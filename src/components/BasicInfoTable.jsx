import React from "react";
import SectionTitle from "./SectionTitle";

export default function BasicInfoTable() {
  const SUBSIDIARIES = [
  { name: "CTCP Công nghệ viễn thông FPT", capital: "276.0 tỷ", percent: "100.00" },
  { name: "Công ty TNHH MTV Viễn thông FPT Thăng Long", capital: "224.3 tỷ", percent: "100.00" },
  { name: "CTCP Dịch vụ Trực tuyến FPT (FOC:UPCOM)", capital: "184.7 tỷ", percent: "56.36" },
  { name: "Công ty TNHH MTV Viễn thông FPT Tân Thuận", capital: "70.0 tỷ", percent: "100.00" },
];
  return (
    <div className="bg-base-200 rounded-xl shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cột trái */}
        <div>
          <SectionTitle text="THÔNG TIN CƠ BẢN" />
          <table className="table text-sm">
            <tbody>
              <tr>
                <td>Mã SIC</td>
                <td className="font-semibold text-primary">--</td>
              </tr>
              <tr>
                <td>Mã ngành ICB</td>
                <td>--</td>
              </tr>
              <tr>
                <td>Năm thành lập</td>
                <td className="font-semibold">--</td>
              </tr>
              <tr>
                <td>Vốn điều lệ</td>
                <td className="font-semibold">--</td>
              </tr>
              <tr>
                <td>Số lượng nhân sự</td>
                <td className="font-semibold">--</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Cột phải */}
        <div>
          <SectionTitle text="THÔNG TIN NIÊM YẾT" />
          <table className="table text-sm">
            <tbody>
              <tr>
                <td>Ngày niêm yết</td>
                <td>--</td>
              </tr>
              <tr>
                <td>Nơi niêm yết</td>
                <td>--</td>
              </tr>
              <tr>
                <td>Giá chào sàn (VND)</td>
                <td>--</td>
              </tr>
              <tr>
                <td>Ngày phát hành cuối</td>
                <td>--</td>
              </tr>
              <tr>
                <td>KL đang niêm yết</td>
                <td>--</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
