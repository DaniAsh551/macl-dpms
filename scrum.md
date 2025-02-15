# SCRUM Stories & Tasks for MACL Digital Permit Management System (DPMS)

## **Epic 1: Authentication & Authorization**

### **User Story 1.1**: As a user, I want to securely log in/out using JWT and role-based access.  
**Tasks**:
- Design database schema for users and roles (MySQL).
- Implement JWT authentication (backend).
- Integrate bcrypt for password hashing.
- Create login/logout functionalities.
- Build frontend login UI with TailwindCSS.

### **User Story 1.2**: As an Admin, I want to manage user roles (RBAC).  
**Tasks**:
- Test RBAC with different user roles.

### **User Story 1.3**: As a Developer, I need 1,000 dummy users for testing.  
**Tasks**:
- Write a seeding script with randomized users.
- Ensure seeded permits align with user roles.
- Validate data integrity after seeding.

---

## **Epic 2: Permit Application (Staff Role)**

### **User Story 2.1**: As Staff, I want to submit a permit application.  
**Tasks**:
- Design permit application form (TailwindCSS frontend).
- Create API endpoint for permit submission (Valid From/Until, Permit Type, etc.).
- Add form validation (e.g., expiry date > start date).
- Store applications in db(MySQL).

### **User Story 2.2**: As Staff, I want to track my permit status.  
**Tasks**:
- Build a staff dashboard displaying permit statuses (Approved/Pending/Rejected).
- Create API endpoint to fetch user-specific permits.
- Add filters (e.g., by Permit Type) to the dashboard.

---

## **Epic 3: Permit Approval (Admin Role)**

### **User Story 3.1**: As Admin, I want to approve/reject permits with comments.  
**Tasks**:
- Develop Admin dashboard with permit list (search/filter).
- Add "Approve/Reject" buttons with comment input.
- Notify Staff via email (optional stretch task).

### **User Story 3.2**: As Admin, I want exportable reports.  
**Tasks**:
- Add CSV and PDF export buttons to Admin dashboard.
- Test report formatting and data accuracy.

---

## **Epic 4: Permit Verification (Security Officer Role)**

### **User Story 4.1**: As Security, I want to scan QR codes to validate permits.  
**Tasks**:
- Integrate QR scanner library (e.g., `zxing` for frontend).
- Create API endpoint to validate scanned permit.
- Display permit details (Name, Expiry) on scan.
- Add alerts for expired/invalid permits.

---

## **Epic 5: Admin Dashboard & Notifications**

### **User Story 5.1**: As Admin, I want expiry notifications.  
**Tasks**:
- Add expiring notifications section to Admin dashboard.
- Send email alerts (optional stretch task).

---

## **Epic 6: DevOps & Deployment**

### **User Story 6.1**: As DevOps, I want Dockerized services.  
**Tasks**:
- Write Dockerfiles for frontend/backend.
- Create `docker-compose.yml` with MySQL, volumes, and environment variables.
- Test startup via `docker-compose up -d`.

### **User Story 6.2**: As DevOps, I want CI/CD pipelines.  
**Tasks**:
- Configure GitHub Actions for automated builds.
- Deploy to cloud platform (e.g., AWS EC2, Heroku).
- Ensure frontend/backend are accessible online post-deployment.

### **User Story 6.3**: As DevOps, I want a setup server.
**Tasks**:
- Set up a server (e.g., AWS Lightsail, DigitalOcean Droplet).
- Configure server for hosting.

