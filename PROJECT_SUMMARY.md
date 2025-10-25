# PsycoManagement Project Summary

## High-Level Overview

PsycoManagement is a comprehensive solution for managing psychological consultations, featuring a web-based administrative interface, a mobile application for therapists, and a robust backend. The project is designed to be scalable and performant, with plans for future enhancements and integrations.

## Technologies Used

### Backend

*   **Framework:** FastAPI
*   **Database:** MongoDB
*   **Authentication:** JSON Web Tokens (JWT)
*   **Key Libraries:**
    *   `pymongo`: For interacting with the MongoDB database.
    *   `passlib` and `bcrypt`: For password hashing and security.
    *   `python-jose`: For handling JWTs.

### Frontend

*   **Framework:** React
*   **Build Tool:** Vite
*   **UI Library:** NextUI
*   **Styling:** Tailwind CSS
*   **State Management:** Zustand
*   **Routing:** React Router
*   **Key Libraries:**
    *   `axios`: For making HTTP requests to the backend.
    *   `react-hook-form`: For managing forms and validation.

### Mobile

*   **Framework:** Flutter
*   **State Management:** Riverpod
*   **Routing:** GoRouter
*   **Key Libraries:**
    *   `dio`: For making HTTP requests to the backend.
    *   `shared_preferences`: For local data storage.

## Project Structure

### Backend

The backend is built with FastAPI and follows a modular structure:

*   **`main.py`:** The entry point of the application, where the FastAPI app is initialized and middleware is configured.
*   **`routes/`:** Contains the API endpoints, with each file representing a different resource (e.g., `therapist.py`, `consultant.py`).
*   **`models/`:** Defines the data models that are stored in the MongoDB database.
*   **`schemas/`:** Contains the Pydantic schemas for data validation and serialization.
*   **`config/`:** Includes the database connection and other configuration settings.

### Frontend

The frontend is a single-page application built with React and Vite:

*   **`src/`:** The main source code directory, containing the following:
    *   **`components/`:** Reusable UI components.
    *   **`pages/`:** The main pages of the application.
    *   **`store/`:** The Zustand store for state management.
    *   **`router/`:** The React Router configuration for navigation.

### Mobile

The mobile application is developed with Flutter and organized as follows:

*   **`lib/`:** The main source code directory.
    *   **`main.dart`:** The entry point of the application.
    *   **`providers/`:** The Riverpod providers for state management.
    *   **`screens/`:** The different screens of the application.
    *   **`widgets/`:** Reusable UI widgets.

## Functionalities

*   **User Authentication:** Secure user registration and login with JWT-based authentication.
*   **CRUD Operations:** The application supports creating, reading, updating, and deleting various resources, such as consultants, events, and annotations.
*   **State Management:** Both the frontend and mobile applications use robust state management solutions (Zustand and Riverpod) to manage application state efficiently.
*   **Routing:** The frontend and mobile applications use dedicated routing libraries (React Router and GoRouter) to handle navigation.

## Future Plans

*   **Migration to TypeScript:** The project plans to migrate the frontend codebase to TypeScript to improve code quality and maintainability.
*   **Integrations:**
    *   Payment gateway integration.
    *   Integration with AI-powered features.
    *   Cloud storage integration for file management.
*   **Deployment:**
    *   The backend is planned to be deployed on Azure.
    *   The mobile application will be published on the Google Play Store.

This summary provides a comprehensive overview of the PsycoManagement project, covering its architecture, technologies, functionalities, and future plans, making it an excellent resource for a semi-senior developer to get up to speed with the project.
