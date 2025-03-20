
import { Calendar as CalendarIcon, BookOpen, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Events = () => {
  // Current events with day orders
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
    },
    {
      id: 4,
      title: "Technical Symposium",
      description: "Department-wise technical competitions and workshops",
      date: "2024-04-25",
      type: "academic",
      dayOrder: "Day 4"
    },
    {
      id: 5,
      title: "Industry Connect Session",
      description: "Interaction with industry experts",
      date: "2024-04-28",
      type: "career",
      dayOrder: "Day 2"
    }
  ];

  // Holidays from the calendar image
  const holidays = [
    {
      id: 1,
      title: "Tamil New Year",
      description: "Public holiday for Tamil New Year celebrations",
      date: "2024-04-14"
    },
    {
      id: 2,
      title: "May Day - Holiday",
      description: "Labor Day public holiday",
      date: "2024-05-01"
    },
    {
      id: 3,
      title: "Good Friday",
      description: "Public holiday",
      date: "2024-04-19"
    },
    {
      id: 4,
      title: "Bakrid (Idul Azha)",
      description: "Public holiday",
      date: "2024-06-07"
    },
    {
      id: 5,
      title: "Mahaveer Jayanthi",
      description: "Religious holiday",
      date: "2024-04-11"
    }
  ];

  // Assignments with subject codes from image
  const assignments = [
    {
      id: 1,
      title: "Cloud Computing Project",
      description: "Implementation of cloud services with front-end connectivity",
      dueDate: "2024-04-12",
      subject: "21CSE362T"
    },
    {
      id: 2,
      title: "Software Engineering Case Study",
      description: "Analysis and documentation of a real-world software project",
      dueDate: "2024-04-18",
      subject: "21CSC303J"
    },
    {
      id: 3,
      title: "Compiler Design Implementation",
      description: "Create a simple compiler for a given grammar",
      dueDate: "2024-04-20",
      subject: "21CSC304J"
    },
    {
      id: 4,
      title: "AR/VR Demo Application",
      description: "Develop a demonstration app using AR/VR technologies",
      dueDate: "2024-04-15",
      subject: "21CSE353T"
    },
    {
      id: 5,
      title: "Data Science Analysis",
      description: "Statistical analysis of provided dataset",
      dueDate: "2024-04-22",
      subject: "21CSS303T"
    }
  ];

  // Calculate days remaining for assignments
  const calculateDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="h-6 w-6 text-thrive-500" />
        <h1 className="text-3xl font-bold">Academic Calendar & Events</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2">
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
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      {event.dayOrder}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-muted-foreground">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {event.type}
                    </Badge>
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
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {holidays.map(holiday => (
                <div key={holiday.id} className="border-b pb-3 last:border-0">
                  <h3 className="font-medium">{holiday.title}</h3>
                  <p className="text-sm text-muted-foreground">{holiday.description}</p>
                  <div className="mt-2">
                    <Badge variant="destructive" className="text-xs">
                      {new Date(holiday.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </Badge>
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
            <BookOpen className="h-6 w-6 text-amber-500" />
            <div>
              <CardTitle>Assignment Due Dates</CardTitle>
              <CardDescription>Upcoming submissions and deadlines</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {assignments.map(assignment => {
              const daysRemaining = calculateDaysRemaining(assignment.dueDate);
              
              return (
                <div key={assignment.id} className="border-b pb-3 last:border-0">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{assignment.title}</h3>
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                      {assignment.subject}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{assignment.description}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-xs font-semibold text-red-600">
                      Due: {new Date(assignment.dueDate).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                    <Badge variant={daysRemaining <= 3 ? "destructive" : daysRemaining <= 7 ? "outline" : "secondary"}>
                      {daysRemaining > 0 
                        ? `${daysRemaining} day${daysRemaining === 1 ? '' : 's'} remaining`
                        : daysRemaining === 0
                          ? "Due today!"
                          : "Overdue"}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Events;
