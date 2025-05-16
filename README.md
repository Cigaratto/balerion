## Project Description:

- This project was developed as part of a frontend coding test of Balerion.
- You can visit the project via [link:https://balerion-ten.vercel.app/ ]
- This project use localStorage to store session data since this is a mock project without a backend service.

## Tech Stack

- **Next.js** – React-based framework for server-side rendering and routing  
- **Tailwind CSS** – Utility-first CSS framework for responsive UI  
- **shadcn/ui** – Component library for building accessible UIs  

## Installation & Setup

- **Clone Repository:**
    
    ```bash
    git clone https://github.com/Cigaratto/balerion.git
    ```

- **Install Dependencies:**

    ```bash
    pnpm install
    ```
- **Run the project:**

    ```bash
    pnpm dev
    ```
## Manual

- This project support 2 types of accounts:
    
    **Role:ADMIN:**
    - username: admin1
    - password: 1234

    **Role:USER:**
    - username: user1
    - password: 1234

## User Roles

- **ADMIN:**
    - Can log in
    - Has full access to all users' cards
    - Can add card

- **USER:**
    - Can log in
    - Can view only their own cards
    - Can add card

## Features

- Includes form validation for login inputs.
- Displays clear error messages when authentication fails or input is invalid.
- The replacing of passwords masked style into dash is avoided due to security and practicality concerns.