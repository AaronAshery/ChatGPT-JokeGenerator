from tempfile import tempdir
import openai
#import ipywidgets as widgets
import textwrap as tw
import re
from flask import Flask
from flask import render_template
from flask import Response, request, jsonify

from pprint import pprint
openai.api_key = "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"

app = Flask(__name__)

data = {
	"topic": "",
	"audience":"",
	"age":"",
	"joke":""
}

specific_data = {
	"subtopic": "",
	"more_info": ""
}

explain = ""

def joke_generator():
    topic_prompt = f"List 5 jokes about {data['topic']} that are funny to {data['audience']} who are about {data['age']} years old."
    completion = openai.Completion.create(engine="text-davinci-002",max_tokens=256,prompt=topic_prompt)
    return re.split('1.|2.|3.|4.|5.', completion.choices[0].text.strip())

def joke_generator_feedback():
	topic_prompt = f"List 5 {specific_data['more_info']} jokes about {specific_data['subtopic']} that are funny to {data['audience']} who are about {data['age']} years old."
	completion = openai.Completion.create(engine="text-davinci-002",max_tokens=256,prompt=topic_prompt)
	return re.split('1.|2.|3.|4.|5.', completion.choices[0].text.strip())



def joke_explain(temp):
    info_prompt = f"Explain why this joke is funny:" + temp
    completion = openai.Completion.create(engine="text-davinci-002",max_tokens=256,prompt=info_prompt)
    results = re.split('\n', completion.choices[0].text.strip())
    return results[0]
    # info_prompt2 = f"Why do {data['age']} year olds think that jokes about {data['topic']} are funny?"
    # completion = openai.Completion.create(engine="text-davinci-002",max_tokens=256,prompt=info_prompt2)
    # results2 = re.split('\n', completion.choices[0].text.strip())


@app.route("/")
def home():
    return render_template("homepage.html")

@app.route("/results", methods=['GET', 'POST'])
def results():
    results = joke_generator()
    return render_template("results.html", jokes=results)

@app.route("/results2", methods=['GET', 'POST'])
def results2():
    results = joke_generator_feedback()
    #print(results)
    return render_template("results2.html", jokes=results)

@app.route("/feedback", methods=['GET', 'POST'])
def feedback():
	return render_template("feedback.html")

@app.route("/get_data", methods=['POST'])
def get_data():
    input_data = request.get_json()
    data['topic'] = input_data['topic']
    data['audience'] = input_data['audience']
    data['age'] = input_data['age']

    return data

@app.route("/get_data2", methods=['POST'])
def get_data2():
	input_data = request.get_json()
	specific_data["subtopic"] = input_data['subtopic']
	specific_data["more_info"] = input_data['info']

	return specific_data

@app.route("/explain_data", methods=['GET', 'POST'])
def explain_data():
	input_data = request.get_json()
	explain = joke_explain(input_data)
	return jsonify(explain = explain)

if __name__ == "__main__":
    app.run(debug=True)
