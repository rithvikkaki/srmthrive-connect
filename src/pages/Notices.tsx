
import React, { useState } from "react";
import NoticeCard from "./notices/NoticeCard";
import AssignmentCard from "./notices/AssignmentCard";
import NoticeDialog from "./notices/NoticeDialog";
import AssignmentDialog from "./notices/AssignmentDialog";
import Tabs from "./notices/Tabs";

// Example dummy data
const notices = [
  {
    id: 1,
    title: "Exam Timetable Released",
    description: "The end semester exam timetable has been released. Check the academic portal for more details.",
    date: "2024-04-20T10:00:00Z",
    type: "academic" as const,
  },
  {
    id: 2,
    title: "SRM Fest",
    description: "SRM Fest will take place from 1st to 3rd May 2024. Register with your group now!",
    date: "2024-04-18T09:00:00Z",
    type: "event" as const,
  },
];

const assignments = [
  {
    id: 1,
    title: "Math Assignment 3",
    description: "Complete the integrals exercise from the textbook.",
    dueDate: "2024-05-02",
    portal: "classroom",
  },
  {
    id: 2,
    title: "Physics Lab Report",
    description: "Submit your lab report on lens experiments.",
    dueDate: "2024-05-05",
    portal: "academia",
  },
];

const Notices: React.FC = () => {
  const [activeTab, setActiveTab] = useState("notices");
  const [openNoticeDialog, setOpenNoticeDialog] = useState<number | null>(null);
  const [openAssignmentDialog, setOpenAssignmentDialog] = useState<number | null>(null);

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-3xl font-bold mb-4">Notices & Assignments</h2>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div>
        {activeTab === "notices" ? (
          <div className="space-y-4">
            {notices.map((notice) => (
              <NoticeCard
                key={notice.id}
                {...notice}
                onClick={() => setOpenNoticeDialog(notice.id)}
              />
            ))}
            {openNoticeDialog !== null && (
              <NoticeDialog
                notice={notices.find((n) => n.id === openNoticeDialog)!}
                onClose={() => setOpenNoticeDialog(null)}
              />
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                {...assignment}
                onClick={() => setOpenAssignmentDialog(assignment.id)}
              />
            ))}
            {openAssignmentDialog !== null && (
              <AssignmentDialog
                assignment={assignments.find((a) => a.id === openAssignmentDialog)!}
                onClose={() => setOpenAssignmentDialog(null)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notices;
