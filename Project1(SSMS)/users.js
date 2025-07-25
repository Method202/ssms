document.addEventListener('DOMContentLoaded', function () {
    // Sample data
    const sampleUsers = [
        {
            id: 1,
            firstname: 'Admin',
            lastname: 'User',
            username: 'admin',
            email: 'admin@example.com',
            role: 'administrator',
            status: 'active',
            lastActive: '2023-06-15 14:30',
            regions: []
        },
        {
            id: 2,
            firstname: 'John',
            lastname: 'Doe',
            username: 'johndoe',
            email: 'john@example.com',
            role: 'supporter',
            status: 'active',
            lastActive: '2023-06-14 10:15',
            regions: [1, 3]
        },
        {
            id: 3,
            firstname: 'Jane',
            lastname: 'Smith',
            username: 'janesmith',
            email: 'jane@example.com',
            role: 'supporter',
            status: 'pending',
            lastActive: '2023-06-10 09:45',
            regions: [2, 4]
        },
        {
            id: 4,
            firstname: 'Robert',
            lastname: 'Johnson',
            username: 'robertj',
            email: 'robert@example.com',
            role: 'supporter',
            status: 'active',
            lastActive: '2023-06-13 16:20',
            regions: [1, 2, 5]
        },
        {
            id: 5,
            firstname: 'Emily',
            lastname: 'Williams',
            username: 'emilyw',
            email: 'emily@example.com',
            role: 'administrator',
            status: 'inactive',
            lastActive: '2023-05-28 11:10',
            regions: []
        }
    ];

    const regions = [
        { id: 1, name: 'Central Region' },
        { id: 2, name: 'Northern Region' },
        { id: 3, name: 'Eastern Region' },
        { id: 4, name: 'Western Region' },
        { id: 5, name: 'Southern Region' }
    ];

    // DOM elements
    const addUserBtn = document.getElementById('add-user-btn');
    const userFormContainer = document.getElementById('user-form-container');
    const userForm = document.getElementById('user-form');
    const cancelUserBtn = document.getElementById('cancel-user');
    const userFormTitle = document.getElementById('user-form-title');
    const userRoleSelect = document.getElementById('user-role');
    const regionAccessContainer = document.getElementById('region-access-container');
    const usersTableBody = document.querySelector('#users-table tbody');
    const userSearch = document.getElementById('user-search');
    const userRoleFilter = document.getElementById('user-role-filter');
    const userStatusFilter = document.getElementById('user-status-filter');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageIndicator = document.getElementById('page-indicator');

    // Pagination variables
    let currentPage = 1;
    const usersPerPage = 5;
    let filteredUsers = [...sampleUsers];

    // Initialize
    loadUsers();
    setupEventListeners();

    function loadUsers() {
        usersTableBody.innerHTML = '';

        const startIndex = (currentPage - 1) * usersPerPage;
        const endIndex = startIndex + usersPerPage;
        const usersToDisplay = filteredUsers.slice(startIndex, endIndex);

        usersToDisplay.forEach(user => {
            const row = document.createElement('tr');

            // Create avatar initials
            const initials = (user.firstname.charAt(0) + user.lastname.charAt(0)).toUpperCase();

            // Format last active date
            const lastActiveDate = new Date(user.lastActive);
            const formattedDate = lastActiveDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            row.innerHTML = `
                <td>USR-${user.id.toString().padStart(3, '0')}</td>
                <td>
                    <div class="user-info-cell">
                        <div class="user-avatar">${initials}</div>
                        <div>
                            <div class="user-name">${user.firstname} ${user.lastname}</div>
                            <div class="user-email">${user.email}</div>
                        </div>
                    </div>
                </td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td><span class="role-badge ${user.role === 'administrator' ? 'role-admin' : 'role-supporter'}">${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span></td>
                <td><span class="status-badge status-${user.status}">${user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span></td>
                <td>${formattedDate}</td>
                <td>
                    <button class="action-btn edit-user" data-id="${user.id}"><i class="fas fa-edit"></i> Edit</button>
                    <button class="action-btn delete delete-user" data-id="${user.id}"><i class="fas fa-trash-alt"></i> Delete</button>
                </td>
            `;

            usersTableBody.appendChild(row);
        });

        // Update pagination controls
        const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
        pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;

        // Add event listeners to edit buttons
        document.querySelectorAll('.edit-user').forEach(btn => {
            btn.addEventListener('click', function () {
                const userId = parseInt(this.getAttribute('data-id'));
                editUser(userId);
            });
        });

        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-user').forEach(btn => {
            btn.addEventListener('click', function () {
                const userId = parseInt(this.getAttribute('data-id'));
                deleteUser(userId);
            });
        });
    }

    function setupEventListeners() {
        // Add new user button
        addUserBtn.addEventListener('click', function () {
            userFormTitle.textContent = 'Add New';
            userForm.reset();
            document.getElementById('user-id').value = '';
            document.getElementById('user-status').value = 'active';
            regionAccessContainer.style.display = 'none';
            userFormContainer.style.display = 'block';
        });

        // Cancel form button
        cancelUserBtn.addEventListener('click', function () {
            userFormContainer.style.display = 'none';
        });

        // User role change
        userRoleSelect.addEventListener('change', function () {
            if (this.value === 'supporter') {
                regionAccessContainer.style.display = 'block';
            } else {
                regionAccessContainer.style.display = 'none';
            }
        });

        // Form submission
        userForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const userId = document.getElementById('user-id').value;
            const firstName = document.getElementById('user-firstname').value;
            const lastName = document.getElementById('user-lastname').value;
            const email = document.getElementById('user-email').value;
            const username = document.getElementById('user-username').value;
            const password = document.getElementById('user-password').value;
            const role = document.getElementById('user-role').value;
            const status = document.getElementById('user-status').value;

            if (firstName && lastName && email && username && password && role && status) {
                // In a real app, you would save the user data here
                alert(`User ${userId ? 'updated' : 'added'} successfully!`);
                userFormContainer.style.display = 'none';

                // Reload users if we're adding a new one
                if (!userId) {
                    // Create a new user object (simulated)
                    const newUser = {
                        id: sampleUsers.length + 1,
                        firstname: firstName,
                        lastname: lastName,
                        username: username,
                        email: email,
                        role: role,
                        status: status,
                        lastActive: new Date().toISOString(),
                        regions: role === 'supporter' ?
                            Array.from(document.getElementById('user-regions').selectedOptions).map(opt => parseInt(opt.value)) :
                            []
                    };

                    sampleUsers.unshift(newUser);
                    applyFilters();
                }
            } else {
                alert('Please fill in all required fields');
            }
        });

        // Search functionality
        userSearch.addEventListener('input', function () {
            applyFilters();
        });

        // Role filter
        userRoleFilter.addEventListener('change', function () {
            applyFilters();
        });

        // Status filter
        userStatusFilter.addEventListener('change', function () {
            applyFilters();
        });

        // Pagination controls
        prevPageBtn.addEventListener('click', function () {
            if (currentPage > 1) {
                currentPage--;
                loadUsers();
            }
        });

        nextPageBtn.addEventListener('click', function () {
            const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                loadUsers();
            }
        });
    }

    function applyFilters() {
        const searchTerm = userSearch.value.toLowerCase();
        const roleFilter = userRoleFilter.value;
        const statusFilter = userStatusFilter.value;

        filteredUsers = sampleUsers.filter(user => {
            const matchesSearch =
                user.firstname.toLowerCase().includes(searchTerm) ||
                user.lastname.toLowerCase().includes(searchTerm) ||
                user.username.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm);

            const matchesRole = !roleFilter || user.role === roleFilter;
            const matchesStatus = !statusFilter || user.status === statusFilter;

            return matchesSearch && matchesRole && matchesStatus;
        });

        currentPage = 1;
        loadUsers();
    }

    function editUser(id) {
        const user = sampleUsers.find(u => u.id === id);
        if (user) {
            userFormTitle.textContent = 'Edit';
            document.getElementById('user-id').value = user.id;
            document.getElementById('user-firstname').value = user.firstname;
            document.getElementById('user-lastname').value = user.lastname;
            document.getElementById('user-email').value = user.email;
            document.getElementById('user-username').value = user.username;
            document.getElementById('user-password').value = '********';
            document.getElementById('user-role').value = user.role;
            document.getElementById('user-status').value = user.status;

            // Show/hide region access based on role
            if (user.role === 'supporter') {
                regionAccessContainer.style.display = 'block';
                const regionSelect = document.getElementById('user-regions');
                Array.from(regionSelect.options).forEach(option => {
                    option.selected = user.regions.includes(parseInt(option.value));
                });
            } else {
                regionAccessContainer.style.display = 'none';
            }

            userFormContainer.style.display = 'block';
        }
    }

    function deleteUser(id) {
        if (confirm('Are you sure you want to delete this user?')) {
            // In a real app, you would remove the user from the data array
            alert('User deleted successfully!');

            // Simulate deletion by filtering
            const index = sampleUsers.findIndex(u => u.id === id);
            if (index !== -1) {
                sampleUsers.splice(index, 1);
                applyFilters();
            }
        }
    }
});