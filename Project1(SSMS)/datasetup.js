document.addEventListener('DOMContentLoaded', function () {
    // Navigation between sections
    const navItems = document.querySelectorAll('.data-nav li');
    const contentSections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        item.addEventListener('click', function () {
            // Remove active class from all nav items
            navItems.forEach(navItem => navItem.classList.remove('active'));

            // Add active class to clicked item
            this.classList.add('active');

            // Hide all content sections
            contentSections.forEach(section => {
                section.style.display = 'none';
            });

            // Show the corresponding section
            const sectionId = this.getAttribute('data-section') + '-section';
            document.getElementById(sectionId).style.display = 'block';

            // Load data for the section if needed
            if (sectionId === 'regions-section') loadRegions();
            if (sectionId === 'districts-section') loadDistricts();
            if (sectionId === 'groups-section') loadGroups();
        });
    });

    // Sample data
    const sampleRegions = [
        { id: 1, name: 'Central Region', code: 'CR', stations: 58, updated: '2023-06-15' },
        { id: 2, name: 'Northern Region', code: 'NR', stations: 47, updated: '2023-06-14' },
        { id: 3, name: 'Eastern Region', code: 'ER', stations: 42, updated: '2023-06-13' },
        { id: 4, name: 'Western Region', code: 'WR', stations: 38, updated: '2023-06-12' },
        { id: 5, name: 'Southern Region', code: 'SR', stations: 32, updated: '2023-06-11' }
    ];

    const sampleDistricts = [
        { id: 1, name: 'Capital District', region: 'Central Region', code: 'CAP', stations: 32 },
        { id: 2, name: 'North District', region: 'Northern Region', code: 'NOR', stations: 28 },
        { id: 3, name: 'East District', region: 'Eastern Region', code: 'EAS', stations: 25 },
        { id: 4, name: 'West District', region: 'Western Region', code: 'WES', stations: 22 },
        { id: 5, name: 'South District', region: 'Southern Region', code: 'SOU', stations: 18 }
    ];

    const sampleGroups = [
        { id: 1, name: 'Administrators', code: 'ADM', members: 5, created: '2023-01-15' },
        { id: 2, name: 'Technicians', code: 'TEC', members: 12, created: '2023-02-20' },
        { id: 3, name: 'Operators', code: 'OPS', members: 8, created: '2023-03-10' },
        { id: 4, name: 'Managers', code: 'MGR', members: 7, created: '2023-04-05' },
        { id: 5, name: 'Support', code: 'SUP', members: 4, created: '2023-05-18' }
    ];

    // Load regions data
    function loadRegions() {
        const tableBody = document.querySelector('#regions-table tbody');
        tableBody.innerHTML = '';

        sampleRegions.forEach(region => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>REG-${region.id.toString().padStart(3, '0')}</td>
                <td>${region.name}</td>
                <td>${region.code}</td>
                <td>${region.stations}</td>
                <td>${region.updated}</td>
                <td>
                    <button class="action-btn edit-region" data-id="${region.id}"><i class="fas fa-edit"></i> Edit</button>
                    <button class="action-btn delete delete-region" data-id="${region.id}"><i class="fas fa-trash-alt"></i> Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Add event listeners to edit buttons
        document.querySelectorAll('.edit-region').forEach(btn => {
            btn.addEventListener('click', function () {
                const regionId = this.getAttribute('data-id');
                editRegion(regionId);
            });
        });

        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-region').forEach(btn => {
            btn.addEventListener('click', function () {
                const regionId = this.getAttribute('data-id');
                deleteRegion(regionId);
            });
        });
    }

    // Load districts data
    function loadDistricts() {
        const tableBody = document.querySelector('#districts-table tbody');
        tableBody.innerHTML = '';

        sampleDistricts.forEach(district => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>DIS-${district.id.toString().padStart(3, '0')}</td>
                <td>${district.name}</td>
                <td>${district.region}</td>
                <td>${district.code}</td>
                <td>${district.stations}</td>
                <td>
                    <button class="action-btn edit-district" data-id="${district.id}"><i class="fas fa-edit"></i> Edit</button>
                    <button class="action-btn delete delete-district" data-id="${district.id}"><i class="fas fa-trash-alt"></i> Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Add event listeners to edit buttons
        document.querySelectorAll('.edit-district').forEach(btn => {
            btn.addEventListener('click', function () {
                const districtId = this.getAttribute('data-id');
                editDistrict(districtId);
            });
        });

        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-district').forEach(btn => {
            btn.addEventListener('click', function () {
                const districtId = this.getAttribute('data-id');
                deleteDistrict(districtId);
            });
        });
    }

    // Load groups data
    function loadGroups() {
        const tableBody = document.querySelector('#groups-table tbody');
        tableBody.innerHTML = '';

        sampleGroups.forEach(group => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>GRP-${group.id.toString().padStart(3, '0')}</td>
                <td>${group.name}</td>
                <td>${group.code}</td>
                <td>${group.members}</td>
                <td>${group.created}</td>
                <td>
                    <button class="action-btn edit-group" data-id="${group.id}"><i class="fas fa-edit"></i> Edit</button>
                    <button class="action-btn delete delete-group" data-id="${group.id}"><i class="fas fa-trash-alt"></i> Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Add event listeners to edit buttons
        document.querySelectorAll('.edit-group').forEach(btn => {
            btn.addEventListener('click', function () {
                const groupId = this.getAttribute('data-id');
                editGroup(groupId);
            });
        });

        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-group').forEach(btn => {
            btn.addEventListener('click', function () {
                const groupId = this.getAttribute('data-id');
                deleteGroup(groupId);
            });
        });
    }

    // Region form handling
    const addRegionBtn = document.getElementById('add-region-btn');
    const regionFormContainer = document.getElementById('region-form-container');
    const regionForm = document.getElementById('region-form');
    const cancelRegionBtn = document.getElementById('cancel-region');
    const regionFormTitle = document.getElementById('region-form-title');

    addRegionBtn.addEventListener('click', function () {
        regionFormTitle.textContent = 'Add New';
        regionForm.reset();
        document.getElementById('region-id').value = '';
        regionFormContainer.style.display = 'block';
    });

    cancelRegionBtn.addEventListener('click', function () {
        regionFormContainer.style.display = 'none';
    });

    regionForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const regionId = document.getElementById('region-id').value;
        const regionName = document.getElementById('region-name').value;
        const regionCode = document.getElementById('region-code').value;

        if (regionName && regionCode) {
            alert(`Region ${regionId ? 'updated' : 'added'} successfully!`);
            regionFormContainer.style.display = 'none';
            loadRegions();
        } else {
            alert('Please fill in all required fields');
        }
    });

    function editRegion(id) {
        const region = sampleRegions.find(r => r.id == id);
        if (region) {
            regionFormTitle.textContent = 'Edit';
            document.getElementById('region-id').value = region.id;
            document.getElementById('region-name').value = region.name;
            document.getElementById('region-code').value = region.code;
            document.getElementById('region-description').value = region.description || '';
            regionFormContainer.style.display = 'block';
        }
    }

    function deleteRegion(id) {
        if (confirm('Are you sure you want to delete this region?')) {
            alert('Region deleted successfully!');
            // In a real app, you would remove the item from the data array
            loadRegions();
        }
    }

    // District form handling
    const addDistrictBtn = document.getElementById('add-district-btn');
    const districtFormContainer = document.getElementById('district-form-container');
    const districtForm = document.getElementById('district-form');
    const cancelDistrictBtn = document.getElementById('cancel-district');
    const districtFormTitle = document.getElementById('district-form-title');

    addDistrictBtn.addEventListener('click', function () {
        districtFormTitle.textContent = 'Add New';
        districtForm.reset();
        document.getElementById('district-id').value = '';
        districtFormContainer.style.display = 'block';
    });

    cancelDistrictBtn.addEventListener('click', function () {
        districtFormContainer.style.display = 'none';
    });

    districtForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const districtId = document.getElementById('district-id').value;
        const districtName = document.getElementById('district-name').value;
        const districtRegion = document.getElementById('district-region').value;
        const districtCode = document.getElementById('district-code').value;

        if (districtName && districtRegion && districtCode) {
            alert(`District ${districtId ? 'updated' : 'added'} successfully!`);
            districtFormContainer.style.display = 'none';
            loadDistricts();
        } else {
            alert('Please fill in all required fields');
        }
    });

    function editDistrict(id) {
        const district = sampleDistricts.find(d => d.id == id);
        if (district) {
            districtFormTitle.textContent = 'Edit';
            document.getElementById('district-id').value = district.id;
            document.getElementById('district-name').value = district.name;
            document.getElementById('district-region').value = sampleRegions.findIndex(r => r.name === district.region) + 1;
            document.getElementById('district-code').value = district.code;
            districtFormContainer.style.display = 'block';
        }
    }

    function deleteDistrict(id) {
        if (confirm('Are you sure you want to delete this district?')) {
            alert('District deleted successfully!');
            // In a real app, you would remove the item from the data array
            loadDistricts();
        }
    }

    // Group form handling
    const addGroupBtn = document.getElementById('add-group-btn');
    const groupFormContainer = document.getElementById('group-form-container');
    const groupForm = document.getElementById('group-form');
    const cancelGroupBtn = document.getElementById('cancel-group');
    const groupFormTitle = document.getElementById('group-form-title');

    addGroupBtn.addEventListener('click', function () {
        groupFormTitle.textContent = 'Add New';
        groupForm.reset();
        document.getElementById('group-id').value = '';
        groupFormContainer.style.display = 'block';
    });

    cancelGroupBtn.addEventListener('click', function () {
        groupFormContainer.style.display = 'none';
    });

    groupForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const groupId = document.getElementById('group-id').value;
        const groupName = document.getElementById('group-name').value;
        const groupCode = document.getElementById('group-code').value;

        if (groupName && groupCode) {
            alert(`Group ${groupId ? 'updated' : 'added'} successfully!`);
            groupFormContainer.style.display = 'none';
            loadGroups();
        } else {
            alert('Please fill in all required fields');
        }
    });

    function editGroup(id) {
        const group = sampleGroups.find(g => g.id == id);
        if (group) {
            groupFormTitle.textContent = 'Edit';
            document.getElementById('group-id').value = group.id;
            document.getElementById('group-name').value = group.name;
            document.getElementById('group-code').value = group.code;
            document.getElementById('group-description').value = group.description || '';
            groupFormContainer.style.display = 'block';
        }
    }

    function deleteGroup(id) {
        if (confirm('Are you sure you want to delete this group?')) {
            alert('Group deleted successfully!');
            // In a real app, you would remove the item from the data array
            loadGroups();
        }
    }

    // Initialize the first section
    loadRegions();

    // Search functionality for regions
    const regionSearch = document.getElementById('region-search');
    regionSearch.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll('#regions-table tbody tr');

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });

    // Search functionality for districts
    const districtSearch = document.getElementById('district-search');
    districtSearch.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll('#districts-table tbody tr');

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });

    // Search functionality for groups
    const groupSearch = document.getElementById('group-search');
    groupSearch.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll('#groups-table tbody tr');

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });

    // Filter districts by region
    const districtRegionFilter = document.getElementById('district-region-filter');
    districtRegionFilter.addEventListener('change', function () {
        const regionId = this.value;
        const rows = document.querySelectorAll('#districts-table tbody tr');

        if (!regionId) {
            rows.forEach(row => row.style.display = '');
            return;
        }

        const regionName = this.options[this.selectedIndex].text;

        rows.forEach(row => {
            const regionCell = row.querySelector('td:nth-child(3)');
            row.style.display = regionCell.textContent === regionName ? '' : 'none';
        });
    });
});