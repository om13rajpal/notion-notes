import { NoteCard } from "@/components/NoteCart";
import { Data } from "@/constants/notes";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex items-center justify-start"></div>
      <div className="grid grid-cols-3 w-[75vw] mt-5">
        {Data.map((item) => {
          return (
            <div
              key={item.title}
              className="flex items-center justify-center mt-5"
            >
              <NoteCard
                title={item.title}
                description={item.description}
                avatarFallback={item.avatarFallback}
                date={item.date}
                link={item.link}
                avatar={item.avatar}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
