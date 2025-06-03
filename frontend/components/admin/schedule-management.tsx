"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Calendar } from "lucide-react"

/**
 * Schedule management component for admin
 * Handles creation and management of class schedules and timetables
 */
export function ScheduleManagement() {
  const [selectedMonth, setSelectedMonth] = useState("january")
  const [selectedYear, setSelectedYear] = useState("2024")

  // Mock schedule data
  const schedules = [
    {
      id: "1",
      subject: "Computer Science 101",
      faculty: "Dr. Smith",
      day: "Monday",
      startTime: "09:00",
      endTime: "10:30",
      room: "Room 201",
      course: "Computer Science",
      semester: "1st",
    },
    {
      id: "2",
      subject: "Data Structures",
      faculty: "Prof. Johnson",
      day: "Tuesday",
      startTime: "11:00",
      endTime: "12:30",
      room: "Room 105",
      course: "Computer Science",
      semester: "3rd",
    },
    {
      id: "3",
      subject: "Calculus I",
      faculty: "Dr. Wilson",
      day: "Wednesday",
      startTime: "14:00",
      endTime: "15:30",
      room: "Room 301",
      course: "Mathematics",
      semester: "1st",
    },
  ]

  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ]

  const years = ["2024", "2025", "2026"]

  return (
    <div className="space-y-6">
      {/* Header with filters and add button */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month.charAt(0).toUpperCase() + month.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Schedule
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Schedule</DialogTitle>
              <DialogDescription>Create a new class schedule entry</DialogDescription>
            </DialogHeader>
            <AddScheduleForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Schedule table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Class Schedule - {selectedMonth.charAt(0).toUpperCase() + selectedMonth.slice(1)} {selectedYear}
          </CardTitle>
          <CardDescription>Manage class timetables and schedules</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Faculty</TableHead>
                <TableHead>Day</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Course/Semester</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell className="font-medium">{schedule.subject}</TableCell>
                  <TableCell>{schedule.faculty}</TableCell>
                  <TableCell>{schedule.day}</TableCell>
                  <TableCell>
                    {schedule.startTime} - {schedule.endTime}
                  </TableCell>
                  <TableCell>{schedule.room}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{schedule.course}</div>
                      <div className="text-muted-foreground">{schedule.semester} Semester</div>
                    </div>
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

      {/* Weekly view */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Timetable View</CardTitle>
          <CardDescription>Visual representation of the weekly schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <WeeklyScheduleView schedules={schedules} />
        </CardContent>
      </Card>
    </div>
  )
}

/**
 * Form component for adding new schedule entries
 */
function AddScheduleForm() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
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
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cs101">Computer Science 101</SelectItem>
            <SelectItem value="cs201">Data Structures</SelectItem>
            <SelectItem value="math101">Calculus I</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="faculty">Faculty</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select faculty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="smith">Dr. Smith</SelectItem>
            <SelectItem value="johnson">Prof. Johnson</SelectItem>
            <SelectItem value="wilson">Dr. Wilson</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="day">Day</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select day" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monday">Monday</SelectItem>
              <SelectItem value="tuesday">Tuesday</SelectItem>
              <SelectItem value="wednesday">Wednesday</SelectItem>
              <SelectItem value="thursday">Thursday</SelectItem>
              <SelectItem value="friday">Friday</SelectItem>
              <SelectItem value="saturday">Saturday</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="startTime">Start Time</Label>
          <Input id="startTime" type="time" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endTime">End Time</Label>
          <Input id="endTime" type="time" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="room">Room</Label>
        <Input id="room" placeholder="e.g., Room 201" />
      </div>

      <Button className="w-full">Create Schedule</Button>
    </div>
  )
}

/**
 * Weekly schedule view component
 * Displays schedule in a weekly grid format
 */
function WeeklyScheduleView({ schedules }: { schedules: any[] }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const timeSlots = ["09:00-10:30", "11:00-12:30", "14:00-15:30", "16:00-17:30"]

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 bg-gray-50">Time</th>
            {days.map((day) => (
              <th key={day} className="border border-gray-300 p-2 bg-gray-50">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((timeSlot) => (
            <tr key={timeSlot}>
              <td className="border border-gray-300 p-2 font-medium bg-gray-50">{timeSlot}</td>
              {days.map((day) => {
                const classForSlot = schedules.find(
                  (schedule) => schedule.day === day && `${schedule.startTime}-${schedule.endTime}` === timeSlot,
                )
                return (
                  <td key={`${day}-${timeSlot}`} className="border border-gray-300 p-2 h-20">
                    {classForSlot && (
                      <div className="bg-blue-100 p-2 rounded text-xs">
                        <div className="font-medium">{classForSlot.subject}</div>
                        <div className="text-gray-600">{classForSlot.faculty}</div>
                        <div className="text-gray-600">{classForSlot.room}</div>
                      </div>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
