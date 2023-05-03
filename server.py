from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS
import logging
import tensorflow as tf
import tensorflow_datasets as tfds
import numpy as np

app = Flask(__name__)
config = None

CORS(app, support_credentials=True)
logging.basicConfig(level=logging.DEBUG,
                    format='(%(threadName)-10s) %(message)s',
                    )
# path = "/<string:review1>/"

@app.route('/', methods = ['GET','POST'])
def review():
    pickled_model = pickle.load(open('finalized_model.sav', 'rb'))
    encoder = tfds.deprecated.text.SubwordTextEncoder.load_from_file('tokenizer')
    data = request.json
    sentence = data['headline']
    data_input = encoder.encode(sentence)
    # A = np.array(data_input)
    # A = np.pad(data_input, (0, 1048 - len(data_input)%1048), 'constant')
    # A = A.reshape(1, -1)
    A = np.array(data_input)
    A = A.reshape(-1, 1)
    A = tf.keras.preprocessing.sequence.pad_sequences(
        A, value=0, padding='post', maxlen=49
    )
    output = pickled_model.predict(A)
    output = output.tolist()
    if output[0] == 0:
        return jsonify("Complete")
    else:
        return jsonify("Incomplete")
    

if __name__ == "__main__": 
    app.run(debug=True)

    

