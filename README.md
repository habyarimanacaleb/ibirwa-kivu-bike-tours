# Main Application & Admin Dashboard Project

## Table of Contents
1. [Project Overview](#project-overview)  
2. [System Design](#system-design)  
3. [Functional Requirements](#functional-requirements)  
4. [Non-Functional Requirements](#non-functional-requirements)  
5. [Technologies Used](#technologies-used)  
6. [Features](#features)  
7. [Installation and Setup](#installation-and-setup)  
8. [Usage](#usage)  
9. [Project Structure](#project-structure)  
10. [API Endpoints](#api-endpoints)  
11. [Contributing](#contributing)  
12. [License](#license)  
13. [Contact](#contact)

---

## Project Overview

This project consists of a **Main Application** that provides users with information and services related to [your domain, e.g., tourism, property management, e-commerce].  

Alongside, there is an **Admin Dashboard** that allows administrators to monitor, manage, and control the application content, including services, gallery items, bookings, messages, users, and analytics.

The main app focuses on delivering a smooth, user-friendly experience for end-users, while the admin dashboard focuses on back-office management.

---

## System Design

### Architecture

- **Frontend:** React.js Vite + Taiwind CSS with modular components and client-side routing.  
- **Backend:** RESTful API server (Node.js/Express), providing endpoints for users, services, gallery, bookings, and contacts.  
- **State Management:** React Hooks and Zustand global state management tool.  
- **Styling:** Tailwind CSS for utility-first styling and responsive design.  
- **Routing:** React Router for frontend navigation.  
- **Authentication:** JWT-based authentication for admin routes (planned/implemented).  
- **Data Flow:** Frontend fetches data from backend APIs asynchronously and renders UI components dynamically.  

### Components

| Component           | Description                                         |
|---------------------|-----------------------------------------------------|
| MainLayout          | Common layout wrapping sidebar and top navigation. |
| Sidebar             | Navigation menu for the admin dashboard.           |
| TopNav              | Top navigation bar including search functionality. |
| ServicesList        | Displays a list of service cards.                  |
| GalleryList         | Displays a list of gallery items.                  |
| MainDashboardLayout | Dashboard page showing analytics and lists.       |
| API Server          | Provides REST endpoints for all required data.     |

---

## Functional Requirements

### Main Application

- Display services, gallery, and booking options to users.  
- Allow users to submit inquiries or bookings (future scope).  
- Responsive design for cross-device compatibility.  
- User-friendly navigation and search features.

### Admin Dashboard

- Secure admin login/logout functionality.  
- Display analytics summary (users, contacts, services, gallery).  
- Sidebar navigation with all admin sections.  
- Search bar filtering services and gallery cards dynamically.  
- Display lists of services, gallery items, bookings, messages, and users.  
- Support error handling and loading states during API calls.  
- Quick actions for common admin operations.  

---

## Non-Functional Requirements

- Responsive UI for mobile, tablet, and desktop.  
- High performance with minimized API calls and optimized rendering.  
- Accessibility support for keyboard and screen readers.  
- Secure communication using HTTPS and authentication.  
- Modular and maintainable codebase with clear separation of concerns.  
- Smooth animations and transitions for better UX.  
- Cross-browser compatibility with latest versions of major browsers.

---

## Technologies Used

- **Frontend:** React.js, React Router, Tailwind CSS, React Icons  
- **Backend:** Node.js, Express.js  
- **API Communication:** Axios  
- **Authentication:** JSON Web Tokens (JWT, planned)  

---

## Features

- Fully responsive Main Application with service browsing, gallery, and bookings.  
- Admin Dashboard with sidebar navigation and top navigation search.  
- Real-time filtering of services and gallery by search input.  
- Dashboard analytics cards for quick insights.  
- Error and loading states with skeleton placeholders.  
- Quick action buttons for admin convenience.  

---

## Installation and Setup

1. **Clone the repository:**
   ```bash
   git https://github.com/habyarimanacaleb/ibirwa-kivu-bike-tours.git
   cd ibirwa-kivu-bike-tours
