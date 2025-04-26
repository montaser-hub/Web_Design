# 🎓 School Management System

A complete backend database schema design for a scalable School Management System.
It covers user management, academic structure, scheduling, exams, quizzes, leaves, announcements, swap requests, reporting, and logging.

## 🔹 Main Entities & Tables

### 🔑 User Authentication & Profiles

- **User**: Basic user details, authentication, supervisor link, branch code.
- **Role**: Defines user roles (Admin, Supervisor, Teacher, Student).
- **UserRoleLeaveType**: Available leave types for each role per user.
- **Log**: Tracks user sessions and actions.

### 🏫 Academic Structure

- **School**: School main profile.
- **SchoolFounder**: Founder history.
- **Branch**: School branches.
- **BranchContactInfo**: Branch contact details.
- **Class**: Class definitions.
- **Subject**: Subject definitions.
- **ClassSubject**: Subjects assigned to classes.
- **BranchClass**: Classes available per branch.
- **BranchSubject**: Subjects available per branch.

### 📅 Scheduling & Attendance

- **Schedule**: Generic schedules.
- **UserSchedule**: Users assigned to schedules.
- **Attendance**: Attendance sessions.
- **UserAttendance**: Attendance records per user.

### 🎓 Exams and Quizzes

- **Exam**: Exam records.
- **ExamSchedule**: Exam schedules.
- **ExamResult**: Exam results.
- **Quiz**: Quiz records.
- **QuizSchedule**: Quiz schedules.
- **QuizResult**: Quiz results.

### 🌐 Content and Communication

- **Announcement**: Announcements to users.
- **AnnouncementRole**: Roles targeted for announcements.
- **AnnouncementBy**: Media associated with announcements.
- **Notification**: Notifications sent to users.

### 📈 Reporting

- **Report**: General reports.
- **Result**: Result details under a report.
- **ClassReport**: Reports assigned to classes.

### 🧵 Swap Requests

- **SwapRequest**: Requests to swap schedules.
- **SwapApproval**: Approvals for swap requests.
- **SwapConfig**: Configurations for swapping rules.
- **RoleSwapConfig**: Role-based swap permissions.
- **SwapConfigApproverRoles**: Roles allowed to approve swaps.

### 🛋️ Leave Management

- **LeaveRequest**: User leave applications.
- **LeaveRequestApprovals**: Leave approval workflow.
- **LeaveType**: Types of leaves.

### 📍 Location & Address Management

- **Location**: Geolocation details.
- **Address**: Full address information.

## 🔹 Entity Relationship Highlights

- A **User** can have many Roles, Schedules, Classes, Subjects, Attendance records, Logs, Notifications, and Leaves.
- A **School** contains multiple Branches.
- Each **Branch** manages its own Classes, Subjects, Schedules, Exams, Quizzes, and Announcements.
- **Schedules** connect to Attendance, Exams, and Quizzes.
- **Exams** and **Quizzes** are linked to Subjects and produce Results and Reports.
- **SwapRequest** flows depend on **SwapConfig** rules and **User Roles**.

## 👩‍🏫 User Model Sample Fields

| Field               | Type      | Description                     |
|---------------------|-----------|---------------------------------|
| ID                  | ObjectId  | Unique identifier               |
| Email               | String    | User email                      |
| FirstName           | String    | First name                      |
| LastName            | String    | Last name                       |
| DoB                 | Date      | Date of birth                   |
| Picture             | String    | Profile image URL               |
| Gender              | String    | Male / Female / Other           |
| Status              | String    | Active / Inactive               |
| SupervisorUserId    | ObjectId  | Supervisor user ID              |
| BranchCode          | String    | Code for associated branch      |
| Password            | String    | Hashed password                 |
| PasswordChangedAt   | Date      | Last password change date       |
| PasswordResetToken  | String    | Password reset token            |
| PasswordResetExpires| Date      | Password reset token expiry     |
| CreatedAt           | Date      | Record creation timestamp       |
| UpdatedAt           | Date      | Last update timestamp           |

## 🔹 Important Design Choices

- **Separation of Academic and Management Structure**: Clear separation between School > Branch > Class/Subject.
- **Flexible Scheduling**: Dynamic assignment of schedules to users.
- **Swap & Approval Chains**: Fully configurable swapping and approval based on user roles.
- **Multi-layer Reporting**: Reporting tied to Exams, Quizzes, and Results.
- **Robust Leave Management**: Multi-step leave request and approval system.
- **Comprehensive Logging**: Every user action is logged for auditing.
