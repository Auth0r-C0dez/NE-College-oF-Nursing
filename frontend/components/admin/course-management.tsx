"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, BookOpen } from "lucide-react"

/**
 * Course management component for admin
 * Handles creation, editing, and management of courses and subjects
 */
export function CourseManagement() {
  const [activeTab, setActiveTab] = useState("courses")

  // Mock data for courses
  const courses = [
    {
      id: "1",
      name: "Computer Science",
      code: "CS",
      duration: 8,
      subjects: 32,
      students: 150,
    },
    {
      id: "2",
      name: "Mathematics",
      code: "MATH",
      duration: 6,
      subjects: 24,
      students: 80,
    },
    {
      id: "3",
      name: "Physics",
      code: "PHY",
      duration: 6,
      subjects: 28,
      students: 65,
    },
  ]

  // Mock data for subjects
  const subjects = [
    {
      id: "1",
      name: "Introduction to Programming",
      code: "CS101",
      course: "Computer Science",
      semester: 1,
      credits: 4,
      faculty: "Dr. Smith",
    },
    {
      id: "2",
      name: "Data Structures",
      code: "CS201",
      course: "Computer Science",
      semester: 3,
      credits: 4,
      faculty: "Prof. Johnson",
    },
    {
      id: "3",
      name: "Calculus I",
      code: "MATH101",
      course: "Mathematics",
      semester: 1,
      credits: 3,
      faculty: "Dr. Wilson",
    },
  ]

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Course Management</h3>
              <p className="text-sm text-muted-foreground">Create and manage academic courses</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Course
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Course</DialogTitle>
                  <DialogDescription>Create a new academic course</DialogDescription>
                </DialogHeader>
                <AddCourseForm />
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Courses ({courses.length})</CardTitle>
              <CardDescription>Manage academic courses and programs</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Name</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Subjects</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.name}</TableCell>
                      <TableCell>{course.code}</TableCell>
                      <TableCell>{course.duration} semesters</TableCell>
                      <TableCell>{course.subjects}</TableCell>
                      <TableCell>{course.students}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <BookOpen className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Subject Management</h3>
              <p className="text-sm text-muted-foreground">Create and manage course subjects</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Subject
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Subject</DialogTitle>
                  <DialogDescription>Create a new subject for a course</DialogDescription>
                </DialogHeader>
                <AddSubjectForm />
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Subjects ({subjects.length})</CardTitle>
              <CardDescription>Manage course subjects and curriculum</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject Name</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Semester</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Faculty</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subjects.map((subject) => (
                    <TableRow key={subject.id}>
                      <TableCell className="font-medium">{subject.name}</TableCell>
                      <TableCell>{subject.code}</TableCell>
                      <TableCell>{subject.course}</TableCell>
                      <TableCell>{subject.semester}</TableCell>
                      <TableCell>{subject.credits}</TableCell>
                      <TableCell>{subject.faculty}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

/**
 * Form component for adding new courses
 */
function AddCourseForm() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="courseName">Course Name</Label>
        <Input id="courseName" placeholder="e.g., Computer Science" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="courseCode">Course Code</Label>
        <Input id="courseCode" placeholder="e.g., CS" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="duration">Duration (Semesters)</Label>
        <Input id="duration" type="number" placeholder="e.g., 8" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input id="description" placeholder="Course description" />
      </div>

      <Button className="w-full">Create Course</Button>
    </div>
  )
}

/**
 * Form component for adding new subjects
 */
function AddSubjectForm() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="subjectName">Subject Name</Label>
        <Input id="subjectName" placeholder="e.g., Introduction to Programming" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subjectCode">Subject Code</Label>
        <Input id="subjectCode" placeholder="e.g., CS101" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="semester">Semester</Label>
          <Input id="semester" type="number" placeholder="e.g., 1" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="credits">Credits</Label>
          <Input id="credits" type="number" placeholder="e.g., 4" />
        </div>
      </div>

      <Button className="w-full">Create Subject</Button>
    </div>
  )
}
