from pydantic import BaseModel

class AIResponseSchema(BaseModel):
    title: str
    priority: str
    action: str
    impact: str