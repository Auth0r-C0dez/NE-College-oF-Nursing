import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

/**
 * Student profile component
 * Displays basic student information and academic details
 */
export function StudentProfile() {
  const student = {
    name: "John Doe",
    studentId: "STU2024001",
    course: "Computer Science",
    semester: "6th Semester",
    email: "john.doe@xyzcollege.edu",
    phone: "+1 (555) 123-4567",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Your academic information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg">JD</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{student.name}</h3>
            <p className="text-sm text-muted-foreground">{student.studentId}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Course</label>
            <p className="text-sm">{student.course}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Semester</label>
            <p className="text-sm">{student.semester}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Email</label>
            <p className="text-sm">{student.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Phone</label>
            <p className="text-sm">{student.phone}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
