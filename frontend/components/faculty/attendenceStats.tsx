import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

/**
 * Attendance statistics component for faculty dashboard
 * Shows attendance statistics for subjects taught by the faculty
 */
export function AttendanceStats() {
  const stats = [
    {
      subject: "Computer Science 101",
      totalClasses: 40,
      averageAttendance: 87,
      studentsEnrolled: 45,
    },
    {
      subject: "Data Structures",
      totalClasses: 35,
      averageAttendance: 92,
      studentsEnrolled: 38,
    },
    {
      subject: "Algorithms",
      totalClasses: 38,
      averageAttendance: 78,
      studentsEnrolled: 42,
    },
    {
      subject: "Database Systems",
      totalClasses: 30,
      averageAttendance: 85,
      studentsEnrolled: 35,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Statistics</CardTitle>
        <CardDescription>Average attendance rates for your subjects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{stat.subject}</h4>
                <span className="text-sm text-muted-foreground">{stat.averageAttendance}% average</span>
              </div>
              <Progress value={stat.averageAttendance} className="h-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{stat.totalClasses} classes conducted</span>
                <span>{stat.studentsEnrolled} students enrolled</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
