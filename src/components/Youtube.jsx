import React, { useEffect, useState } from "react";

export default function YouTubeCardHorizontal({ videoUrl }) {
  const [videoInfo, setVideoInfo] = useState(null);

  const extractVideoId = (link) => {
    if (!link || typeof link !== "string") return null;
    const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&?/]+)/;
    const match = link.match(regex);
    return match ? match[1] : null;
  };

  useEffect(() => {
    const videoId = extractVideoId(videoUrl);
    if (!videoId) return;

    fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    )
      .then((res) => res.json())
      .then((data) => {
        setVideoInfo({
          title: data.title,
          thumbnail: data.thumbnail_url,
          author: data.author_name,
          link: `https://www.youtube.com/watch?v=${videoId}`,
        });
      })
      .catch(() => setVideoInfo(null));
  }, [videoUrl]);

  if (!videoInfo || !videoUrl) return null;

  return (
    <a
      href={videoInfo.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-3 rounded-xl bg-base-200 dark:bg-base-300 hover:bg-base-100 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Thumbnail */}
      <figure className="flex-shrink-0 w-32 h-20 rounded-lg overflow-hidden">
        <img
          src={videoInfo.thumbnail}
          alt={videoInfo.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </figure>

      {/* Nội dung */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-base-content line-clamp-2">
          {videoInfo.title}
        </h3>
        {videoInfo.author && (
          <p className="text-xs text-base-content mt-1 line-clamp-1">
            {videoInfo.author}
          </p>
        )}
      </div>
    </a>
  );
}
