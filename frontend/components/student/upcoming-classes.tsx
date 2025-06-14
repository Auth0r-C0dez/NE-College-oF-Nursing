import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MapPin } from "lucide-react"

/**
 * Upcoming classes component for student dashboard
 * Shows today's and upcoming class schedule
 */
export function UpcomingClasses() {
  const classes = [
    {
      subject: "Computer Science 101",
      time: "09:00 AM - 10:30 AM",
      room: "Room 201",
      faculty: "Dr. Smith",
    },
    {
      subject: "Mathematics",
      time: "11:00 AM - 12:30 PM",
      room: "Room 105",
      faculty: "Prof. Johnson",
    },
    {
      subject: "Physics Lab",
      time: "02:00 PM - 04:00 PM",
      room: "Lab 301",
      faculty: "Dr. Wilson",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Classes</CardTitle>
        <CardDescription>Your schedule for today</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {classes.map((classItem, index) => (
            <div key={index} className="border-l-4 border-primary pl-4 py-2">
              <h4 className="font-medium">{classItem.subject}</h4>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Clock className="h-4 w-4 mr-1" />
                {classItem.time}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                {classItem.room}
              </div>
              <p className="text-sm text-muted-foreground">{classItem.faculty}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
