import sqlite3

con = sqlite3.connect("project.db")
print("Database opened succesfully")
con.execute("CREATE TABLE IF NOT EXISTS customers(email TEXT PRIMARY KEY NOT NULL, name TEXT NOT NULL, password TEXT NOT NULL, is_member INT NOT NULL, date TEXT NOT NULL)")
con.execute("CREATE TABLE IF NOT EXISTS workers(email TEXT PRIMARY KEY NOT NULL, password TEXT NOT NULL, name TEXT NOT NULL, birthday TEXT NOT NULL, leaves text)")
con.execute("CREATE TABLE IF NOT EXISTS managers(email TEXT PRIMARY KEY NOT NULL, password TEXT NOT NULL, name TEXT NOT NULL, birthday TEXT NOT NULL)")
con.execute("CREATE TABLE IF NOT EXISTS stock(stock_id INT PRIMARY KEY NOT NULL, name TEXT NOT NULL, level INT, cut_off INT)")

print("Tables created succesfully")
con.close()