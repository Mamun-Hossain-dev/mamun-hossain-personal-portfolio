# Mamun Hossain - Portfolio Website

This is the repository for my personal portfolio website, built with Next.js and Firebase. The website showcases my projects, skills, and provides a way for visitors to contact me. It also includes a private dashboard for managing content.

## Features

- **Portfolio Showcase**: Display latest works and detailed case studies.
- **User Authentication**: Secure login and registration functionality using Firebase Authentication.
- **Dashboard**: A private dashboard for me to manage case studies and latest works.
- **Analytics**: Integrated with Google Analytics to track website traffic and user engagement.
- **Contact Form**: A functional contact form for visitors to get in touch.
- **Responsive Design**: Fully responsive layout for all devices.

## Technologies Used

- **Frontend**: [Next.js](https://nextjs.org/), [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend/Authentication**: [Firebase](https://firebase.google.com/) (Authentication, Firestore)
- **Analytics**: [Google Analytics 4](https://analytics.google.com/)
- **Deployment**: [Vercel](https://vercel.com/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18.x or later)
- npm or yarn

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username/firebase-tanzil-portfolio.git
    ```
2.  Navigate to the project directory
    ```sh
    cd firebase-tanzil-portfolio
    ```
3.  Install NPM packages
    ```sh
    npm install
    ```
4.  Set up your environment variables. See the section below.
5.  Run the development server
    ```sh
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file. Create this file in the root of your project.

You can use `env.example` as a template.

```
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Google Analytics
NEXT_PUBLIC_GA_ID=
```

You need to create a Firebase project to get the Firebase configuration values.

## Deployment

This application is deployed on [Vercel](https://vercel.com/). Any push to the `main` branch will trigger a new deployment.

## Contact

Tanzil Hossain - [@tanzil_hossain](https://twitter.com/tanzil_hossain) - mamunhossain128169@gmail.com

Project Link: [https://github.com/your_username/firebase-tanzil-portfolio](https://github.com/your_username/firebase-tanzil-portfolio)
