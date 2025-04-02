import { Card, CardContent } from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CalendarDays } from "lucide-react";
import { toast } from "sonner";

export function NoteCard({
  title,
  description,
  avatarFallback,
  date,
  link,
  avatar,
}: {
  title?: string;
  description?: string;
  avatarFallback?: string;
  date?: string;
  link: string;
  avatar?: string;
}) {
  function handleOnClick() {
    toast.success(`Opening ${title} notes :D`);
    setTimeout(() => {
      window.location.href = link;
    }, 1500);
  }

  return (
    <Card className="w-[350px]" onClick={handleOnClick}>
      <CardContent>
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={avatar} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{title}</h4>
            <p className="text-sm">{description}</p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">{date}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
