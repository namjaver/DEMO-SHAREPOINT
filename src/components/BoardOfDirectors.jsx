import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { boardMembersDTH } from "../data/constant";
import Tabs from "./Tabs";
import YouTubeCardHorizontal from "./Youtube";

export default function BoardOfDirectors() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("Thông tin chung");

  const gradients = [
    "from-indigo-500 to-purple-500",
    "from-blue-500 to-cyan-500",
    "from-emerald-500 to-lime-500",
    "from-rose-500 to-pink-500",
    "from-amber-500 to-orange-500",
    "from-sky-500 to-teal-500",
    "from-fuchsia-500 to-violet-500",
  ];

  const handleNext = () =>
    setSelectedIndex((p) => (p + 1) % boardMembersDTH.length);
  const handlePrev = () =>
    setSelectedIndex((p) => (p - 1 + boardMembersDTH.length) % boardMembersDTH.length);

  const member = selectedIndex !== null ? boardMembersDTH[selectedIndex].profile : null;

  const tabLabels = [
    "Kinh nghiệm",
    "Sơ đồ tổ chức",
    "Tệp đính kèm",
    "Video",
    "Tin tức",
  ];

  return (
    <>
      {/* DANH SÁCH LÃNH ĐẠO */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
        {boardMembersDTH.map((m, i) => (
          <div
            key={i}
            onClick={() => {
              setSelectedIndex(i);
              setActiveTab("Thông tin chung");
            }}
            className="flex items-center gap-4 p-4 rounded-xl border border-base-300 bg-base-100 hover:shadow-md hover:-translate-y-1 duration-300 cursor-pointer"
          >
            <div
              className={`flex items-center justify-center w-14 h-14 rounded-full text-white text-lg font-semibold bg-gradient-to-br ${gradients[i % gradients.length]}`}
            >
              {m.name.split(" ").slice(-1)[0].charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-base-content">{m.name}</p>
              <p className="text-sm text-neutral/70">{m.position}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm px-3"
          onClick={() => setSelectedIndex(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-base-100 dark:bg-base-200 text-base-content rounded-2xl shadow-2xl w-full max-w-4xl relative overflow-hidden flex flex-col max-h-[90vh] min-h-[600px]" // ✅ giữ chiều cao cố định
            onClick={(e) => e.stopPropagation()}
          >
            {/* Nút đóng */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-primary"
            >
              <X size={20} />
            </button>

            {/* HEADER */}
            <div className="p-6 pb-2">
              <div className="flex gap-6 items-start">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-28 h-28 rounded-full object-cover border shadow"
                  />
                </div>

                {/* Thông tin */}
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold">{member.name}</h3>
                  <p className="text-primary font-medium">{member.position}</p>
                  <p className="text-sm text-neutral/70 mb-4">{member.company}</p>

                  <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                    {member.age && <p><strong>Tuổi:</strong> {member.age}</p>}
                    {member.education && <p><strong>Học vấn:</strong> {member.education}</p>}
                    {member.ownership && <p><strong>Tỷ lệ sở hữu:</strong> {member.ownership}</p>}
                    {member.email && (
                      <p>
                        <strong>Email:</strong>{" "}
                        <a
                          href={`mailto:${member.email}`}
                          className="text-primary underline"
                        >
                          {member.email}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="px-4 flex-shrink-0">
              <Tabs tabs={tabLabels} activeTab={activeTab} onChange={setActiveTab} />
            </div>

            {/* Nội dung cố định chiều cao + animation */}
            <div className="relative flex-1 overflow-hidden px-6 pb-6 pt-3 min-h-[320px]">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 overflow-y-auto p-6"
              >
                {activeTab === "Thông tin chung" && (
                  <div className="text-sm leading-relaxed">
                    {member.bio ? (
                      <p>{member.bio}</p>
                    ) : (
                      <p className="text-neutral/70">
                        Chưa có thông tin chi tiết cho thành viên này.
                      </p>
                    )}
                  </div>
                )}

                {activeTab === "Kinh nghiệm" && (
                  <div className="text-sm">
                    {member.experience?.length ? (
                      <ul className="list-disc list-inside space-y-1">
                        {member.experience.map((exp, idx) => (
                          <li key={idx}>{exp}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-neutral/70 text-sm">
                        Chưa có thông tin kinh nghiệm.
                      </p>
                    )}
                  </div>
                )}

                {activeTab === "Sơ đồ tổ chức" && (
                  <div className="text-sm">
                    {member.sdtc?.length ? (
                      <div className="space-y-2">
                        {member.sdtc.map((f, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between gap-3 rounded-md px-3 py-2 hover:bg-base-200 cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 flex items-center justify-center bg-base-300 rounded">
                                📄
                              </div>
                              <div>
                                <div className="font-medium text-sm">{f.name}</div>
                                <div className="text-xs text-neutral">
                                  {f.type?.toUpperCase() || ""} •{" "}
                                  {(f.size / 1024).toFixed(1)} KB
                                </div>
                              </div>
                            </div>
                            <a
                              href={f.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-primary text-xs"
                            >
                              Xem
                            </a>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-neutral/70">Chưa có sơ đồ tổ chức.</p>
                    )}
                  </div>
                )}

                {activeTab === "Tệp đính kèm" && (
                  <div className="space-y-2">
                    {member.file?.length ? (
                      member.file.map((f, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center border border-base-300 rounded-md px-3 py-1 text-sm hover:bg-base-200 cursor-pointer"
                        >
                          <span>{f.name}</span>
                          <a
                            href={f.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary text-xs"
                          >
                            Xem
                          </a>
                        </div>
                      ))
                    ) : (
                      <p className="text-neutral/70 text-sm">
                        Không có tài liệu đính kèm.
                      </p>
                    )}
                  </div>
                )}

                {activeTab === "Video" && (
                  <div className="space-y-3">
                    {member.youtube && member.youtube.length > 0 ? (
                      <YouTubeCardHorizontal videoUrl={member.youtube} />
                    ) : (
                      <p className="text-sm text-neutral/70">
                        Chưa có video giới thiệu.
                      </p>
                    )}
                  </div>
                )}

                {activeTab === "Tin tức" && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {member.news && member.news.length > 0 ? (
                      member.news.map((n, i) => (
                        <a
                          key={i}
                          href={n.link}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-4 bg-base-200/50 hover:bg-base-200 border border-base-300 rounded-xl p-3 shadow-sm hover:shadow-md transition duration-300"
                        >
                          {n.image ? (
                            <img
                              src={n.image}
                              alt={n.title}
                              className="w-24 h-24 object-cover rounded-lg border border-base-300"
                            />
                          ) : (
                            <div className="w-24 h-24 flex items-center justify-center bg-base-300 text-neutral rounded-lg">
                              📰
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="text-sm font-semibold text-base-content line-clamp-2">
                              {n.title}
                            </h3>
                            {n.date && (
                              <p className="text-xs text-neutral/70 mt-1">{n.date}</p>
                            )}
                          </div>
                        </a>
                      ))
                    ) : (
                      <p className="text-sm text-neutral/70">
                        Không có bài viết hoặc tin tức liên quan.
                      </p>
                    )}
                  </div>
                )}

              </motion.div>
            </div>

            {/* Điều hướng */}
            <div className="flex justify-between items-center px-6 py-3">
              <button onClick={handlePrev} className="btn btn-outline btn-sm">
                ← {boardMembersDTH[(selectedIndex - 1 + boardMembersDTH.length) % boardMembersDTH.length].name}
              </button>
              <button onClick={handleNext} className="btn btn-outline btn-sm">
                {boardMembersDTH[(selectedIndex + 1) % boardMembersDTH.length].name} →
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
