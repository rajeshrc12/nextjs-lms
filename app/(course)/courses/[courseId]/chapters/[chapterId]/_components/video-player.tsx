"use client";

import { Loader2, Lock } from "lucide-react";
// import MuxPlayer from "@mux/mux-player-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import toast from "react-hot-toast";
import axios from "axios";
interface VideoPlayerProps {
  playbackId: string;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
  videoUrl: string;
}

const VideoPlayer = ({
  playbackId,
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  title,
  videoUrl,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(true);
  const router = useRouter();
  const confetti = useConfettiStore();

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(
          `/api/courses/${courseId}/chapters/${chapterId}/progress`,
          {
            isCompleted: true,
          }
        );
        if (!nextChapterId) {
          confetti.onOpen();
        }
        if (nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
        }
      }
      toast.success("Progress updated");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked.</p>
        </div>
      )}
      {!isLocked && (
        // <MuxPlayer
        //   title={title}
        //   className={cn(!isReady && "hidden")}
        //   onCanPlay={() => setIsReady(true)}
        //   onEnded={() => {}}
        //   autoPlay
        //   playbackId={playbackId}
        // />
        <video
          controls
          //   autoPlay
          src={videoUrl}
          onEnded={() => {
            onEnd();
          }}
          onCanPlay={() => setIsReady(true)}
          className={cn("w-full h-full", !isReady && "hidden")}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
