-- RLS Policies & Auth Configuration

-- 1. Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE asset_location_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE procurement_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_order_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE calibrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE warranties ENABLE ROW LEVEL SECURITY;
ALTER TABLE disposal_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_invitations ENABLE ROW LEVEL SECURITY;

-- 2. Create function to automatically handle new users from Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Insert into public.users. 
  -- Note: We assume the application layer sets organization_id etc later, or via metadata.
  -- For now, this is a basic stub that creates a shadow record if not exists.
  INSERT INTO public.users (id, email, first_name, last_name, account_status, failed_login_attempts, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    'PENDING',
    0,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Trigger for auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- 3. Basic Tenancy RLS Policies
-- Users can only see data for their own organization.
-- We use a function to securely fetch the current user's organization_id.

CREATE OR REPLACE FUNCTION auth.user_organization_id()
RETURNS UUID
LANGUAGE sql STABLE
AS $$
  SELECT organization_id FROM public.users WHERE id = auth.uid();
$$;

-- Users Table: Users can see themselves, and admins can see others in the same org.
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id OR organization_id = auth.user_organization_id());

-- Generic Organization-scoped Policy for all other tables
-- Applying a standard policy: Users can SELECT, INSERT, UPDATE, DELETE within their own organization.

DO $$
DECLARE
    t_name text;
BEGIN
    FOR t_name IN 
        SELECT table_name FROM information_schema.tables 
        WHERE table_schema = 'public' 
          AND table_name != 'organizations'
          AND table_name != 'users'
          AND EXISTS (
              SELECT 1 FROM information_schema.columns 
              WHERE table_schema = 'public' 
                AND table_name = information_schema.tables.table_name
                AND column_name = 'organization_id'
          )
    LOOP
        EXECUTE format('CREATE POLICY "Tenant Isolation SELECT" ON %I FOR SELECT USING (organization_id = auth.user_organization_id());', t_name);
        EXECUTE format('CREATE POLICY "Tenant Isolation INSERT" ON %I FOR INSERT WITH CHECK (organization_id = auth.user_organization_id());', t_name);
        EXECUTE format('CREATE POLICY "Tenant Isolation UPDATE" ON %I FOR UPDATE USING (organization_id = auth.user_organization_id());', t_name);
        EXECUTE format('CREATE POLICY "Tenant Isolation DELETE" ON %I FOR DELETE USING (organization_id = auth.user_organization_id());', t_name);
    END LOOP;
END
$$;
