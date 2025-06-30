# RekruteIT - Job Recruitment Platform

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Spring](https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

RekruteIT is a job recruitment platform that connects candidates and recruiters. It features separate dashboards for each user type, job offer management, and application tracking.

---

##  Key Features
-   **AI-Powered Matching:** Uses a local sentence-transformer model to calculate a "match score" between candidate profiles and job offers.
-   **Separate Dashboards:** Custom interfaces for both Candidates and Recruiters.
-   **Job Search:** Find and filter job offers by type, experience, and region.
-   **Profile Management:** Users can add their experience, education, and skills.
-   **Secure Authentication:** JWT-based login and signup with email verification.
-   **Responsive Design:** Works on all screen sizes

---

##  AI Integration

This project runs its own local AI model for semantic search and matching.

-   **Model:** `sentence-transformers/all-MiniLM-L6-v2`.
-   **Function:** Instead of basic keyword matching, the model converts the text from candidate profiles (skills, experience) and job descriptions into meaningful numerical vectors (embeddings).
-   **Outcome:** By calculating the similarity between these vectors, the platform generates a **match score**, providing highly relevant recommendations for both recruiters and candidates. This process runs locally, ensuring fast response times and data privacy.


##  Screenshots

<details>
<summary><b>Public Pages & User Experience</b></summary>

### Landing Page
<img src="./docs/images/image1.png" width="48%"> <img src="./docs/images/image2.png" width="48%">

### Job Listings Page
<img src="./docs/images/image4.png" width="48%">

### Job Offer Details
<img src="./docs/images/image6.png" width="100%">

### Recruiters Page
<img src="./docs/images/image28.png" width="100%">

### Recruiter Details Page
<img src="./docs/images/image9.png" width="100%">

</details>

<details>
<summary><b>Authentication Flow</b></summary>

### Signup Forms
<img src="./docs/images/image20.png" width="48%"> <img src="./docs/images/image21.png" width="48%">

### Login & Verification
<img src="./docs/images/image3.png" width="48%"> 
<img src="./docs/images/image3.1.png" width="48%">

</details>

<details>
<summary><b>Candidate Dashboard</b></summary>

### Dashboard Home
<img src="./docs/images/image22.png" width="100%">

### View & Edit Profile
<img src="./docs/images/image10.png" width="100%">
<img src="./docs/images/image11.png" width="100%">

### Add/Edit Modals
<img src="./docs/images/image25.png" width="100%">

### My Applications Page
<img src="./docs/images/image13.png" width="100%">


### Settings Page
<img src="./docs/images/image26.png" width="100%">

</details>

<details>
<summary><b>Recruiter Dashboard </b></summary>

### Dashboard Home
<img src="./docs/images/image35.png" width="100%">

### View & Edit Company Profile
<img src="./docs/images/image15.png" width="100%">
<img src="./docs/images/image16.png" width="100%">

### Job Offer Management
<img src="./docs/images/image17.png" width="100%">

### Edit Offer Page
<img src="./docs/images/image18.png" width="100%">

### Applicant Tracking
<img src="./docs/images/image33.png" width="100%">

### Candidate Search
<img src="./docs/images/image31.png" width="100%">

</details>

---

##  Technologies Used

### Frontend
-   ReactJS
-   Redux Toolkit
-   React Router
-   TailwindCSS
-   Axios
-   Lucide-react

### Backend
-   Spring Boot 3
-   Spring Security (JWT)
-   Spring Data JPA
-   MySQL
-   Lombok

### Machine Learning / AI
-   Python
-   Sentence-Transformers
-   Hugging Face Transformers
-   PyTorch
-   (Served via a local Flask)


---

## 🗃️ Database Schema

The database schema shows the relationships between users, candidates, recruiters, offers, and applications.

![Database Schema](./docs/images/image0.png)
