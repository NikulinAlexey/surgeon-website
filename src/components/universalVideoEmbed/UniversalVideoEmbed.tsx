// components/UniversalVideoEmbed.tsx
"use client";

import React from "react";

interface UniversalVideoEmbedProps {
  videoUrl: string;
  platform?: "auto" | "rutube" | "vk" | "youtube";
  width?: string | number;
  height?: string | number;
  autoPlay?: boolean;
}

const UniversalVideoEmbed: React.FC<UniversalVideoEmbedProps> = ({
  videoUrl,
  platform = "auto",
  width = "100%",
  height = 500,
  autoPlay = false,
}) => {
  // Автоматическое определение платформы по URL
  const detectPlatform = (url: string): string => {
    if (url.includes("rutube.ru") || url.includes("rutu.be")) {
      return "rutube";
    }
    if (url.includes("vk.com") || url.includes("vk.ru")) {
      return "vk";
    }
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      return "youtube";
    }
    return "unknown";
  };

  const targetPlatform =
    platform === "auto" ? detectPlatform(videoUrl) : platform;
  const autoplayParam = autoPlay ? "1" : "0";

  const getEmbedUrl = (): string => {
    switch (targetPlatform) {
      case "rutube":
        // Для RuTube
        const rutubeId =
          videoUrl.match(/rutube\.ru\/video\/([a-z0-9]+)/i)?.[1] ||
          videoUrl.match(/rutu\.be\/([a-z0-9]+)/i)?.[1] ||
          videoUrl;
        return `https://rutube.ru/play/embed/${rutubeId}?ap=${autoplayParam}`;

      case "vk":
        // Для VK
        const vkMatch = videoUrl.match(/video-(\d+_\d+)/);
        if (vkMatch) {
          const [ownerId, videoId] = vkMatch[1].split("_");
          return `https://vk.com/video_ext.php?oid=${ownerId}&id=${videoId}&hash=${vkMatch[1]}&hd=2&autoplay=${autoplayParam}`;
        }
        return videoUrl;

      case "youtube":
        // Для YouTube
        const youtubeId = videoUrl.match(
          /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/,
        )?.[1];
        if (youtubeId) {
          return `https://www.youtube.com/embed/${youtubeId}?autoplay=${autoplayParam}`;
        }
        return videoUrl;

      default:
        return videoUrl;
    }
  };

  return (
    <div className="video-embed-container">
      <iframe
        src={getEmbedUrl()}
        width={width}
        height={height}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Видео трансляция"
        style={{
          borderRadius: "8px",
          border: "none",
          maxWidth: "100%",
        }}
      />
    </div>
  );
};

export default UniversalVideoEmbed;
