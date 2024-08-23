import { createContext, useEffect, useState } from "react";

// Define the types for your data structures
export type CourseProps = {
    sectionID: number;
    sectionTitle: string;
    videoTitle: string;
    videoUrl: string;
    summary: {
        overview: string;
    };
};

export type courseProgressProps = {
    sectionId: Number,
    watchedUntil: Number,
    totalDuration: Number,
    completed: Boolean,
    lastPlayedTime: Number,
}

export type UserProps = {
    name: string;
    email: string;
    courseProgress: courseProgressProps[];
};

type ProgressProps = {
    progressPercentage: number;
    completedCourses: number;
    totalCourses: number;
}

interface DataContextProps {
    user: UserProps | null;
    course: CourseProps[];
    progress: ProgressProps;
    setUser: (user: UserProps) => void;
    setCourse: (course: CourseProps[]) => void;
    fetchUser: () => void;  // Add method to fetch user data
}

export const DataContext = createContext<DataContextProps>({
    user: null,
    course: [],
    progress: {progressPercentage: 0, completedCourses: 0, totalCourses: 0},
    setUser: () => { },
    setCourse: () => { },
    fetchUser: () => { },  // Default implementation
});

const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const userName = "Avinash";
    const [user, setUser] = useState<UserProps | null>(null);
    const [course, setCourse] = useState<CourseProps[]>([]);
    const [progress, setProgress] = useState<ProgressProps>({progressPercentage: 0, completedCourses: 0, totalCourses: 0});

    const fetchUser = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userName}`);
            const userData: UserProps = await response.json();
            setUser(userData);
            setProgress(calculateProgress(userData.courseProgress));
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const fetchCourse = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/courses/course`);
            const courseData: CourseProps[] = await response.json();
            setCourse(courseData);
        } catch (error) {
            console.error("Error fetching course data:", error);
        }
    };

    const calculateProgress = (courseData: courseProgressProps[]) => {
        const completedCourses = courseData.filter(item => item.completed).length;
        const totalCourses = courseData.length;
        return {
            progressPercentage: totalCourses ? Math.round((completedCourses / totalCourses) * 100) : 0,
            completedCourses: completedCourses,
            totalCourses: totalCourses
        };
    };

    useEffect(() => {
        fetchUser();
        fetchCourse();
    }, []);

    return (
        <DataContext.Provider value={{ user, course, progress, setUser, setCourse, fetchUser }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;