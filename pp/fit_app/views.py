from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse, HttpResponse
import json
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from .models import StepsTracker , WaterIntake ,Reminder
from datetime import date
# # home page - serve html
# def index (request ):
#   return render (request,'fit_app/intex.html')


# api step count save garna 
@csrf_exempt
def step_view(request):
  if request.method == 'POST':
    data = json.load(request.body) #json lai req 
    user_id =data['user_id']
    steps = data['steps']
    step_entry = StepsTracker(user_id = user_id , steps = steps,date = date.today())
    step_entry.save()
    #to save step in database 'aaru action garna ni hunnxa'
    return  JsonResponse({'message':'Step save succesfully'})
  # return JsonResponse ({'erro':'invalid request'},status=404)
  return render (request, 'index.html')


#api for water
@csrf_exempt 
def water_view(request):
  if request.method =='POST':
    data = json.load(request.body)
    user_id = data['user_id']
    intake = data  ['intake']
    water_entry = WaterIntake (user_id = user_id , intake = intake , date = date.today())
    water_entry.save()
    #to save water intake here
    return JsonResponse({'message':"water logged "})
  # return JsonResponse({'error':'invalid request'},statue=404)


#for reminder purpose which take input from user to remind what and when 
@csrf_exempt
def reminder_view(request):
  if request.method == 'POST':
    data = json.loads(request.body)
    user_id = data['user_id']
    reminder_text = data['reminder_text']
    reminder_time = data['remender_time']
    reminder = Reminder(user_id= user_id, remender_text = reminder_text, reminder_time = reminder_time,date= date.today())
    reminder.save()
    return JsonResponse({'message ':" reminder  set successfully"})

#get user reinder for today 
def get_today_reminders(request , user_id):
  reminders = Reminder.objects.filter(user_id = user_id,date = date.today())
  reminder_list =[{"text":reminder.reminder_text,"time":reminder.remender_time } for reminder in reminders]
  return JsonResponse(reminder_list ,safe = False)


def index(request):
  return render(request,'index.html')