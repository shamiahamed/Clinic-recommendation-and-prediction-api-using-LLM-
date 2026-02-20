
import logging
from logging.handlers import RotatingFileHandler
from pathlib import Path

LOG_DIR = Path("logs")
LOG_DIR.mkdir(exist_ok=True)
LOG_FILE = LOG_DIR / "app.log"

def setup_logger():

    console_log = logging.StreamHandler()
    console_log.setLevel(logging.INFO)
    console_log.setFormatter(logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s'))

    file_log = RotatingFileHandler(LOG_FILE, maxBytes =1024*1024*4, backupCount=5)
    file_log.setLevel(logging.INFO)
    file_log.setFormatter(logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s'))

    logger = logging.getLogger(__name__)
    logger.setLevel(logging.INFO)
    
    for handler in [console_log, file_log]:
        logger.addHandler(handler)

    return logger

logger = setup_logger()    




    


#logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s'))
# LOG_DIR = Path("logs")
# LOG_DIR.mkdir(exist_ok=True)
# LOG_FILE = LOG_DIR / "app.log"