







USE pharmacy_db;



-- Therapeutic Categories Table
CREATE TABLE therapeutic_categories (
    category_id INT PRIMARY KEY IDENTITY(1,1),
    category_name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(MAX)
);

-- Manufacturers Table
CREATE TABLE manufacturers (
    manufacturer_id INT PRIMARY KEY IDENTITY(1,1),
    manufacturer_name VARCHAR(100) NOT NULL UNIQUE,
    country VARCHAR(50),
    contact_info VARCHAR(MAX)
);

-- Medications Table
CREATE TABLE medications (
    medication_id INT PRIMARY KEY IDENTITY(1,1),
    generic_name VARCHAR(200) NOT NULL,
    brand_name VARCHAR(200) NOT NULL,
    active_ingredient VARCHAR(300) NOT NULL,
    concentration VARCHAR(100) NOT NULL,
    dosage_form VARCHAR(50) NOT NULL, 
    manufacturer_id INT,
    category_id INT,
    price DECIMAL(10,2) NOT NULL,
    quantity_in_stock INT NOT NULL DEFAULT 0,
    location_in_pharmacy VARCHAR(100), 
    qr_code VARCHAR(100) UNIQUE NOT NULL, 
    expiry_date DATE,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (manufacturer_id) REFERENCES manufacturers(manufacturer_id),
    FOREIGN KEY (category_id) REFERENCES therapeutic_categories(category_id)
);

-- Medication Alternatives Table
CREATE TABLE medication_alternatives (
    alternative_id INT PRIMARY KEY IDENTITY(1,1),
    original_medication_id INT,
    alternative_medication_id INT,
    notes VARCHAR(MAX),
    FOREIGN KEY (original_medication_id) REFERENCES medications(medication_id),
    FOREIGN KEY (alternative_medication_id) REFERENCES medications(medication_id),
    CONSTRAINT unique_alternative UNIQUE (original_medication_id, alternative_medication_id)
);

-- Doctors Table
CREATE TABLE doctors (
    doctor_id INT PRIMARY KEY IDENTITY(1,1),
    doctor_name VARCHAR(100) NOT NULL,
    specialization VARCHAR(100),
    license_number VARCHAR(50) UNIQUE,
    phone VARCHAR(20),
    email VARCHAR(100)
);

-- Prescriptions Table
CREATE TABLE prescriptions (
    prescription_id INT PRIMARY KEY IDENTITY(1,1),
    doctor_id INT,
    patient_name VARCHAR(100) NOT NULL,
    patient_phone VARCHAR(20),
    prescription_date DATE NOT NULL,
    notes VARCHAR(MAX),
    qr_code VARCHAR(100) UNIQUE, 
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
);

-- Prescription Details Table
CREATE TABLE prescription_details (
    detail_id INT PRIMARY KEY IDENTITY(1,1),
    prescription_id INT,
    medication_id INT,
    quantity_prescribed INT NOT NULL,
    dosage_instructions VARCHAR(MAX),
    duration_days INT,
    FOREIGN KEY (prescription_id) REFERENCES prescriptions(prescription_id),
    FOREIGN KEY (medication_id) REFERENCES medications(medication_id)
);

-- Create additional indexes for performance
CREATE INDEX idx_medication_search ON medications(generic_name, brand_name, active_ingredient);
CREATE INDEX idx_stock_location ON medications(location_in_pharmacy, quantity_in_stock);
CREATE INDEX idx_qr_code ON medications(qr_code);
CREATE INDEX idx_prescription_qr ON prescriptions(qr_code);

-- Insert data into Therapeutic Categories
INSERT INTO therapeutic_categories (category_name, description) VALUES
('Pain Relievers', 'Medications for pain relief'),
('Antibiotics', 'Medications for bacterial infections'),
('Gastrointestinal Drugs', 'Medications for digestive system issues'),
('Respiratory Drugs', 'Medications for respiratory diseases'),
('Cardiovascular Drugs', 'Medications for heart and blood pressure conditions');

-- Insert data into Manufacturers
INSERT INTO manufacturers (manufacturer_name, country, contact_info) VALUES
('Pfizer', 'USA', 'info@pfizer.com'),
('Novartis', 'Switzerland', 'info@novartis.com'),
('Bayer', 'Germany', 'info@bayer.com'),
('Sanofi', 'France', 'info@sanofi.com'),
('EVA Pharma', 'Egypt', 'info@evapharma.com');

-- Insert data into Medications
INSERT INTO medications (generic_name, brand_name, active_ingredient, concentration, dosage_form, manufacturer_id, category_id, price, quantity_in_stock, location_in_pharmacy, qr_code, expiry_date) VALUES
('Paracetamol', 'Panadol', 'Paracetamol', '500mg', 'Tablets', 1, 1, 25.50, 100, 'Shelf A1', 'QR001', '2026-12-31'),
('Amoxicillin', 'Amoxil', 'Amoxicillin', '250mg/5ml', 'Syrup', 2, 2, 45.00, 50, 'Shelf B2', 'QR002', '2025-11-30'),
('Omeprazole', 'Losec', 'Omeprazole', '20mg', 'Capsules', 3, 3, 75.25, 75, 'Drawer C3', 'QR003', '2027-01-15'),
('Salbutamol', 'Ventolin', 'Salbutamol', '100mcg/puff', 'Inhaler', 4, 4, 60.00, 30, 'Shelf D4', 'QR004', '2026-09-20'),
('Amlodipine', 'Norvasc', 'Amlodipine', '5mg', 'Tablets', 1, 5, 90.75, 80, 'Shelf E5', 'QR005', '2027-03-10'),
('Ibuprofen', 'Brufen', 'Ibuprofen', '400mg', 'Tablets', 2, 1, 30.00, 120, 'Shelf A2', 'QR006', '2026-08-01'),
('Ciprofloxacin', 'Cipro', 'Ciprofloxacin', '500mg', 'Tablets', 3, 2, 85.00, 60, 'Shelf B3', 'QR007', '2025-10-25'),
('Loratadine', 'Claritine', 'Loratadine', '10mg', 'Tablets', 4, 4, 40.00, 90, 'Drawer C4', 'QR008', '2027-02-28'),
('Metformin', 'Glucophage', 'Metformin', '850mg', 'Tablets', 5, 5, 55.00, 110, 'Shelf E6', 'QR009', '2026-07-19'),
('Diclofenac', 'Voltaren', 'Diclofenac', '50mg', 'Tablets', 1, 1, 35.00, 95, 'Shelf A3', 'QR010', '2027-04-05');

-- Insert data into Medication Alternatives
INSERT INTO medication_alternatives (original_medication_id, alternative_medication_id, notes) VALUES
(1, 6, 'Brufen is an alternative to Panadol for pain relief.'),
(3, 8, 'Claritine can be an alternative for some digestive issues related to allergies.'),
(5, 9, 'Glucophage is an alternative for diabetes management, not directly for hypertension.');

-- Insert data into Doctors
INSERT INTO doctors (doctor_name, specialization, license_number, phone, email) VALUES
('Dr. Ahmed Ali', 'Internal Medicine', 'DR12345', '01012345678', 'ahmed.ali@example.com'),
('Dr. Sara Mahmoud', 'Pediatrics', 'DR67890', '01198765432', 'sara.mahmoud@example.com');

-- Insert data into Prescriptions
INSERT INTO prescriptions (doctor_id, patient_name, patient_phone, prescription_date, notes, qr_code) VALUES
(1, 'Layla Khaled', '01234567890', '2025-05-01', 'Prescription for headache', 'PRES001'),
(2, 'Mohamed Said', '01509876543', '2025-05-02', 'Prescription for sore throat', 'PRES002');

-- Insert data into Prescription Details
INSERT INTO prescription_details (prescription_id, medication_id, quantity_prescribed, dosage_instructions, duration_days) VALUES
(1, 1, 2, 'One tablet every 8 hours', 5),
(1, 6, 1, 'One tablet as needed', 3),
(2, 2, 1, 'One teaspoon twice daily', 7),
(2, 7, 1, 'One tablet twice daily', 5);


