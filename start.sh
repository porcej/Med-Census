#!/bin/bash

export FLASK_APP=app.py
source /home/pi/med-tracker/venv/bin/activate

cd /home/pi/Med-Census

/home/pi/Med-Census/venv/bin/python /home/pi/Med-Census/app.py
