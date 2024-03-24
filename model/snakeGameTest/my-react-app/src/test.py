# from flask import Flask, request, jsonify
# from flask_socketio import SocketIO, emit
# import cv2
# import numpy as np
# from tensorflow.keras.models import load_model
# import os
# from matplotlib import pyplot as plt
# import time
# import mediapipe as mp
# from sklearn.model_selection import train_test_split
# from tensorflow.keras.utils import to_categorical
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import LSTM, Dense
# from tensorflow.keras.callbacks import TensorBoard

# # from tensorflow.python.keras.models import load_model


# app = Flask(__name__)
# socketio = SocketIO(app)
# model = load_model("action.hdf5")
# # model = load_weights('action.hdf5')

# mp_holistic = mp.solutions.holistic 
# mp_drawing = mp.solutions.drawing_utils # Drawing utilities

# def mediapipe_detection(image, model):
#     image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB) # COLOR CONVERSION BGR 2 RGB
#     image.flags.writeable = False                  # Image is no longer writeable
#     results = model.process(image)                 # Make prediction
#     image.flags.writeable = True                   # Image is now writeable 
#     image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR) # COLOR COVERSION RGB 2 BGR
#     return image, results

# def draw_styled_landmarks(image, results):
#     # Draw left hand connections
#     mp_drawing.draw_landmarks(image, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS, 
#                              mp_drawing.DrawingSpec(color=(121,22,76), thickness=2, circle_radius=4), 
#                              mp_drawing.DrawingSpec(color=(121,44,250), thickness=2, circle_radius=2)
#                              ) 
#     # Draw right hand connections  
#     mp_drawing.draw_landmarks(image, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS, 
#                              mp_drawing.DrawingSpec(color=(245,117,66), thickness=2, circle_radius=4), 
#                              mp_drawing.DrawingSpec(color=(245,66,230), thickness=2, circle_radius=2)
#                              ) 
    
# def extract_keypoints(results):
#     lh = np.array([[res.x, res.y, res.z] for res in results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(21*3)
#     rh = np.array([[res.x, res.y, res.z] for res in results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(21*3)
#     return np.concatenate([lh, rh])

# # Path for exported data, numpy arrays
# # DATA_PATH = os.path.join('MP_Data') 

# # Actions that we try to detect
# actions = np.array(['openPlam', 'closeFist', 'openPlamToRight','openPlamToLeft'])

# # Thirty videos worth of data
# no_sequences = 30

# # Videos are going to be 30 frames in length
# sequence_length = 30

# # Folder start
# start_folder = 30



# @socketio.on('message')
# def handle_message(data):
#     print('received message: ' + data)

# @socketio.on('disconnect')
# def handle_disconnect():
#     print('Client disconnected')

# @socketio.on('start_processing')
# def handle_start_processing():
#     print('Start processing received')

# def process_vid():
#     sequence = []
#     sentence = []
#     # threshold = 0.6
#     cap = cv2.VideoCapture(0)
#     with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
#         while cap.isOpened():

#             # Read feed
#             ret, frame = cap.read()

#             # Make detections
#             image, results = mediapipe_detection(frame, holistic)
#             # print(results)
            
#             # Draw landmarks
#             draw_styled_landmarks(image, results)
            
#             # 2. Prediction logic
#             keypoints = extract_keypoints(results)
#             sequence.insert(0,keypoints)
#     #         sequence = sequence[:30]
#     #         sequence.append(keypoints)
#             sequence = sequence[:30]
            
#             if len(sequence) == 30:
#                 res = model.predict(np.expand_dims(sequence, axis=0))[0]
#                 new_threshold = 0.6

#                 data = res
#                 print(actions[np.argmax(res)])

#                 # 3. Viz logic
#                 if res[np.argmax(res)] > new_threshold:  
#                     if len(sentence) > 0: 
#                         if actions[np.argmax(res)] != sentence[-1]:
#                             sentence.append(actions[np.argmax(res)])
#                     else:
#                         sentence.append(actions[np.argmax(res)])

#                 if len(sentence) > 5: 
#                     sentence = sentence[-5:]

                
                
#             cv2.rectangle(image, (0,0), (640, 40), (245, 117, 16), -1)
#             cv2.putText(image, ' '.join(sentence), (3,30), 
#                         cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)
            
#             # Show to screen
#             cv2.imshow('OpenCV Feed', image)

#             # emit('action_update', {'action': action})
#             # Break gracefully
#             if cv2.waitKey(10) & 0xFF == ord('q'):
#                 break
#         cap.release()
#         cv2.destroyAllWindows()
#         return jsonify(actions[np.argmax(res)])


# # @app.route('/process', methods = ['GET'])
# # def start_process():
# #     data=process_vid()
# #     # return jsonify({'action': data})
# #     return jsonify({'action': data.text})
    
# @app.route('/process', methods = ['GET'])
# def start_process():
#     data=process_vid()
#     return jsonify({'action': data.data.decode('utf-8')})

    
        

# if __name__ == '__main__':
#     socketio.run(app, debug=True)

from flask import Flask, request, jsonify
import asyncio
import websockets
import cv2
import numpy as np
from tensorflow.keras.models import load_model
import mediapipe as mp
# from sklearn.model_selection import train_test_split
# from tensorflow.keras.utils import to_categorical
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import LSTM, Dense
# from tensorflow.keras.callbacks import TensorBoard

app = Flask(__name__)
model = load_model("action.hdf5")
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

def process_gesture(message):
    # Here you should implement your gesture processing logic
    # For now, I'll just return the same message
    return message

async def handle_connection(websocket, path):
    try:
        async for message in websocket:
            # Process the message (gesture recognition)
            gesture = process_gesture(message)
            # Send the gesture to the client
            await websocket.send(gesture)
    except Exception as e:  # Catch any exception
        print(f"An error occurred: {e}")

# Actions that we try to detect
actions = np.array(['openPlam', 'closeFist', 'openPlamToRight','openPlamToLeft'])

# Thirty videos worth of data
no_sequences = 30

# Videos are going to be 30 frames in length
sequence_length = 30

# Folder start
start_folder = 30

start_server = websockets.serve(handle_connection, "localhost", 8766)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()



def process_gesture(image):
    sequence = []
    sentence = []
    threshold = 0.6
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
    #         sequence = sequence[:30]
    #         sequence.append(keypoints)
            sequence = sequence[:30]
            
            if len(sequence) == 30:
                res = model.predict(np.expand_dims(sequence, axis=0))[0]
                # data = res
                print(actions[np.argmax(res)])

                
                
            #3. Viz logic
                if res[np.argmax(res)] > threshold: 
                    if len(sentence) > 0: 
                        if actions[np.argmax(res)] != sentence[-1]:
                            sentence.append(actions[np.argmax(res)])
                    else:
                        sentence.append(actions[np.argmax(res)])

                if len(sentence) > 5: 
                    sentence = sentence[-5:]

                
                
            cv2.rectangle(image, (0,0), (640, 40), (245, 117, 16), -1)
            cv2.putText(image, ' '.join(sentence), (3,30), 
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)
            
            # Show to screen
            cv2.imshow('OpenCV Feed', image)

            # emit('action_update', {'action': action})
            # Break gracefully
            if cv2.waitKey(10) & 0xFF == ord('q'):
                break
        cap.release()
        cv2.destroyAllWindows()

asyncio.run(main())