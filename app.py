from flask import Flask, redirect, url_for, render_template, request
from werkzeug.utils import secure_filename

import boto3
from import_and_model import model_input


s3 = boto3.client('s3',
                    aws_access_key_id='AKIAISITTOGCJRNF46HQ',
                    aws_secret_access_key= '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',
                     )
BUCKET_NAME = "thunderstruck-duck"

# Create an instance of our Flask app.
app = Flask(__name__)

app= Flask(__name__, static_url_path='/static')

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/Findings")
def Stats():
    return render_template("findings.html")

# Set route
@app.route("/Sound")
def Sound():
    # Return the template with the teams list passed in
    return render_template('Sound.html')

# Set route
@app.route("/Teams")
def Teams():
    # Return the template with the teams list passed in
    return render_template('team.html')


@app.route('/upload',methods=['post'])
def upload():
    if request.method == 'POST':
        mp3 = request.files['file']
        if mp3:
                filename = secure_filename(mp3.filename)
                mp3.save(filename)
                s3.upload_file(
                    Bucket = BUCKET_NAME,
                    Filename=filename,
                    Key = "sample_mp3.mp3"
                )
                msg = "Upload Done ! "

    results = model_input()

    return render_template("Sound.html",msg =msg, **results)




if __name__ == "__main__":
    app.run(debug=True)