import sys
import logging
import rds_config
import pymysql
import json

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
    userId=event["request"]["params"]
    if event["request"]["type"]=="getAllPatients":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(getAllPatients())}
    if event["request"]["type"]=="getAllDoctors":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(getAllDoctors())}
    if event["request"]["type"]=="getPatient":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(getPatient(userId))}
    if event["request"]["type"]=="getDoctor":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(getDoctor(userId))}
    if event["request"]["type"]=="getDoctorEmail":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(getDoctorEmail(userId))}
    if event["request"]["type"]=="getPatientEmail":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(getPatientEmail(userId))}
    if event["request"]["type"]=="getDoctorExt":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(getDoctorExt(userId))}
    if event["request"]["type"]=="getPatientAge":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(getPatientAge(userId))}
    if event["request"]["type"]=="getDoctorFirstName":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(getDoctorFirstName(userId))}
    if event["request"]["type"]=="getDoctorLastName":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(getDoctorLastName(userId))}
    if event["request"]["type"]=="getDoctorOffice":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(getDoctorOffice(userId))}
    if event["request"]["type"]=="getDoctorPatients":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(getDoctorPatients(userId))}
    if event["request"]["type"]=="getDoctorOffice":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(getDoctorOffice(userId))}
    if event["request"]["type"]=="getDoctorPhoneNumber":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(getDoctorPhoneNumber(userId))}
    if event["request"]["type"]=="getPatientPhoneNumber":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(getPatientPhoneNumber(userId))}
    if event["request"]["type"]=="getPatientDoctor":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(getPatientDoctor(userId))}
    if event["request"]["type"]=="getPatientDOB":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(getPatientDOB(userId))}
    if event["request"]["type"]=="getPatientFirstName":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(getPatientFirstName(userId))}
    if event["request"]["type"]=="getPatientLastName":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(getPatientLastName(userId))}
    if event["request"]["type"]=="getPatientSex":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(getPatientSex(userId))}
    if event["request"]["type"]=="getTestPrognosis":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(getTestPrognosis(event["request"]["testId"]))}
    if event["request"]["type"]=="getTestDiameter":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(getTestDiameter(event["request"]["testId"]))}
    if event["request"]["type"]=="getTestId":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(getTestId(userId))}
    if event["request"]["type"]=="addPatient":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(addPatient(event["request"]["firstName"],event["request"]["lastName"], event["request"]["doctorId"], event["request"]["sex"], event["request"]["birthday"], event["request"]["age"], event["request"]["email"], event["request"]["phoneNumber"]))}
    if event["request"]["type"]=="addDoctor":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(addDoctor(event["request"]["firstName"],event["request"]["lastName"], event["request"]["email"],event["request"]["phoneNumber"], event["request"]["office"],  event["request"]["ext"], event["request"]["profession"]))}
    if event["request"]["type"]=="addTest":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(addTest(event["request"]["dateOfTest"], event["request"]["patientId"],event["request"]["diameter"],event["request"]["prognosis"]))}
    if event["request"]["type"]=="getDoctorId":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(getDoctorId(event["request"]["email"]))}
    if event["request"]["type"]=="getPatientId":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(getPatientId(event["request"]["email"]))}
    if event["request"]["type"]=="getLastVisited":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(getLastVisited(userId))}
    if event["request"]["type"]=="getLastVisited":
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps(setLastVisited(event["request"]["date"], userId))}
    else: 
        return {"isBase64Encoded": False, "statusCode": '200', "headers": { },"body": json.dumps("error")}

def getAllPatients():
    item_count = 0
    name=[]
    with conn.cursor() as cur:
        cur.execute("select * from patient")
        for row in cur:
            item_count += 1
            name.append(row)
            logger.info(row)
            #print(row)
    logger.info("Retrieved %d items from RDS Patients table" %(item_count))
    return name
def setLastVisited(date, userId):
    item_count = 0
    name=[]
    with conn.cursor() as cur:
        cur.execute("UPDATE patient SET lastVisitedDate = '%s' WHERE patientId=%d;" %(date, userId))
        for row in cur:
            item_count += 1
            name.append(row)
            logger.info(row)
            #print(row)
    logger.info("Retrieved %d items from RDS Patients table" %(item_count))
    return name
def getLastVisited(userId):
    item_count = 0
    name=[]
    with conn.cursor() as cur:
        cur.execute("select lastVisitedDate from patient where patientId="+userId)
        for row in cur:
            item_count += 1
            name.append(row)
            logger.info(row)
            #print(row)
    logger.info("Retrieved %d items from RDS Patients table" %(item_count))
    return name
def getAllDoctors():
    item_count = 0
    name=[]
    with conn.cursor() as cur:
        cur.execute("select * from doctor")
        for row in cur:
            name.append(row)
            item_count += 1
            logger.info(row)
            #print(row)
    logger.info("Retrieved %d items from RDS Doctors table" %(item_count))
    return name

def getPatient(userId):
    item_count = 0
    patient=""
    with conn.cursor() as cur:
        cur.execute("select * from patient where patientId="+userId)
        for row in cur:
            patient=row
            item_count += 1
            logger.info(row)
            #print(row)
    logger.info("Retrieved %d items from RDS Pateints table" %(item_count))
    return patient

def getDoctor(userId):
    item_count = 0
    doctor=""
    with conn.cursor() as cur:
        cur.execute("select * from doctor where doctorId="+userId)
        for row in cur:
            doctor=row
            item_count += 1
            logger.info(row)
            #print(row)
    logger.info("Retrieved %d items from RDS Doctors table" %(item_count))
    return doctor

def getDoctorPatients(userId):
    item_count = 0
    name=[]
    with conn.cursor() as cur:
        cur.execute("select * from patient where doctorId="+userId)
        for row in cur:
            name.append(row)            
            item_count += 1
            logger.info(row)
            #print(row)
    logger.info("Retrieved %d items from RDS Doctors table" %(item_count))
    return name

def getPatientDoctor(userId):
    item_count=0
    name=""
    with conn.cursor() as cur:
        cur.execute("select * from patient where doctorId="+userId)
        for row in cur:
            name=row
            item_count += 1
            logger.info(row)
            #print(row)
    logger.info("Retrieved %d items from RDS Doctors table" %(item_count))
    return name

def getDoctorFirstName(userId):
    name=""
    with conn.cursor() as cur:
        cur.execute("select firstName from doctor where doctorId="+userId)
        for row in cur:
            logger.info(row)
            name=row
            #print(row)
    return name

def getDoctorLastName(userId):
    name=""
    with conn.cursor() as cur:
        cur.execute("select lastName from doctor where doctorId="+userId)
        for row in cur:
            logger.info(row)
            name=row
            #print(row)
    return name

def getPatientFirstName(userId):
    name=""
    with conn.cursor() as cur:
        cur.execute("select firstName from patient where patientId="+userId)
        for row in cur:
            logger.info(row)
            name=row
            #print(row)
    return name

def getPatientLastName(userId):
    name=""
    with conn.cursor() as cur:
        cur.execute("select lastName from patient where patientId="+userId)
        for row in cur:
            logger.info(row)
            name=row
            #print(row)
    return name

def getPatientEmail(userId):
    name=""
    with conn.cursor() as cur:
        cur.execute("select email from patient where patientId="+userId)
        for row in cur:
            logger.info(row)
            name=row
            #print(row)
    return name

def getDoctorEmail(userId):
    name=""
    with conn.cursor() as cur:
        cur.execute("select email from doctor where doctorId="+userId)
        for row in cur:
            logger.info(row)
            name=row
            #print(row)
    return name

def getDoctorPhoneNumber(userId):
    name=[]
    with conn.cursor() as cur:
        cur.execute("select phoneNumber from doctorPhoneNumber where userId="+userId)
        for row in cur:
            logger.info(row)
            name.append(row)
            #print(row)
    return name

def getPatientPhoneNumber(userId):
    name=[]
    with conn.cursor() as cur:
        cur.execute("select phoneNumber from patientPhoneNumber where patientId="+userId)
        for row in cur:
            logger.info(row)
            name.append(row)
            #print(row)
    return name

def getDoctorOffice(userId):
    name=""
    with conn.cursor() as cur:
        cur.execute("select office from doctor where doctorId="+userId)
        for row in cur:
            logger.info(row)
            name=row
            #print(row)
    return name

def getDoctorExt(userId):
    name=""
    with conn.cursor() as cur:
        cur.execute("select ext from doctor where doctorId="+userId)
        for row in cur:
            logger.info(row)
            name=row
            #print(row)
    return name

def getProfession(userId):
    name=""
    with conn.cursor() as cur:
        cur.execute("select profession from doctor where doctorId="+userId)
        for row in cur:
            logger.info(row)
            name=row
            #print(row)
    return name

def getPatientDOB(userId):
    name=""
    with conn.cursor() as cur:
        cur.execute("select birthday from patient where patientId="+userId)
        for row in cur:
            logger.info(row)
            name=row
            #print(row)
    return name

def getPatientAge(userId):
    name=""
    with conn.cursor() as cur:
        cur.execute("select age from patient where patientId="+userId)
        for row in cur:
            logger.info(row)
            name=row
            #print(row)
    return name

def getPatientSex(userId):
    name=""
    with conn.cursor() as cur:
        cur.execute("select sex from patient where patientId="+userId)
        for row in cur:
            logger.info(row)
            name=row
            #print(row)
    return name
    
def getTestPrognosis(pateintId):
    name=""
    with conn.cursor() as cur:
        cur.execute("select prognosis from test where patientId="+patientId)
        for row in cur:
            logger.info(row)
            name=row
    return name
def getTestDiameter(testId):
    with conn.cursor() as cur:
        cur.execute("select diameter from test where testId="+testId)
        for row in cur:
            logger.info(row)
            name=row
            #print(row)
    return name
def getTestId(patientId):
    with conn.cursor() as cur:
        sql="select * from test where patientId = "+str(patientId)
        logger.info(sql)
        cur.execute(sql)
        for row in cur:
            logger.info(row)
            name=row
            #print(row)
    return
def getDateofTest(testId):
    name=""
    with conn.cursor() as cur:
        cur.execute("select dateOfTest from test where testId="+testId)
        for row in cur:
            logger.info(row)
            name=row
            #print(row)
    return name
def getDateOfInjection(testId):
    name=""
    with conn.cursor() as cur:
        cur.execute("select dateOfTest from test where testId="+testId)
        for row in cur:
            logger.info(row)
            name=row
            #print(row)
    return name
def addTest(dateOfTest , patientId, diameter, prognosis):
    name=""
    patientId=str(patientId)
    diameter=str(diameter)
    with conn.cursor() as cur:
        cur.execute("insert into test(dateOfTest ,  patientId , diameter, prognosis) values(\""+dateOfTest+"\","+diameter+","+patientId+",\""+prognosis+"\");")
        conn.commit()
    return name

def addPatient(firstName,  lastName, doctorId, sex, birthday, age, email,phoneNumber):
    name=""
    doctorId=str(doctorId)
    age=str(age)
    phoneNumber=str(phoneNumber)
    with conn.cursor() as cur:
        cur.execute("insert into patient(firstName,  lastName, doctorId, sex, birthday, age, email, phoneNumber) values(\""+firstName+"\", \""+lastName+"\","+doctorId+",\""+sex+"\",\""+birthday+"\","+age+",\""+email+"\","+phoneNumber+");")
        conn.commit()

    return name

def addDoctor(firstName,  lastName, email,phoneNumber, office, ext, profession):
    name=""
    phoneNumber=str(phoneNumber)
    ext=str(ext)
    with conn.cursor() as cur:
        cur.execute("insert into doctor(firstName,  lastName,email, office, ext, profession) values(\""+firstName+"\", \""+lastName+"\",\""+email+"\",\""+office+"\",\""+ext+"\",\""+profession+"\");")
        logger.info("added")
        conn.commit()
            #print(row)
    return name

def getDoctorId(email):
    name=""
    with conn.cursor() as cur:
        cur.execute("select doctorId from doctor where email=\'"+email+"\'")
        logger.info("added")
        conn.commit()
            #print(row)
    return name
def getPatientId(email):
    name=""
    with conn.cursor() as cur:
        cur.execute("select patientId from patient where email=\'"+email+"\'")
        logger.info("added")
        conn.commit()
            #print(row)
    return name