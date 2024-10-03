import {
  FaHome,
  FaUserGraduate,
  FaUsers,
  FaChalkboardTeacher,
  FaBook,
  FaSchool,
  FaBookOpen,
  FaFileAlt,
  FaClipboardList,
  FaGraduationCap,
  FaCalendarAlt,
  FaEnvelope,
  FaBullhorn,
  // FaUserCircle,
  // FaCog,
  // FaSignOutAlt,
} from "react-icons/fa";

interface NavItem {
  title: string;
  address: string;
  icon: React.ReactElement;
}
interface Menu {
  title: string;
  NavItem: NavItem[];
}

export const NavItems: NavItem[] = [
  {
    icon: <FaHome size={28} />,
    title: "Trang chủ", // Home
    address: "/",
  },
  {
    icon: <FaChalkboardTeacher size={28} />,
    title: "Giảng viên", // Teachers
    address: "/teachers",
  },
  {
    icon: <FaUserGraduate size={28} />,
    title: "Sinh viên", // Students
    address: "/students",
  },
  {
    icon: <FaBook size={28} />,
    title: "Môn học", // Subjects
    address: "/subjects",
  },
  {
    icon: <FaSchool size={28} />,
    title: "Lớp học", // Classes
    address: "/classes",
  },
  {
    icon: <FaBookOpen size={28} />,
    title: "Bài học", // Lessons
    address: "/lessons",
  },
  {
    icon: <FaFileAlt size={28} />,
    title: "Kỳ thi", // Exams
    address: "/exams",
  },
  {
    icon: <FaClipboardList size={28} />,
    title: "Bài tập", // Assignments
    address: "/assignments",
  },
  {
    icon: <FaGraduationCap size={28} />,
    title: "Kết quả", // Results
    address: "/results",
  },
  {
    icon: <FaCalendarAlt size={28} />,
    title: "Điểm danh", // Attendance
    address: "/attendance",
  },
  {
    icon: <FaCalendarAlt size={28} />,
    title: "Sự kiện", // Events
    address: "/events",
  },
  {
    icon: <FaEnvelope size={28} />,
    title: "Tin nhắn", // Messages
    address: "/messages",
  },
  {
    icon: <FaBullhorn size={28} />,
    title: "Thông báo", // Announcements
    address: "/announcements",
  },
];
// {
//   title: "KHÁC", // OTHER
//   NavItem: [
//     {
//       icon: <FaUserCircle />,
//       title: "Hồ sơ", // Profile
//       address: "/profile",
//     },
//     {
//       icon: <FaCog />,
//       title: "Cài đặt", // Settings
//       address: "/settings",
//     },
//   ],
// },
