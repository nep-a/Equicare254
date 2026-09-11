import uuid
from typing import Optional
from fastapi import UploadFile
from app.core.supabase import get_supabase_client

class StorageService:
    def __init__(self):
        self.client = get_supabase_client()
        self.bucket_name = "equicare-documents"

    async def upload_file(self, organization_id: str, file: UploadFile, folder: str = "general") -> Optional[str]:
        """
        Uploads a file to the Supabase Storage bucket, namespaced by organization_id.
        Returns the public URL of the uploaded file.
        """
        file_ext = file.filename.split(".")[-1] if file.filename else "bin"
        file_id = str(uuid.uuid4())
        # Path: {organization_id}/{folder}/{uuid}.{ext}
        file_path = f"{organization_id}/{folder}/{file_id}.{file_ext}"
        
        file_bytes = await file.read()
        
        # Upload to Supabase Storage
        res = self.client.storage.from_(self.bucket_name).upload(
            file=file_bytes,
            path=file_path,
            file_options={"content-type": file.content_type}
        )
        
        if res.status_code == 200:
            # Generate Public URL
            return self.client.storage.from_(self.bucket_name).get_public_url(file_path)
        
        return None

    def delete_file(self, file_path: str) -> bool:
        """
        Deletes a file from Supabase Storage.
        file_path should be the relative path after the bucket name.
        """
        res = self.client.storage.from_(self.bucket_name).remove([file_path])
        return len(res) > 0

storage_service = StorageService()
