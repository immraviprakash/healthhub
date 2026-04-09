# HealthHub | Pharmacy & Education


HealthHub is an interactive, educational web application designed to provide evidence-based information on respiratory health, common ailments, and medication management. 

A unique feature of HealthHub is its **Dual Mode** interface. Users can easily toggle between a professional **Adult Mode** for detailed clinical information, and a fun, accessible **Child Mode** designed to help kids learn about their bodies and health.

## 🚀 Features

- **Dual-Audience Modes**:
  - **Adult Mode**: Professional, evidence-based health education.
  - **Child Mode**: Kid-friendly, engaging analogies and "Fun Facts" to explain health concepts.
- **Respiratory Health Education**: Learn how lungs work and understand the differences between conditions like Asthma, COPD, and Allergies.
- **Symptom Guides**: Practical advice for managing common ailments like Fevers and Coughs.
- **Medication Safety**: Interactive medication directory featuring video instructions and safety notes for common treatments (e.g., Salbutamol, Paracetamol, Cetirizine).
- **Responsive & Accessible**: Fully functional on both mobile and desktop with smooth, modern animations.

## 🛠️ Tech Stack

This project is built using modern web development tools:

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 6](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) / [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🏃 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (latest LTS recommended) installed on your machine.

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd healthhub-pharmacy-&-education
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in Browser:**
   Open [http://localhost:3000](http://localhost:3000) (or the port specified in your console) to view the app.

### Building for Production

To create a production-ready build:

```bash
npm run build
```

To preview the built project locally:

```bash
npm run preview
```

## 📁 Project Structure

```text
├── src/
│   ├── components/      # Reusable UI components (shadcn/ui)
│   ├── App.tsx          # Main application component & layout
│   ├── index.css        # Global CSS and Tailwind directives
│   ├── main.tsx         # React DOM entry point
│   └── types.ts         # TypeScript type definitions
├── .env.example         # Example environment variables
├── index.html           # HTML entry point
├── package.json         # Project metadata and scripts
├── vite.config.ts       # Vite configuration
└── README.md            # Project documentation (You are here)
```

## ⚠️ Medical Disclaimer

**HealthHub provides educational information only and is not a substitute for professional medical advice, diagnosis, or treatment.** Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. If you think you may have a medical emergency, call your doctor, go to the emergency department, or call emergency services immediately.
