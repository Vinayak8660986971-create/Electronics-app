from flask import Flask, request, jsonify
from flask_cors import CORS
from quiz_data import quiz_data  # import quiz from separate file

app = Flask(__name__)
CORS(app)

# TEMP USER STORE (college level)
users = {}

@app.route("/")
def home():
    return "Backend Running"

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    if not data:
        return jsonify({"message": "No data received"}), 400

    username = data.get("username")
    password = data.get("password")
    if not username or not password:
        return jsonify({"message": "Username and password required"}), 400
    if username in users:
        return jsonify({"message": "User already exists"}), 400

    users[username] = password
    return jsonify({"message": "Registration successful"})

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    if users.get(username) == password:
        return jsonify({"message": "Login success"})
    return jsonify({"message": "Invalid credentials"}), 401

@app.route("/topics")
def topics():
    return jsonify([
        "Ohm's Law",
        "Kirchhoff’s Laws",
        "Diodes",
        "Transistors",
        "Capacitors"
    ])

@app.route("/ohmslaw", methods=["POST"])
def ohmslaw():
    data = request.json
    v = data["voltage"]
    r = data["resistance"]
    return jsonify({"current": round(v / r, 2)})

@app.route("/power", methods=["POST"])
def power():
    data = request.json
    return jsonify({"power": data["voltage"] * data["current"]})

@app.route("/quiz")
def quiz():
    return jsonify(quiz_data)  # return quiz from imported file

if __name__ == "__main__":
    app.run(debug=True)
