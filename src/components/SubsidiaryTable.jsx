import React from "react";

export default function SubsidiaryTable({ data = [] }) {
  return (
    <div className="overflow-hidden rounded-xl bg-base-200 text-base-content w-full mx-auto shadow-md">
      <table className="w-full border-collapse">
        <thead className="bg-base-300 text-left text-sm font-semibold uppercase">
          <tr>
            <th className="px-4 py-3 text-primary">CÔNG TY CON</th>
            <th className="px-4 py-3 text-right">VỐN ĐIỀU LỆ</th>
            <th className="px-4 py-3 text-right">TỶ LỆ (%)</th>
          </tr>
        </thead>

        <tbody className="text-sm">
          {data.map((item, idx) => (
            <tr
              key={idx}
              className={`${
                idx % 2 === 0 ? "bg-base-100" : "bg-base-200"
              } hover:bg-base-300 transition-colors`}
            >
              <td className="px-4 py-3 font-medium">{item.name}</td>
              <td className="px-4 py-3 text-right">{item.capital}</td>
              <td className="px-4 py-3 text-right">{item.percent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
