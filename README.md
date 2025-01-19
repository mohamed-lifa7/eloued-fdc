# Future Developers Club

Welcome to the **Future Developers Club** project! This is a web application built for the Future Developers Club at Eloued University. The purpose of this project is to foster collaboration, share knowledge, and create a central platform for our developer community.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Todo](#todo)
3. [Features](#features)
4. [Getting Started](#getting-started)
5. [Contributing](#contributing)
6. [Code of Conduct](#code-of-conduct)
7. [License](#license)

## Todo

- [x] contact us page.
- [x] make the website in English.
- [x] blogs page (hard coded).
- [x] remove the nextui and do shadcn ui instead
- [ ] projects page.
- [ ] leader-board page.
- [ ] our community section (N of events, Members, N of projects).
- [ ] past and upcoming events.
- [ ] quizzes after each session.

## Project Overview

The **eloued-fdc** platform is designed to:

- Serve as a hub for FDC members at Eloued University.
- Provide resources, event updates, and communication tools.
- Encourage participation in coding challenges, workshops, and community discussions.

## Features

- **User Authentication**: Secure login and registration.
- **Event Management**: Discover upcoming events and register.
- **Resource Sharing**: Access learning materials, tutorials, and project documentation.
- **Community Forum**: Engage with fellow students and mentors.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (for the server and client)
- [pnpm](https://pnpm.io/) (package manager)
- [Next.js](https://nextjs.org/) (for front-end framework)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mohamed-lifa7/eloued-fdc.git
   ```
2. Navigate to the project directory:
   ```bash
   cd eloued-fdc
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Configure environment variables:
   - Create a `.env` file based on the `.env.example` template.
   - Set up any necessary API keys.
5. Start the development server:
   ```bash
   pnpm run dev
   ```
6. Open http://localhost:3000 in your browser to view the app.

## Contributing

We welcome contributions from all club members! Please read our Contributing Guide for instructions on how to get started.

### Steps to Contribute:

1. Fork the repository.
   - Click the "Fork" button on the top-right of this repository to create your own copy.
2. Clone the repository.
   - Clone your forked repository to your local machine:
      ```bash
      git clone https://github.com/<your-username>/eloued-fdc.git
      ```
   - Replace `<your-username>` with your GitHub username.

3. Set Upstream Remote (Optional but Recommended)
   - To stay updated with changes from the main repository, configure the upstream remote:
   ```bash
   git remote add upstream https://github.com/mohamed-lifa7/eloued-fdc.git
   ```
4. Create a New Branch
   - Always create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
   - Use a descriptive branch name, prefixed with `feature/` or `bugfix/`.

5. Check for Lint and Type Check 
   - Run this command to ensure your code adheres to our standards.
   ```bash
   pnpm check
   ```
   - Fix any linting or test issues before proceeding.
   - Optionally, build the project locally to ensure it runs as expected before committing any changes.
6. Write Clear and Descriptive Commits
   - Make sure your commits are clear and follow good practices:
   ```bash 
   git commit -m "Add: Description of the feature or fix"
   ```
7. Push Your Branch
   ```bash
   git push origin feature/your-feature-name
   ```
8. Open a Pull Request (PR)
   - Go to the original repository: [mohamed-lifa7/eloued-fdc](https://github.com/mohamed-lifa7/eloued-fdc).
   - Open a PR with the following details:
      - **Title**: Use a clear and descriptive title for your PR.
      - **Description**: Explain what changes you made and why.
      - **Link Issues**: If applicable, link related issues (e.g., Closes #123).
   - Ensure your PR follows the repository’s guidelines and passes all checks.
9. Participate in the Review Process
   - Respond promptly to any feedback from maintainers or reviewers.
   - Make necessary changes and push updates to your branch.

### Code of Conduct

Our project follows the T3 App's strict mode. For more details, visit the [T3 App documentation](https://create.t3.gg/).

- Follow the code of conduct.
- Write clean, well-documented code.
- Include tests for new features or bug fixes.
- Check that your code follows the project's style and conventions.
- Keep your PR small and focused. Avoid bundling unrelated changes in a single PR.


## License

This project is licensed under the MIT License. See the LICENSE file for details.
