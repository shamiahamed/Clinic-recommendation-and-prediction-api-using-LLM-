from sqlalchemy import False_
from logging import error
from fastapi import HTTPException, Request
from fastapi.responses import JSONResponse

def register_exception_handlers(app):
    @app.exception_handler(HTTPException)

    async def http_exception(request: Request, exc: HTTPException):
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "status" : False,
                "message": exc.detail,
                "error": str(exc)
            }
        )

    @app.exception_handler(Exception)
    async def global_exception(request: Request, exc: Exception):
        return JSONResponse(
            status_code= 500,
            content={
                "status" : False,
                "message": "Internal server error",
                "error": str(exc)
            }
        )