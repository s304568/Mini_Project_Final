import re
from random import randrange
import sqlite3
from sqlite3 import Error
import json
from bcrypt import checkpw, gensalt, hashpw


from flask import Flask, jsonify, request
from flask_cors import CORS

conn = sqlite3.connect(r"G:\vb\ALEX_vb\React\Mini_Project_Final\Python\UserData.db",check_same_thread=False)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

    
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    newUsername = data.get('username')
    newPassword = data.get("password")
    print("Username sign-up: ",newUsername)
    print("Password sign-up: ",newPassword)
    conn = sqlite3.connect(r"G:\vb\ALEX_vb\React\Mini_Project_Final\Python\UserData.db",check_same_thread=False)
    cu = conn.cursor()
    validName = False 
    validPass = False


    resultName = re.match("^[a-zA-Z]+$", newUsername)
    resultPass = re.match("(?=.*[a-zA-Z])(?=.*\d)", newPassword)


    if len(newUsername) >= 5 and len(newUsername) <= 16:
        validName = True
    elif resultName:
       validName = True
    else: 
        validName = False

    if len(newPassword) >= 5 and len(newPassword) <= 16:
        validPass = True
    elif resultPass:
        validPass = True
    else:
        validPass = False

    newPassword = newPassword.encode("utf-8")
    
    if validName == True and validPass == True:
        q_get_name = """SELECT COUNT (UserName) AS "Total" From UserData Where UserName = ?"""
        cu = conn.cursor()
        cu.execute(q_get_name,(newUsername,))
        conn.commit()
        userNameRepeat = cu.fetchall()
        userNameRepeat2 = userNameRepeat[0][0]
        print(userNameRepeat2)
        if userNameRepeat2 > 0 :
            message = "Invalid Sign-Up. Please try again someone is alsready using that username !!!"
            print("This is the message___", message)
            return jsonify({"message":message})
        else:
            salt = gensalt()
            hashedPassword = hashpw(newPassword, salt)
            q = """Insert Into UserData(UserName,Password) Values(?,?)"""
            print("HERE_____:",newUsername, hashedPassword)
            q_entry = (newUsername, hashedPassword)
            cu.execute(q, q_entry)
            conn.commit()
            message = "Valid Sign-Up !!!"
            print("This is the message___", message)
            return jsonify({"message":message})
    else:
        message = "Invalid Sign-Up. Please try again !!!"
        print("This is the message___", message)
        return jsonify({"message":message})
    

#------------------------------------------------------------------
 
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password').encode("utf-8")
    #print("prints username____:",username)
    #print("prints password____:",password) 

    result = get_encryptedPass(conn, username, password)
    
    print("DATA__:",data, "Result:",result)
    if result:
        random_num = randrange(1, 3)
        q = "Select HolidayMessage.Message From HolidayMessage Where HolidayMessage.ID =" + str(random_num)
        cu = conn.cursor()
        cu.execute(q)
        conn.commit()
        message = cu.fetchall()
        print("Message:",message)
        return jsonify({"message":message})
    else:
        message = "Invalid Log In Please Try Again !!!"
        return jsonify({"message":message})
    
    

#--------------------------------------------------------------------------------------------------------
def get_encryptedPass(conn, username, password):
    
    q = """Select UserData.Password From UserData Where Username = ? """
    #print(username)
    cu = conn.cursor()
    cu.execute(q,(username,))
    conn.commit()
    passW = cu.fetchall()
    

    return  len(passW) > 0 and checkpw(password, passW[0][0])
        
    

if __name__ == "__main__":
    app.run()


