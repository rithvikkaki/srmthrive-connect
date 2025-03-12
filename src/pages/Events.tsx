
import { Calendar as CalendarIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Events = () => {
  const currentEvents = [
    {
      id: 1,
      title: "Mid-Term Examinations",
      description: "Mid-term exams for all departments",
      date: "2024-04-10",
      type: "academic",
      dayOrder: "Day 3"
    },
    {
      id: 2,
      title: "College Cultural Fest",
      description: "Annual cultural festival with performances and competitions",
      date: "2024-04-15",
      type: "cultural",
      dayOrder: "Day 5"
    },
    {
      id: 3,
      title: "Project Submission Deadline",
      description: "Final date for submitting semester projects",
      date: "2024-04-20",
      type: "deadline",
      dayOrder: "Day 1"
    }
  ];

  const holidays = [
    {
      id: 1,
      title: "Tamil New Year",
      description: "Public holiday for Tamil New Year celebrations",
      date: "2024-04-14"
    },
    {
      id: 2,
      title: "Labour Day",
      description: "Public holiday",
      date: "2024-05-01"
    }
  ];

  const assignments = [
    {
      id: 1,
      title: "Database Management System Project",
      description: "Create a fully functional database with front-end connectivity",
      dueDate: "2024-04-12",
      subject: "DBMS"
    },
    {
      id: 2,
      title: "Machine Learning Case Study",
      description: "Analysis and implementation of ML algorithms on provided dataset",
      dueDate: "2024-04-18",
      subject: "ML"
    }
  ];

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Academic Calendar & Events</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="bg-thrive-50/20">
            <div className="flex items-center gap-3">
              <CalendarIcon className="h-6 w-6 text-thrive-500" />
              <div>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Day order and academic events</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {currentEvents.map(event => (
                <div key={event.id} className="border-b pb-3 last:border-0">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{event.title}</h3>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                      {event.dayOrder}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-muted-foreground">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                      {event.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-red-50">
            <div className="flex items-center gap-3">
              <CalendarIcon className="h-6 w-6 text-red-500" />
              <div>
                <CardTitle>Upcoming Holidays</CardTitle>
                <CardDescription>Official holidays and breaks</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {holidays.map(holiday => (
                <div key={holiday.id} className="border-b pb-3 last:border-0">
                  <h3 className="font-medium">{holiday.title}</h3>
                  <p className="text-sm text-muted-foreground">{holiday.description}</p>
                  <div className="mt-2">
                    <span className="text-xs text-red-600 font-medium">
                      {new Date(holiday.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader className="bg-amber-50">
          <div className="flex items-center gap-3">
            <CalendarIcon className="h-6 w-6 text-amber-500" />
            <div>
              <CardTitle>Assignment Due Dates</CardTitle>
              <CardDescription>Upcoming submissions and deadlines</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {assignments.map(assignment => (
              <div key={assignment.id} className="border-b pb-3 last:border-0">
                <div className="flex justify-between">
                  <h3 className="font-medium">{assignment.title}</h3>
                  <span className="text-sm bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                    {assignment.subject}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{assignment.description}</p>
                <div className="mt-2">
                  <span className="text-xs font-semibold text-red-600">
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Events;
