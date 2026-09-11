from supabase import create_client, Client
from app.core.config import settings

def get_supabase_client() -> Client:
    """
    Initializes a Supabase client using the Service Role Key.
    This bypasses RLS and should only be used in secure backend contexts
    for tasks like managing storage or sending realtime broadcasts.
    """
    url: str = settings.SUPABASE_URL
    key: str = settings.SUPABASE_SERVICE_ROLE_KEY
    if not url or not key:
        raise ValueError("Supabase URL and Service Role Key must be set in environment variables.")
    
    return create_client(url, key)
