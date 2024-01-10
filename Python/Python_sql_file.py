import re
from random import randrange
import sqlite3
from sqlite3 import Error
import json
from bcrypt import checkpw, gensalt, hashpw


from flask import Flask, jsonify, request
from flask_cors import CORS

conn = sqlite3.connect(r"G:\vb\ALEX_vb\React\Mini_Project_Final\Python\UserName-PassWord.db",check_same_thread=False)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

with open(r"G:\vb\ALEX_vb\React\Mini_Project_Final\Python\OneJson.json","r") as file:
    j2 = json.load(file)
    
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    newUsername = data.get('username')
    newPassword = data.get("password")
    print(newUsername)
    print(newPassword)
    conn = sqlite3.connect(r"G:\vb\ALEX_vb\React\Mini_Project_Final\Python\UserName-PassWord.db",check_same_thread=False)
    cu = conn.cursor()
    validName = False 
    validPass = False

    q = """Insert Into UserData(UserName,Password) Values(?,?)"""
    q_entry = (newUsername, newPassword)

    resultName = re.match("^[a-zA-Z]+$", newUsername)
    resultPass = re.match("(?=.*[a-zA-Z])(?=.*\d)", newPassword)
#elif resultPass:
 #       validPass = True

    if len(newUsername) >= 5 and len(newUsername) <= 16:
        validName = True
    elif resultPass:
       validPass = True
    else: 
        validName = False

    if len(newPassword) >= 5 and len(newPassword) <= 16:
        validPass = True
    else:
        validPass = False

    if validName == True and validPass == True:
        cu.execute(q, q_entry)
        conn.commit()
        message = "Valid Sign-Up !!!"
        print("This is the message___", message)
        return jsonify({"message":message})
    else:
        message = "Invalid Sign-Up. Please try again !!!"
        print("This is the message___", message)
        return jsonify({"message":message})
    


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    print("prints username____:",username)
    print("prints password____:",password) 

    Final_q= check_credentials(username, password)
    #print("Final q: " + Final_q)
    data = queryOne(conn,Final_q)
    if len(data) >= 1:
        print("THIS IS THE DATA:___",data)
        random_num = randrange(1, 3)
        q = "Select HolidayMessage.Message From HolidayMessage Where HolidayMessage.ID =" + str(random_num)
        cu = conn.cursor()
        cu.execute(q)
        conn.commit()
        message = cu.fetchall()
        #print("THIS IS THE MESSAGE:___ ", message)
    else:
        message = "Invalid Log In Please Try Again !!!"
    
    return jsonify({"message":message})
    '''
    if username in logins:
        savedPassword = logins["username"]
        providedPassword = request.json["password"].encode("utf-8")
        if checkpw(providedPassword, savedPassword):
            return "Valid Log in", 200 ,"\n", message
        else:
            return "Invalid Log In please try again" , 200
    else:
        salt = gensalt()
        hashedPassword = hashpw(providedPassword, salt)
        logins[username]
        '''
#(username, password) in data.items()

    
'''def Response(username,password, conn, data):
    if (username, password) in data.items():
        print("THIS IS THE DATA:___",data)
        random_num = randrange(1, 3)
        q = "Select HolidayMessage.Message From HolidayMessage Where HolidayMessage.ID =" + str(random_num)
        cu = conn.cursor()
        cu.execute(q)
        conn.commit()
        message = cu.fetchall()
        #print("THIS IS THE MESSAGE:___ ", message)
    else:
        message = "Invalid Log In Please Try Again !!!"
    return message'''
    
       


#--------------------------------------------------------------------------------------------------------
    
def check_credentials(username, password):
    for el in j2:
        q = ""
        q = q+el
        c = ""
        for el2 in j2[el]["Columns"]:
            for el3 in j2[el]["Columns"][el2]:
                c+= el2 + "." + el3 +","
            q += " " + c
            q = q[:-1]
            tb = ""
            for t in j2[el]["Table"]:
                tb += t + ","
            tb = tb[:-1]
        #print(tb)
        q += " From " + tb
        #print(q)
        where = []
        string = ""
        for el4 in j2[el]["Where"]:
            #print(el4)
            for el5 in j2[el]["Where"][el4]:
                #print(el5)
                where.append(el5)
        string1 = where[0]
        string2 = where[1]
        #print(string1)
        strTwo = ""
        strOne = ""   
        strOne = string1[0]  + " = '" + username + "'"
        strTwo = string2[0] + " = '" + password + "'"
        str3 = strOne + " And " + strTwo
        Final_q = q +" Where "+ str3

        return Final_q
    




def queryOne(conn, Final_q):
    cu = conn.cursor()
    #self.cx = sqlite3.connect(file_path, check_same_thread=False)
    cu.execute(Final_q)
    conn.commit()
    data = cu.fetchall()
    
    print("This is the data:", data)
    return data



if __name__ == "__main__":
    app.run()


