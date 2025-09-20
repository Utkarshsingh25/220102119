
# Affordmed URL Shortener Frontend

This project is a React-based frontend for a URL Shortener web application, built as part of the Affordmed Campus Hiring Evaluation.

## Features
- Shorten up to 5 URLs at once, with optional custom shortcodes and validity period (in minutes)
- Client-side validation for URLs, validity, and shortcodes
- Material UI for a modern, responsive interface
- Statistics page to display all shortened URLs and analytics (to be implemented)
- Mandatory logging integration: all significant events and errors are logged to the Affordmed logging API

## Project Structure
```
Affordmedproject/
  Affordmedproject/
	 src/
		App.jsx
		main.jsx
		index.css
		App.css
		assets/
		utils/
		  log.js
	 public/
	 package.json
	 ...
```

## Getting Started
1. **Install dependencies:**
	```sh
	npm install
	```
2. **Start the development server:**
	```sh
	npm run dev
	```
3. **Open your browser:**
	Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal)

## Logging Middleware
- All logs are sent to the Affordmed logging API at `http://20.244.56.144/evaluation-service/logs` using the reusable `Log` function in `src/utils/log.js`.
- You can check the browser's network tab to verify log requests are being sent.

## Requirements & Constraints
- **No Tailwind or other CSS libraries** (only Material UI or native CSS allowed)
- **No backend code required** for this evaluation
- **Do not use console logging**; use the provided logging middleware

## Author
- [Your Name]

---

*This project is for evaluation purposes only and contains confidential information as per Affordmed's terms.*
