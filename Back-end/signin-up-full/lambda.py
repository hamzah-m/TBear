import sys
import logging
import rds_config
import pymysql
import json
import smtplib

# Import the email modules we'll need
from email.message import EmailMessage
from email.mime.text import MIMEText
import boto3
client = boto3.client('ses')

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
    if event["request"]["type"]=="sendEmail":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(sendEmail(event["request"]["email"]))}
    if event["request"]["type"]=="patientLogin":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(getPatient(event["request"]["email"],event["request"]["password"]))}
    if event["request"]["type"]=="doctorLogin":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(getDoctor(event["request"]["email"], event["request"]["password"]))}
    if event["request"]["type"]=="addPatient":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": {}, "body":json.dumps(addPatient(event["request"]["token"], event["request"]["email"], event["request"]["password"]))}
    if event["request"]["type"]=="addDoctor":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(addDoctor(event["request"]["firstName"],event["request"]["lastName"], event["request"]["email"],event["request"]["phoneNumber"], event["request"]["office"],  event["request"]["ext"], event["request"]["profession"],event["request"]["password"] ))} 
    else:    
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps("error")}
def getPatient(email, password):
    item_count = 0
    with conn.cursor() as cur:
        cur.execute("select password from patient where email="+email)
        for row in cur:
            patient=row
            item_count += 1
            logger.info(row)
            if item_count>1:
                return False
            if(row["password"]==password):
                return True
            #print(row)
    return False

def getDoctor(email, password):
    item_count = 0
    with conn.cursor() as cur:
        cur.execute("select password from doctor where email="+email)
        for row in cur:
            patient=row
            item_count += 1
            logger.info(row)
            if item_count>1:
                return False
            if(row["password"]==password):
                return True
            #print(row)
    return False
def addPatient(email, token, password):
    with conn.cursor() as cur:
        cur.execute("select doctorId from patient where email='"+email+"'")
        for row in cur:
            name=""
            with conn.cursor() as curr2:
                curr2.execute("select * from tokens where doctorId="+row["doctorId"]+" and token="+token)
                for row2 in curr2:
                    curr2.execute("UPDATE patient set password='"+password+"' where email='"+email+"'")
                    return True
    return False

def addDoctor(firstName,  lastName, email,phoneNumber, office, ext, profession, password):
    phoneNumber=str(phoneNumber)
    ext=str(ext)
    password=str(password)
    with conn.cursor() as cur:
        cur.execute("select * from doctor where email='"+email+"'")
        for row in cur:
            return "email exists"
    with conn.cursor() as cur:
        cur.execute("insert into doctor(firstName,  lastName,email, office, ext, profession, password) values(\""+firstName+"\", \""+lastName+"\",\""+email+"\",\""+office+"\",\""+ext+"\",\""+profession+"\","+"\""+password+"\");")
        logger.info("added")
        conn.commit()
        sendEmail(email)
            #print(row)
    return "success"

def sendEmail(email):
    message = """From: %s\nTo: %s\nSubject: %s\n\n%s
    """ % ("TBEAR", ", ".join("to"), "sub", "hello")
    server = smtplib.SMTP('fatima@bdeir.org', 587)
    server.ehlo()
    server.starttls()
    server.login("fatima@bdeir.org", "fatouma")
    server.sendmail("fatima@bdeir.org", email, message)
    server.close()