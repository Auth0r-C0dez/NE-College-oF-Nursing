"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Edit, Trash2 } from "lucide-react"

/**
 * User management component for admin
 * Handles creation, editing, and deletion of student and faculty accounts
 */
export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [userType, setUserType] = useState("all")

  // Mock data for demonstration
  const users = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@xyzcollege.edu",
      role: "student",
      course: "Computer Science",
      semester: "6th",
      status: "active",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@xyzcollege.edu",
      role: "faculty",
      department: "Computer Science",
      subjects: ["CS101", "CS201"],
      status: "active",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike.johnson@xyzcollege.edu",
      role: "student",
      course: "Mathematics",
      semester: "4th",
      status: "active",
    },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = userType === "all" || user.role === userType
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      {/* Header with search and filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={userType} onValueChange={setUserType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="student">Students</SelectItem>
              <SelectItem value="faculty">Faculty</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new student or faculty account</DialogDescription>
            </DialogHeader>
            <AddUserForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Users table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
          <CardDescription>Manage student and faculty accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === "faculty" ? "default" : "secondary"}>{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    {user.role === "student" ? (
                      <div className="text-sm">
                        <div>{user.course}</div>
                        <div className="text-muted-foreground">{user.semester} Semester</div>
                      </div>
                    ) : (
                      <div className="text-sm">
                        <div>{user.department}</div>
                        <div className="text-muted-foreground">{user.subjects?.join(", ")}</div>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                  </TableCell>
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
    </div>
  )
}

/**
 * Form component for adding new users
 * Handles both student and faculty creation with role-specific fields
 */
function AddUserForm() {
  const [userRole, setUserRole] = useState("")

  return (
    <Tabs value={userRole} onValueChange={setUserRole} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="student">Student</TabsTrigger>
        <TabsTrigger value="faculty">Faculty</TabsTrigger>
      </TabsList>

      <TabsContent value="student" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" placeholder="Enter first name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" placeholder="Enter last name" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter email address" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="studentId">Student ID</Label>
            <Input id="studentId" placeholder="Enter student ID" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="course">Course</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cs">Computer Science</SelectItem>
                <SelectItem value="math">Mathematics</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="semester">Semester</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select semester" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <SelectItem key={sem} value={sem.toString()}>
                  {sem}st Semester
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full">Create Student Account</Button>
      </TabsContent>

      <TabsContent value="faculty" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="facultyFirstName">First Name</Label>
            <Input id="facultyFirstName" placeholder="Enter first name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="facultyLastName">Last Name</Label>
            <Input id="facultyLastName" placeholder="Enter last name" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="facultyEmail">Email</Label>
          <Input id="facultyEmail" type="email" placeholder="Enter email address" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="facultyId">Faculty ID</Label>
            <Input id="facultyId" placeholder="Enter faculty ID" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cs">Computer Science</SelectItem>
                <SelectItem value="math">Mathematics</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subjects">Subjects (comma-separated)</Label>
          <Input id="subjects" placeholder="e.g., CS101, CS201, CS301" />
        </div>

        <Button className="w-full">Create Faculty Account</Button>
      </TabsContent>
    </Tabs>
  )
}
