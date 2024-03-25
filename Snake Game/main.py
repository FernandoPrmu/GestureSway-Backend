from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit, send
import cv2
import numpy as np
from tensorflow.keras.models import load_model
import os
from matplotlib import pyplot as plt
import time
import mediapipe as mp
from sklearn.model_selection import train_test_split
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from tensorflow.keras.callbacks import TensorBoard
from flask_cors import CORS
import socket
import logging


# from tensorflow.python.keras.models import load_model


app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")
model = load_model("Snake Game/Models/action.hdf5")
# model = load_weights('action.hdf5')


mp_holistic = mp.solutions.holistic 
mp_drawing = mp.solutions.drawing_utils # Drawing utilities

def mediapipe_detection(image, model):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB) # COLOR CONVERSION BGR 2 RGB
    image.flags.writeable = False                  # Image is no longer writeable
    results = model.process(image)                 # Make prediction
    image.flags.writeable = True                   # Image is now writeable 
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR) # COLOR COVERSION RGB 2 BGR
    return image, results

def draw_styled_landmarks(image, results):
    # Draw left hand connections
    mp_drawing.draw_landmarks(image, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS, 
                             mp_drawing.DrawingSpec(color=(121,22,76), thickness=2, circle_radius=4), 
                             mp_drawing.DrawingSpec(color=(121,44,250), thickness=2, circle_radius=2)
                             ) 
    # Draw right hand connections  
    mp_drawing.draw_landmarks(image, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS, 
                             mp_drawing.DrawingSpec(color=(245,117,66), thickness=2, circle_radius=4), 
                             mp_drawing.DrawingSpec(color=(245,66,230), thickness=2, circle_radius=2)
                             ) 
    
def extract_keypoints(results):
    lh = np.array([[res.x, res.y, res.z] for res in results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(21*3)
    rh = np.array([[res.x, res.y, res.z] for res in results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(21*3)
    return np.concatenate([lh, rh])


# Actions that we try to detect
actions = np.array(['openPlam', 'closeFist', 'openPlamToRight','openPlamToLeft'])

# Thirty videos worth of data
no_sequences = 30

# Videos are going to be 30 frames in length
sequence_length = 30

# Folder start
start_folder = 30



def process_vid():
    sequence = []
    # threshold = 0.6
    cap = cv2.VideoCapture(0)
    with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
        while cap.isOpened():

            # Read feed
            ret, frame = cap.read()

            # Make detections
            image, results = mediapipe_detection(frame, holistic)
            # print(results)
            
            # Draw landmarks
            draw_styled_landmarks(image, results)
            
            # 2. Prediction logic
            keypoints = extract_keypoints(results)
            sequence.insert(0,keypoints)

            sequence = sequence[:30]
            
            if len(sequence) == 30:
                res = model.predict(np.expand_dims(sequence, axis=0))[0]
                new_threshold = 0.6

                data = res
                print("test 02" + actions[np.argmax(res)])

                sendData(actions[np.argmax(res)])
                   
                

                # if res[np.argmax(res)] > new_threshold:
                #     data = {"message": jsonify(actions[np.argmax(res)])}
                #     return jsonify(data)



                # 3. Viz logic
        #         if res[np.argmax(res)] > new_threshold:  
        #             if len(sentence) > 0: 
        #                 gesture = actions[np.argmax(res)]
        #                 socketio.send(gesture)
        #                 if actions[np.argmax(res)] != sentence[-1]:
        #                     sentence.append(actions[np.argmax(res)])
        #             else:
        #                 sentence.append(actions[np.argmax(res)])

        #         if len(sentence) > 5: 
        #             sentence = sentence[-5:]

                
                
        #     cv2.rectangle(image, (0,0), (640, 40), (245, 117, 16), -1)
        #     cv2.putText(image, ' '.join(sentence), (3,30), 
        #                 cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)
            
        #     # Show to screen
            cv2.imshow('OpenCV Feed', image)

        #     # emit('action_update', {'action': action})
        #     # Break gracefully
            if cv2.waitKey(10) & 0xFF == ord('q'):
                break
        cap.release()
        cv2.destroyAllWindows()
        # return jsonify(actions[np.argmax(res)])


def sendData(data):
    socketio.send(len(data))
    print(len(data))
    

@app.route('/process', methods = ['GET'])
def start_process():
    process_vid()
    return jsonify({'action': 'done'})

    
        
if __name__ == '__main__':
    socketio.run(app, debug=True)