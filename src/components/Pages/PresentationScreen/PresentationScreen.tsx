import { useContext, useEffect, useRef, useState } from "react";
import { CourseProps, DataContext } from "../../../context/DataContext";
import CourseProgress from "./components/CourseProgress";
import VideoDetails from "./components/VideoDetails";
import NavigationButtons from "./components/NavigationButtons";
import SummarySection from "./components/SummarySection";
import PageButtons from "./components/PageButtons";

const PresentationScreen = () => {
  const { user, course, progress, setUser, fetchUser } = useContext(DataContext);
  const completedSections: number[] = user?.courseProgress
    .filter(progress => progress.completed)
    .map(progress => progress.sectionId as number) || [];
  const [currentCourseDetails, setCurrentCourseDetails] = useState<CourseProps>({
    sectionID: 0,
    sectionTitle: "",
    videoTitle: "",
    videoUrl: "",
    summary: { overview: "" }
  });
  const [isCurrentModuleCompleted, setIsCurrentModuleCompleted] = useState<boolean>(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
  const [watchedDuration, setWatchedDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchCurrentVideo = (sectionIndex: number) => {
    if (user && course.length > 0) {
      const currentCourse = course[sectionIndex];
      if (currentCourse) {
        setCurrentCourseDetails(currentCourse);
        const currentProgress = user.courseProgress.find(
          (progressItem) => progressItem.sectionId === currentCourse.sectionID
        );
        setIsCurrentModuleCompleted(currentProgress?.completed ? true : false);
        setCurrentSectionIndex(sectionIndex);
        setWatchedDuration(currentProgress?.lastPlayedTime ? Number(currentProgress.lastPlayedTime) : 0);
      }
    }
  };

  useEffect(() => {
    if (user && course.length > 0) {
      const currentProgress = user.courseProgress.findIndex((progressItem) => !progressItem.completed);
      if (currentProgress !== -1) {
        fetchCurrentVideo(currentProgress);
      } else {
        fetchCurrentVideo(course.length - 1);
      }
    }
  }, [user, course]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('play', () => setIsPlaying(true));
      videoRef.current.addEventListener('pause', () => setIsPlaying(false));
      videoRef.current.addEventListener('ended', () => setIsPlaying(false));
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('play', () => setIsPlaying(true));
        videoRef.current.removeEventListener('pause', () => setIsPlaying(false));
        videoRef.current.removeEventListener('ended', () => setIsPlaying(false));
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [videoRef.current]);

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      intervalRef.current = setInterval(() => {
        if (videoRef.current) {
          setWatchedDuration(videoRef.current.currentTime);
        }
      }, 2000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [isPlaying, currentSectionIndex]);

  useEffect(() => {
    const updateWatchedDuration = async () => {
      if (user && currentCourseDetails.sectionID && watchedDuration > 0) {
        console.log("Updating watched duration...");
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${user.name}/watched-duration`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              courseId: currentCourseDetails.sectionID,
              watchedDuration: watchedDuration,
            })
          });
          if (response.ok) {
            console.log("Watched duration updated successfully.");
          }
          else {
            console.error("Failed to update watched duration.");
          }
        } catch (error) {
          console.error("Error updating watched duration:", error);
        }
      }
    };

    updateWatchedDuration();
  }, [watchedDuration]);

  const handleVideoEnd = async () => {
    if (user && currentCourseDetails.sectionID && !user.courseProgress[currentSectionIndex].completed) {
      console.log("Updating user progress...");
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${user.name}/progress`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            courseId: currentCourseDetails.sectionID,
            progress: {
              completed: true,
              lastPlayedTime: videoRef.current?.currentTime ?? 0,
            }
          })
        });
        if (response.ok) {
          fetchUser();
        }
        else {
          console.error("Failed to update user progress.");
        }
        setUser({
          ...user,
          courseProgress: user.courseProgress.map((item) =>
            item.sectionId === currentCourseDetails.sectionID
              ? { ...item, completed: true }
              : item
          )
        });
        setIsCurrentModuleCompleted(true);
      } catch (error) {
        console.error("Error updating user progress:", error);
      }
    }
  };

  const handlePageChange = (index: number) => {
    fetchCurrentVideo(index);
  };

  const handlePreviousVideo = () => {
    if (currentSectionIndex > 0) {
      fetchCurrentVideo(currentSectionIndex - 1);
    }
  };

  const handleNextVideo = () => {
    if (currentSectionIndex < course.length - 1) {
      fetchCurrentVideo(currentSectionIndex + 1);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col mt-20 bg-gray-100 dark:bg-gray-800">
      <main className="flex-grow w-full p-4 max-w-screen-xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <section className="mb-8 w-full">
          <CourseProgress progressPercentage={progress.progressPercentage} completedCourses={progress.completedCourses} totalCourses={progress.totalCourses} />

          <div className="w-full mb-8 flex justify-center">
            <video
              autoPlay={true}
              ref={videoRef}
              src={`${currentCourseDetails.videoUrl}#t=${user?.courseProgress[currentSectionIndex].watchedUntil}`}
              controls
              controlsList="nofastforward noplaybackrate"
              className="max-w-4xl w-full rounded-lg shadow-lg bg-black"
              onEnded={handleVideoEnd}
            >
              Your browser does not support the video tag.
            </video>
          </div>

          <VideoDetails sectionTitle={currentCourseDetails.sectionTitle} videoTitle={currentCourseDetails.videoTitle} summary={currentCourseDetails.summary.overview} isCurrentModuleCompleted={isCurrentModuleCompleted} />

          <NavigationButtons handlePreviousVideo={handlePreviousVideo} handleNextVideo={handleNextVideo} isCurrentModuleCompleted={isCurrentModuleCompleted} currentSectionIndex={currentSectionIndex} courseLength={course.length} />

          <SummarySection />

          <PageButtons
            courseLength={course.length}
            currentSectionIndex={currentSectionIndex}
            handlePageChange={handlePageChange}
            completedSections={completedSections}
          />
        </section>
      </main>
    </div>
  );
};

export default PresentationScreen;