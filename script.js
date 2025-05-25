// Initialize student array from local storage or empty array if none exists
let students = [];
try {
    const storedData = localStorage.getItem('students');
    students = storedData ? JSON.parse(storedData) : []; // Parse stored data or start empty
} catch (e) {
    console.error('Error loading student data from local storage:', e);
    alert('Failed to load student data. Starting with an empty list.');
}
let editIndex = -1; // Tracks index of student being edited (-1 means new entry)

// DOM elements for form and table
const form = document.getElementById('studentForm');
const studentTableBody = document.getElementById('studentTableBody');

// Validation functions
// Ensures name contains only letters and spaces
function validateName(name) {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
}

// Ensures student ID contains only numbers
function validateStudentId(id) {
    const idRegex = /^[0-9]+$/;
    return idRegex.test(id);
}

// Ensures email follows a valid format (e.g., user@domain.com)
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Ensures contact number is exactly 10 digits
function validateContact(contact) {
    const contactRegex = /^[0-9]{10}$/;
    return contactRegex.test(contact);
}

// Checks if student ID is unique, excluding the current edit index
function isStudentIdUnique(id, excludeIndex = -1) {
    return !students.some((student, index) => student.studentId === id && index !== excludeIndex);
}

// Populates the table with student records dynamically
function displayStudents() {
    studentTableBody.innerHTML = ''; // Clear existing rows
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.studentId}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button class="edit_btn" onclick="editStudent(${index})"><i class="fa-solid fa-pen"></i></button>
                <button class="delete_btn" onclick="deleteStudent(${index})"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        studentTableBody.appendChild(row); // Append row to table body
    });
}

// Handles form submission for adding or updating students
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get input values, trimmed to remove leading/trailing spaces
    const name = document.getElementById('name').value.trim();
    const studentId = document.getElementById('studentId').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contact').value.trim();

    // Clear previous error messages
    document.getElementById('nameError').textContent = '';
    document.getElementById('idError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('contactError').textContent = '';

    // Validate inputs to ensure data integrity
    let isValid = true;

    if (!name) {
        document.getElementById('nameError').textContent = 'Name is required';
        isValid = false;
    } else if (!validateName(name)) {
        document.getElementById('nameError').textContent = 'Name should contain only letters and spaces';
        isValid = false;
    }

    if (!studentId) {
        document.getElementById('idError').textContent = 'Student ID is required';
        isValid = false;
    } else if (!validateStudentId(studentId)) {
        document.getElementById('idError').textContent = 'Student ID should contain only numbers';
        isValid = false;
    } else if (!isStudentIdUnique(studentId, editIndex)) {
        document.getElementById('idError').textContent = 'Student ID must be unique';
        isValid = false;
    }

    if (!email) {
        document.getElementById('emailError').textContent = 'Email is required';
        isValid = false;
    } else if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Enter a valid email address';
        isValid = false;
    }

    if (!contact) {
        document.getElementById('contactError').textContent = 'Contact number is required';
        isValid = false;
    } else if (!validateContact(contact)) {
        document.getElementById('contactError').textContent = 'Contact number should be 10 digits';
        isValid = false;
    }

    // Exit if validation fails
    if (!isValid) return;

    // Create student object with validated data
    const student = { name, studentId, email, contact };

    try {
        // Add new student or update existing one
        if (editIndex === -1) {
            students.push(student); // Add to array
        } else {
            students[editIndex] = student; // Update existing student
            editIndex = -1;
            document.getElementById('submitBtn').textContent = 'Add Student'; // Reset button text
        }

        // Save updated array to local storage
        localStorage.setItem('students', JSON.stringify(students));

        // Reset form and refresh table
        form.reset();
        displayStudents();
    } catch (e) {
        console.error('Error saving to local storage:', e);
        alert('Failed to save student data. Local storage may be full.');
    }
});

// Populates form with student data for editing
function editStudent(index) {
    const student = students[index];
    document.getElementById('name').value = student.name;
    document.getElementById('studentId').value = student.studentId;
    document.getElementById('email').value = student.email;
    document.getElementById('contact').value = student.contact;
    editIndex = index;
    document.getElementById('submitBtn').textContent = 'Update Student';
}

// Deletes a student record after user confirmation
function deleteStudent(index) {
    if (confirm('Are you sure you want to delete this record?')) {
        try {
            students.splice(index, 1); // Remove student from array
            localStorage.setItem('students', JSON.stringify(students));
            displayStudents();
        } catch (e) {
            console.error('Error deleting student:', e);
            alert('Failed to delete student. Please try again.');
        }
    }
}

// Initial call to display existing students
displayStudents();