import sys
import logging
import rds_config
import pymysql
import json
from random import randint

#rds settings
rds_host  = "tbtest.cq7mvqsp449u.us-east-1.rds.amazonaws.com"
name = "tbtest"
password = "tbtest123"
db_name = "tbtest"

logger = logging.getLogger()
logger.setLevel(logging.INFO)

try:
    conn = pymysql.connect(rds_host, user=name, passwd=password, db=db_name, connect_timeout=5)
except Exception as e:
    logger.error("ERROR: Unexpected error: Could not connect to MySql instance. " +str(e))
    sys.exit()

logger.info("SUCCESS: Connection to RDS mysql instance succeeded")
def handler(event, context):
    if event["request"]["type"]=="generate":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(generate(event["request"]["doctorId"]))}
    elif event["request"]["type"]=="delete":
        delete(event["request"]["token"])
            
def delete(token):
    try:
        with conn.cursor() as cur:
            cur.execute("delete from tokens where token=%d" %(token))
            conn.commit()
    except Exception as ex:
        logger.info(ex)
def generate(doctorId):
    x=randint(1000,9999)
    logger.info(x)
    with conn.cursor() as cur:
        cur.execute("select * from tokens where token=%d" %(x))
        i=0
        for row in cur:
            i=1
        if(i==0):
            cur.execute("insert into tokens (token, doctorId) values ("+str(x)+", "+str(doctorId)+")")
            conn.commit()
            return x
        elif(i==1):
            generate()
    

    