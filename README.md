# NextTask Freelancing Platform

A modern freelancing platform built to connect clients and freelancers in one secure and scalable system.
The platform allows users to create projects, submit proposals, manage contracts, and collaborate through a role-based access control (RBAC) system.

---

# About

NextTask is a full-stack freelancing platform designed to simulate real-world marketplace systems such as Upwork and Freelancer.

The system supports multiple user roles including:

* Freelancers
* Clients
* Moderators
* Administrators

Users can manage projects, proposals, portfolios, contracts, and profiles while maintaining secure authorization using a custom RBAC architecture.

The platform is focused on:

* Scalability
* Clean architecture
* Secure authentication
* Real-world backend practices
* Modular system design

---

# Features

## Authentication & Authorization

* User registration and login
* Secure password hashing
* JWT authentication
* Protected routes
* Role-Based Access Control (RBAC)
* Multiple roles per user

---

# RBAC System

The platform includes a custom RBAC (Role-Based Access Control) system that controls access to resources and actions based on user roles.

## Supported Roles

### Freelancer

Can:

* Create and manage portfolio items
* Submit proposals to projects
* Manage profile information
* Accept or reject contracts
* Track assigned work

### Client

Can:

* Create projects
* Update projects
* Delete projects
* Review freelancer proposals
* Hire freelancers
* Manage contracts

### Moderator

Can:

* Review reported content
* Manage flagged projects or users
* Moderate platform activities

### Admin

Has full system access including:

* User management
* Role management
* Project moderation
* Platform analytics
* Full CRUD permissions across the system

---

# Project Management

Clients can fully manage projects through CRUD operations:

* Create projects
* Update project details
* Delete projects
* Browse all projects
* Filter projects by category or status

Projects support:

* Budget management
* Skills requirements
* Deadlines
* Project status tracking

---

# Proposal System

Freelancers can:

* Submit proposals to projects
* Update proposals
* Withdraw proposals
* Track proposal status

Clients can:

* Accept proposals
* Reject proposals
* Hire freelancers directly

---

# Portfolio System

Freelancers can:

* Add portfolio items
* Update portfolio projects
* Delete portfolio items
* Showcase skills and previous work

Each portfolio item may include:

* Project title
* Description
* Images
* Technologies used
* Live demo links

---

# Contract & Hiring System

* Contract creation after proposal acceptance
* Contract status tracking
* Freelancer assignment
* Work progress management

---

# Additional Features

* Profile management
* Search and filtering
* Project categories
* User dashboards
* Notifications system
* Secure API structure
* RESTful architecture
* Clean modular backend structure

---

# Tech Stack

## Frontend

* React
* TypeScript
* Tailwind CSS

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

## Authentication

* JWT
* bcrypt

---

# System Architecture

The backend follows a modular architecture with:

* Controllers
* Services
* Models
* Middleware
* RBAC permissions
* Validation layer
* Error handling system

---

# Future Improvements

* Real-time chat system
* Payment integration
* Escrow system
* Ratings & reviews
* Video meeting support
* AI-powered freelancer matching

---

# Installation

```bash
git clone <repository-url>

cd project-name

npm install

npm run dev
```

---

# Environment Variables

Create a `.env` file and add:

```env
PORT=
MONGODB_URI=
JWT_SECRET=
```

---

# License

This project is licensed under the MIT License.
