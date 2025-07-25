require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// API Endpoints

// Stations
app.get('/api/stations', async (req, res) => {
    try {
        const { rows } = await pool.query(`
      SELECT s.*, g.group_name, d.district_name, r.region_name
      FROM stations s
      LEFT JOIN groups g ON s.group_id = g.id
      LEFT JOIN districts d ON s.district_id = d.id
      LEFT JOIN regions r ON d.region_id = r.id
    `);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch stations' });
    }
});

app.post('/api/stations', async (req, res) => {
    const { station_code, station_name, group_id, district_id, location, contact_name, contact_number, ip_address } = req.body;
    try {
        const { rows } = await pool.query(
            `INSERT INTO stations 
       (station_code, station_name, group_id, district_id, location, contact_name, contact_number, ip_address, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING *`,
            [station_code, station_name, group_id, district_id, location, contact_name, contact_number, ip_address, 1]
        );
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create station' });
    }
});

// Users
app.get('/api/users', async (req, res) => {
    try {
        const { rows } = await pool.query(`
      SELECT u.*, d.district_name, r.role_name
      FROM users u
      LEFT JOIN districts d ON u.district_id = d.id
      LEFT JOIN roles r ON u.role_id = r.id
    `);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Regions, Districts, Groups (similar pattern)
app.get('/api/regions', async (req, res) => {
    /* implementation */
});
app.get('/api/districts', async (req, res) => {
    /* implementation */
});
app.get('/api/groups', async (req, res) => {
    /* implementation */
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});