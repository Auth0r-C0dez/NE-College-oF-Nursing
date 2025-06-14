import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users } from "lucide-react"

/**
 * Assigned subjects component for faculty dashboard
 * Shows all subjects assigned to the faculty member
 */
export function AssignedSubjects() {
  const subjects = [
    {
      name: "Computer Science 101",
      code: "CS101",
      semester: "1st",
      students: 45,
      course: "Computer Science",
    },
    {
      name: "Data Structures",
      code: "CS201",
      semester: "3rd",
      students: 38,
      course: "Computer Science",
    },
    {
      name: "Algorithms",
      code: "CS301",
      semester: "5th",
      students: 42,
      course: "Computer Science",
    },
    {
      name: "Database Systems",
      code: "CS401",
      semester: "7th",
      students: 35,
      course: "Computer Science",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assigned Subjects</CardTitle>
        <CardDescription>Subjects you are currently teaching</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {subjects.map((subject, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{subject.name}</h4>
                <Badge variant="secondary">{subject.code}</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  {subject.semester} Semester
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {subject.students} students
                </div>
                <div>Course: {subject.course}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
