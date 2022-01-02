from flask import Flask, Response, jsonify
from flask_cors import CORS

import dataService

app = Flask(__name__)
CORS(app)

@app.route("/data", methods=['GET'])
def getData():
    data = dataService.getData()
    response = {
        'generalValues': data[0],
        'weekAmounts': data[1],
        'yearIncomeOutcome': data[2],
        'salaries': data[3],
        'amazonExpenses': data[4],
        'outcomePerType': data[5]
    }
    return jsonify(response)