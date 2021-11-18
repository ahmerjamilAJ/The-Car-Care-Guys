from flask import Flask, render_template, request
import sqlite3

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/login')
def login():
    return render_template('logincategories.html')

@app.route("/savecustdetails",methods = ["POST","GET"])  
def saveCustDetails():  
    msg = "msg"  
    if request.method == "POST":  
        try:  
            name = request.form["name"]  
            email = request.form["email"]  
            password = request.form["password"]
            birthday = request.form["birthday"]  
            with sqlite3.connect("project.db") as con:  
                cur = con.cursor()  
                cur.execute("INSERT into customers (email, name, password, is_member, date) values (?,?,?,?,?)",(email, name, password, 0, birthday))
                con.commit()  
                msg = "You have succesfully Signed Up!"

            return render_template("signupsuccess.html",msg = msg)  
            con.close()  
        except:  
            con.rollback()  
            msg = "Sign Up was unsuccesful"
            return render_template("signupfail.html", msg = msg)
            con.close()

@app.route('/custlogin')
def custlogin():
    return render_template('custlogin.html')


@app.route('/custhomepage', methods = ["POST", "GET"]) 
def custhomepage():
    msg = "msg"  
    if request.method == "POST":  
        try:  
            email = request.form["email"]  
            password = request.form["password"]
            with sqlite3.connect("project.db") as con:  
                cur = con.cursor()
                cur.execute("SELECT * FROM customers WHERE email = '{}' AND password = '{}'".format(email, password))
                info  = cur.fetchall()
                con.commit()

                msg = "You have succesfully Logged In!"

            return render_template('custpagedisplay.html', info = info)  
            con.close()  
        except:  
            
            con.rollback()  
            msg = "Log In was unsuccesful"
            return render_template("loginfail.html", msg = msg)
            con.close()

@app.route('/managerlogin')
def managerlogin():
    return render_template('managerlogin.html')

@app.route('/managerhomepage', methods = ['POST', 'GET'])
def managerhomepage():
    msg = "msg"  
    if request.method == "POST":  
        try:  
            email = request.form["email"]  
            password = request.form["password"]
            with sqlite3.connect("project.db") as con:  
                cur = con.cursor()
                cur.execute("SELECT * FROM managers WHERE email = '{}' AND password = '{}'".format(email, password))
                info  = cur.fetchall()
                con.commit()

                msg = "You have succesfully Logged In!"

            return render_template('managerpagedisplay.html', info = info)  
            con.close()  
        except:  
            
            con.rollback()  
            msg = "Log In was unsuccesful"
            return render_template("loginfail.html", msg = msg)
            con.close()
    


@app.route('/saveworkerdetails', methods = ['POST', 'GET'])
def saveworkerdetails():
    msg = "msg"  
    if request.method == "POST":  
        try:  
            name = request.form["name"]  
            email = request.form["email"]  
            password = request.form["password"]
            birthday = request.form["birthday"]  
            with sqlite3.connect("project.db") as con:  
                cur = con.cursor()  
                cur.execute("INSERT into workers (email, password, name, birthday) values (?,?,?,?)",(email, password, name, birthday))
                con.commit()  
                msg = "You have succesfully Added Worker!"

            return render_template("index.html")  
            con.close()  
        except:  
            con.rollback()  
            msg = "Sign Up was unsuccesful"
            return render_template("signupfail.html", msg = msg)
            con.close()



@app.route('/addworker')
def addworker():
    return render_template('addworkerdisplay.html')


@app.route('/viewstock')
def viewstock():
    
    try:
        with sqlite3.connect('project.db') as con:
            cur = con.cursor()
            cur.execute("SELECT * FROM stock")
            info = cur.fetchall()
            con.commit()

            print(info)

        return render_template('displaystocks.html', value = info)
        con.close()

    except:

        con.rollback() 
        return render_template('index.html')



if __name__ == '__main__':
    app.run(debug=True)