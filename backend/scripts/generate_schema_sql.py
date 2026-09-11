import sys
import os
from sqlalchemy import create_mock_engine

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
from app.db.database import Base
import app.db.models  # Ensure models are loaded

def dump(sql, *multiparams, **params):
    # This function captures the SQL instead of executing it
    # We write it to a file
    with open("supabase_schema.sql", "a") as f:
        f.write(str(sql.compile(dialect=engine.dialect)) + ";\n")

if __name__ == "__main__":
    # Clear the file first
    if os.path.exists("supabase_schema.sql"):
        os.remove("supabase_schema.sql")
        
    engine = create_mock_engine("postgresql://", executor=dump)
    Base.metadata.create_all(engine, checkfirst=False)
    print("Schema successfully dumped to supabase_schema.sql")
