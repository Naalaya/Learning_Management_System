import {
  LayoutDashboard,
  Calendar,
  Library,
  Users,
  BookOpen,
  ToggleLeft,
  FileText,
  UserCheck,
  MessageSquare,
  HelpCircle,
  Settings,
} from "lucide-react";

interface NavItem {
  title: string;
  address: string;
  icon: React.ReactElement;
}
export const NavItems: NavItem[] = [
  {
    icon: <LayoutDashboard size={28} />,
    title: "Tổng Quan",
    address: "/dashboard",
  },
  { icon: <Calendar size={28} />, title: "Lịch Học", address: "/calendar" },
  { icon: <Library size={28} />, title: "Thư viện sách", address: "/library" },
  { icon: <Users size={28} />, title: "Lớp Học", address: "/classroom" },
  { icon: <BookOpen size={28} />, title: "Môn Học", address: "/courses" },
  {
    icon: <ToggleLeft size={28} />,
    title: "Tích Hợp",
    address: "/integration",
  },
  {
    icon: <FileText size={28} />,
    title: "Bài Tập",
    address: "/assignments",
  },
  {
    icon: <UserCheck size={28} />,
    title: "Điểm Danh",
    address: "/attendance",
  },
  // {
  //   icon: <MessageSquare size={28} />,
  //   title: "Tin Nhắn",
  //   address: "/messages",
  // },
  { icon: <HelpCircle size={28} />, title: "Trợ Giúp", address: "/help" },
  // { icon: <Settings size={28} />, title: "Cài Đặt", address: "/settings" },
];
