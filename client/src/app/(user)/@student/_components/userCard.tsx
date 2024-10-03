import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, MessageCircle, Settings } from "lucide-react";
import Link from "next/link";

export default function CreativeBlueUserCard() {
  const iconLinks = [
    { icon: Bell, path: "/notifications", label: "Notifications" },
    { icon: MessageCircle, path: "/messages", label: "Messages" },
    { icon: Settings, path: "/profile", label: "Settings" },
  ];

  return (
    <Card className="w-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg overflow-hidden relative">
      <div className="absolute inset-0 bg-blue-600 opacity-50">
        <div className=""></div>
      </div>
      <CardContent className="p-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-blue-300 rounded-full blur opacity-75"></div>
              <Avatar className="h-12 w-12 ring-2 ring-white relative">
                <AvatarImage
                  src="/placeholder.svg?height=48&width=48"
                  alt="User avatar"
                />
                <AvatarFallback className="bg-blue-700 text-white">
                  AL
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-white inline-block">
                Lê Vũ Đức Ân
              </span>
              <span className="text-sm text-blue-200">2151013004</span>
            </div>
          </div>
          <div className="flex space-x-2">
            {iconLinks.map(({ icon: Icon, path, label }) => (
              <Link href={path} key={path}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
