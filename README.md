# 🚀 Welcome TaskMora!

## Hello, Frontend Developers! 👋

Welcome to **TaskMora**, an intuitive and interactive application designed to efficiently manage your tasks and categories. This project leverages **Angular 17**, modular architecture, and reactive programming principles to deliver an exceptional user experience.

---

## 🛠️ Project Context

As a developer, you are tasked with creating a **ToDoList application** that allows:

- Managing tasks: **Create**, **Modify**, and **Delete** tasks with detailed attributes.
- Organizing categories: **Add**, **Edit**, and **Remove** categories.
- Performing real-time search by task title or description.
- Viewing an interactive **dashboard** for task statistics.

The application ensures a **responsive** design for seamless usage across devices.

---

## 🎯 Key Features

### **Task Management**
- Attributes:
  - Title (with max length validation)
  - Description (with max length validation)
  - Due Date (validation to prevent past dates)
  - Priority: High, Medium, Low
  - Status: Done, Doing, To Do
- Tasks are associated with a single category.

### **Category Management**
- Manage custom categories (e.g., Work, Personal, Shopping).
- Validation to avoid duplicate category names.

### **Search and Dashboard**
- **Real-Time Search**:
  - Search tasks by title or description.
  - Filters applied dynamically.
- **Dashboard Statistics**:
  - Percentage of tasks completed.
  - Percentage of tasks pending.
  - Number of overdue tasks .
- Visual representation of statistics using **Chart.js**.

---

## 🔒 Data Validations

- Prevent past due dates for tasks.
- Enforce title and description length limits.
- Avoid duplicate categories.

---

## 📱 Responsive Design

Built for both desktop and mobile devices with the use of **SCSS** and **Tailwind**.

---

## 🔧 Technical Architecture

### **Technologies**
- **Angular 17**: Core framework.
- **SCSS**: Enhanced styling.
- **Tailwind**: For responsive design.
- **Chart.js**: For interactive dashboard graphs.

---

## 🔄 Data Persistence

- Uses a **JSON** structure for storing tasks and categories.
- Real-time search implementation for dynamic filtering.

---

## 📊 Dashboard with Chart.js

- Visualize task statistics with interactive graphs.
- Gain insights into task completion, pending tasks, and overdue counts.

---

## ⚙️ Running the Application

### Prerequisites
- **Node.js** and **npm** installed.
- Angular CLI installed globally:
  ```bash
  npm install -g @angular/cli
  ```
  
### Steps to Run
1. Clone the repository:
   ```bash
   git clone https://github.com/zinebMachrouh/TaskMora.git
   cd TaskMora
   ```
   
2. Install dependencies:
   ```bash
    npm install
    ```

3. Run the JSON server:
    ```bash
   json-server --watch db.json
    ```
   
4. Run the application:
    ```bash
    ng serve
    ```
   
5. Open the application in your browser:
    ```
    http://localhost:4200/
    ```
   
# 🎉 Get Started with TaskMora Today!
If you have any questions or need assistance, feel free to reach out to the development team. We are here to help you get started with TaskMora and ensure a seamless experience. 🚀
