**<ins># Student-registration-system</ins>**

## Overview :
This project is a web-based Student Registration System developed as part of an assignment. It allows users to add, edit, and delete student records, with data persisted in local storage. The system features input validation, a responsive design with animations, and a dynamic vertical scrollbar for the records table.

## Features :
Add Students: Register students with name, student ID, email, and contact number.
Edit Students: Update existing student records.
Delete Students: Remove records with confirmation.
Local Storage: Persists data across page refreshes.

### Input Validation:
Name: Letters and spaces only.
Student ID: Numbers only, must be unique.
Email: Valid email format.
Contact: Exactly 10 digits.

### Responsive Design: Adapts to mobile and desktop screens.
Creative UI: White form, dark blue headers, blue/green/red buttons, and animations.


## File Structure :
```
student-registration-system/
├── index.html    # Main HTML file with structure
├── style.css     # CSS for styling and responsive design
├── script.js     # JavaScript for functionality and validation
├── README.md     # Project documentation
```


## How to Run :
Clone or download this repository.
Open index.html in a modern web browser (e.g., Chrome, Firefox).
Use the form to add, edit, or delete student records.
Test responsiveness by resizing the browser or using a mobile device.


## Technologies Used :
HTML5: Semantic structure for accessibility.
CSS3: Styling with variables, animations, and media queries.
JavaScript: Client-side logic with local storage.
Font Awesome: Icons for edit (fa-pen) and delete (fa-trash) buttons.


## Notes :
Ensure an internet connection for Font Awesome icons (loaded via CDN).
Data is stored in the browser’s local storage and persists until cleared.
Test with multiple records to verify the dynamic scrollbar.


## Assignment Compliance :
Task 1: Semantic HTML with meta tags and title.
Task 2: Header with title and description.
Task 3: Form with validated input fields.
Task 4: Table with dynamic records and scrollbar.
Task 5: Enhanced styling with colors, animations, and responsive design.
Task 6: JavaScript for CRUD operations, validation, and local storage.
Task 7: Organized files, detailed comments, and GitHub submission.
