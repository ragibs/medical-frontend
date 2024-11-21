## MediCal

The frontend of MediCal is built using **Next.js** with **TypeScript** for a modern, scalable, and high-performance user interface. It handles user interactions and communicates with the backend through REST API calls to provide a seamless experience for patients, doctors, and administrators.

### **Key Features**

- **User-Friendly Interface**: Intuitive design for registration, login, appointment booking, and role-specific workflows.
- **API Integration**: Communicates with the backend using **Axios** to fetch and display data dynamically.
- **Responsive Design**: Styled with **Tailwind CSS** to ensure a consistent experience across all devices.
- **Role-Specific Workflows**:
  - Patients: Register, log in, book/cancel appointments, and interact with the AI chatbot.
  - Doctors: Manage appointments and add notes.
  - Admins: Oversee patients, doctors, and appointments through a dynamic dashboard.

### **Technologies Used**

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API Communication**: Axios

### **Environment Variables**

To enable the AI-powered features, you need to configure your **Google Gemini AI key** in the `.env` file:

1. Create a `.env.local` file in the `frontend` directory.
2. Add the following environment variable:
   ```env
   NEXT_PUBLIC_GOOGLE_GEN_AI_KEY=<your-gemini-key>
   ```
