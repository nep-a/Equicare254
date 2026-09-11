
CREATE TABLE organizations (
	id UUID NOT NULL, 
	name VARCHAR NOT NULL, 
	is_active BOOLEAN NOT NULL, 
	license_tier VARCHAR NOT NULL, 
	onboarding_status VARCHAR NOT NULL, 
	contact_email VARCHAR, 
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	PRIMARY KEY (id)
)

;
CREATE INDEX ix_organizations_name ON organizations (name);

CREATE TABLE contact_submissions (
	id UUID NOT NULL, 
	name VARCHAR NOT NULL, 
	email VARCHAR NOT NULL, 
	hospital_name VARCHAR, 
	message TEXT NOT NULL, 
	status VARCHAR NOT NULL, 
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	PRIMARY KEY (id)
)

;

CREATE TABLE job_postings (
	id UUID NOT NULL, 
	title VARCHAR NOT NULL, 
	department VARCHAR NOT NULL, 
	location VARCHAR NOT NULL, 
	type VARCHAR NOT NULL, 
	description TEXT NOT NULL, 
	requirements JSONB NOT NULL, 
	is_active BOOLEAN NOT NULL, 
	posted_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	expires_at TIMESTAMP WITHOUT TIME ZONE, 
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	PRIMARY KEY (id)
)

;

CREATE TABLE facilities (
	id UUID NOT NULL, 
	organization_id UUID NOT NULL, 
	name VARCHAR NOT NULL, 
	address VARCHAR, 
	is_active BOOLEAN NOT NULL, 
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(organization_id) REFERENCES organizations (id)
)

;
CREATE INDEX ix_facilities_name ON facilities (name);

CREATE TABLE equipment_categories (
	id UUID NOT NULL, 
	organization_id UUID, 
	name VARCHAR NOT NULL, 
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(organization_id) REFERENCES organizations (id)
)

;
CREATE INDEX ix_equipment_categories_name ON equipment_categories (name);

CREATE TABLE roles (
	id UUID NOT NULL, 
	organization_id UUID, 
	name VARCHAR NOT NULL, 
	permissions JSONB NOT NULL, 
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(organization_id) REFERENCES organizations (id)
)

;
CREATE UNIQUE INDEX ix_roles_name ON roles (name);

CREATE TABLE vendors (
	id UUID NOT NULL, 
	organization_id UUID NOT NULL, 
	name VARCHAR NOT NULL, 
	type VARCHAR NOT NULL, 
	contact_person VARCHAR, 
	email VARCHAR, 
	phone VARCHAR, 
	support_portal VARCHAR, 
	is_active BOOLEAN NOT NULL, 
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(organization_id) REFERENCES organizations (id)
)

;
CREATE INDEX ix_vendors_name ON vendors (name);

CREATE TABLE departments (
	id UUID NOT NULL, 
	organization_id UUID, 
	facility_id UUID NOT NULL, 
	name VARCHAR NOT NULL, 
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(organization_id) REFERENCES organizations (id), 
	FOREIGN KEY(facility_id) REFERENCES facilities (id)
)

;
CREATE INDEX ix_departments_name ON departments (name);

CREATE TABLE equipment_types (
	id UUID NOT NULL, 
	organization_id UUID, 
	category_id UUID NOT NULL, 
	name VARCHAR NOT NULL, 
	schema_definition JSONB, 
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(organization_id) REFERENCES organizations (id), 
	FOREIGN KEY(category_id) REFERENCES equipment_categories (id)
)

;
CREATE INDEX ix_equipment_types_name ON equipment_types (name);

CREATE TABLE contracts (
	id UUID NOT NULL, 
	organization_id UUID NOT NULL, 
	vendor_id UUID NOT NULL, 
	contract_number VARCHAR NOT NULL, 
	title VARCHAR NOT NULL, 
	type VARCHAR NOT NULL, 
	start_date TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	end_date TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	cost NUMERIC(12, 2), 
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(organization_id) REFERENCES organizations (id), 
	FOREIGN KEY(vendor_id) REFERENCES vendors (id)
)

;
CREATE INDEX ix_contracts_contract_number ON contracts (contract_number);

CREATE TABLE parts (
	id UUID NOT NULL, 
	organization_id UUID NOT NULL, 
	part_number VARCHAR NOT NULL, 
	description VARCHAR NOT NULL, 
	manufacturer_id UUID, 
	cost NUMERIC(10, 2) NOT NULL, 
	minimum_stock_threshold INTEGER NOT NULL, 
	is_active BOOLEAN NOT NULL, 
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(organization_id) REFERENCES organizations (id), 
	FOREIGN KEY(manufacturer_id) REFERENCES vendors (id)
)

;
CREATE INDEX ix_parts_part_number ON parts (part_number);

CREATE TABLE locations (
	id UUID NOT NULL, 
	organization_id UUID, 
	department_id UUID NOT NULL, 
	building VARCHAR, 
	floor VARCHAR, 
	room VARCHAR, 
	bed VARCHAR, 
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(organization_id) REFERENCES organizations (id), 
	FOREIGN KEY(department_id) REFERENCES departments (id)
)

;

CREATE TABLE equipment_models (
	id UUID NOT NULL, 
	organization_id UUID, 
	type_id UUID NOT NULL, 
	manufacturer VARCHAR NOT NULL, 
	model_name VARCHAR NOT NULL, 
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(organization_id) REFERENCES organizations (id), 
	FOREIGN KEY(type_id) REFERENCES equipment_types (id)
)

;

CREATE TABLE users (
	id UUID NOT NULL, 
	organization_id UUID NOT NULL, 
	role_id UUID NOT NULL, 
	facility_id UUID, 
	department_id UUID, 
	email VARCHAR NOT NULL, 
	hashed_password VARCHAR, 
	first_name VARCHAR NOT NULL, 
	last_name VARCHAR NOT NULL, 
	phone_number VARCHAR, 
	professional_title VARCHAR, 
	employee_id VARCHAR, 
	account_status VARCHAR NOT NULL, 
	failed_login_attempts INTEGER NOT NULL, 
	locked_until TIMESTAMP WITHOUT TIME ZONE, 
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(organization_id) REFERENCES organizations (id), 
	FOREIGN KEY(role_id) REFERENCES roles (id), 
	FOREIGN KEY(facility_id) REFERENCES facilities (id), 
	FOREIGN KEY(department_id) REFERENCES departments (id)
)

;
CREATE UNIQUE INDEX ix_users_email ON users (email);

CREATE TABLE maintenance_checklists (
	id UUID NOT NULL, 
	organization_id UUID NOT NULL, 
	equipment_type_id UUID NOT NULL, 
	name VARCHAR NOT NULL, 
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(organization_id) REFERENCES organizations (id), 
	FOREIGN KEY(equipment_type_id) REFERENCES equipment_types (id)
)

;

CREATE TABLE inventory_levels (
	id UUID NOT NULL, 
	organization_id UUID, 
	part_id UUID NOT NULL, 
	facility_id UUID NOT NULL, 
	quantity_on_hand INTEGER NOT NULL, 
	location_details VARCHAR, 
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(organization_id) REFERENCES organizations (id), 
	FOREIGN KEY(part_id) REFERENCES parts (id), 
	FOREIGN KEY(facility_id) REFERENCES facilities (id)
)

;

CREATE TABLE procurement_requests (
	id UUID NOT NULL, 
	organization_id UUID NOT NULL, 
	department_id UUID, 
	vendor_id UUID, 
	request_number VARCHAR NOT NULL, 
	equipment_name VARCHAR NOT NULL, 
	justification VARCHAR NOT NULL, 
	estimated_cost NUMERIC(12, 2), 
	status VARCHAR NOT NULL, 
	requested_date TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	expected_delivery_date TIMESTAMP WITHOUT TIME ZONE, 
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(organization_id) REFERENCES organizations (id), 
	FOREIGN KEY(department_id) REFERENCES departments (id), 
	FOREIGN KEY(vendor_id) REFERENCES vendors (id)
)

;
CREATE INDEX ix_procurement_requests_request_number ON procurement_requests (request_number);

CREATE TABLE assets (
	id UUID NOT NULL, 
	organization_id UUID NOT NULL, 
	model_id UUID NOT NULL, 
	asset_number VARCHAR NOT NULL, 
	serial_number VARCHAR, 
	qr_code VARCHAR NOT NULL, 
	status VARCHAR NOT NULL, 
	risk_level VARCHAR NOT NULL, 
	acquisition_date DATE, 
	commissioning_date DATE, 
	purchase_cost NUMERIC(12, 2), 
	expected_useful_life_years NUMERIC(4, 1), 
	custom_attributes JSONB, 
	photo_url VARCHAR, 
	manual_url VARCHAR, 
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(organization_id) REFERENCES organizations (id), 
	FOREIGN KEY(model_id) REFERENCES equipment_models (id)
)

;
CREATE UNIQUE INDEX ix_assets_qr_code ON assets (qr_code);
CREATE UNIQUE INDEX ix_assets_asset_number ON assets (asset_number);

CREATE TABLE user_invitations (
	id UUID NOT NULL, 
	user_id UUID NOT NULL, 
	invited_by_id UUID NOT NULL, 
	token_hash VARCHAR NOT NULL, 
	expires_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	status VARCHAR NOT NULL, 
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(user_id) REFERENCES users (id), 
	FOREIGN KEY(invited_by_id) REFERENCES users (id)
)

;
CREATE UNIQUE INDEX ix_user_invitations_token_hash ON user_invitations (token_hash);

CREATE TABLE audit_logs (
	id UUID NOT NULL, 
	organization_id UUID NOT NULL, 
	user_id UUID, 
	action VARCHAR NOT NULL, 
	entity_type VARCHAR NOT NULL, 
	entity_id UUID NOT NULL, 
	old_value JSONB, 
	new_value JSONB, 
	ip_address VARCHAR, 
	timestamp TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(organization_id) REFERENCES organizations (id), 
	FOREIGN KEY(user_id) REFERENCES users (id)
)

;
CREATE INDEX ix_audit_logs_timestamp ON audit_logs (timestamp);
CREATE INDEX ix_audit_logs_entity_type ON audit_logs (entity_type);
CREATE INDEX ix_audit_logs_action ON audit_logs (action);

CREATE TABLE checklist_items (
	id UUID NOT NULL, 
	organization_id UUID, 
	checklist_id UUID NOT NULL, 
	sequence INTEGER NOT NULL, 
	description VARCHAR NOT NULL, 
	type VARCHAR NOT NULL, 
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(organization_id) REFERENCES organizations (id), 
	FOREIGN KEY(checklist_id) REFERENCES maintenance_checklists (id)
)

;

CREATE TABLE documents (
	id UUID NOT NULL, 
	organization_id UUID NOT NULL, 
	entity_type VARCHAR NOT NULL, 
	entity_id UUID NOT NULL, 
	file_name VARCHAR NOT NULL, 
	file_type VARCHAR NOT NULL, 
	file_size INTEGER, 
	file_url VARCHAR NOT NULL, 
	uploaded_by UUID, 
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(organization_id) REFERENCES organizations (id), 
	FOREIGN KEY(uploaded_by) REFERENCES users (id)
)

;
CREATE INDEX ix_documents_entity_type ON documents (entity_type);
CREATE INDEX ix_documents_entity_id ON documents (entity_id);

CREATE TABLE refresh_tokens (
	id UUID NOT NULL, 
	organization_id UUID, 
	user_id UUID NOT NULL, 
	token_hash VARCHAR NOT NULL, 
	expires_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	revoked BOOLEAN NOT NULL, 
	ip_address VARCHAR, 
	user_agent VARCHAR, 
	replaced_by_token VARCHAR, 
	PRIMARY KEY (id), 
	FOREIGN KEY(organization_id) REFERENCES organizations (id), 
	FOREIGN KEY(user_id) REFERENCES users (id) ON DELETE CASCADE
)

;
CREATE INDEX ix_refresh_tokens_user_id ON refresh_tokens (user_id);
CREATE UNIQUE INDEX ix_refresh_tokens_token_hash ON refresh_tokens (token_hash);
CREATE INDEX ix_refresh_tokens_revoked ON refresh_tokens (revoked);

CREATE TABLE asset_location_history (
	id UUID NOT NULL, 
	organization_id UUID, 
	asset_id UUID NOT NULL, 
	location_id UUID NOT NULL, 
	assigned_date TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	removed_date TIMESTAMP WITHOUT TIME ZONE, 
	is_current BOOLEAN NOT NULL, 
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(organization_id) REFERENCES organizations (id), 
	FOREIGN KEY(asset_id) REFERENCES assets (id), 
	FOREIGN KEY(location_id) REFERENCES locations (id)
)

;

CREATE TABLE work_orders (
	id UUID NOT NULL, 
	organization_id UUID NOT NULL, 
	wo_number VARCHAR NOT NULL, 
	equipment_id UUID NOT NULL, 
	assigned_to UUID, 
	type VARCHAR NOT NULL, 
	priority VARCHAR NOT NULL, 
	status VARCHAR NOT NULL, 
	reported_fault TEXT, 
	diagnosis TEXT, 
	action_taken TEXT, 
	downtime_minutes INTEGER NOT NULL, 
	labor_cost NUMERIC(10, 2) NOT NULL, 
	parts_cost NUMERIC(10, 2) NOT NULL, 
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	started_at TIMESTAMP WITHOUT TIME ZONE, 
	completed_at TIMESTAMP WITHOUT TIME ZONE, 
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(organization_id) REFERENCES organizations (id), 
	FOREIGN KEY(equipment_id) REFERENCES assets (id), 
	FOREIGN KEY(assigned_to) REFERENCES users (id)
)

;
CREATE UNIQUE INDEX ix_work_orders_wo_number ON work_orders (wo_number);

CREATE TABLE maintenance_plans (
	id UUID NOT NULL, 
	organization_id UUID, 
	equipment_id UUID NOT NULL, 
	checklist_id UUID NOT NULL, 
	frequency_months INTEGER NOT NULL, 
	next_due_date TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	last_completed_date TIMESTAMP WITHOUT TIME ZONE, 
	is_active BOOLEAN NOT NULL, 
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(organization_id) REFERENCES organizations (id), 
	FOREIGN KEY(equipment_id) REFERENCES assets (id), 
	FOREIGN KEY(checklist_id) REFERENCES maintenance_checklists (id)
)

;

CREATE TABLE calibrations (
	id UUID NOT NULL, 
	organization_id UUID NOT NULL, 
	asset_id UUID NOT NULL, 
	performed_by VARCHAR NOT NULL, 
	certificate_number VARCHAR, 
	calibration_date TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	next_due_date TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	passed BOOLEAN NOT NULL, 
	notes VARCHAR, 
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(organization_id) REFERENCES organizations (id), 
	FOREIGN KEY(asset_id) REFERENCES assets (id)
)

;

CREATE TABLE warranties (
	id UUID NOT NULL, 
	organization_id UUID, 
	equipment_id UUID NOT NULL, 
	vendor_id UUID, 
	start_date TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	end_date TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	type VARCHAR NOT NULL, 
	terms VARCHAR, 
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(organization_id) REFERENCES organizations (id), 
	FOREIGN KEY(equipment_id) REFERENCES assets (id), 
	FOREIGN KEY(vendor_id) REFERENCES vendors (id)
)

;

CREATE TABLE disposal_records (
	id UUID NOT NULL, 
	organization_id UUID NOT NULL, 
	asset_id UUID NOT NULL, 
	disposal_date TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	reason VARCHAR NOT NULL, 
	method VARCHAR NOT NULL, 
	sale_value NUMERIC(12, 2), 
	notes VARCHAR, 
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(organization_id) REFERENCES organizations (id), 
	UNIQUE (asset_id), 
	FOREIGN KEY(asset_id) REFERENCES assets (id)
)

;

CREATE TABLE work_order_tasks (
	id UUID NOT NULL, 
	organization_id UUID, 
	work_order_id UUID NOT NULL, 
	description VARCHAR NOT NULL, 
	is_completed BOOLEAN NOT NULL, 
	completed_at TIMESTAMP WITHOUT TIME ZONE, 
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(organization_id) REFERENCES organizations (id), 
	FOREIGN KEY(work_order_id) REFERENCES work_orders (id)
)

;
