import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

/**
 * Attendance overview component for student dashboard
 * Shows overall attendance statistics and subject-wise breakdown
 */
export function AttendanceOverview() {
  const subjects = [
    { name: "Computer Science 101", attendance: 85, total: 40, attended: 34 },
    { name: "Mathematics", attendance: 92, total: 35, attended: 32 },
    { name: "Physics", attendance: 78, total: 38, attended: 30 },
    { name: "English", attendance: 95, total: 30, attended: 28 },
    { name: "Chemistry", attendance: 82, total: 36, attended: 30 },
  ]

  const overallAttendance = Math.round(subjects.reduce((acc, subject) => acc + subject.attendance, 0) / subjects.length)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Overview</CardTitle>
        <CardDescription>Your attendance statistics for current semester</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-medium">Overall Attendance</span>
            <span className="text-2xl font-bold text-primary">{overallAttendance}%</span>
          </div>
          <Progress value={overallAttendance} className="h-3" />
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Subject-wise Attendance</h4>
          {subjects.map((subject, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{subject.name}</span>
                <span className="text-sm text-muted-foreground">
                  {subject.attended}/{subject.total} ({subject.attendance}%)
                </span>
              </div>
              <Progress value={subject.attendance} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
